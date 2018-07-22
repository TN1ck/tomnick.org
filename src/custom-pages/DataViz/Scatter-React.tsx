import * as React from 'react';
import * as d3Scale from 'd3-scale';
import { Movie, createMockData } from './data';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class ScatterReact extends React.Component<{}, {
  data: Movie[];
  active: Movie;
}> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      data: createMockData(),
      active: null,
    }
  }

  updateData() {
    const newData = createMockData()
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
