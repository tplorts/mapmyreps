import _ from 'lodash';
import {
  Chamber,
  getChamberForLegislatorType,
  Gender,
  Gendernyms,
  DatePeriod,
  DateString,
  Party,
} from '../general';
import { ISocialMediaInfo } from '../SocialMedia';
import { Committee, CommitteeBase, Subcommittee } from '../committees';
import LegislatorType from './LegislatorType';

export interface ILegislator {
  id: ILegislatorId;
  name: ILegislatorName;
  other_names?: ILegislatorAlternativeName[];
  bio: ILegislatorBio;
  terms: ILegislatorTerm[];
  leadership_roles?: ILegislatorLeadershipRole[];
}

export interface ILegislatorId {
  bioguide: string;
  thomas: string;
  lis: string;
  govtrack: number;
  opensecrets: string;
  votesmart: number;
  fec: string[];
  cspan: number;
  wikipedia: string;
  house_history: number;
  ballotpedia: string;
  maplight: number;
  icpsr: number;
  wikidata: string;
  google_entity_id: string;
  bioguide_previous?: string[];
}

export interface ILegislatorName {
  last?: string;
  first?: string;
  middle?: string;
  suffix?: string;
  nickname?: string;
  official_full?: string;
}

export interface ILegislatorAlternativeName
  extends ILegislatorName,
    DatePeriod {}

export interface ILegislatorBio {
  birthday: DateString;
  gender: Gender;
  religion: string;
}

export interface ILegislatorTerm extends DatePeriod {
  type: LegislatorType;
  state: string; // 2-letter postal code
  party: Party;
  caucus?: Party;
  party_affiliations?: IPartyAffiliation[];
  url?: string;
  address?: string;
  phone?: string;
  fax?: string;
  contact_form?: string;
  office?: string;
  rss_url?: string;
}

export interface IPartyAffiliation extends DatePeriod {
  party: Party;
}

export interface ILegislatorLeadershipRole extends DatePeriod {
  title: string;
  chamber: Chamber;
}

const SOCIAL_MEDIA_TYPES = [
  { name: 'twitter', urlGetter: 'twitterUrl' },
  { name: 'facebook', urlGetter: 'facebookUrl' },
  { name: 'youtube', urlGetter: 'youtubeChannelUrl' },
  { name: 'instagram', urlGetter: 'instagramUrl' },
];

const EXTERNAL_LINK_TYPES = [
  { label: 'Official Website', urlGetter: 'mainUrl' },
  { label: 'Congress Bioguide', urlGetter: 'bioguideUrl' },
  { label: 'GovTrack', urlGetter: 'govtrackUrl' },
  { label: 'OpenSecrets', urlGetter: 'opensecretsUrl' },
  { label: 'VoteSmart', urlGetter: 'votesmartUrl' },
  { label: 'Federal Election Commission', urlGetter: 'fecUrl' },
  { label: 'C-SPAN', urlGetter: 'cspanUrl' },
  { label: 'Wikipedia', urlGetter: 'wikipediaUrl' },
  { label: 'Ballotpedia', urlGetter: 'ballotpediaUrl' },
  { label: 'MapLight', urlGetter: 'maplightUrl' },
  { label: 'Wikidata', urlGetter: 'wikidataUrl' },
];

const PUNCTUATION_REGEX = /[.,\/#!$%\^&\*;:{}=\-_'"`~()]/g;

interface SubcommitteeIndex {
  [committeeThomasId: string]: Subcommittee[];
}

export default class Legislator {
  readonly identifiers: ILegislatorId;
  readonly name: ILegislatorName;
  readonly otherNames?: ILegislatorAlternativeName[];
  readonly bio: ILegislatorBio;
  readonly terms: ILegislatorTerm[];
  readonly leadershipRoles?: ILegislatorLeadershipRole[];
  readonly socialMedia: ISocialMediaInfo;
  readonly presentStatePostalCode: string;

  readonly committees: Committee[];
  readonly subcommittees: SubcommitteeIndex;

  constructor(
    source: ILegislator,
    committees: CommitteeBase[],
    socialMedia?: ISocialMediaInfo
  ) {
    this.identifiers = source.id;
    this.name = source.name;
    this.otherNames = source.other_names;
    this.bio = source.bio;
    this.leadershipRoles = source.leadership_roles;
    this.socialMedia = socialMedia || {};
    this.terms = source.terms;
    this.presentStatePostalCode = _.toLower(this.presentTerm.state);

    this.committees = _.filter(
      committees,
      committee => !committee.isSubcommittee()
    ) as Committee[];

    this.subcommittees = _.chain(committees)
      .filter(committee => committee.isSubcommittee())
      .groupBy('parentThomasId')
      .value() as SubcommitteeIndex;
  }

  public get bioguideId() {
    return this.identifiers.bioguide;
  }

  protected getPresentTerm() {
    return _.last(this.terms) as ILegislatorTerm;
  }

  public get presentTerm() {
    return this.getPresentTerm();
  }

  public get imageUrl() {
    const imageSize = '225x275';
    const { bioguide } = this.identifiers;
    return `https://theunitedstates.io/images/congress/${imageSize}/${bioguide}.jpg`;
  }

  protected constructFullName() {
    return _.chain(['first', 'middle', 'last'])
      .map(part => _.get(this.name, part))
      .compact()
      .join(' ')
      .value();
  }

  public get fullName() {
    return this.name.official_full || this.constructFullName();
  }

  public get title() {
    const gendernym = Gendernyms[this.bio.gender] || 'person';
    return `Congress${gendernym}`;
  }

  public get titleName() {
    return `${this.title} ${this.fullName}`;
  }

  public get urlSegment() {
    const urlName = this.fullName
      .replace(PUNCTUATION_REGEX, ' ')
      .trim()
      .replace(/\s+/g, '-');
    return `${this.bioguideId}-${urlName}`;
  }

  public get party() {
    return this.presentTerm.party;
  }

  public get mainUrl() {
    return this.presentTerm.url;
  }

  public get phone() {
    return this.presentTerm.phone;
  }

  public get office() {
    return this.presentTerm.office;
  }

  public get chamber() {
    return getChamberForLegislatorType(this.presentTerm.type);
  }

  public get district() {
    // used when sorting all legislators on the state detail view
    // so that senators will be placed at the beginning of the list
    return -1;
  }

  public isSenator() {
    return false;
  }

  public isRepresentative() {
    return false;
  }

  public get partyStyleClass() {
    return `party-${this.party.toLowerCase()}`;
  }

  public get availableSocialMedia() {
    return _.chain(SOCIAL_MEDIA_TYPES)
      .map(medium => ({
        name: medium.name,
        url: _.get(this, medium.urlGetter),
      }))
      .filter('url')
      .value();
  }

  public get availableExternalLinks() {
    return _.chain(EXTERNAL_LINK_TYPES)
      .map(link => ({
        label: link.label,
        url: _.get(this, link.urlGetter),
      }))
      .filter('url')
      .value();
  }

  public get twitterUrl() {
    const twitter = this.socialMedia.twitter;
    return twitter ? `https://twitter.com/${twitter}` : null;
  }

  public get youtubeUserUrl() {
    const user = this.socialMedia.youtube;
    return user ? `https://youtube.com/user/${user}` : null;
  }

  public get youtubeChannelUrl() {
    const channel = this.socialMedia.youtube_id;
    return channel ? `https://youtube.com/channel/${channel}` : null;
  }

  public get instagramUrl() {
    const insta = this.socialMedia.instagram;
    return insta ? `https://instagram.com/${insta}` : null;
  }

  public get facebookUrl() {
    const fb = this.socialMedia.facebook;
    return fb ? `https://facebook.com/${fb}` : null;
  }

  public get bioguideUrl() {
    const { bioguide } = this.identifiers;
    return (
      bioguide &&
      `http://bioguide.congress.gov/scripts/biodisplay.pl?index=${bioguide}`
    );
  }

  public get govtrackUrl() {
    const { govtrack } = this.identifiers;
    return govtrack && `https://www.govtrack.us/congress/members/${govtrack}`;
  }

  public get opensecretsUrl() {
    const { opensecrets } = this.identifiers;
    return (
      opensecrets &&
      `https://www.opensecrets.org/members-of-congress/summary/?cid=${opensecrets}`
    );
  }

  public get votesmartUrl() {
    const { votesmart } = this.identifiers;
    return votesmart && `https://votesmart.org/candidate/${votesmart}`;
  }

  public get fecUrl() {
    const { fec: fecIds } = this.identifiers;
    const fec = fecIds.find(fecId => fecId.startsWith(this.fecIdPrefix));
    return fec && `https://www.fec.gov/data/candidate/${fec}/`;
  }

  protected get fecIdPrefix() {
    return '';
  }

  public get cspanUrl() {
    const { cspan } = this.identifiers;
    return cspan && `https://www.c-span.org/person/?${cspan}`;
  }

  public get wikipediaUrl() {
    const { wikipedia } = this.identifiers;
    return wikipedia && `https://wikipedia.org/wiki/${wikipedia}`;
  }

  public get ballotpediaUrl() {
    const { ballotpedia } = this.identifiers;
    return ballotpedia && `https://ballotpedia.org/${ballotpedia}`;
  }

  public get maplightUrl() {
    const { maplight } = this.identifiers;
    const newPrefix = 'http://maplight.org/data/passthrough/#legacyurl=';
    return (
      maplight &&
      `${newPrefix}http://classic.maplight.org/us-congress/legislator/${maplight}`
    );
  }

  public get wikidataUrl() {
    const { wikidata } = this.identifiers;
    return wikidata && `https://www.wikidata.org/wiki/${wikidata}`;
  }
}
