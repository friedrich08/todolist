import React from 'react';
import { taskService } from '../services/api';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const handleToggleComplete = async () => {
    try {
      await taskService.toggleComplete(task.id);
      onTaskUpdated();
    } catch (error) {
      console.error('Erreur lors du toggle:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(task.id);
      onTaskDeleted();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <div className="task-actions">
            <button
              onClick={handleToggleComplete}
              className={`btn-toggle ${task.completed ? 'completed' : ''}`}
            >
              {task.completed ? '✓ Fait' : '☐ À faire'}
            </button>
            <button onClick={handleDelete} className="btn-delete">
              ✕
            </button>
          </div>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className="task-date">
            Créé le {formatDate(task.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;