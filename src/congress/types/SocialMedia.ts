
export interface ISocialMediaInfo {
  twitter?: string;
  twitter_id?: number;
  youtube?: string;
  youtube_id?: string;
  instagram?: string;
  instagram_id?: number;
  facebook?: string;
}

export interface ISocialMediaLegislatorId {
  bioguide: string;
  thomas: string;
  govtrack: number;
}

export interface ILegislatorSocialMedia {
  id: ISocialMediaLegislatorId;
  social: ISocialMediaInfo;
}
