import _ from 'lodash';
import { Chamber } from '../general';
import CommitteeChamber from './CommitteeChamber';
import CommitteeBase, { ICommitteeBase } from './CommitteeBase';
import Subcommittee, { ISubcommittee } from './Subcommittee';

export enum CommitteeParty {
  Majority = 'majority',
  Minority = 'minority',
}

export interface ICommitteeUrls {
  url: string;
  minority_url: string;
  rss_url: string;
  minority_rss_url: string;
}

export interface ICommittee extends ICommitteeBase, ICommitteeUrls {
  type: CommitteeChamber;
  senate_committee_id?: string;
  house_committee_id?: string;
  jurisdiction: string;
  jurisdiction_source: string;
  subcommittees?: ISubcommittee[];
}

export interface ICommitteeMember {
  name: string;
  bioguide: string;
  thomas: string;
  party: CommitteeParty;
  rank: number;
  title: string;
  chamber: Chamber;
}

export interface ICommitteeMember {
  bioguide: string;
  // There are others, but we will only use the bioguideId for now.
}

export interface ICommitteeMembershipIndex {
  [committeeThomasId: string]: ICommitteeMember[];
}

export default class Committee extends CommitteeBase {
  readonly url: string;
  readonly minorityUrl: string;
  readonly rssUrl: string;
  readonly minorityRssUrl: string;

  readonly jurisdiction: string;
  readonly jurisdictionSource: string;

  readonly subcommittees: Subcommittee[];

  constructor(source: ICommittee) {
    super(source);
    this.url = source.url;
    this.minorityUrl = source.minority_url;
    this.rssUrl = source.rss_url;
    this.minorityRssUrl = source.minority_rss_url;

    this.jurisdiction = source.jurisdiction;
    this.jurisdictionSource = source.jurisdiction_source;

    this.subcommittees = _.map(
      source.subcommittees,
      subcommittee => new Subcommittee(subcommittee, this)
    );
  }
}
