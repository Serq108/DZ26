import React from 'react';
import './Login.css';
//import PropTypes from "prop-types";

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'Jabba',
      password: '',
      email: '',
    }
    this.handleChangeLog = this.handleChangeLog.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleChangeLog(event){
    this.setState({ username: event.target.value})
  }
  handleChangePass(event){
    this.setState({ password: event.target.value})
  }
  handleChangeEmail(event){
    this.setState({ email: event.target.value})
  }
  submitForm(){
    this.props.submit({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    });
  }
  gotoHome(){
    console.log('goto home');
    sessionStorage.setItem('mode', 'home');
    window.location.reload();
  }
  render(){
    return (
      <div className="reg-form">
        <h1>Registration</h1>
        <input ref={(log) => this._input = log} type="text" placeholder="Login" onChange={this.handleChangeLog}/>
        <input ref={(pass) => this._input = pass} type="password" name="password" placeholder="password" onChange={this.handleChangePass}/>
        <input ref={(mail) => this._input = mail} type="text" placeholder="Email" onChange={this.handleChangeEmail}/>
        <input type="submit" value="Send" onClick={this.submitForm}/>
        <div className="reg-link"  onClick={this.gotoHome}>Home</div>
      </div>
    )
  }
}
