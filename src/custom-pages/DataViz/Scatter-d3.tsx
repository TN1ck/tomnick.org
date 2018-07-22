import * as React from 'react';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import 'd3-transition';
import { Movie, createMockData } from './data';


function scatterD3(root: SVGElement): (data: Movie[]) => any  {
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
  const radius = 5;

  return function update(data: Movie[]) {
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

    const containerClassName = 'd3-g-container';
    const containers = svg.selectAll(`.${containerClassName}`)
      .data(data, (d: Movie) => d.title);

    const transform = (d: Movie) => `translate(${imdbAxis(d.imdb)}, ${rottenAxis(d.rotten)})`;

    const containersEnter = containers
      .enter()
      .append('g')
      .attr('opacity', 0)
      .attr('class', containerClassName)
      .on('mouseover', function() {
        d3Selection.select(this)
          .select('text').attr('opacity', 1);
      })
      .on('mouseout', function() {
        d3Selection.select(this)
          .select('text').attr('opacity', 1);
      });
    containersEnter
      .attr('transform', transform)
        .transition()
        .duration(transitionDuration)
        .attr('opacity', 1);

    // append circle
    containersEnter
      .append('circle')
        .attr('fill', 'red')
        .attr('r', radius)
        .attr('cx', 0)
        .attr('cy', 0);

    // append text
    containersEnter
      .append('text')
      .attr('font-size', '10px')
      .attr('x', radius * 2)
      .attr('y', radius / 2)
      .attr('opacity', 0)
      .attr('pointer-events', 'none')
      .text(d => `${d.title} - ${d.imdb} / ${d.rotten}`)

    containers
      .transition()
      .duration(transitionDuration)
      .attr('transform', transform)
      .attr('opacity', 1)

    containers
      .exit()
      .transition()
      .duration(transitionDuration)
      // .attr('transform', transformCircle)
      .attr('opacity', 0);
  }

}

class ScatterD3 extends React.Component {
  root: SVGElement;
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
        <div>
          <button onClick={this.updateData}>
            {'Update Data'}
          </button>
        </div>
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
