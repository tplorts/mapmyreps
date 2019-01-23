import Legislator, { ILegislatorTerm } from './Legislator';

export type District = number;
export const AtLargeDistrict = 0 as District;

export interface IRepresentativeTerm extends ILegislatorTerm {
  district: District;
}

export default class Representative extends Legislator {
  public get title(): string {
    return 'Representative';
  }

  public get presentTerm() {
    return this.getPresentTerm() as IRepresentativeTerm;
  }

  public get district() {
    return this.presentTerm.district;
  }

  public get isRepresentative() {
    return true;
  }

  protected get fecIdPrefix() {
    return 'H';
  }
}
