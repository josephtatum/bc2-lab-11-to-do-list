import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import TypeForm from './TypeForm.js';
import CatTypeList from './CatTypeList.js';
import { getTypes, addType, updateType, removeType } from '../services/cat-api.js';

class CatTypesApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'Cat Types' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error')

        // start with loading true, will be made false after initial GET:
        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const typeForm = new TypeForm({
            onAdd: async type => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    const saved = await addType(type);
                    
                    // part 2: integrate back into our list
                    const types = this.state.types;
                    types.push(saved);

                    // part 3: tell component to update
                    typeList.update({ types });
                }
                catch (err) {
                    // display error
                    error.textContent = err;
                    // rethrow the error so form knows not to clear the input:
                    throw err;
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(typeForm.renderDOM());

        const typeList = new CatTypeList({ 
            types: [],
            onUpdate: async type => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    const updated = await updateType(type);
                    
                    // part 2: integrate back into our list
                    const types = this.state.types;
                    // find the index of this type:
                    const index = types.indexOf(type);
                    // replace with updated object from server:
                    types.splice(index, 1, updated);

                    // part 3: tell component to update
                    typeList.update({ types });
                }
                catch (err) {
                    // display error
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            },
            onRemove: async type => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    await removeType(type.id);
                    
                    // part 2: integrate back into our list
                    const types = this.state.types;        
                    // find the index of this type:
                    const index = types.indexOf(type);
                    // remove from the list
                    types.splice(index, 1);
    
                    // part 3: tell component to update
                    typeList.update({ types });
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
        main.appendChild(typeList.renderDOM());

        try {
            // get the types when this component first loads:
            const types = await getTypes({ showAll: true });
            // store on "this.state" so we can get 
            // them back for add, remove, and update:
            this.state.types = types;
    
            // pass the loaded types to the component:
            typeList.update({ types });
        }
        catch (err) {
            // display error
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }

    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <p class="error"></p>
                <main>
                    <!-- form goes here -->
                    <!-- list goes here -->
                </main>
            </div>
        `;
    }
}

export default CatTypesApp;