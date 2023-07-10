import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiTransactions from '../services/apiTransactions'

export default function TransactionsPage() {
  const [valor, setValor] = useState('')
  const [descricao, setDescricao] = useState('')
  const navigate = useNavigate()
  const { tipo } = useParams()

  const handleValorChange = event => {
    setValor(event.target.value)
  }

  const handleDescricaoChange = event => {
    setDescricao(event.target.value)
  }

  const handleTransactionSubmit = event => {
    event.preventDefault()

    const transactionData = {
      valor,
      descricao
    }

    if (tipo === 'entrada') {
      apiTransactions
        .createTransaction('entrada', transactionData)
        .then(() => {
          navigate('/home')
        })
        .catch(error => {
          console.error(error)
        })
    } else if (tipo === 'saida') {
      apiTransactions
        .createTransaction('saida', transactionData)
        .then(() => {
          navigate('/home')
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
  return (
    <TransactionsContainer>
      <h1>Nova Transação</h1>
      <form onSubmit={handleTransactionSubmit}>
        <input
          data-test="registry-amount-input"
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={handleValorChange}
          required
        />
        <input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={handleDescricaoChange}
          required
        />
        <button data-test="registry-save" type="submit">
          Salvar Transação
        </button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
