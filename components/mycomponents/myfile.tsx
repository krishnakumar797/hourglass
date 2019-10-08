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

export default class MyFile extends React.Component {

    render() {
        return <Query<Data, Variables> client={client} query={query} fetchPolicy={'cache-and-network'}>
            {({ loading, data, error }) => {
                if (loading) {
                    return (<div>Loading..</div>);
                }
                if (error) {
                    return (<div>Error..</div>);
                }
                return (
                    <div>
                        <h1>My Authors </h1>
                        <div>
                            {data.profile && data.profile.map((a, i) => (
                                <div key={i}>
                                    <h2>{a.name}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }}
        </Query>;
    }
}