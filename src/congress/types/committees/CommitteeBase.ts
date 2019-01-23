export interface ICommitteeBase {
  name: string;
  thomas_id: string;
  address: string;
  phone: string;
}

export default class CommitteeBase {
  readonly name: string;
  readonly thomasId: string;
  readonly address: string;
  readonly phone: string;

  constructor(source: ICommitteeBase) {
    this.name = source.name;
    this.thomasId = source.thomas_id;
    this.address = source.address;
    this.phone = source.phone;
  }

  public get displayName(): string {
    return `(${this.thomasId}) ${this.name}`;
  }

  public isSubcommittee() {
    return false;
  }
}
