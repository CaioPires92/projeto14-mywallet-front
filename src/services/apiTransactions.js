import axios from 'axios'

function createConfig(token) {
  return {
    headers: {
      Authorization: `${token}`
    }
  }
}

function getTransactions(token) {
  const promise = axios.get(
    `${import.meta.env.VITE_API_URL}/home`,
    createConfig(token)
  )
  return promise
}

function createTransactions(token) {}

function deleteTransactions(token) {}

const apiTransactions = {
  getTransactions,
  createTransactions,
  deleteTransactions
}
export default apiTransactions
