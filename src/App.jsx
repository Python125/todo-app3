import { useState, React, useEffect } from 'react';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiURL}`);

function App() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const displayUsers = async () => {
      const response = await axios.get(`${apiURL}/users`);
      setUsers(response.data);
    };
    displayUsers();
  }, []);

  const addUser = (e) => {
    setUserInput(e.target.value);
  }

  function submitUser(e) {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUser = {
      id: users.length + 1, 
      email: userInput,
      todos: [],
    }
    console.log(newUser);

    axios.post(`${apiURL}/users`, newUser).then(request => {
      setUsers([...users, request.data]);
    })
  }

  const deleteUser = (id) => {
    axios.delete(`${apiURL}/users/${id}`).then(request => {})
  }

  return (
    <div>
      <h1>Login to your account</h1>
      <form onSubmit={submitUser}>
        <input type='text' />
        <button type="submit" onClick={addUser}>Add</button>
        <h2>Find your account below</h2>
      </form>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              {user.email}
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App;