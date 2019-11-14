import Component from '../Component.js';

class Signup extends Component {

    onRender(form) {

        const onSignUp = this.props.onSignUp;
        

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const user = {
                email: formData.get('email'),
                password: formData.get('password'),
                display_name: formData.get('name')
            };
            debugger;
            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form>
                <div>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Your Name">
                </div>
                <div>
                    <label for="signup-email">Email:</label>
                    <input id="signup-email" type="email" name="email" required placeholder="you@somewhere.com">
                </div>
                <div>
                    <label for="signup-password">Password:</label>
                    <input id="signup-password" name="password" placeholder="password" type="password">
                </div>
                <button>Sign Up</button>
            </form>
        `;
    }
}

export default Signup;