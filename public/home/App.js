import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <a href="cat-list.html">
                        <img class="hero" 
                            src="assets/famous-cats.jpeg" 
                            alt="famous cats image">
                    </a>
                </main>
            </div>
        `;
    }
}

export default App;