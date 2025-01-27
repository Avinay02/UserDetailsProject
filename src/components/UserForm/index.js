import './index.css'

const UserForm = ({currentUser, isEditing, onFormChange, onFormSubmit}) => (
  <div>
    <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        name="name"
        value={currentUser.name}
        onChange={onFormChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={currentUser.email}
        onChange={onFormChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={currentUser.phone}
        onChange={onFormChange}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        name="department"
        value={currentUser.department}
        onChange={onFormChange}
        placeholder="Department"
        required
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
    </form>
  </div>
)

export default UserForm
