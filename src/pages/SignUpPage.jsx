import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MyWalletLogo from '../components/MyWalletLogo'
import { useState } from 'react'
import ApiAuth from '../services/apiAuth'

export default function SignUpPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSignUp(e) {
    e.preventDefault()

    ApiAuth.signUp(form)
      .then(res => {
        navigate('/')
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          name="nome"
          required
          value={form.nome}
          onChange={handleForm}
        />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          name="senha"
          minLength="3"
          required
          value={form.senha}
          onChange={handleForm}
        />
        <input
          placeholder="Confirmar Senha"
          type="password"
          autoComplete="new-password"
          name="confirmarSenha"
          minLength="3"
          required
          value={form.confirmarSenha}
          onChange={handleForm}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
