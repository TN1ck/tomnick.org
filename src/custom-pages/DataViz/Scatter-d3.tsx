import * as React from 'react';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import 'd3-transition';
import { Movie, createMockData } from './data';


function scatterD3(root: HTMLElement): (data: Movie[]) => any  {
  const svg = d3Selection.select(root);

  const height = root.clientHeight;
  const width = root.clientWidth;
  const scaleRange = Math.min(height, width);
  const margins = {
    left: 10,
    right: 10,
  };

  const range = [margins.left, scaleRange - (margins.left + margins.right)];

  const transitionDuration = 1000;

  return function update(data: Movie[]) {
    const rottenRatings = data.map(d => d.rotten);
    const rottenMin = Math.min(...rottenRatings);
    const rottenMax = Math.max(...rottenRatings);

    const rottenAxis = d3Scale.scaleLinear()
      .domain([rottenMin, rottenMax])
      .range(range);

    const imdbRatings = data.map(d => d.imdb);
    const imdbMin = Math.min(...imdbRatings);
    const imdbMax = Math.max(...imdbRatings);

    const imdbAxis = d3Scale.scaleLinear()
      .domain([imdbMin, imdbMax])
      .range(range);

    const circleClassName = 'd3-circle';
    const circles = svg.selectAll(`.${circleClassName}`)
      .data(data, (d: Movie) => d.title);

    const transformCircle = (d: Movie) => `translate(${imdbAxis(d.imdb)}, ${rottenAxis(d.rotten)})`;

    circles.enter()
      .append('circle')
      .attr('class', circleClassName)
      .attr('fill', 'red')
      .attr('r', 5)
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

class ScatterD3 extends React.Component {
  root: HTMLElement;
  data: Movie[];
  updateFn: (movies: Movie[]) => any;
  constructor(props: any) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.updateData = this.updateData.bind(this);
    this.data = createMockData();
  }

  updateData() {
    const newData = createMockData()
    this.setState({
      data: newData,
    });
    this.updateFn(newData);
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
      <div>
        <button onClick={this.updateData}>
          {'Update Data'}
        </button>
        <svg
          height={400}
          width={400}
          ref={this.setRef}
        />
      </div>
    );
  }
}

export default ScatterD3;
