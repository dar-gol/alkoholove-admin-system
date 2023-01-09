import { isProduction } from "./utils";

export const API = !isProduction()
  ? "http://localhost:8008"
  : "https://api-alkoholove.herokuapp.com";

// export const API = "https://api-alkoholove.herokuapp.com";

export const URL = {
  LOGIN: "/auth/token/admin",
  LOGOUT: "/auth/logout",
  GET_CATEGORIES: "/alcohols/metadata/categories",
  POST_CATEGORIES: "/admin/alcohols/metadata/categories",
  SEARCH_ALCOHOLS: "/admin/alcohols/search",
  GET_ALCOHOL: "/alcohols",
  POST_ALCOHOLS: "/admin/alcohols",
  UPLOAD_IMAGE: "/admin/image",
  USERS: "/admin/users",
  ERRORS: "/admin/errors",
  REPORTED_REVIEW: "/admin/reviews",
  ME: "/me",
  GET_SUGGESTIONS: "/admin/suggestions",
  GET_TOTAL_SUGGESTIONS: "/admin/suggestions/total",
  GET_IMAGE: `https://res.cloudinary.com/alkoholove/${
    !isProduction() ? "test" : "alcohols"
  }`,
};

export const NAME_PATH = {
  home: "Panel główny",
  alcohol: "Alkohole",
  category: "Kategorie alkoholu",
  user: "Użytkownicy",
  suggestion: "Sugestie użytkowników",
  error: "Zgłoszone błędy",
  reportedReview: "Zgłoszone komentarze",
  add: "Formularz",
  edit: "Formularz",
};

export const CORE_PROPERTY = "core";
export const BARCODE_PROPERTY = "barcode";

export const INPUT_TYPE = ["string", "int", "double", "array", "bool", "long"];

export const INPUT_CATEGORY = [
  {
    label: "Pole tekstowe",
    value: "string",
  },
  {
    label: "Pole numeryczny",
    value: "int",
  },
  {
    label: "Pole numeryczne (do drugiego miejsca po przecinku)",
    value: "double",
  },
  {
    label: 'Pole typu "lista"',
    value: "array",
  },
  {
    label: "Pole TAK/NIE",
    value: "bool",
  },
];

export const INPUT_LABEL = {
  string: "Pole tekstowe",
  int: "Pole numeryczny",
  double: "Pole numeryczne (do drugiego miejsca po przecinku)",
  array: 'Pole typu "lista"',
  bool: "Pole TAK/NIE",
  long: "Pole numeryczny",
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

export const WEEK_USER_ALCOHOLS = 13;

export const USER_ALCOHOLS_STATE = [
  "Musisz postarać się bardziej!",
  "Masz do wprowadzenia kilka alkoholi.",
  "Dobra robota!",
  "Gratulację!",
];

export const CORE = [
  {
    name: "barcode",
    display_name: "Kod kreskowy",
  },
  {
    name: "name",
    display_name: "Nazwa",
  },
  {
    name: "kind",
    display_name: "Rodzaj",
  },
  {
    name: "type",
    display_name: "Typ",
  },
  {
    name: "alcohol_by_volume",
    display_name: "Zawartość alkoholu",
  },
  {
    name: "description",
    display_name: "Opis",
  },
  {
    name: "color",
    display_name: "Kolor",
  },
  {
    name: "manufacturer",
    display_name: "Producent",
  },
  {
    name: "country",
    display_name: "Kraj",
  },
  {
    name: "region",
    display_name: "Region",
  },
  {
    name: "food",
    display_name: "Jedzenie",
  },
  {
    name: "finish",
    display_name: "Finisz",
  },
  {
    name: "aroma",
    display_name: "Aromat",
  },
  {
    name: "taste",
    display_name: "Smak",
  },
  {
    name: "keywords",
    display_name: "Słowa kluczowe",
  },
  {
    name: "avg_rating",
    display_name: "Ocena",
  },
  {
    name: "rate_count",
    display_name: "Ilość głosów",
  },
];
