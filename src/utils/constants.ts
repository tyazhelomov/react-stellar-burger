import { IErrorMap, IMonthMap, IStatusMap, ITabValues } from "./types/constants";

export const TAB_VALUES: ITabValues = {
  bun: 'bun',
  main: 'main',
  sauce: 'sauce',
  other: 'other',
}

export const TAB_NAMES: ITabValues = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
}

export const BASE_URL: string = 'https://norma.nomoreparties.space';
export enum ENDPOINTS {
  GET_INGREDIENTS = '/api/ingredients',
  SET_ORDER = '/api/orders',
  GET_TOKEN = '/api/auth/token',
  LOGIN = '/api/auth/login',
  REGISTER = '/api/auth/register',
  LOGOUT = '/api/auth/logout',
  USER_INFO = '/api/auth/user',
  RESET_PASSWORD_REQUEST = '/api/password-reset',
  RESET_PASSWORD = '/api/password-reset/reset',
}

export const ERROR_MAP: IErrorMap = {
  'email or password are incorrect': 'Неверный формат email или пароля',
  'User already exists': 'Пользователь с таким email уже зарегистрирован',
}

export enum MODAL_HEADER {
  INGREDIENT_INFO = 'Детали ингредиента',
  ORDER_INFO = 'Информация о заказе',
}

export const WS_URL: string = 'wss://norma.nomoreparties.space';

export enum WS_ENDPOINTS {
  ALL = '/orders/all',
  OWNER = '/orders',
}

export const MONTHS_MAP: IMonthMap = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
}

export const STATUS_MAP: IStatusMap = {
  done: 'Готово',
  created: 'Создано',
  pending: 'В работе',
}