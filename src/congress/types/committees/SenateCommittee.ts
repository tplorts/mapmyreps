import Committee, { ICommittee } from './Committee';

export default class SenateCommittee extends Committee {
  readonly senateCommitteeId: string;

  constructor(source: ICommittee) {
    super(source);
    this.senateCommitteeId = source.senate_committee_id as string;
  }
}
