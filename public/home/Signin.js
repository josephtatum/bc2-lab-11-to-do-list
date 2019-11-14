import Component from '../Component.js';

class Signin extends Component {

    onRender(form) {
        
        const onSignIn = this.props.OnSignIn;
        

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);
            const user = {
                email: formData.get('email'),
                hash: formData.get('password')
            };

            onSignIn(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form>
                <div>
                    <label for="signin-email">Email:</label>
                    <input id="signin-email" type="email" name="email" required placeholder="you@somewhere.com">
                </div>
                <div>
                    <label for="signin-email">Password:</label>
                    <input id="signin-password" name="password" placeholder="password" type="password">
                </div>
                <button>Sign In</button>
            </form>
        `;
    }
}

export default Signin;