import React from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onMove: (id: number, nextStatus: 'todo' | 'in_progress' | 'done') => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onMove }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition">
      <h4 className="font-semibold text-gray-800 text-lg">{task.title}</h4>
      {task.description && <p className="text-gray-500 text-sm">{task.description}</p>}
      
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50">
        <button 
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 text-xs font-medium"
        >
          Delete
        </button>
        
        <div className="flex gap-1">
          {task.status !== 'todo' && (
            <button onClick={() => onMove(task.id, 'todo')} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-gray-200">⏮️ ToDo</button>
          )}
          {task.status !== 'in_progress' && (
            <button onClick={() => onMove(task.id, 'in_progress')} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-100">🔄 In Prog</button>
          )}
          {task.status !== 'done' && (
            <button onClick={() => onMove(task.id, 'done')} className="bg-green-50 text-green-600 px-2 py-1 rounded text-xs hover:bg-green-100">✅ Done</button>
          )}
        </div>
      </div>
    </div>
  );
};