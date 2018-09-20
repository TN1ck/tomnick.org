import * as React from 'react';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import 'd3-transition';
import { Movie, createMockData } from './data';
import ScatterWrapper from './ScatterWrapper';
import config from './config';


function scatterD3(root: SVGElement): (data: Movie[]) => any  {
  if (!root) {
    return;
  }
  const svg = d3Selection.select(root);
  const height = root.clientHeight;
  const width = root.clientWidth;

  const rottenRange = [0, height];
  const imdbRange = [0, width];

  const transitionDuration = config.transitionTime;

  return function update(data: Movie[]) {
    const rottenRatings = data.map(d => d.rotten);
    const rottenMin = Math.min(...rottenRatings);
    const rottenMax = Math.max(...rottenRatings);

    const rottenAxis = d3Scale.scaleLinear()
      .domain([rottenMin, rottenMax])
      .range(rottenRange);

    const imdbRatings = data.map(d => d.imdb);
    const imdbMin = Math.min(...imdbRatings);
    const imdbMax = Math.max(...imdbRatings);

    const imdbAxis = d3Scale.scaleLinear()
      .domain([imdbMin, imdbMax])
      .range(imdbRange);

    const circleClassName = 'd3-circle';
    const circles = svg.selectAll(`.${circleClassName}`)
      .data(data, (d: Movie) => d.title);

    const transformCircle = (d: Movie) => `translate(${imdbAxis(d.imdb)}, ${rottenAxis(d.rotten)})`;

    circles.enter()
      .append('circle')
      .attr('class', circleClassName)
      .attr('r', config.radius)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('opacity', 0)
      .attr('transform', transformCircle)
        .transition()
        .duration(transitionDuration)
        .attr('opacity', 1);

    circles
      .transition()
      .duration(transitionDuration)
      .attr('transform', transformCircle)
      .attr('opacity', 1)

    circles
      .exit()
      .transition()
      .duration(transitionDuration)
      // .attr('transform', transformCircle)
      .attr('opacity', 0);
  }

}

class ScatterD3 extends React.PureComponent<{}, {
  data: Movie[];
  numberOfPoints: number;
}> {
  data: Movie[];
  root: SVGElement;
  updateFn: (movies: Movie[]) => any;
  constructor(props: any) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.updateData = this.updateData.bind(this);
    const numberOfPoints = 100;
    this.state = {
      data: createMockData(numberOfPoints),
      numberOfPoints,
    };
  }

  updateData(data: Movie[]) {
    if (this.updateFn) {
      this.updateFn(data);
    } else {
      this.data = data;
    }
  }

  setRef(dom: any) {
    this.root = dom;
  }

  componentDidMount() {
    this.updateFn = scatterD3(this.root);
    this.updateFn(this.data);
  }

  render() {
    return (
      <div className="scatter-chart-container">
        <ScatterWrapper updateData={this.updateData} />
        <svg
          style={{
            overflow: 'visible'
          }}
          ref={this.setRef}
          className="scatter-chart"
        />
      </div>
    );
  }
}

export default ScatterD3;
