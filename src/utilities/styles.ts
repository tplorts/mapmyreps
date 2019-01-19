import _ from 'lodash';

export function classNames(styleList: any[]) {
  return _.chain(styleList)
    .compact()
    .join(' ')
    .value();
}