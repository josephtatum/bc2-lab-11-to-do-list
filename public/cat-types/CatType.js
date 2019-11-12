import Component from '../Component.js';

class CatType extends Component {

    onRender(dom) {
        const type = this.props.type;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            type.inactive = !type.inactive;
            onUpdate(type);
        });
        
        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            const confirmed = confirm(`Are you sure you want to remove "${type.name}"?`);
            if (confirmed) {
                onRemove(type);
            }
        });
    }

    renderHTML() {
        const type = this.props.type;

        return /*html*/`
            <li class="cat-type">
                <span class="${type.inactive ? 'inactive' : ''}">${type.name}</span>
                <div>
                    <button class="inactive-button">
                        Make ${type.inactive ? 'Active' : 'Inactive'}
                    </button>
                    
                    <button class="remove-button">
                        🗑
                    </button>
                </div>
            </li>
        `;
    }
}

export default CatType;