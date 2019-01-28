import { ICommittee, ICommitteeMembershipIndex } from './committees';
import { ILegislator, Legislator } from './legislators';
import { ILegislatorSocialMedia } from './SocialMedia';

export * from './committees';
export * from './general';
export * from './legislators';
export * from './SocialMedia';

export interface StateLegislatorsIndex {
  [postal: string]: Legislator[];
}

export interface PartyCountIndex {
  [party: string]: number;
}

export interface ChamberPartyStatsIndex {
  [chamber: string]: PartyCountIndex;
}
// {
//   combined: PartyProportionIndex;
//   house: PartyProportionIndex;
//   senate: PartyProportionIndex;
// }
export interface StatePartyStatsIndex {
  [postal: string]: ChamberPartyStatsIndex;
}

export interface ICongressResources {
  legislators: ILegislator[];
  committees: ICommittee[];
  committeeMembership: ICommitteeMembershipIndex;
  socialMedia: ILegislatorSocialMedia[];
}
