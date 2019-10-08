import React from 'react';
import Header from '../components/common/header';
import LoginService from '../services/login/loginservice';
import Layout from '../components/common/layout';
import MyFile from '../components/mycomponents/myfile';
import TestFile from '../components/mycomponents/testfile';
import AddName from '../components/mycomponents/testfile';

class Main extends React.Component<{ userAgent: string }, { name: string }> {

  constructor(props){
    super(props);
    this.state = { name: undefined };
  }
  
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  checkLogin(){
    let ls: LoginService = new LoginService();
    ls.login({'username':'kk'}).then(result => {
      this.setState({name: result.title});
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return <div>
      <Header></Header>
      <Layout>
      Hello World {this.props.userAgent}
      <button onClick={this.checkLogin.bind(this)}>Submit</button>
       {this.state.name}
       <MyFile></MyFile>
       <AddName></AddName>
       </Layout>
      </div>;
  }
}

export default Main;
  