import { createStore } from 'redux';

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



// simple reducer example
const reducer = function(acc, item) {
  return acc + item;
}

console.log([1,2,3].reduce(reducer, 0));
