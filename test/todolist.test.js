const Todo = require('../lib/todo.js');
const TodoList = require('../lib/todolist.js');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has as size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns an array that lists the added todos', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first returns the first todo added to the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('last returns the last todo added to the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('shift removes and returns the first todo of the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes and returns the last todo of the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone returns false if all todos are not done', () => {
    expect(list.isDone()).toBe(false);
  });

  test('add throws a TypeError if the item to be added is not a Todo object', () => {
    expect(() => list.add({})).toThrow(TypeError);
    expect(() => list.add('fake todo')).toThrow(TypeError);
  });

  test('itemAt returns the todo at the provided index or raises a ReferenceError if the index is empty', () => {
    expect(list.itemAt(1)).toBe(todo2);
    expect(() => list.itemAt(4)).toThrow(ReferenceError);
  });

  test('markDoneAt marks the todo at the provided index as done', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);

    expect(() => list.markDoneAt(9)).toThrow(ReferenceError);
  });

  test('markUndoneAt marks the todo at the provided index as undone', () => {
    list.markDoneAt(0);
    list.markDoneAt(1)
    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);

    expect(() => list.markUndoneAt(7)).toThrow(ReferenceError);
  });

  test('markAllDone marks all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });

  test('makeAllUndone marks all todos as undone', () => {
    list.markAllDone();
    list.markAllUndone();

    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
  })

  test('removeAt removes and returns the todo at the provided index', () => {
    let removedTodo = list.removeAt(1);
    expect(removedTodo).toBe(todo2);
    expect(list.toArray()).toEqual([todo1, todo3]);

    expect(() => list.removeAt(4)).toThrow(ReferenceError);
  });

  test('toString returns a string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString appropriately shows when a todo is done', () => {
    list.markDoneAt(1);

    let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString shows all todos as done when all todos are done', () => {
    list.markAllDone();

    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over the todos in the list', () => {
    list.forEach(todo => todo.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('filter returns a new todoList object with todos selected based on the given criteria', () => {
    let filteredList = list.filter(todo => todo.getTitle() === 'Clean room');

    expect(filteredList.toArray()).toEqual([todo2]);
    expect(filteredList).not.toBe(list);
  });
});

