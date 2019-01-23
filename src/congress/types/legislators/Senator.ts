import Legislator, { ILegislatorTerm } from './Legislator';

export enum SenatorRank {
  Junior = 'junior',
  Senior = 'senior',
}

export interface ISenatorTerm extends ILegislatorTerm {
  class: number;
  state_rank?: SenatorRank;
}

export default class Senator extends Legislator {
  public get title() {
    return 'Senator';
  }

  public get presentTerm() {
    return this.getPresentTerm() as ISenatorTerm;
  }

  public get class() {
    return this.presentTerm.class;
  }

  public get rank() {
    return this.presentTerm.state_rank || null;
  }

  public isSenator() {
    return true;
  }

  protected get fecIdPrefix() {
    return 'S';
  }
}
