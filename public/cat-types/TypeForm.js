import Component from '../Component.js';

class TypeForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=type]');

        form.addEventListener('submit', async event => {
            event.preventDefault();

            const catType = {
                name: input.value
            };

            try {
                await onAdd(catType);
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return /*html*/`
            <section class="type-form-section">
                <form class="type-form">
                    <input name="type" required>
                    <button>Add</button>
                </form>
            </section>
        `;
    }
}

export default TypeForm;