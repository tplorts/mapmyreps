import _ from 'lodash';
import LegislatorType from './LegislatorType';
import Legislator, { ILegislatorTerm } from './Legislator';
import Representative from './Representative';
import Senator from './Senator';

type LegislatorClass =
  | typeof Legislator
  | typeof Representative
  | typeof Senator;

const legislatorClassIndex: { [key: string]: LegislatorClass } = {
  [LegislatorType.Representative]: Representative,
  [LegislatorType.Senator]: Senator,
};

export function getLegislatorClassForTerm(term?: ILegislatorTerm) {
  const legislatorType = term ? term.type : 'unknown';
  return legislatorClassIndex[legislatorType] || Legislator;
}
