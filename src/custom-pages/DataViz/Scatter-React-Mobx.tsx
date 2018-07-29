import * as React from 'react';
import {observable, action, observe} from 'mobx';
import * as d3Scale from 'd3-scale';
import {interpolateNumber} from 'd3-interpolate';
import {observer, Provider, inject} from 'mobx-react';
import { Movie } from './data';
import config from './config';
import ScatterWrapper from './ScatterWrapper';

interface MovieLayouted {
  movie: Movie;
  opacity: number;
  x: number;
  y: number;
}

type MovieInterpolated = (t: number) => MovieLayouted;

function interpolateMovie(fromMovie: MovieLayouted, toMovie: MovieLayouted): MovieInterpolated {
  const opacity = interpolateNumber(fromMovie.opacity, toMovie.opacity);
  const x = interpolateNumber(fromMovie.x, toMovie.x);
  const y = interpolateNumber(fromMovie.y, toMovie.y);
  return (t: number) => ({
    ...toMovie,
    opacity: opacity(t),
    x: x(t),
    y: y(t),
  });
}

function interpolateMovies(fromMovies: MovieLayouted[], toMovies: MovieLayouted[]): MovieInterpolated[] {
  const deletedMovies = fromMovies.filter(m1 => {
    return !toMovies.find(m2 => m2.movie.title === m1.movie.title);
  });

  const updateMovies = toMovies.filter(m2 => {
    return fromMovies.find(m1 => m1.movie.title === m2.movie.title);
  });

  const newMovies = toMovies.filter(m2 => {
    return !fromMovies.find(m1 => m1.movie.title === m2.movie.title);
  });

  const deletedMoviesInterpolated = deletedMovies.map(m => {
    const mTo = {
      ...m,
      opacity: 0,
    };

    return interpolateMovie(m, mTo);
  });

  const newMoviesInterpolated = newMovies.map(m => {
    const mFrom = {
      ...m,
      opacity: 0,
    };

    return interpolateMovie(mFrom, {...m, opacity: 1});
  });

  const updatedMoviesInterpolated = updateMovies.map(m => {
    const mFrom = fromMovies.find(m2 => m2.movie.title === m.movie.title);
    return interpolateMovie(mFrom, m);
  });

  return deletedMoviesInterpolated.concat(
    updatedMoviesInterpolated
  ).concat(
    newMoviesInterpolated
  );
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

function layoutMovies(width: number, height: number, movies: Movie[]): MovieLayouted[] {

  const rangeRotten = [
    0,
    height,
  ];

  const rangeImdb = [
    0,
    width,
  ];

  const rottenRatings = movies.map(d => d.rotten);
  const rottenMin = Math.min(...rottenRatings);
  const rottenMax = Math.max(...rottenRatings);

  const rottenAxis = d3Scale.scaleLinear()
    .domain([rottenMin, rottenMax])
    .range(rangeRotten);

  const imdbRatings = movies.map(d => d.imdb);
  const imdbMin = Math.min(...imdbRatings);
  const imdbMax = Math.max(...imdbRatings);

  const imdbAxis = d3Scale.scaleLinear()
    .domain([imdbMin, imdbMax])
    .range(rangeImdb);

  return movies.map(movie => {
    return {
      movie,
      x: imdbAxis(movie.imdb),
      y: rottenAxis(movie.rotten),
      opacity: 1,
    };
  })
}

class MovieState {
  @observable.shallow movies: Movie[];
  @observable numberOfPoints: number;
  @observable active: Movie;
  @observable.shallow layoutedMovies: MovieLayouted[] = [];
  @observable width: number = 1;
  @observable height: number = 1;

  lastUpdate: number;
  currentInterpolation: MovieInterpolated[];

  constructor() {
    this.numberOfPoints = 100;
    this.active = null;
    this.movies = [];
    this.setActive = this.setActive.bind(this);
    this.setData = this.setData.bind(this);
    this.setNumberOfPoints = this.setNumberOfPoints.bind(this);

    observe(this, 'movies', (change) => {
      const oldValue: Movie[] = change.oldValue;
      const newValue: Movie[] = change.newValue;

      if (this.width === 1 || this.height === 1) {
        return;
      }

      if (oldValue === newValue) {
        return;
      }

      const now = +(new Date());
      const diffToLastUpdate = now - (this.lastUpdate || now);

      let fromInterpolate = layoutMovies(this.width, this.height, oldValue);
      const toInterpolate = layoutMovies(this.width, this.height, newValue);

      if (diffToLastUpdate > 0 && diffToLastUpdate < config.transitionTime) {
        const t = diffToLastUpdate / config.transitionTime;
        fromInterpolate = this.currentInterpolation.map(m => m(easeInOutQuad(t)));
      }
      const interpolation = interpolateMovies(
        fromInterpolate,
        toInterpolate,
      );

      this.lastUpdate = now;
      this.currentInterpolation = interpolation;

      // first we apply the start state
      this.layoutedMovies = interpolation.map(m => m(0));
      // then we apply the end state
      setTimeout(() => {
        this.layoutedMovies = interpolation.map(m => m(1));
      });

    });
  }

  @action
  setWidthHeight(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.layoutedMovies = layoutMovies(width, height, this.movies);
  }

  @action
  setNumberOfPoints(e: any) {
    const numberOfPoints = parseInt(e.target.value);
    this.numberOfPoints = numberOfPoints;
  }

  @action
  setData(data: Movie[]) {
    this.movies = data;
  }

  @action
  setActive(movie: Movie) {
    this.active = movie;
  }
}

const movieStore = new MovieState();

@inject('movieStore')
@observer
class ScatterReactMobx extends React.Component<{
  movieStore?: MovieState;
}> {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }
  setRef(dom: SVGElement) {
    const height = dom.clientHeight;
    const width = dom.clientWidth;
    this.props.movieStore.setWidthHeight(width, height);
  }
  render() {

    const movieStore = this.props.movieStore;

    const data = movieStore.layoutedMovies;

    return (
      <div className="scatter-chart-container">
        <ScatterWrapper
          updateData={movieStore.setData}
        />
        <svg
          ref={this.setRef}
          className="scatter-chart"
        >
          {data.map(d => {
            return (
              <circle
                key={d.movie.title}
                cx={0}
                cy={0}
                r={config.radius}
                style={{
                  transitionDuration: config.transitionTime + 'ms',
                  transitionTimingFunction: 'ease-in-out',
                  transitionProperty: 'transform, opacity',
                  transform: `translate3d(${d.x}px, ${d.y}px, 0)`,
                  opacity: d.opacity,
                }}
                onMouseEnter={() => movieStore.setActive(d.movie)}
                onMouseLeave={() => movieStore.setActive(null)}
              />
            );
          })}
        </svg>
      </div>
    );
  }
}

const ScatterReactMobxContainer = () => (
  <Provider movieStore={movieStore}>
    <ScatterReactMobx />
  </Provider>
);

export default ScatterReactMobxContainer;
