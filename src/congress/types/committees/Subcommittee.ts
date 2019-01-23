import CommitteeBase, { ICommitteeBase } from './CommitteeBase';
import Committee from './Committee';

export interface ISubcommittee extends ICommitteeBase {}

export default class Subcommittee extends CommitteeBase {
  readonly parent: Committee;

  constructor(source: ISubcommittee, parent: Committee) {
    super(source);
    this.parent = parent;
  }

  public get displayName(): string {
    return `Subcommittee on ${this.name}`;
  }

  public isSubcommittee() {
    return true;
  }

  public get parentThomasId() {
    return this.parent.thomasId;
  }
}
