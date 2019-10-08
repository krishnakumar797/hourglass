import React from 'react';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import client from '../../config';

const query = gql`
mutation insertProfile($objects: [profile_insert_input!]! ) {
    insert_profile(objects: $objects) {
      returning {
        id
        name
      }
    }
  }
`

export default class AddName extends React.Component {


    render() {
        return <Mutation client={client} mutation={query}>
            {
                (insert_profile) => <TestFile insertProfile={insert_profile}></TestFile>

            }
        </Mutation>
    }

}

class TestFile extends React.Component<any, { inputValue: string }> {

    constructor(props) {
        super(props)  
        this.state = {
            inputValue: ''
        };
    }

    handleChange (evt) {
        const mynameState = this.state;
        mynameState[evt.target.name] = evt.target.value;
        this.setState({ "inputValue": mynameState.inputValue });
    }

    submit() {
        this.props.insertProfile({ variables: { "objects": [{ "name": this.state.inputValue }] } });
        this.setState({
            inputValue: ''
          });
    }

    render() {
        return <div>
            <form>
                <input value={this.state.inputValue} name="inputValue" onChange={evt => this.handleChange(evt)}/>
                <button type="button" onClick={evt => this.submit()}>Add Todo</button>
            </form>
        </div>

    }
}