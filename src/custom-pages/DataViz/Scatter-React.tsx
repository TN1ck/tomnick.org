import * as React from 'react';
import * as d3Scale from 'd3-scale';
import { Movie } from './data';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScatterWrapper from './ScatterWrapper';
import config from './config';

class ScatterReact extends React.PureComponent<{}, {
  data: Movie[];
  width: number;
  height: number;
}> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.setRef = this.setRef.bind(this);
    this.state = {
      data: [],
      width: 1,
      height: 1,
    };
  }

  setRef(dom: SVGElement) {
    if (!dom) {
      return;
    }
    const height = dom.clientHeight;
    const width = dom.clientWidth;
    this.setState({
      height,
      width
    });
  }

  updateData(data: Movie[]) {
    this.setState({data});
  }

  render() {

    const width = this.state.width;
    const height = this.state.height;

    const transitionTime = config.transitionTime;
    const radius = config.radius;
    const rangeRotten = [
      0,
      height,
    ];
    const rangeImdb = [
      0,
      width,
    ]

    const rottenRatings = this.state.data.map(d => d.rotten);
    const rottenMin = Math.min(...rottenRatings);
    const rottenMax = Math.max(...rottenRatings);

    const rottenAxis = d3Scale.scaleLinear()
      .domain([rottenMin, rottenMax])
      .range(rangeRotten);

    const imdbRatings = this.state.data.map(d => d.imdb);
    const imdbMin = Math.min(...imdbRatings);
    const imdbMax = Math.max(...imdbRatings);

    const imdbAxis = d3Scale.scaleLinear()
      .domain([imdbMin, imdbMax])
      .range(rangeImdb);

    return (
      <div className="scatter-chart-container">
        <ScatterWrapper
          updateData={this.updateData}
        />
        <svg
          className="scatter-chart"
          ref={this.setRef}
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
                  <circle
                    cx={0}
                    cy={0}
                    r={radius}
                    style={{
                      transitionDuration: config.transitionTime + 'ms',
                      transitionTimingFunction: 'ease-in-out',
                      transitionProperty: 'transform, opacity',
                      transform: `translate3d(${imdbAxis(d.imdb)}px, ${rottenAxis(d.rotten)}px, 0)`,
                    }}
                  />
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
