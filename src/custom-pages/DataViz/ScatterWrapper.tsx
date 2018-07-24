import * as React from 'react';
import { Movie, createMockData } from './data';

class FPSMeasure extends React.Component<{}, {
  fps: number;
}> {
  lastUpdate: number = performance.now();
  constructor(props) {
    super(props);
    this.state = {
      fps: 0,
    };
  }
  componentDidMount() {
    const update = () => {
      const now = performance.now();
      const diff = now - this.lastUpdate;
      const fps = 1000 / diff;
      this.lastUpdate = now;
      this.setState({
        fps,
      });
      requestAnimationFrame(update);
    }
    update();
  }
  render() {
    return (
      <div>{`FPS ${Math.ceil(this.state.fps)}`}</div>
    )
  }
}

class ScatterWrapper extends React.Component<{
  updateData: (movies: Movie[]) => any;
}, {
  numberOfPoints: number;
  data: Movie[];
}> {
  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.setNumberOfPoints = this.setNumberOfPoints.bind(this);
    const numberOfPoints = 100;
    this.state = {
      data: createMockData(numberOfPoints),
      numberOfPoints,
    };
  }

  componentDidMount() {
    this.props.updateData(this.state.data);
  }

  updateData() {
    const data = createMockData(this.state.numberOfPoints)
    this.setState({
      data,
    });
    this.props.updateData(data);
  }

  setNumberOfPoints(e: any) {
    const numberOfPoints = parseInt(e.target.value);
    this.setState({
      numberOfPoints,
    });
  }

  render() {
    return (
      <div>
        <FPSMeasure />
        <div>
          <button onClick={this.updateData}>
            {'Update Data'}
          </button>
          <input
            type="range"
            min={1}
            max={2000}
            step={10}
            value={this.state.numberOfPoints}
            onChange={this.setNumberOfPoints}
          />
          {this.state.numberOfPoints}
        </div>
        <div>
          {`Currently using ${this.state.data.length} points`}
        </div>
      </div>
    );
  }
}

export default ScatterWrapper;
