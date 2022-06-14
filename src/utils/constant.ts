export const API =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8008'
    : 'https://api-alkoholove.herokuapp.com';

export const URL = {
  CATEGORIES: '/admin/alcohols/metadata/categories',
  SEARCH_ALCOHOLS: '/admin/alcohols/search',
  GET_ALCOHOL: '/alcohols',
  POST_ALCOHOLS: '/admin/alcohols',
  UPLOAD_IMAGE: '/admin/image',
  USERS: '/admin/users',
  ERRORS: '/admin/errors',
  ME: '/me',
  GET_SUGGESTIONS: '/admin/suggestions',
  GET_TOTAL_SUGGESTIONS: '/admin/suggestions/total',
  GET_IMAGE: `https://res.cloudinary.com/alkoholove/${
    process.env.NODE_ENV === 'development' ? 'test' : 'alcohols'
  }`,
};

export const CORE_PROPERTY = 'core';
export const BARCODE_PROPERTY = 'barcode';

export const INPUT_TYPE = ['string', 'int', 'double', 'array', 'bool', 'long'];

export const INPUT_CATEGORY = [
  {
    label: 'Pole tekstowe',
    value: 'string',
  },
  {
    label: 'Pole numeryczny',
    value: 'int',
  },
  {
    label: 'Pole numeryczne (do drugiego miejsca po przecinku)',
    value: 'double',
  },
  {
    label: 'Pole typu "lista"',
    value: 'array',
  },
  {
    label: 'Pole TAK/NIE',
    value: 'bool',
  },
];

export const INPUT_LABEL = {
  string: 'Pole tekstowe',
  int: 'Pole numeryczny',
  double: 'Pole numeryczne (do drugiego miejsca po przecinku)',
  array: 'Pole typu "lista"',
  bool: 'Pole TAK/NIE',
  long: 'Pole numeryczny',
};

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 408,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};
