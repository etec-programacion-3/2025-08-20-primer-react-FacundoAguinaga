import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

// Initialize Sequelize with SQLite

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define the Task model

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
     allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Sync the model with the database y arrancar el servidor después
async function startServer() {
  await sequelize.sync({ force: true });
  console.log('Database & tables created!');
  // Add some initial data
  await Task.create({ title: 'Learn React', description: '321' });
  await Task.create({ title: 'Build a backend', description: '123' });
  await Task.create({ title: 'Connect frontend to backend', description: '111' });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();

// API Endpoints

app.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});


app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (title) {
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } else {
    res.status(400).json({ error: 'Title is required' });
  }

});

