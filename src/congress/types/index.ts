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

export interface ICongressResources {
  legislators: ILegislator[];
  committees: ICommittee[];
  committeeMembership: ICommitteeMembershipIndex;
  socialMedia: ILegislatorSocialMedia[];
}
