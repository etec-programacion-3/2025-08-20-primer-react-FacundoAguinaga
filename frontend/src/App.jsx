import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title.trim()) {
      axios.post('http://localhost:3001/tasks', { title, description })
        .then(response => {
          setTasks([...tasks, response.data]);
          setTitle('');
          setDescription('');
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
    }
  };


  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task List</h1>
        <form onSubmit={handleAddTask}>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task title"
          />
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="New task description"
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
          </li>
          ))}
        </ul>
      </header>
    </div>
  );
}
export default App;

