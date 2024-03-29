import styled from 'styled-components'
import { BiExit } from 'react-icons/bi'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import apiTransactions from '../services/apiTransactions'

export default function HomePage() {
  const [transactions, setTransactions] = useState([])
  // const token = localStorage.getItem('token')
  const { user } = useContext(UserContext)

  useEffect(getTransactionsList, [])

  function getTransactionsList() {
    apiTransactions
      .getTransactions(user.token)
      .then(res => {
        const apiTransactions = res.data
        setTransactions(apiTransactions)
        console.log(transactions)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  function calculateBalanceColor() {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.tipo === 'entrada') {
        return acc + parseFloat(transaction.valor)
      } else {
        return acc - parseFloat(transaction.valor)
      }
    }, 0)

    return total >= 0 ? 'positivo' : 'negativo'
  }

  function calculateBalance() {
    const total = transactions.reduce((acc, transaction) => {
      if (transaction.tipo === 'entrada') {
        return acc + parseFloat(transaction.valor)
      } else {
        return acc - parseFloat(transaction.valor)
      }
    }, 0)

    return total.toFixed(2)
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">{user.nome}</h1>
        <BiExit data-test="logout" />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(transaction => (
            <ListItemContainer key={transaction.id}>
              <div>
                <span>{transaction.data}</span>
                <strong data-test="registry-name">
                  {transaction.descricao}
                </strong>
              </div>
              <Value
                data-test="registry-amount"
                color={transaction.tipo === 'entrada' ? 'positivo' : 'negativo'}
              >
                {parseFloat(transaction.valor).toFixed(2)}
              </Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={calculateBalanceColor()}>
            {calculateBalance()}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p data-test="new-income">
            Nova <br /> entrada
          </p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p data-test="new-expense">
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${props => (props.color === 'positivo' ? 'green' : 'red')};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
