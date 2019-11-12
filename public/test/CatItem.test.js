import CatItem from '../cat-list/CatItem.js';
const test = QUnit.test;

QUnit.module('Render Cat Item');

test('renders html from data', assert => {
    // arrange
    const cat = {
        id: 3,
        name: 'Felix',
        type: 'Tuxedo',
        url: 'assets/cats/felix.png',
        year: 1892
    };

    const expected = /*html*/`
        <li class="cat-item">
            <a href="cat-detail.html?id=3">
                <div class="info-container">
                    <h2>Felix</h2>
                    <p class="cat-type">Tuxedo</p>
                </div>

                <div class="image-container">
                    <img src="assets/cats/felix.png" alt="Felix image">
                </div>
                <p class="year">1892</p>
            </a>
        </li>
    `;

    // act
    const props = { cat: cat };
    const catItem = new CatItem(props);
    const html = catItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});