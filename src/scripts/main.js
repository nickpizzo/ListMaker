import React from 'react';
import ReactDOM from 'react-dom';

const ListItem = React.createClass({

  handleClick: function() {
    // TODO: Remove this
    console.log(`You clicked ${this.props.name}!`);
    this.props.onRemoveName(this.props.index);
  },

  render: function() {

    return (
      <li onClick={this.handleClick}>{this.props.name}</li>
    );
  }
});

const ListForm = React.createClass({

  saveComment: function (event) {
    event.preventDefault();
    this.props.onSaveComment(this.refs.name.value);
  },

  render: function() {
    return (<form onSubmit={this.saveComment}>
      <input type="text" ref="name" />
      <button type="submit">Save </button>
    </form>);
  }
});

const ListMaker = React.createClass({
  getInitialState: function () {
    return {
      names: this.props.names
    }
  },

  addName: function (newName) {
    let names = this.state.names;
    names.push(newName);
    this.setState({
      names: names
    });
  },

  componentWillMount: function () { //what does this do?

  },

  removeName: function(index) {
    let names = this.state.names.slice();
    names.splice(index, 1);
    this.setState({
      names: names
    });
  },

  render: function() {
    let listItems = this.state.names.map((item, i) => {
      return <ListItem key={i} index={i} name={item} onRemoveName={this.removeName} />
    });
    return (<div>
      <h1>List Maker</h1>
      <ul>
        {listItems}
      </ul>
      <ListForm onSaveComment={this.addName} />
    </div>);
  }
});

document.addEventListener('DOMContentLoaded', () => { // reg js event listener, jquery removed
  ReactDOM.render(
    <ListMaker names={["Item1", "Jason", "Sandra", "Mark"]} /> , //jsx syntax for a component, javascript array inside of mustache brackets
    document.querySelector('.app')
  );
});
