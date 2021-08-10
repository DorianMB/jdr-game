const _BASE_API = "http://localhost:3000/api";
const _CONNECTION = "/connection";
const _IS_ADMIN = "/is-admin";
const _USERS = "/users";
const _CARACTERS = "/caracters";
const _EQUIPEMENTS = "/equipements";
const _BAGS = "/bags";
const _STATS = "/stats";
const _LOOT_TABLE = "/loot-table";
const _ITEMS = "/items";

/**
 * @return {string}
 */
export const GET_API_CONNECTION = () => {
  return `${_BASE_API}${_CONNECTION}`;
};

/**
 * @return {string}
 */
export const GET_API_IS_ADMIN = () => {
  return `${_BASE_API}${_IS_ADMIN}`;
};

/**
 * @return {string}
 */
export const GET_API_ALL_USERS = () => {
  return `${_BASE_API}${_USERS}`;
};

/**
 * @return {string}
 */
export const GET_API_ALL_CARACTERS = () => {
  return `${_BASE_API}${_CARACTERS}`;
};

/**
 * @return {string}
 */
export const GET_API_ALL_EQUIPEMENTS = () => {
  return `${_BASE_API}${_EQUIPEMENTS}`;
};

/**
 * @return {string}
 */
export const GET_API_ALL_BAGS = () => {
  return `${_BASE_API}${_BAGS}`;
};

/**
 * @return {string}
 */
export const GET_API_ALL_STATS = () => {
  return `${_BASE_API}${_STATS}`;
};

/**
 * @return {string}
 */
export const GET_API_ALL_LOOT_TABLE = () => {
  return `${_BASE_API}${_LOOT_TABLE}`;
};

/**
 * @return {string}
 */
export const GET_API_ALL_ITEMS = () => {
  return `${_BASE_API}${_ITEMS}`;
};
