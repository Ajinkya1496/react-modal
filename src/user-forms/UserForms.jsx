import React from 'react';
import Modal from '../modal/Modal';
import { navigate } from '@reach/router';
import './UserForms.css';

class UserForms extends React.Component {
    state = {
        showLogin: false,
        showSignUp: false,
    }

    toggleSignUp = (e) => {
        this.setState({ showSignUp: !this.state.showSignUp });
    }

    toggleLogin = (e) => {
        this.setState({ showLogin: !this.state.showLogin });
    }

    render() {
        return (
            <>  
                <div className="mt-auto">
                    <button className="btn btn-secondary mr-10" onClick={this.toggleSignUp}>Sign Up</button>
                    <button className="btn btn-primary" onClick={this.toggleLogin}>Login</button>
                </div>

                <Modal show={this.state.showLogin} onClose={this.toggleLogin}>
                    <form onSubmit={() => navigate('dashboard')}>
                        <div className="form-fields">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input id="email" type="text" name="email" placeholder="Email" required /><br />
                        </div>
                        <div className="form-fields">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" placeholder="Password" required /><br />
                        </div>

                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                </Modal>

                <Modal show={this.state.showSignUp} onClose={this.toggleSignUp}>
                    <form onSubmit={() => navigate('dashboard')}>
                        <div className="form-fields">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input id="email" type="text" name="email" placeholder="Email" required /><br />
                        </div>
                        <div className="form-fields">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" placeholder="Password" required /><br />
                        </div>
                        <div className="form-fields">
                            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" required /><br />
                        </div>
                        <button className="btn btn-secondary" type="submit">Sign Up</button>
                    </form>
                </Modal>
            </>
        );
    }
}

export default UserForms;