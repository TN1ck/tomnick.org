import * as React from 'react';
import * as d3Scale from 'd3-scale';
import { Movie, createMockData } from './data';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class ScatterReact extends React.Component<{}, {
  data: Movie[];
  numberOfPoints: number;
  active: Movie;
}> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.setNumberOfPoints = this.setNumberOfPoints.bind(this);
    const numberOfPoints = 100;
    this.state = {
      data: createMockData(numberOfPoints),
      active: null,
      numberOfPoints,
    }
  }

  setNumberOfPoints(e: any) {
    const numberOfPoints = parseInt(e.target.value);
    const data = createMockData(numberOfPoints);
    this.setState({
      data,
      numberOfPoints,
    });
  }

  updateData() {
    const newData = createMockData(this.state.numberOfPoints)
    this.setState({
      data: newData,
    });
  }

  onMouseEnter(movie: Movie) {
    this.setState({
      active: movie,
    });
  }

  onMouseLeave() {
    this.setState({
      active: null,
    });
  }

  render() {

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

    const rottenRatings = this.state.data.map(d => d.rotten);
    const rottenMin = Math.min(...rottenRatings);
    const rottenMax = Math.max(...rottenRatings);

    const rottenAxis = d3Scale.scaleLinear()
      .domain([rottenMin, rottenMax])
      .range([...range].reverse());

    const imdbRatings = this.state.data.map(d => d.imdb);
    const imdbMin = Math.min(...imdbRatings);
    const imdbMax = Math.max(...imdbRatings);

    const imdbAxis = d3Scale.scaleLinear()
      .domain([imdbMin, imdbMax])
      .range(range);

    return (
      <div>
        <div>
          <button onClick={this.updateData}>
            {'Update Data'}
          </button>
          <input
            type="range"
            min={1}
            max={500}
            step={10}
            value={this.state.numberOfPoints}
            onChange={this.setNumberOfPoints}
          />
          {this.state.numberOfPoints}
        </div>
        <svg
          style={{
            overflow: 'visible'
          }}
          height={height}
          width={width}
        >
          <TransitionGroup component="g">
            {this.state.data.map(d => {
              const active = this.state.active ? this.state.active.title === d.title : null;
              return (
                <CSSTransition
                  component={'g'}
                  timeout={transitionTime}
                  classNames='fade'
                  key={d.title}
                >
                  <g>
                    <g
                      transform={`translate(${imdbAxis(d.imdb)}, ${rottenAxis(d.rotten)})`}
                      style={{
                        transition: `transform ease-in-out ${transitionTime}ms`
                      }}
                      onMouseEnter={() => this.onMouseEnter(d)}
                      onMouseLeave={() => this.onMouseLeave()}
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
                  </g>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </svg>
      </div>
    );
  }
}

export default ScatterReact;
