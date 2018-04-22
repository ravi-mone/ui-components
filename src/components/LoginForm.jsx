/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Input from './Input';
import { setCookie, getCookie, removeCookie, isEmpty } from './utility-functions';
import './LoginForm.css'
const REMEMBER_ME = 'REMEMBER_ME';
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.modifyRememberMeData = this.modifyRememberMeData.bind(this);
        this.getRememberMeData = this.getRememberMeData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        this.getRememberMeData();
    }

    getRememberMeData() {
        const user = getCookie(REMEMBER_ME);
        if (user) {
            this.setState({
                username: user.username,
                password: user.password,
                remember: true,
                errorMsg: ''
            });
        }
    }

    handleCheckBox(isChecked) {
        this.setState({
            remember: !isChecked,
        });
    }

    modifyRememberMeData() {
        if (this.state.remember) {
            const dt = new Date();
            setCookie(REMEMBER_ME, JSON.stringify({ username: this.state.username, password: this.state.password }), dt.setMonth(dt.getMonth() + 30));
        } else {
            removeCookie(REMEMBER_ME);
        }
    }

    componentWillReceiveProps() {
        if(this.props.inValidUser){
            this.setState({
                errorMsg: 'Invalid user'
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        const { username, password, remember } = this.state;

        if (username && password) {
            if (remember) {
                this.modifyRememberMeData();
            }
            this.props.handleSubmit(username, password);
        }else{
            if(!username){
                this.setState({
                    errorMsg: 'Username is required'
                })
            }else if(!password){
                this.setState({
                    errorMsg: 'Password is required'
                })
            }
        }
    }

    handleChange(key, value) {
        this.setState({ [key]: value});
    }

    render() {

        let {username, password, remember, submitted, errorMsg} = this.state;
        return (

            <div className="login-box">
                <div id="logo" className="logo">
                    <img src={this.props.logoSrc} alt="Logo" />
                </div>
                <div className="login-overlay">




            <form onSubmit={this.handleSubmit} name="loginForm" className="login-form" id="loginForm">
                <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
                    <div className="input-group">
                            <Input
                                refkey='username'
                                labelClass='label-heading'
                                autoFocus={true}
                                title='Username'
                                onValidate={() => {}}
                                type='text'
                                className='user-name'
                                onFocus={() => {
                                    if(this.state.errorMsg)
                                        this.setState({
                                            errorMsg:''
                                        })
                                }}
                                onBlur={() => {

                                }}
                                value={username}
                                onChange={this.handleChange} />
                    </div>
                </div>
                <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
                    <div className="input-group">
                            <Input
                                refkey='password'
                                labelClass='label-heading'
                                title='Password'
                                onValidate={() => {}}
                                type='password'
                                className='password'
                                onFocus={() => {
                                    if(this.state.errorMsg)
                                        this.setState({
                                            errorMsg:''
                                        })
                                }}
                                onBlur={() => {}}
                                value={password}
                                onChange={this.handleChange} />
                    </div>
                </div>
                <div className="col-md-12 zero-padding ">
                    <Checkbox
                        label="remember_me"
                        handleCheckboxChange={this.handleCheckBox}
                        key="login"
                    >
                        <span className="remember-txt">Remember Me</span>
                    </Checkbox>
                    <a className="forgot-password pull-right" href="/session/forgotPassword">Forgot Password?
                    </a>
                </div>
                {submitted && errorMsg &&
                <div className="error-msg">{errorMsg}</div>
                }
                <div className="form-group">
                    <input
                        type="submit"
                        name="_submit"
                        value="Sign In"
                        className="btn btn-login form-control"
                        id="signInBtn"
                    />
                </div>
            </form>
                </div>
            </div>
        );
    }
}
LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    inValidUser: PropTypes.any,
    logoSrc: PropTypes.string.isRequired
};
LoginForm.defaultProps = {
    username: '',
    password: '',
};
export default LoginForm;
