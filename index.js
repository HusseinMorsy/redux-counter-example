import { createStore } from 'redux';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  case 'INCREMENT_BY':
    return state + action.value;
  case 'RESET':
    return 0;
  case 'DOUBLE':
    return state*2;
  default:
    return state;
  }
}

let store = createStore(counter);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'INCREMENT_BY', value: 10 });
store.dispatch({ type: 'RESET' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DOUBLE' });

class Counter extends Component {
  style() {
    return {fontFace: 'bold', color: '#00CC00', fontSize: '24px' };
  }
  render() {
    return <div style={this.style()}>{this.props.value}</div>;
  }
}

class App extends Component {
  render() {
    const { dispatch, value }  = this.props;
    return(
      <div>
        <h1>Unser Counter Beispiel</h1>
        <Counter value={value} />
        <button onClick={() => dispatch({type: 'INCREMENT'}) }>Increment</button>
        <button onClick={() => dispatch({type: 'DECREMENT'}) }>Decriment</button>
        <button onClick={() => dispatch({type: 'DOUBLE'}) }>Double</button>
        <button onClick={() => dispatch({type: 'RESET'}) }>Reset</button>
      </div>
    );
  }
}

let AppConnected = connect(select)(App);

function select(state) {
  return {
    value: state
  };
}
render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);

