import { ICommittee } from './types';
import { getCommitteeClass } from './types';

export default function createCommittee(committee: ICommittee) {
  const CommitteeClass = getCommitteeClass(committee);

  return new CommitteeClass(committee);
}
