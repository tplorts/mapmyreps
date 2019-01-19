import _ from 'lodash';

export type SocialMedium =
  | 'mail'
  | 'twitter'
  | 'facebook'
  | 'pinterest'
  | 'googleplus';

export const shareMedia: SocialMedium[] = [
  'mail',
  'twitter',
  'facebook',
  'pinterest',
  'googleplus',
];

const mapmyrepsUrl = 'http://mapmyreps.us';
const message =
  'Map My Reps lets you easily see your state’s congressional representatives';

function queryParams(params: object) {
  return _.chain(params)
    .toPairs()
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')
    .value();
}

const shareUrlDict = {
  mail:
    `mailto:?` +
    queryParams({
      subject: 'Check out Map My Reps',
      body: `${message}\n\n${mapmyrepsUrl}`,
    }),
  twitter:
    `https://twitter.com/intent/tweet?` +
    queryParams({
      text: message,
      url: mapmyrepsUrl,
    }),
  facebook:
    `https://www.facebook.com/sharer/sharer.php?` +
    queryParams({
      t: message,
      u: mapmyrepsUrl,
    }),
  pinterest:
    `https://www.pinterest.com/pin/create/button/?` +
    queryParams({
      description: message,
      url: mapmyrepsUrl,
    }),
  googleplus:
    `https://plus.google.com/share?` +
    queryParams({
      url: mapmyrepsUrl,
    }),
};

export const getShareUrl = (medium: SocialMedium) => shareUrlDict[medium];
