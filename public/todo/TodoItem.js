import Component from '../Component.js';
import { updateTodo, removeTodo } from '../services/todo-api.js';

class TodoItem extends Component {

    onRender(dom) {

        const todo = this.props;
        dom.innerHTML = todo.task;

        let markCompleteButton = document.createElement('button');
        markCompleteButton.textContent = 'Mark as Complete';
        dom.appendChild(markCompleteButton);

        markCompleteButton.addEventListener('click', () => {
            markCompleteButton.textContent = 'Complete';
            let params = new URLSearchParams(window.location.search);
            params.set('id', todo.id);
            updateTodo(todo);
        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑';
        dom.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            markCompleteButton.textContent = 'Complete';
            markCompleteButton.disabled = true;
        });
    }

    renderHTML() {
        return /*html*/`
            <li></li>
        `;
    }
}

export default TodoItem;