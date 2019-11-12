import Component from '../Component.js';
import { addTodo } from '../services/todo-api.js';

class AddTodo extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);
            
            const newTodo = {
                task: formData.get('todo-input'),
                complete: false
            };

            console.log(newTodo);

            try {
                await addTodo(newTodo);
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
                window.location = `todo.html`;
            }
            catch (err) {
                console.log(err);
            }


        });
    }

    renderHTML() {
        return /*html*/`
            <form>
                <input type="text" name="todo-input" class="todo-input">
                <button>Add Todo</button>
            </form>
        `;
    }
}

export default AddTodo;