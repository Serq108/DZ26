import React from 'react';
import LoginForm from './LoginForm'
import Logout from './Logout'
import RegForm from './RegForm'

let mode = 'home';
console.log('entry point');

const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const checkAuth = () => {
  fetch('course/', {
    method: 'GET',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
  }).then( ans => ans.json())
      .then((res) => {
        console.log(res);
        console.log(res.length);
      })
    .catch((error) => console.error('Ошибка:', error));
};

checkAuth();

const logout = () => {
  fetch('api-auth/logout/', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken'),
    },
  }).then((chck) => checkAuth())
      .catch((error) => console.error('Ошибка:', error));
};

const authPost = (data) => {
  fetch('api-auth/login/', {
    method: 'POST',
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrer: 'no-referrer', // no-referrer, *client
    body: data,
    // body: 'username=mihan&password=123'
  }).then( (res) => console.log(res))
    .catch((error) => console.error('Ошибка:', error));
};

const regPost = (data) => {
  fetch('reg/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer', // no-referrer, *client
    body: data
  }).then( ans => ans.text())
    .then( (res) => console.log(res))
    .catch((error) => console.error('Ошибка:', error));
};

export default class FormWrapper extends React.Component {
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.submitLog = this.submitLog.bind(this);
    this.submitReg = this.submitReg.bind(this);
  }
  submitForm(eventData){
    console.log(eventData);
    let data = 'username' + '=' + eventData.username + 
      '&' + 'password' + '=' + eventData.password;
    console.log(data);
    authPost(data);
  }
  submitLog(eventData){
    console.log(eventData.logout);
    if(eventData.logout){
      logout();
    }
  }
  submitReg(eventData){
    console.log(JSON.stringify(eventData));
    let data = JSON.stringify(eventData);
    regPost(data);
  }
  render(){
    mode = sessionStorage.getItem('mode');
    if(!mode) mode = 'home';
    if(mode === 'home') {
      return (
       <div className="form"> 
         <LoginForm submit={this.submitForm}></LoginForm>
         <Logout submit={this.submitLog}></Logout>
       </div>
      )
    }
    if (mode === 'reg') {
      return (
        <div className="form"> 
          <RegForm submit={this.submitReg}></RegForm>
        </div>
      )
    }
  }
}
