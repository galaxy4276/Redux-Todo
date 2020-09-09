import { createAction, handleActions } from 'redux-actions';
import { getYear, getDay, getAp, getTime } from '../modules/Date';

// Redux Action 정의
const DRAWYEAR = 'date/DRAWYEAR';
const DRAWDAY = 'date/DRAWDAY';
const DRAWTIME = 'date/DRAWTIME';
const DRAWAP = 'date/DRAWAP';


// Action Craetor 함수 정의
export const dateDrawYear = createAction(DRAWYEAR);
export const dateDrawTime = createAction(DRAWTIME);
export const dateDrawDay = createAction(DRAWDAY);
export const dateDrawAP = createAction(DRAWAP);


const state = {
  year: null,
  day: null,
  ap: null, // AM인지 PM인지
  time: null,
};


const dateReducer = handleActions(
  {
    [DRAWYEAR]: state => ({
      ...state,
      year: getYear(),
    }),
    [DRAWDAY]: state => ({
      ...state,
      day: getDay(),
    }),
    [DRAWAP]: state => ({
      ...state,
      ap: getAp()
    }),
    [DRAWTIME]: state => ({
      ...state,
      time: getTime(),
    }),
  },
  state
)


export default dateReducer;