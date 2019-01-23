import CommitteeChamber from './CommitteeChamber';
import Committee, { ICommittee } from './Committee';
import HouseCommittee from './HouseCommittee';
import SenateCommittee from './SenateCommittee';
import JointCommittee from './JointCommittee';

const committeeClassIndex = {
  [CommitteeChamber.House]: HouseCommittee,
  [CommitteeChamber.Senate]: SenateCommittee,
  [CommitteeChamber.Joint]: JointCommittee,
};

export function getCommitteeClass(committee: ICommittee) {
  return committeeClassIndex[committee.type] || Committee;
}
