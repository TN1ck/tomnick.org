import * as React from 'react';
import * as d3Scale from 'd3-scale';
import { Movie, createMockData } from './data';

class ScatterReact extends React.Component<{}, {
  data: Movie[];
}> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      data: createMockData(),
    }
  }

  updateData() {
    const newData = createMockData()
    this.setState({
      data: newData,
    });
  }

  render() {

    const width = 400;
    const height = 400;
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
          {this.state.data.map(d => {
            return (
              <g
                transform={`translate(${imdbAxis(d.imdb)}, ${rottenAxis(d.rotten)})`}
                key={d.title}
              >
                <circle
                  fill='red'
                  cx={0}
                  cy={0}
                  r={radius}
                />
                <text>
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

export default ScatterReact;
