import React, { PureComponent } from 'react';
import { connect, DispatchProp, MapDispatchToProps } from 'react-redux';
import * as Root from '../../../rootTypes';
import styles from './Panel.module.scss';
import * as actions from './actions';
import * as selectors from './selectors';
import { RadioButtonGroup } from '../../../components';
import { ColoringChamber } from './types';

interface ColoringChamberOption {
  value: ColoringChamber;
  label: string;
  description?: string;
}

const coloringChamberOptions: ColoringChamberOption[] = [
  {
    value: 'combined',
    label: 'Both Combined',
    description:
      'Senators & Representatives of each state are grouped together and each seat’s party counts equally toward calculating the blended fill color of the state.',
  },
  { value: 'senate', label: 'Senate' },
  { value: 'house', label: 'House' },
];

const colorSpaceOptions = [
  'rgb',
  'lrgb',
  // 'rgba',
  'hsl',
  'hsv',
  'hsi',
  'lab',
  'lch',
  'hcl',
  'cmyk',
  'gl',
];

const mapStateToProps = (root: Root.State) => ({
  colorSpace: selectors.getColorSpace(root),
  chamber: selectors.getColoringChamber(root),
});

type Props = ReturnType<typeof mapStateToProps> & DispatchProp;

class SettingsPanel extends PureComponent<Props> {
  onSetColoringChamber = (chamber: ColoringChamber) => {
    this.props.dispatch(actions.setColoringChamber(chamber));
  };

  onSetColorSpace = (space: string) => {
    this.props.dispatch(actions.setColorSpace(space));
  };

  render = () => (
    <div className={styles.root}>
      <div className={styles.field}>
        <p>Chamber to use for state color calculation:</p>
        <RadioButtonGroup
          options={coloringChamberOptions}
          value={this.props.chamber}
          onChange={this.onSetColoringChamber}
        />
      </div>
      <div className={styles.field}>
        <p>Color space used in color blending:</p>
        <RadioButtonGroup
          options={colorSpaceOptions}
          value={this.props.colorSpace}
          onChange={this.onSetColorSpace}
        />
      </div>
    </div>
  );
}

const reduxConnected = connect(mapStateToProps);

export default reduxConnected(SettingsPanel);
