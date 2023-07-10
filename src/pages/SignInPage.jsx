import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import MyWalletLogo from '../components/MyWalletLogo'
import ApiAuth from '../services/apiAuth'
import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'

export default function SignInPage() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const { user, setUser } = useContext(UserContext)

  console.log('dados do context', user)

  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleLogin(e) {
    e.preventDefault()
    console.log('esse e o form', form)

    ApiAuth.login(form)
      .then(res => {
        const { nome, token } = res.data
        setUser({ nome, token })
        localStorage.setItem('token', token)

        navigate('/home')
      })
      .catch(err => alert(err.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
          data-test="email"
          name="email"
          placeholder="E-mail"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
        />
        <input
          data-test="password"
          name="senha"
          placeholder="Senha"
          type="password"
          minLength="3"
          required
          value={form.senha}
          onChange={handleForm}
          autoComplete="new-password"
        />
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
      </form>

      <Link to={'/cadastro'}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
