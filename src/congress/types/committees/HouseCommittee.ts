import Committee, { ICommittee } from './Committee';

export default class HouseCommittee extends Committee {
  readonly houseCommitteeId: string;

  constructor(source: ICommittee) {
    super(source);
    this.houseCommitteeId = source.house_committee_id as string;
  }
}
