import React from 'react';
import style from './style';
const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
};
export default class Layout extends React.Component {
    render() {
        return <div style={layoutStyle}>
            <div className="container">
                {this.props.children}
            </div>
            <p>checking style</p>
            <style jsx>
              {style}
           </style>
        </div>;
    }
}
