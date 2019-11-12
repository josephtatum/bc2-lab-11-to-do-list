import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import CatList from './CatList.js';
import { getCats } from '../services/cat-api.js';

class CatListApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'List of Cats' });
        dom.prepend(header.renderDOM());

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());
        
        const main = dom.querySelector('main');
        const list = new CatList({ cats: [] });
        main.appendChild(list.renderDOM());

        try {
            const cats = await getCats();
            list.update({ cats: cats });
        }
        catch (err) {
            console.log('Load cats failed\n', err);
        }
        finally {
            // With quick response times, we can't see our loader
            // and it is so cool that we want it to be visible
            // awhile longer. :)
            setTimeout(() => {
                loading.update({ loading: false });
            }, 500);
        }
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main></main>
            </div>
        `;
    }
}

export default CatListApp;