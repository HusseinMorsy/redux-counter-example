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

// Redux store
let store = createStore(counter);

// log after each state change
store.subscribe(() =>
  console.log(store.getState())
);

// action dispatching demo, without UI
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'INCREMENT_BY', value: 10 });
store.dispatch({ type: 'DOUBLE' });
store.dispatch({ type: 'RESET' });


// React Components

class Counter extends Component {
  render() {
    const style = {fontFace: 'bold', color: '#00CC00', fontSize: '24px' };
    return <div style={style}>{this.props.value}</div>;
  }
}

class App extends Component {
  render() {
    // the probs are auto injected by the connect function
    const { dispatch, value }  = this.props;
    return(
      <div>
        <h1>Redux Counter Example</h1>
        <Counter value={value} />
        <button onClick={() => dispatch({type: 'INCREMENT'}) }>Increment</button>
        <button onClick={() => dispatch({type: 'DECREMENT'}) }>Decriment</button>
        <button onClick={() => dispatch({type: 'DOUBLE'}) }>Double</button>
        <button onClick={() => dispatch({type: 'RESET'}) }>Reset</button>
      </div>
    );
  }
}

// the selector selects data from the state. Here use the identify function 
// to get the "full" state
function select(state) {
  return {
    value: state
  };
}

// connect the selector to the App component and return a new connected Component
let AppConnected = connect(select)(App);

// main react render function
render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);
