import { useState, useEffect } from "react";
import "./App.css";

function App() {
  return <Todo />;
}

function Todo() {
  const [searchText, setsearchText] = useState("");
  const [tasks, settasks] = useState([
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "completed",
      name: "Coding react",
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending",
      name: "Prepare Nextjs",
    },
  ]);

  const [filteredResults, setfilteredResults] = useState([]);

  useEffect(() => {
    if (searchText) {
      const res = tasks.filter((e) =>
        e.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setfilteredResults(res);
    } else {
    }
  }, [searchText]);

  console.log(filteredResults);

  const createTodo = (item) => {
    settasks([...tasks, { id: tasks.length + 1, ...item }]);
  };
  const deleteTodo = (id) => {
    settasks(tasks.filter((e) => e.id !== id));
  };
  const clear = (id) => {
    settasks([]);
  };

  const [todoToEdit, settodoToEdit] = useState(null);

  const editTodo = (todo) => {
    const newTasks = tasks.map((task) =>
      task.id === todo.id ? { ...task, ...todo } : task
    );
    settasks(newTasks);
    settodoToEdit(null);
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <input
          className="w-full m-4 max-w-3xl mx-auto px-4 py-2 border border-gray-400"
          type="search"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
          placeholder="Search here"
          name=""
          id=""
        />
      </div>
      <TodoForm
        todoToEdit={todoToEdit}
        editTodo={editTodo}
        createTodo={createTodo}
      />
      <div className="max-w-3xl mx-auto my-5">
        {(searchText ? filteredResults : tasks).map((task, index) => {
          return (
            <Task
              editTodo={(todo) => {
                settodoToEdit(todo);
              }}
              deleteTodo={deleteTodo}
              task={task}
              hhj=""
              key={index}
            />
          );
        })}
        {!tasks.length && <div>No Tasks found</div>}
        {!filteredResults.lengt && searchText && (
          <div>Search Tasks not found</div>
        )}

        {tasks.length ? (
          <div>
            <button className="px-4 py-1 bg-red-500 text-white" onClick={clear}>
              Clear
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TodoForm({ createTodo, todoToEdit, editTodo }) {
  const [value, setvalue] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  useEffect(() => {
    if (todoToEdit) {
      setvalue(todoToEdit.name);
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      if (todoToEdit) {
        editTodo({
          id: todoToEdit.id,
          name: value,
        });
      } else {
        createTodo({
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "pending",
          name: value,
        });
      }
      setsuccessMessage("Task created succsefully");
      setvalue("");
    } else {
      seterrorMessage("Please enter a task");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        seterrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setsuccessMessage(null);
      }, 3000);
    }
  }, [successMessage]);

  return (
    <div>
      {errorMessage && (
        <div className="px-4 flex justify-between items-center max-w-3xl mx-auto mt-4 py-1 bg-red-100 rounded-md text-red-500">
          {errorMessage}
          <a className="cursor-pointer" onClick={() => seterrorMessage(null)}>
            X
          </a>
        </div>
      )}

      {successMessage && (
        <div className="px-4 flex justify-between items-center max-w-3xl mx-auto mt-4 py-1 bg-green-100 rounded-md text-green-500">
          {successMessage}
          <a className="cursor-pointer" onClick={() => setsuccessMessage(null)}>
            X
          </a>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border flex gap-4 border-gray-200 mt-4 px-3 py-2 max-w-3xl mx-auto"
      >
        <input
          className="flex-1 py-2 px-1 bg-transparent"
          placeholder="Enter past"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          type="text"
        />
        <button className="bg-green-500 px-4 text-white py-2">
          Create todo
        </button>
      </form>
    </div>
  );
}

function Task({ task, deleteTodo, editTodo }) {
  const { createdAt, updatedAt, status, id, name } = task;
  return (
    <div className="grid grid-cols-6 gap-3 border border-gray-300 rounded-md p-4 m-3">
      <div>
        <input type="checkbox" />
      </div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{status}</div>
      <a onClick={() => editTodo(task)} href="#">
        Edit
      </a>
      <a onClick={() => deleteTodo(id)} href="#">
        Delete
      </a>
    </div>
  );
}

export default App;
