export function getToken() {
  return sessionStorage.getItem('hasLogin')
}

export function setToken(token) {
  sessionStorage.setItem('hasLogin', token)
}

export function removeToken() {
  return sessionStorage.removeItem('hasLogin') 
}
