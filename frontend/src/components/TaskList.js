import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>Aucune tâche pour le moment</h3>
        <p>Commencez par ajouter votre première tâche !</p>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="task-list">
      {pendingTasks.length > 0 && (
        <div className="task-section">
          <h3>Tâches en cours ({pendingTasks.length})</h3>
          {pendingTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))}
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3>Tâches terminées ({completedTasks.length})</h3>
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;