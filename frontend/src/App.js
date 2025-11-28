import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskService } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await taskService.getAllTasks();
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="container">
          <div className="loading">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 Ma Todo List</h1>
          <p>Gérez vos tâches efficacement</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchTasks} className="btn-retry">
              Réessayer
            </button>
          </div>
        )}

        <main className="app-main">
          <div className="app-sidebar">
            <TaskForm onTaskCreated={fetchTasks} />
          </div>
          
          <div className="app-content">
            <TaskList
              tasks={tasks}
              onTaskUpdated={fetchTasks}
              onTaskDeleted={fetchTasks}
            />
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2024 Todo App - Django + React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;