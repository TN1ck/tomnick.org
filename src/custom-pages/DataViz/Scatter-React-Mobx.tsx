import * as React from 'react';
import {observable, action} from 'mobx';
import * as d3Scale from 'd3-scale';
import {observer, Provider, inject} from 'mobx-react';
import { Movie, createMockData } from './data';

class MovieState {
  @observable.shallow movies: Movie[];
  @observable numberOfPoints: number;
  @observable active: Movie;

  constructor() {
    this.numberOfPoints = 100;
    this.active = null;
    this.movies = createMockData(this.numberOfPoints);
    this.updateData = this.updateData.bind(this);
    this.setActive = this.setActive.bind(this);
    this.setNumberOfPoints = this.setNumberOfPoints.bind(this);
  }

  @action
  setNumberOfPoints(e: any) {
    const numberOfPoints = parseInt(e.target.value);
    const movies = createMockData(numberOfPoints);
    this.numberOfPoints = numberOfPoints;
    this.movies = movies;
  }

  @action
  updateData() {
    this.movies = createMockData(this.numberOfPoints);
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

    const data = movieStore.movies;
    const width = 400;
    const height = 400;
    const transitionTime = 1000;

    const scaleRange = Math.min(height, width);
    const margins = {
      left: 10,
      right: 10,
    };
    const radius = 5;
    const range = [
      margins.left,
      scaleRange - (margins.left + margins.right)
    ];

    const rottenRatings = data.map(d => d.rotten);
    const rottenMin = Math.min(...rottenRatings);
    const rottenMax = Math.max(...rottenRatings);

    const rottenAxis = d3Scale.scaleLinear()
      .domain([rottenMin, rottenMax])
      .range([...range].reverse());

    const imdbRatings = data.map(d => d.imdb);
    const imdbMin = Math.min(...imdbRatings);
    const imdbMax = Math.max(...imdbRatings);

    const imdbAxis = d3Scale.scaleLinear()
      .domain([imdbMin, imdbMax])
      .range(range);

    return (
      <div>
        <div>
          <button onClick={movieStore.updateData}>
            {'Update Data'}
          </button>
          <input
            type="range"
            min={1}
            max={2000}
            step={10}
            value={movieStore.numberOfPoints}
            onChange={movieStore.setNumberOfPoints}
          />
          {movieStore.numberOfPoints}
        </div>
        <div>
          {`Currently using ${data.length} points`}
        </div>
        <svg
          style={{
            overflow: 'visible'
          }}
          height={height}
          width={width}
        >
          {data.map(d => {
            const active = movieStore.active ? movieStore.active.title === d.title : null;
            return (
              <g
                key={d.title}
                transform={`translate(${imdbAxis(d.imdb)}, ${rottenAxis(d.rotten)})`}
                style={{
                  transition: `transform ease-in-out ${transitionTime}ms`
                }}
                onMouseEnter={() => movieStore.setActive(d)}
                onMouseLeave={() => movieStore.setActive(null)}
              >
                <circle
                  fill='red'
                  cx={0}
                  cy={0}
                  r={active ? radius * 2 : radius}
                />
                <text
                  fontSize={10}
                  x={radius * 2}
                  y={radius / 2}
                  opacity={active ? 1 : 0}
                >
                  {d.title}
                </text>
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
