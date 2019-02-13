import _ from 'lodash';
import React, { PureComponent } from 'react';
import { XYSize } from '../geography/types';
import styles from './AutoFitSvg.module.scss';

interface Props {
  initialSize: XYSize;
  preserveAspectRatio?: boolean;
  debounceDelay?: number;
  svgClassName?: string;
  rootClassName?: string;
  onResize?: (newSize: XYSize) => void;
}

interface State {
  width: number;
  height: number;
}

class AutoFitSvg extends PureComponent<Props, State> {
  static defaultProps = {
    preserveAspectRatio: false,
    debounceDelay: 250,
    svgClassName: '',
    rootClassName: '',
  };

  rootElement: HTMLDivElement | null = null;

  state = { ...this.props.initialSize };

  resize = () => {
    if (!this.rootElement) {
      return;
    }

    const { width } = this.rootElement.getBoundingClientRect();
    const onResize = this.props.onResize || _.noop;
    const { initialSize } = this.props;

    const heightScaleFactor = this.props.preserveAspectRatio
      ? width / initialSize.width
      : 1;

    const newSize = {
      width,
      height: initialSize.height * heightScaleFactor,
    };

    this.setState(newSize);
    onResize(newSize);
  };

  resizeDebounced = _.debounce(this.resize, this.props.debounceDelay);

  componentDidMount() {
    window.addEventListener('resize', this.resizeDebounced);
    this.resizeDebounced();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeDebounced);
  }

  setRootElement = (element: HTMLDivElement) => {
    this.rootElement = element;
  };

  render() {
    return (
      <div
        className={[styles.root, this.props.rootClassName].join(' ')}
        style={{ height: this.state.height }}
        ref={this.setRootElement}
      >
        <svg
          width={this.state.width}
          height={this.state.height}
          className={[styles.svg, this.props.svgClassName].join(' ')}
        >
          {this.props.children}
        </svg>
      </div>
    );
  }
}

export default AutoFitSvg;
