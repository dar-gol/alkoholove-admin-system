export const API = 'http://localhost:8008';

export const URL = {
  CATEGORIES: '/admin/alcohols/metadata/categories',
  GET_ALCOHOLS: '/alcohols',
  POST_ALCOHOLS: '/admin/alcohols',
  UPLOAD_IMAGE: '/admin/static',
};

export const CORE_PROPERTY = 'core';
export const BARCODE_PROPERTY = 'barcode';

export const INPUT_TYPE = ['string', 'int', 'double', 'array', 'bool', 'long'];

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
