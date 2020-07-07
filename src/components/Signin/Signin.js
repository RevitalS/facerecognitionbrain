import React from 'react';

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    validateEmail(email) 
    {
        var re = /\S+@\S+.\S/;
        return re.test(email);  
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }


    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitSignIn =() => {

        if (!this.state.email || ! this.state.password) {
            alert(`You didn't fill all the info. Please try again`);
        } 
        if (!this.validateEmail(this.state.email)) {
            alert('Your email is incorrect plase try again');
        }
        fetch(this.props.serverUrl + '/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    onGeustMode =() => {
         this.setState({email: 'geust@geust.com'});
         this.setState({password: 'geust'});
        fetch(this.props.serverUrl + '/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: 'geust@geust.com',
                password: 'geust'
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }

        })
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                            <div className="">
                            <input 
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit"
                            value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={this.onGeustMode} className="f6 link dim black db pointer">Continue as a Geust</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;