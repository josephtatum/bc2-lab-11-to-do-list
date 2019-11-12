import Component from '../Component.js';

class CatItem extends Component {
    renderHTML() {
        const cat = this.props.cat;

        return /*html*/`
            <li class="cat-item">
                <a href="cat-detail.html?id=${cat.id}">
                    <div class="info-container">
                        <h2>${cat.name}</h2>
                        <p class="cat-type">${cat.type}</p>
                    </div>

                    <div class="image-container">
                        <img src="${cat.url}" alt="${cat.name} image">
                    </div>
                    <p class="year">${cat.year}</p>
                </a>
            </li>
        `;
    }
}

export default CatItem;