import Component from '../Component.js';
import Header from '../common/Header.js';
import Signin from './Signin.js';
import Signup from './Signup.js';
import { signUp as userSignUp, signIn as userSignIn } from '../services/todo-api.js';

function success(user) {
    localStorage.setItem('TOKEN', user.token);
    localStorage.setItem('USER', user.displayName);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './cat-list.html';
}

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const user = localStorage.getItem('USER');
        if (user) {
            const logout = dom.querySelector('.logout-button');
            logout.addEventListener('click', () => {
                localStorage.removeItem('TOKEN');
                localStorage.removeItem('USER');
                this.update();
            });
            return;
        }
        const errors = dom.querySelector('.errors');
        const signInButton = dom.querySelector('.login-button');
        const signUpButton = dom.querySelector('.signup-button');
        const signInSection = dom.querySelector('.sign-in-section');
        const signUpSection = dom.querySelector('.sign-up-section');

        const signInForm = new Signin({
            onSignIn: async credentials => {
                errors.textContent = '';
                try {
                    const user = await userSignIn(credentials);
                    success(user);
                }
                catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });

        signInSection.appendChild(signInForm.renderDOM());

        const signUpForm = new Signup({
            onSignUp: async newUser => {
                errors.textContent = '';
                try {
                    const user = await userSignUp(newUser);
                    success(user);
                }
                catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });

        signUpSection.appendChild(signUpForm.renderDOM());

        signInButton.addEventListener('click', () => {
            signInSection.style.display = 'block';
            signUpSection.style.display = 'none';
        });

        signUpButton.addEventListener('click', () => {
            signUpSection.style.display = 'block';
            signInSection.style.display = 'none';
        });
        


    }

    renderHTML() {
        const user = localStorage.getItem('USER');

        if (user) {
            return /*html*/`
                <div>
                <h1>Welcome Back, ${user}</h1>
                <button class="logout-button">Log Out</button>
            `;

        }

        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <p class="errors"></p>

                    <button class="login-button">Login</button>
                    <button class="signup-button">Sign Up</button>

                    <div style="display:none;" class="sign-up-section"></div>
                    <div style="display:none;" class="sign-in-section"></div>

                </main>
            </div>
        `;
    }
}

export default App;