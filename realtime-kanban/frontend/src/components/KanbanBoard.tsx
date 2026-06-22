import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TaskCard } from './TaskCard';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
}

const API_URL = 'http://127.0.0.1:8000/tasks';

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title, description, status: 'todo' });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  
  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  

  const handleMoveTask = async (id: number, nextStatus: 'todo' | 'in_progress' | 'done') => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: nextStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const columns: { id: 'todo' | 'in_progress' | 'done'; title: string; bg: string }[] = [
    { id: 'todo', title: 'To Do', bg: 'bg-gray-50' },
    { id: 'in_progress', title: 'In Progress', bg: 'bg-blue-50/50' },
    { id: 'done', title: 'Done', bg: 'bg-green-50/50' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Task Form */}
      <form onSubmit={handleCreateTask} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 flex flex-col gap-1 w-full">
          <label className="text-sm font-medium text-gray-600">Task Title</label>
          <input 
            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?" required
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 w-full">
          <label className="text-sm font-medium text-gray-600">Description (Optional)</label>
          <input 
            type="text" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details..."
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition w-full md:w-auto h-[42px]">
          Add Task
        </button>
      </form>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.id} className={`${col.bg} p-4 rounded-2xl border border-gray-100 min-h-[500px] flex flex-col gap-4`}>
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
              <h3 className="font-bold text-gray-700 text-lg uppercase tracking-wide">{col.title}</h3>
              <span className="bg-white px-2.5 py-0.5 rounded-full text-xs font-semibold text-gray-500 border border-gray-200 shadow-sm">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            
            <div className="flex flex-col gap-3 overflow-y-auto">
              {tasks.filter(t => t.status === col.id).map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onDelete={handleDeleteTask} 
                  onMove={handleMoveTask} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};}