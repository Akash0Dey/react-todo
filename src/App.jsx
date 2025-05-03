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
    this.state = {
      items: [],
      id: 1,
    };
    this.onToggle = this.onToggle.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  addItem(task) {
    this.setState((prev) => {
      const newTask = { task, taskId: prev.id, done: false };
      return { items: [...prev.items, newTask], id: prev.id + 1 };
    });
  }

  onToggle(taskId) {
    this.setState((prev) => ({
      items: prev.items.map((item) =>
        item.taskId === taskId ? { ...item, done: !item.done } : item
      ),
    }));
  }

  render() {
    return (
      <>
        <section className="todo">
          <h2 className="todo-heading">{this.props.name || "Todo"}</h2>
          <Input onEnter={this.addItem} placeHolder="Add  a new Todo" />
          <div className="todo-items">
            <Tasks items={this.state.items} onToggle={this.onToggle} />
          </div>
        </section>
      </>
    );
  }
}

class MultipleTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      id: 1,
    };
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(todo) {
    this.setState((prev) => {
      const newTodo = { todo, todoId: prev.id, done: false };
      return { todos: [...prev.todos, newTodo], id: prev.id + 1 };
    });
  }

  render() {
    return (
      <>
        <section className="todos">
          <Input onEnter={this.addTodo} placeHolder="Enter list title" />
          <div className="todos-section">
            {this.state.todos.map((todo) => {
              const { todo: name, todoId } = todo;
              return <Todo key={todoId} name={name} todoId={todoId} />;
            })}
          </div>
        </section>
      </>
    );
  }
}

export default MultipleTodo;
