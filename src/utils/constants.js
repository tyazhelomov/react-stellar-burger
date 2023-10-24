export const TAB_VALUES = {
  bun: 'bun',
  main: 'main',
  sauce: 'sauce',
  other: 'other',
}

export const TAB_NAMES = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
}

export const BASE_URL = 'https://norma.nomoreparties.space';
export const ENDPOINTS = {
  GET_INGREDIENTS: '/api/ingredients',
  SET_ORDER: '/api/orders',
  GET_TOKEN: '/api/auth/token',
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  USER_INFO: '/api/auth/user',
  RESET_PASSWORD_REQUEST: '/api/password-reset',
  RESET_PASSWORD: '/api/password-reset/reset',
}

export const ERROR_MAP = {
  'email or password are incorrect': 'Неверный формат email или пароля',
  'User already exists': 'Пользователь с таким email уже зарегистрирован'
}