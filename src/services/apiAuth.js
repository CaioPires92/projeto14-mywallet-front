import axios from 'axios'

function login(body) {
  const promise = axios.post(`${import.meta.env.VITE_API_URL}/`, body)
  return promise
}

function signUp(body) {
  const promise = axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, body)
  return promise
}

const ApiAuth = { login, signUp }
export default ApiAuth
