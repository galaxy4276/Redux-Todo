import { createAction, handleActions } from 'redux-actions';


const INPUT_CHANGE = 'user/INPUT_CHANGE';
const AUTH_VERIFY = 'user/AUTH_VERIFY';


export const inputChange = createAction(INPUT_CHANGE, value => value);
export const authVerify = createAction(AUTH_VERIFY);


const userState = {
  input: '',
  login: false,
};


const userReducer = handleActions(
  {
    [INPUT_CHANGE]: (state, action) => ({
      ...state,
      input: action.payload
    }),
    [AUTH_VERIFY]: (state, action) => ({
      ...state,
      login: !state.login
    }),
  },
  userState
);


export default userReducer;