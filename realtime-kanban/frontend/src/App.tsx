import { KanbanBoard } from './components/KanbanBoard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100/60 text-gray-900 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">📋 Real-Time Kanban Board</h1>
        <p className="text-gray-500 mt-2 text-sm">Manage your project tasks efficiently</p>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;