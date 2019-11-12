import Component from '../Component.js';
import { updateTodo, removeTodo } from '../services/todo-api.js';

class TodoItem extends Component {

    onRender(dom) {

        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;

        dom.innerHTML = todo.task;

        let markCompleteButton = document.createElement('button');
        markCompleteButton.textContent = 'Mark as Complete';
        dom.appendChild(markCompleteButton);

        markCompleteButton.addEventListener('click', async () => {
            todo.complete = !todo.complete;
            const updated = await updateTodo(todo);

        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑';
        dom.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            
        });
    }

    renderHTML() {
        return /*html*/`
            <li></li>
        `;
    }
}

export default TodoItem;