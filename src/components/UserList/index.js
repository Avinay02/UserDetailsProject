import './index.css'

const UserList = ({users, onEdit, onDelete}) => (
  <div>
    <h2>User List</h2>
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.department}</td>
            <td>
              <button type="button" onClick={() => onEdit(user)}>
                Edit
              </button>
              <button type="button" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default UserList
