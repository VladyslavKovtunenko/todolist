/*export var React = require('react');
export var ReactDOM = require('react-dom');*/
import React from 'react'
import ReactDOM from 'react-dom'

export var template = React.createClass({
    render: function () {
        return <ol>
            <li>{this.props.title}
                <ul>
                    <li>{this.props.description}</li>
                </ul>
                <p>
                    <button type='button' data-action='delete'>Delete task</button>
                </p>
            </li>
        </ol>;
    }
});