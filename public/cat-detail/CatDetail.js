import Component from '../Component.js';

class CatDetail extends Component {
    renderHTML() {
        const cat = this.props.cat;
        const json = JSON.stringify(cat, true, 4);
        return /*html*/`
            <pre>${json}</pre>
        `;
    }
}

export default CatDetail;