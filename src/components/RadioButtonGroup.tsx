import React, { PureComponent } from 'react';
import _ from 'lodash';
import { classNames } from '../utilities/styles';
import styles from './RadioButtonGroup.module.scss';

type OptionBase<Value> =
  | Value
  | {
      value: Value;
      label?: string;
      description?: string;
    };
interface Props<Value, Option> {
  options: Option[];
  value: Value;
  onChange: (newValue: Value) => void;
  vertical?: boolean;
}

export default class RadioButtonGroup<
  Value,
  Option extends OptionBase<Value> = OptionBase<Value>
> extends PureComponent<Props<Value, Option>> {
  static defaultProps = {
    vertical: false,
  };

  render = () => (
    <div
      className={classNames([
        styles.root,
        this.props.vertical && styles.vertical,
      ])}
    >
      {_.map(this.props.options, this.renderOption)}
    </div>
  );

  renderOption = (option: Option) => {
    const value = _.get(option, 'value', option) as Value;

    return (
      <div
        key={value.toString()}
        className={classNames([
          styles.option,
          value === this.props.value && styles.selected,
        ])}
        onClick={() => this.props.onChange(value)}
        title={_.get(option, 'description')}
      >
        {_.get(option, 'label', value)}
      </div>
    );
  };
}
