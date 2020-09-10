import './modules/Date.js';
import './scss/index.scss';
import { createStore } from 'redux';
import rootReducer from './redux/index.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import { P_YEAR, P_DAY, P_AP, SPAN_TIME, INPUT_USER, BTN_USER, P_SHOWUSER } from './modules/DOM.js';
import { dateDrawTime, dateDrawYear, dateDrawDay, dateDrawAP } from './redux/dateReducer';
import { inputChange, authVerify } from './redux/userReducer.js';
import { setTimeState } from './modules/Date.js';
import { saveUser, getUser, removeUser } from './modules/storage.js';


const store = createStore(rootReducer, composeWithDevTools());

const render = () => {
  const state = store.getState();
  const date = state.dateReducer;
  const user = state.userReducer;

  // Date
  function drawTime() {
    if (date.year !== null) 
      P_YEAR.innerHTML = date.year;
    if (date.year !== null) 
      P_DAY.innerHTML = date.day;
    if (date.ap !== null) 
      P_AP.innerHTML = date.ap;
    if (date.time !== null)
      SPAN_TIME.innerHTML = date.time;
  }
  drawTime();

  // User
  if (user.login) {
    INPUT_USER.style.visibility = 'hidden';
    BTN_USER.textContent = '로그 아웃';
    BTN_USER.addEventListener('click', removeUser);
    P_SHOWUSER.textContent = `${user.input} ${setTimeState()}`;
  }
  if (!user.login) {
    P_SHOWUSER.textContent = null;
    BTN_USER.textContent = '로그인';
    BTN_USER.removeEventListener('click', removeUser);
    INPUT_USER.style.visibility = 'visible';
  }
}


store.subscribe(render); // store 내부 상태를 지속적으로 감시한다.
// 말 즉슨 상태값들이 변경될떄마다 render함수를 다시 렌더링한다.


window.onload = () => {
  // Date 관련 로직
  function setTime() {
    // 초기 실행 시 일단 년도와 요일을 화면에 그린다.
    store.dispatch(dateDrawYear());
    store.dispatch(dateDrawDay());
    // 로딩효과를 주기위해 AM,PM 은 0.5초 로딩을 지연시킨다.
    setTimeout(() => {
      store.dispatch(dateDrawAP());
    }, 500);
    // 시간은 매 1초마다 업데이트한다.
    setInterval(() => {
      store.dispatch(dateDrawTime());
    }, 1000);
    // AP는 1시간마다 업데이트한다.
    setInterval(() => {
      store.dispatch(dateDrawAP());
    }, 300000);
    // 나머지는 5시간마다 업데이트한다.
    setInterval(() => {
      store.dispatch(dateDrawYear());
      store.dispatch(dateDrawDay());
    }, 18000000);
  }
  setTime(); // 시간 드로우 함수

  // User 관련 로직
  function init() {
    const user = getUser();
    if (user !== null) {
      store.dispatch(inputChange(user));
      store.dispatch(authVerify());
    }
  }
  init();

  INPUT_USER.onchange = (e) => {
    const userInput = e.target.value;

    function verify(value) {
      const reg = /[a-z | ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/ig;
      if (value[0] == (' ' || '  ' || '   '))
        return false;
      if (reg.test(value))
        return true;
    }

    const checkDigit = verify(userInput);

    if (checkDigit) {
      saveUser(userInput);
      store.dispatch(inputChange(userInput));
      store.dispatch(authVerify());
    } else {
      window.alert('이름을 제대로 입력해주세요.');
    }
  }

  BTN_USER.onclick = () => { 
    const state = store.getState();
    if (state.userReducer.login === false) {
      removeUser();
    }

    (state.userReducer.input !== '')
      ? store.dispatch(authVerify())
      : window.alert('이름을 제대로 입력해주세요.');
  };
};