import _ from 'lodash';
import {
  CommitteeBase,
  getLegislatorClassForTerm,
  ILegislator,
  ISocialMediaInfo,
} from './types';

export default function createLegislator(
  legislator: ILegislator,
  committees: CommitteeBase[],
  socialMedia?: ISocialMediaInfo
) {
  const LegislatorClass = getLegislatorClassForTerm(_.last(legislator.terms));

  return new LegislatorClass(legislator, committees, socialMedia);
}
