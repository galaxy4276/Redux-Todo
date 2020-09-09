import './modules/Date.js';
import './scss/index.scss';
import { createStore } from 'redux';
import rootReducer from './redux/index.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import { P_YEAR, P_DAY, P_AP, SPAN_TIME } from './modules/DOM.js';
import { dateDrawTime, dateDrawYear, dateDrawDay, dateDrawAP } from './redux/dateReducer';


console.log('Hello World!');

const store = createStore(rootReducer, composeWithDevTools());

const render = () => {
  const state = store.getState();
  const date = state.dateReducer;
  console.log(date);

  if (date.year !== null) 
    P_YEAR.innerHTML = date.year;
  if (date.year !== null) 
    P_DAY.innerHTML = date.day;
  if (date.ap !== null) 
    P_AP.innerHTML = date.ap;
  if (date.time !== null)
    SPAN_TIME.innerHTML = date.time;
}

store.subscribe(render);

window.onload = () => {
  store.dispatch(dateDrawYear());
  store.dispatch(dateDrawDay());
  store.dispatch(dateDrawAP());
  setInterval(() => store.dispatch(dateDrawTime()), 1000);
};