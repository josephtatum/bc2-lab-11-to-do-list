import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import CatDetail from './CatDetail.js';
import { getCat } from '../services/cat-api.js';

class CatDetailApp extends Component {

    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const loading = new Loading({ loading: true });
        main.appendChild(loading.renderDOM());
        
        // extracting query param for id of cat to get
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');

        // no id? bail and go back to list
        if (!id) {
            window.location = 'cat-list.html';
            return;
        }

        try {
            const cat = await getCat(id);
            const catDetail = new CatDetail({ cat: cat });
            main.appendChild(catDetail.renderDOM());
        }
        catch (err) {
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
                <main>
                    
                </main>
            </div>
        `;
    }
}

export default CatDetailApp;