import moment from 'moment';
import { H1_SHOWTIME } from './DOM';


export const getDay = () => {
  let day = moment().format('dddd');
  return transferDay(day);
}

const transferDay = day => {
  // 영어 요일을 한글요일로 변경해주는 노가다 함수
  switch (day) {
    case 'Monday':
      return '월요일';
    case 'Tuesday':
      return '화요일';
    case 'Wednesday':
      return '수요일';
    case 'Thursday':
      return '목요일';
    case 'Friday':
      return '금요일';
    case 'Saturday':
      return '토요일';
    case 'Sunday':
      return '일요일';
    default:
      return '알 수 없음';
  };
}

export const getYear = () => {
  const year = moment().format('YYYY');
  return year;
}

export const getAp = () => {
  const ap = moment().format('LT').slice(-2);
  console.log(ap);
  return ap;
}

export const getTime = () => {
  const time = moment().format('LTS').slice(0, 7);
  return time;
}