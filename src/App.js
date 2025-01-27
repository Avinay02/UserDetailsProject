import {Component} from 'react'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

// API URL
const apiUrl = 'https://jsonplaceholder.typicode.com/users'

class App extends Component {
  state = {
    users: [],
    currentUser: {id: '', name: '', email: '', phone: '', department: ''},
    error: null,
    isEditing: false,
    currentPage: 1,
    usersPerPage: 5,
  }

  // Fetch users from API
  async componentDidMount() {
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      this.setState({users: data})
    } catch (error) {
      this.setState({error: 'Failed to fetch users. Please try again later.'})
    }
  }

  // Handle form change
  handleFormChange = event => {
    const {name, value} = event.target
    const {currentUser} = this.state
    this.setState({
      currentUser: {...currentUser, [name]: value},
    })
  }

  // Handle form submission (Add/Edit)
  handleFormSubmit = async event => {
    event.preventDefault()
    const {currentUser, isEditing} = this.state

    try {
      if (isEditing) {
        // Edit user (PUT request)
        const response = await fetch(`${apiUrl}/${currentUser.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(currentUser),
        })
        const updatedUser = await response.json()
        this.setState(prevState => ({
          users: prevState.users.map(user =>
            user.id === updatedUser.id ? updatedUser : user,
          ),
          isEditing: false,
          currentUser: {id: '', name: '', email: '', phone: '', department: ''},
        }))
      } else {
        // Add user (POST request)
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(currentUser),
        })
        const newUser = await response.json()
        this.setState(prevState => ({
          users: [...prevState.users, newUser],
          currentUser: {id: '', name: '', email: '', phone: '', department: ''},
        }))
      }
    } catch (error) {
      this.setState({error: 'Failed to save user. Please try again later.'})
    }
  }

  // Handle editing user
  handleEditUser = user => {
    this.setState({
      currentUser: user,
      isEditing: true,
    })
  }

  // Handle deleting user
  handleDeleteUser = async userId => {
    try {
      await fetch(`${apiUrl}/${userId}`, {method: 'DELETE'})
      this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== userId),
      }))
    } catch (error) {
      this.setState({error: 'Failed to delete user. Please try again later.'})
    }
  }

  // Paginate users
  handlePageChange = page => {
    this.setState({currentPage: page})
  }

  render() {
    const {
      users,
      currentUser,
      error,
      isEditing,
      currentPage,
      usersPerPage,
    } = this.state

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
    const totalPages = Math.ceil(users.length / usersPerPage)

    return (
      <div className="App">
        <h1>User Management</h1>

        <ErrorBoundary>
          {error && <div className="error-message">{error}</div>}

          <UserForm
            currentUser={currentUser}
            isEditing={isEditing}
            onFormChange={this.handleFormChange}
            onFormSubmit={this.handleFormSubmit}
          />

          <UserList
            users={currentUsers}
            onEdit={this.handleEditUser}
            onDelete={this.handleDeleteUser}
          />

          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                type="button"
                onClick={() => this.handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </ErrorBoundary>
      </div>
    )
  }
}

export default App
