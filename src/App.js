import './App.scss';
import { useState } from 'react';
import UserModal from './userModal'
import ExpenseModal from './expenseModal';
import { Table } from 'react-bootstrap'
import Plus from './plus.svg'

function App() {
  const [userId, setUserId] = useState(1);
  const [expenseId, setExpenseId] = useState(1);
  const [showUser, setShowUser] = useState(0);
  const [showExpense, setShowExpense] = useState(0);
  const [state, setState] = useState({users: {}, expenses: {}})
  console.log(state)

  const addUser = (user) => {
    if (user.id) {
      setState({
        ...state,
        users: {
          ...state.users,
          [user.id]: user
        }
      })
    } else {
      setState({
        ...state,
        users: {
          ...state.users,
          [userId]: {
            id: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            total: 0
          }
        }
      })
      setUserId(userId + 1);
    }
  }

  const handleRemove = (field, id) => {
    if (field === 'users') {
      const newState = {...state}
      delete newState.users[id]
      Object.values(state.expenses).forEach((expense) => {
        if (expense.userId === id) {
          delete newState.expenses[expense.id]
        }
      })
      setState(newState)
    } else {
      const newState = {...state}
      delete newState.expenses[id]
      setState(newState)
    }
  }

  const addExpense = (expense) => {
    if (expense.id) {
      setState({
        ...state,
        expenses: {
          ...state.expenses,
          [expense.id]: expense
        }
      })
    } else {
      setState({
        ...state,
        expenses: {
          ...state.expenses,
          [expenseId]: {
            id: expenseId,
            userId: expense.userId,
            category: expense.category,
            cost: expense.cost,
          }
        }
      })
      setExpenseId(expenseId + 1);
    }
  }

  const generateUserExpense = (userId) => {
    let out = 0
    Object.values(state.expenses).forEach((expense) => {
      if (parseInt(expense.userId) === userId) {
        out += expense.cost
      }
    })
    return out
  }

  const generateTotal = () => {
    let out = {'Food': 0, 'Travel': 0, 'Health': 0, 'Supplies': 0}
    Object.values(state.expenses).map(expense => {
      if (out[expense.category]) {
        out[expense.category] += expense.cost
      } else {
        out[expense.category] = expense.cost
      }
    })
    return Object.entries(out)
  }

  const handleDemo = () => {
    setState({expenses: {
      1: {id: 1, userId: "2", category: "Travel", cost: 2341},
      2: {id: 2, userId: "1", category: "Travel", cost: 233},
      3: {id: 3, userId: "4", category: "Health", cost: 84},
      4: {id: 4, userId: "5", category: "Health", cost: 152},
      5: {id: 5, userId: "1", category: "Food", cost: 773},
      6: {id: 6, userId: "5", category: "Supplies", cost: 745},
      7: {id: 7, userId: "3", category: "Supplies", cost: 3333},
      8: {id: 8, userId: "5", category: "Food", cost: 45},
      9: {id: 9, userId: "4", category: "Health", cost: 34},
      10: {id: 10, userId: "5", category: "Health", cost: 3500},
      11: {id: 11, userId: "5", category: "Health", cost: 523},
      },
      users: {
      1: {id: 1, firstName: "Joe", lastName: "schmo", total: 0},
      2: {id: 2, firstName: "Bob", lastName: "smith", total: 0},
      3: {id: 3, firstName: "Will", lastName: "Shi", total: 0},
      4: {id: 4, firstName: "Bob", lastName: "builder", total: 0},
      5: {id: 5, firstName: "Michael", lastName: "garcia", total: 0},
    }})
    setUserId(6)
    setExpenseId(12)
  }

  return (
    <div className="App">
      <UserModal show={showUser} handleClose={() => setShowUser(0)} addUser={(user) => addUser(user)} state={state} remove={handleRemove} />
      <ExpenseModal show={showExpense} handleClose={() => setShowExpense(0)} addExpense={(expense) => addExpense(expense)} state={state} remove={handleRemove} />
      <div className='main'>
        <div className='table-wrapper'>
          <div className='table-head'>
            <div>Users</div>
            <img src={Plus} onClick={() => setShowUser(-1)}/>
          </div>
          <div className='table1'>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Total Expense</th>
                </tr>
              </thead>
              {Object.values(state.users).map(user => (<tbody>
                <tr eventkey={user.id} onClick={(e) => setShowUser(e.currentTarget.getAttribute('eventkey'))}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{generateUserExpense(user.id)}</td>
                </tr>
              </tbody>))}
            </Table>
          </div>
        </div>
        <div className='table-wrapper'>
          <div className='table-head'>
            <div>Expenses</div>
            <img src={Plus} onClick={() => setShowExpense(-1)}/>
          </div>
          <div className='table1'>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Category</th>
                  <th>Cost</th>
                </tr>
              </thead>
              {Object.values(state.expenses).map(expense => (<tbody>
                <tr eventkey={expense.id} onClick={(e) => setShowExpense(e.currentTarget.getAttribute('eventkey'))}>
                  <td>{state.users[expense.userId].firstName} {state.users[expense.userId].lastName}</td>
                  <td>{expense.category}</td>
                  <td>{expense.cost}</td>
                  </tr>
                  </tbody>))}
            </Table>
          </div>
        </div>
        <div className='table-wrapper'>
          <div className='table-head'>
            <div>Company Expenses</div>
          </div>
          <div className='table1'>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              {generateTotal().map(item => (<tbody>
                <tr>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                </tr>
              </tbody>))}
            </Table>
          </div>
        </div>
      </div>
      <button onClick={handleDemo}>Demo</button>
    </div>
  );
}

export default App;
