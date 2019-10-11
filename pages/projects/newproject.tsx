import React from 'react';
import Layout from '../../components/common/layout';
import Header from '../../components/common/header';

export default class NewProject extends React.Component {

    render() {
        return <div>
            <Header></Header>
            <Layout>
                Test server side rendered react application
            </Layout>
        </div>;
    }

}