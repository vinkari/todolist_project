const Todo = require('./todo.js');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('can only add Todo objects');
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  _validateIndex(index) {
    let validIndexes = this.todos.map((_, index) => index);

    if (!validIndexes.includes(index)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    for (let index = 0; index < this.todos.length; index++) {
      if (!this.todos[index].isDone()) return false;
    }
    return true;
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  toString() {
    let title = `---- ${this.title} ----\n`;
    let todoItems = '';

    this.todos.forEach((todo, index) => {
      todoItems += todo.toString() + (index === this.size() - 1 ? '' : '\n');
    })

    return title + todoItems;
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let filteredTodoList = new TodoList(this.title);

    this.forEach(todo => {
      if (callback(todo)) {
        filteredTodoList.add(todo);
      }
    });

    return filteredTodoList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone())
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;