import _ from 'lodash';

enum Party {
  Independent = 'Independent',
  Republican = 'Republican',
  Democrat = 'Democrat',
}

export default Party;

export const ALL_PARTIES = _.values(Party);
