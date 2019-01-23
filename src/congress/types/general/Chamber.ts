import { LegislatorType } from '../legislators';

enum Chamber {
  House = 'house',
  Senate = 'senate',
}

export default Chamber;

const chamberIndex = {
  [LegislatorType.Representative]: Chamber.House,
  [LegislatorType.Senator]: Chamber.Senate,
};

export function getChamberForLegislatorType(legislatorType: LegislatorType) {
  return chamberIndex[legislatorType];
}
