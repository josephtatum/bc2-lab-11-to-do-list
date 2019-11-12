import Component from '../Component.js';
import { addCat } from '../services/cat-api.js';

class CatForm extends Component {

    onRender(form) {
        // event goodness for showing display of range value
        const livesRange = form.querySelector('#lives');
        const livesDisplay = form.querySelector('#lives-display');
        const syncLives = () => livesDisplay.textContent = livesRange.value;
        livesRange.addEventListener('input', syncLives);
        syncLives();

        // handle form event
        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);

            const cat = {
                name: formData.get('name'),
                typeId: parseInt(formData.get('type-id')),
                url: formData.get('url'),
                year: parseInt(formData.get('year')),
                lives: parseInt(formData.get('lives')),
                isSidekick: formData.get('is-sidekick') === 'on'
            };

            try {
                const saved = await addCat(cat);
                // redirect to detail page
                window.location = `cat-detail.html?id=${saved.id}`;
            }
            catch (err) {
                console.log('cat not saved :(', err);
            }
        });

    }

    renderHTML() {
        const types = this.props.types;
        const optionsList = types.map(type => {
            return /*html*/`
                <option value="${type.id}">${type.name}</option>
            `;
        });

        return /*html*/`
            <form class="cat-form">
                <p>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Famous Cat">
                </p>

                <p>
                    <label for="type">Type</label>
                    <select id="type" name="type-id" required>
                        <option disabled selected>&lt;select a type&gt;</option>
                        ${optionsList.join('')}
                    </select>
                </p>
                
                <p>
                    <label for="url">Image Url</label>
                    <input id="url" name="url" required placeholder="http://famous-cat.png">
                </p>

                <p>
                    <label for="year">Year Introduced</label>
                    <input id="year" 
                        name="year" 
                        required 
                        pattern="[0-9]{4}" 
                        placeholder="2005" 
                        title="Four digit year">
                </p>

                <p>
                    <label for="lives">Lives Remaining</label>
                    <span class="horizontally-centered">
                        <input id="lives" name="lives" type="range" min="0" max="9" value="9">
                        <span id="lives-display">5</span>
                    </span>
                </p>

                <fieldset for="is-sidekick">
                    <legend>Is a Sidekick?</legend>
                    <label class="horizontally-centered">
                        <input id="is-sidekick" name="is-sidekick" type="checkbox"> Yes
                    </label>
                </fieldset>

                <p>
                    <button>Add This Cat</button>
                </p>
            </form>
        `;
    }
}

export default CatForm;