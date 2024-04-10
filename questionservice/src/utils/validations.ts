import { Request } from 'express';

/**
 * Validates if the size parameter is present in the request
 * @param req Request to be validated
 */
function validateSizePresent(req: Request) {
  if (!req.query.size) {
    throw new Error(
      'You need to provide a size for questions to be generated!'
    );
  }
}

/**
 * Validates if the field is a number
 * @param field Field to be validated
 * @returns The field as a number
 */
function validateNumber(field: string) {
  const size = parseInt(field, 10);
  // Checking parameter is a number
  if (isNaN(size)) {
    throw new Error('The size parameter must be a number');
  }
  return size;
}

/**
 * Validates if the language field to translate is accepted.
 * @param field Field to be validated
 */
function validateLanguage(field: string) {
  /*
  The possible values are hardcoded instead of calling the endpoint /languages that return
  the accepted languages in order to minimize API costs and also for performance.
  */
  const acceptedLanguages = [
    'af',
    'am',
    'ar',
    'as',
    'az',
    'ba',
    'bg',
    'bho',
    'bn',
    'bo',
    'brx',
    'bs',
    'ca',
    'cs',
    'cy',
    'da',
    'de',
    'doi',
    'dsb',
    'dv',
    'el',
    'en',
    'es',
    'et',
    'eu',
    'fa',
    'fi',
    'fil',
    'fj',
    'fo',
    'fr',
    'fr-CA',
    'ga',
    'gl',
    'gom',
    'gu',
    'ha',
    'he',
    'hi',
    'hne',
    'hr',
    'hsb',
    'ht',
    'hu',
    'hy',
    'id',
    'ig',
    'ikt',
    'is',
    'it',
    'iu',
    'iu-Latn',
    'ja',
    'ka',
    'kk',
    'km',
    'kmr',
    'kn',
    'ko',
    'ks',
    'ku',
    'ky',
    'ln',
    'lo',
    'lt',
    'lug',
    'lv',
    'lzh',
    'mai',
    'mg',
    'mi',
    'mk',
    'ml',
    'mn-Cyrl',
    'mn-Mong',
    'mni',
    'mr',
    'ms',
    'mt',
    'mww',
    'my',
    'nb',
    'ne',
    'nl',
    'nso',
    'nya',
    'or',
    'otq',
    'pa',
    'pl',
    'prs',
    'ps',
    'pt',
    'pt-PT',
    'ro',
    'ru',
    'run',
    'rw',
    'sd',
    'si',
    'sk',
    'sl',
    'sm',
    'sn',
    'so',
    'sq',
    'sr-Cyrl',
    'sr-Latn',
    'st',
    'sv',
    'sw',
    'ta',
    'te',
    'th',
    'ti',
    'tk',
    'tlh-Latn',
    'tlh-Piqd',
    'tn',
    'to',
    'tr',
    'tt',
    'ty',
    'ug',
    'uk',
    'ur',
    'uz',
    'vi',
    'xh',
    'yo',
    'yua',
    'yue',
    'zh-Hans',
    'zh-Hant',
    'zu',
  ];

  if (!acceptedLanguages.includes(field)) {
    throw new Error('The provided language is not supported');
  }
}

export { validateNumber, validateSizePresent, validateLanguage };
