import _ from 'lodash';

const CONGRESS_BASE_URL = 'http://data.mapmyreps.us/congress';

const resourceNameIndex = {
  legislators: 'legislators-current',
  committees: 'committees-current',
  committeeMembership: 'committee-membership-current',
  socialMedia: 'legislators-social-media',
};

export const resourceUrls = _.mapValues(
  resourceNameIndex,
  name => `${CONGRESS_BASE_URL}/${name}.json`
);
