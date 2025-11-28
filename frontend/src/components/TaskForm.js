import React, { useState } from 'react';
import { taskService } from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await taskService.createTask({
        title: title.trim(),
        description: description.trim(),
      });
      setTitle('');
      setDescription('');
      onTaskCreated();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Nouvelle Tâche</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description (optionnelle)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="3"
        />
      </div>
      <button type="submit" className="btn-primary">
        Ajouter la tâche
      </button>
    </form>
  );
};

export default TaskForm;