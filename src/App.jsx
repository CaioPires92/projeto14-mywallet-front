import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import TransactionsPage from './pages/TransactionPage'
import { useEffect } from 'react'
import axios from 'axios'

export default function App() {
  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/cadastro `)
      .then(res => console.log(res))
      .catch(err => console.error(err.response.data))
  }, [])

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
