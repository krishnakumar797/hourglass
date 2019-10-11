import React from 'react';
import Header from '../components/common/header';
import LoginService from '../services/login/loginservice';
import Layout from '../components/common/layout';
import AddName from '../components/mycomponents/testfile';
import ReadName from '../components/mycomponents/myfile';

export default class Main extends React.Component<{ userAgent: string }, { name: string }> {

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
      <button onClick={evt => this.checkLogin()}>Submit</button>
       {this.state.name}
       <a href="/projects/newproject">here</a>
       <ReadName></ReadName>
       <AddName></AddName>
       </Layout>
      </div>;
  }
}