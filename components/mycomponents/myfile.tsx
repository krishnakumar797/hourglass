import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import client from '../../config';

const query = gql`
   query {
       profile(where: {id: {_eq: 1}}) {
        id
        name
   }
}
`

interface Data {
    profile: Array<{ id: string; name: string }>;
};

interface Variables {
    first: number;
};

export default class ReadName extends React.Component {

    render() {
        return <Query<Data, Variables> client={client} query={query} fetchPolicy={'cache-and-network'}>
            {
                ({ loading, data, error }) => <MyFile loading={loading} data={data} error={error}></MyFile>

            }
        </Query>
    }

}

class MyFile extends React.Component<any, { loading: string, data: Data, error: string }> {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.loading) {
            return (<div>Loading..</div>);
        }
        if (this.props.error) {
            return (<div>Error..</div>);
        }
        return <div>
            <h1>My Authors </h1>
            <div>
                {this.props.data.profile && this.props.data.profile.map((a, i) => (
                    <div key={i}>
                        <h2>{a.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    }
}