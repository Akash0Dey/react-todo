import { Component } from "react";
import "./App.css";
class Item extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onToggle(this.props.taskId);
  }

  render() {
    const { task, taskId, done } = this.props;
    return (
      <>
        <div className="todo-item">
          <input
            type="checkbox"
            id={taskId}
            checked={done}
            onChange={this.onClick}
          />
          <label htmlFor={taskId}>{task}</label>
        </div>
      </>
    );
  }
}

class Tasks extends Component {
  render() {
    return (
      <>
        {this.props.items.map((item) => {
          const { task, taskId, done } = item;
          return (
            <Item
              key={taskId}
              task={task}
              taskId={taskId}
              done={done}
              onToggle={this.props.onToggle}
            />
          );
        })}
      </>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyDown(event) {
    if (event.key === "Enter" && this.state.value.trim()) {
      this.props.onEnter(this.state.value.trim());
      this.setState({ value: "" });
    }
  }

  render() {
    return (
      <>
        <div className="input">
          <input
            type="text"
            placeholder={this.props.placeHolder}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        </div>
      </>
    );
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <section className="todo">
          <h2 className="todo-heading">{this.props.name || "Todo"}</h2>
          <Input onEnter={this.props.addItem} placeHolder="Add  a new Todo" />
          <div className="todo-items">
            <Tasks items={this.props.items} onToggle={this.props.onToggle} />
          </div>
        </section>
      </>
    );
  }
}

class MultipleTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], taskId: 1, todoId: 1 };
    this.addTodo = this.addTodo.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(todoId) {
    const toggleTaskInTodo = (todoId, taskId) => (todo) =>
      todo.todoId !== todoId
        ? todo
        : {
            ...todo,
            items: todo.items.map((item) =>
              item.taskId === taskId ? { ...item, done: !item.done } : item
            ),
          };
    return (taskId) => {
      this.setState((prev) => ({
        ...prev,
        todos: prev.todos.map(toggleTaskInTodo(todoId, taskId)),
        taskId: prev.taskId + 1,
      }));
    };
  }

  addItem(todoId) {
    const addTaskInTodo = (newTask) => (todo) =>
      todo.todoId !== todoId
        ? todo
        : { ...todo, items: [...todo.items, newTask] };

    return (task) => {
      this.setState((prev) => {
        const newTask = { task, taskId: prev.taskId, done: false };
        return {
          ...prev,
          todos: prev.todos.map(addTaskInTodo(newTask)),
          taskId: prev.taskId + 1,
        };
      });
    };
  }

  addTodo(todo) {
    this.setState((prev) => {
      const newTodo = { todo, todoId: prev.todoId, items: [] };
      return {
        ...prev,
        todos: [...prev.todos, newTodo],
        todoId: prev.todoId + 1,
      };
    });
  }

  render() {
    return (
      <>
        <section className="todos">
          <Input onEnter={this.addTodo} placeHolder="Enter list title" />
          <div className="todos-section">
            {this.state.todos.map((todo) => {
              const { todo: name, todoId, items } = todo;
              return (
                <Todo
                  key={todoId}
                  name={name}
                  todoId={todoId}
                  items={items}
                  addItem={this.addItem(todoId)}
                  onToggle={this.onToggle(todoId)}
                />
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default MultipleTodo;
