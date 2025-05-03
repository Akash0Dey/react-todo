import { Component } from "react";

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
        <input
          type="checkbox"
          id={taskId}
          checked={done}
          onChange={this.onClick}
        />
        <label htmlFor={taskId}>{task}</label>
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
        <input
          type="text"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </>
    );
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{ task: "buy milk", taskId: 1, done: true }],
      id: 2,
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
        <h1>Todo</h1>
        <Input onEnter={this.addItem} />
        <Tasks items={this.state.items} onToggle={this.onToggle} />
      </>
    );
  }
}

export default Todo;
