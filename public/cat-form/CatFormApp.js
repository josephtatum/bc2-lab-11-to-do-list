import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import CatForm from './CatForm.js';
import { getTypes } from '../services/cat-api.js';

class CatFormApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'Add a Cat' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        try {
            const types = await getTypes();
            const catForm = new CatForm({ types });
            main.appendChild(catForm.renderDOM());
        }
        catch (err) {
            console.log('Load cats failed\n', err);
        }
        finally {
            loading.update({ loading: false });
        }
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    
                </main>
            </div>
        `;
    }
}

export default CatFormApp;