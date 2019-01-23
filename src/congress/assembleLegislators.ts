import _ from 'lodash';
import createCommittee from './createCommittee';
import createLegislator from './createLegislator';
import {
  ICongressResources,
  ILegislator,
  Legislator,
  StateLegislatorsIndex,
} from './types';

export default function assembleLegislators(data: ICongressResources) {
  const committeesByThomasId = _.chain(data.committees)
    .map(createCommittee)
    .keyBy('thomasId')
    .value();

  function getCommitteeById(thomasId: string) {
    const committeeId = thomasId.slice(0, 4);
    const subcommitteeId = thomasId.slice(4);
    const committee = committeesByThomasId[committeeId];
    if (!subcommitteeId) {
      return committee;
    }
    return _.find(committee.subcommittees, { thomasId: subcommitteeId });
  }

  function getCommitteesForMemberships(
    memberships: { memberId: string; committeeId: string }[]
  ) {
    return _.chain(memberships)
      .map(membership => getCommitteeById(membership.committeeId))
      .compact()
      .value();
  }

  const committeeMembersBioguides = _.mapValues(
    data.committeeMembership,
    memberList => _.map(memberList, 'bioguide')
  );

  const committeesPerLegislator = _.chain(committeeMembersBioguides)
    .toPairs()
    .map(([committeeId, memberIds]) =>
      _.map(memberIds, memberId => ({ committeeId, memberId }))
    )
    .flatten()
    .groupBy('memberId')
    .mapValues(getCommitteesForMemberships)
    .value();

  const socialMediaByBioguide = _.chain(data.socialMedia)
    .keyBy('id.bioguide')
    .mapValues('social')
    .value();

  function makeLegislatorFromRaw(legislator: ILegislator) {
    const bioguideId = legislator.id.bioguide;

    return createLegislator(
      legislator,
      committeesPerLegislator[bioguideId],
      socialMediaByBioguide[bioguideId]
    );
  }

  const legislatorsGroupedByState = _.chain(data.legislators)
    .map(makeLegislatorFromRaw)
    .groupBy('presentStatePostalCode')
    .mapValues(sortLegislatorsByDistrict)
    .value();

  return legislatorsGroupedByState as StateLegislatorsIndex;
}

function sortLegislatorsByDistrict(legislators: Legislator[]) {
  return _.orderBy(legislators, ['district'], ['asc']);
}
