import Cookies from 'js-cookie'

const KEY = 'Authorization'
const EXPIRE = 7

export function setToken(token, rememberMe) {
  if (rememberMe === true) {
    Cookies.set(KEY, token, {expires: EXPIRE})
  } else {
    Cookies.set(KEY, token)
  }
}

export function getToken() {
  return Cookies.get(KEY)
}

export function clearToken() {
  Cookies.remove(KEY)
}