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

function layoutMovies(movies: Movie[]): MovieLayouted[] {

  const width = config.width;
  const height = config.height;

  const scaleRange = Math.min(height, width);
  const range = [
    0,
    scaleRange,
  ];

  const rottenRatings = movies.map(d => d.rotten);
  const rottenMin = Math.min(...rottenRatings);
  const rottenMax = Math.max(...rottenRatings);

  const rottenAxis = d3Scale.scaleLinear()
    .domain([rottenMin, rottenMax])
    .range([...range].reverse());

  const imdbRatings = movies.map(d => d.imdb);
  const imdbMin = Math.min(...imdbRatings);
  const imdbMax = Math.max(...imdbRatings);

  const imdbAxis = d3Scale.scaleLinear()
    .domain([imdbMin, imdbMax])
    .range(range);

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
  @observable.shallow layoutedMovies: MovieLayouted[];

  lastUpdate: number;
  currentInterpolation: MovieInterpolated[];

  constructor() {
    this.numberOfPoints = 100;
    this.active = null;
    this.movies = [];
    this.setActive = this.setActive.bind(this);
    this.setData = this.setData.bind(this);
    this.setNumberOfPoints = this.setNumberOfPoints.bind(this);
    this.layoutedMovies = layoutMovies(this.movies);

    observe(this, 'movies', (change) => {
      const oldValue: Movie[] = change.oldValue;
      const newValue: Movie[] = change.newValue;

      if (oldValue === newValue) {
        console.log('what');
        return;
      }

      const now = +(new Date());
      const diffToLastUpdate = now - (this.lastUpdate || now);

      let fromInterpolate = layoutMovies(oldValue);
      const toInterpolate = layoutMovies(newValue);

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
      })

    });
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
  render() {

    const movieStore = this.props.movieStore;

    const data = movieStore.layoutedMovies;

    return (
      <div>
        <ScatterWrapper
          updateData={movieStore.setData}
        />
        <svg
          style={{
            overflow: 'visible'
          }}
          height={config.height}
          width={config.width}
        >
          {data.map(d => {
            return (
              <g
                key={d.movie.title}
                transform={`translate(${d.x}, ${d.y})`}
                style={{
                  transitionDuration: config.transitionTime + 'ms',
                  transitionTimingFunction: 'ease-in-out',
                  transitionProperty: 'transform, opacity',
                }}
                opacity={d.opacity}
                onMouseEnter={() => movieStore.setActive(d.movie)}
                onMouseLeave={() => movieStore.setActive(null)}
              >
                <circle
                  fill='red'
                  cx={0}
                  cy={0}
                  r={config.radius}
                />
              </g>
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
