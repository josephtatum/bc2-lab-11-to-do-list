import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {

        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
        
        dom.innerHTML = todo.task;

        let markCompleteButton = document.createElement('button');

        if (!todo.complete) {
            markCompleteButton.textContent = 'Complete';
            dom.style.textDecoration = 'line-through';
        } else {
            markCompleteButton.textContent = 'Mark as Complete';
            dom.style.textDecoration = 'none';
        }
        
        dom.appendChild(markCompleteButton);

        markCompleteButton.addEventListener('click', async () => {

            
            todo.complete = !todo.complete;
            onUpdate(todo);

        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑';
        dom.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            const confirmed = confirm('Are you sure youd like to delete this todo?');
            
            if (confirmed) {  
                onRemove(todo);
            } else {
                return;
            }
        });
    }

    renderHTML() {
        return /*html*/`
            <li></li>
        `;
    }
}

export default TodoItem;