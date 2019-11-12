import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'Famous Cats';

        return /*html*/`
            <header>
                <img class="logo" src="assets/alchemy-logo.png" alt="Alchemy Code Lab Logo">
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./cat-list.html">Cats</a>
                    <a href="./cat-form.html">Add a Cat</a>
                    <a href="./cat-types.html">Cat Types</a>
                </nav>
            </header>
        `;
    }
}

export default Header;