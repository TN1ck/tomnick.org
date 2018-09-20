import * as React from 'react';
import { Movie, DATA} from './data';

class ScatterWrapper extends React.PureComponent<{
  updateData: (movies: Movie[]) => any;
}, {
  data: Movie[];
  numberOfFrames: number;
  benchmarkIndex: number;
}> {

  start: number = 0;
  numberOfFrames: number = 0;
  update: any;

  constructor(props: any) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      data: DATA[0].data,
      numberOfFrames: 0,
      benchmarkIndex: 0,
    };
  }

  componentDidMount() {
    this.props.updateData(this.state.data);
  }

  updateData(data: Movie[], benchmarkIndex: number) {
    this.setState({
      data,
      benchmarkIndex,
    });

    const TIME_TO_MEASURE = 1000;
    this.numberOfFrames = 0;
    this.start = performance.now();
    cancelAnimationFrame(this.update);

    const update = () => {
      const now = performance.now();

      this.numberOfFrames += 1;

      if ((now - this.start) >= TIME_TO_MEASURE) {
        this.setState({
          numberOfFrames: this.numberOfFrames,
        })
        return;
      }
      this.update = requestAnimationFrame(update);
    }
    update();

    this.props.updateData(data);
  }

  render() {
    return (
      <div>
        <div>
          {DATA.map((b, i) => {
            const active = i === this.state.benchmarkIndex;
            return (
              <button
                className={active ? "active" : ""}
                key={i}
                onClick={() => this.updateData(b.data, i)}
              >
                {b.name}
              </button>
            )
          })}
        </div>
        <div>{`Number Of Frames: ${Math.ceil(this.state.numberOfFrames)}`}</div>
      </div>
    );
  }
}

export default ScatterWrapper;
