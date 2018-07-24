import * as React from 'react';
import * as d3Scale from 'd3-scale';
import { Movie } from './data';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScatterWrapper from './ScatterWrapper';
import config from './config';

class ScatterReact extends React.Component<{}, {
  data: Movie[];
}> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      data: [],
    };
  }

  updateData(data: Movie[]) {
    this.setState({data});
  }

  render() {
    const width = config.width;
    const height = config.height;

    const transitionTime = config.transitionTime;
    const scaleRange = Math.min(height, width);
    const radius = config.radius;
    const range = [
      0,
      scaleRange,
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
        <ScatterWrapper
          updateData={this.updateData}
        />
        <svg
          style={{
            overflow: 'visible'
          }}
          height={height}
          width={width}
        >
          <TransitionGroup component="g">
            {this.state.data.map(d => {
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
                    >
                      <circle
                        fill='red'
                        cx={0}
                        cy={0}
                        r={radius}
                      />
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
