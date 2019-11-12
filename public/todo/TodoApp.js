import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        main.appendChild(loading.renderDOM());

        const addToDo = new AddTodo({
            onAdd: async (todo) => {
                try {
                    const saved = await addTodo(todo);
                    // this only runs if no error:
                    const todos = this.state.todos;
                    console.log(todos);
                    todos.push(saved);

                    todos.update({ todos });
                }

                catch (err) {
                    console.log(err);
                }
            }
        });
        main.appendChild(addToDo.renderDOM());

        const toDoList = new TodoList({
            todos: [],
            onUpdate: async todo => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                console.log(this.state.todos);

                try {
                    // part 1: do work on the server
                    const updated = await updateTodo(todo);
                    // part 2: integrate back into our list
                    const todos = this.state.todos;
                    // find the index of this todo:
                    const index = todos.indexOf(todo);
                    // replace with updated object from server:
                    todos.splice(index, 1, updated);

                    // part 3: tell component to update
                    toDoList.update({ todos });
                }
                catch (err) {
                    // display error
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(toDoList.renderDOM());

        // initial todo load:
        try {
            const todos = await getTodos();
            toDoList.update({ todos });
        }
        catch (err) {
            // display error...
        }
        finally {
            loading.update({ loading: false });
        }

    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;