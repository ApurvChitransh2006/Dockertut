import { useEffect, useState } from "react";
import { api } from "./api/axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/");
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };fetchTodos();
  }, []);

  // ➕ Add Todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const res = await api.post("/", { title: newTitle });
    setTodos([res.data, ...todos]);
    setNewTitle("");
  };

  // 🔄 Toggle Completed
  const toggleTodo = async (todo) => {
    const res = await api.put(`/${todo._id}`, {
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
  };

  // ❌ Delete Todo
  const deleteTodo = async (id) => {
    await api.delete(`/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center py-12 px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-amber-400 mb-6">
          Todo App
        </h1>

        {/* Add Form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a task..."
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button
            className="bg-amber-400 text-slate-900 px-4 rounded-lg font-semibold"
            type="submit"
          >
            Add
          </button>
        </form>

        {/* List */}
        {loading ? (
          <p className="text-center text-slate-400">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-slate-500">No todos yet</p>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="flex justify-between items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2"
              >
                <button
                  onClick={() => toggleTodo(todo)}
                  className={`flex-1 text-left ${
                    todo.completed
                      ? "line-through text-slate-500"
                      : "text-white"
                  }`}
                >
                  {todo.title}
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
