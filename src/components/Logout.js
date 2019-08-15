import React from 'react';

export default class Logout extends React.Component {
  constructor(props){
    super(props);
    this.state = {logout: false}
    this.submitLog = this.submitLog.bind(this);
  }
  submitLog(){
    //debugger
    console.log(this.state.logout);
    this.setState({ logout: true })
    this.props.submit({ logout: this.state.logout });
  }
  render(){
    return (
        <input type="submit" value="logout" onClick={this.submitLog}/>
    )
  }
}
