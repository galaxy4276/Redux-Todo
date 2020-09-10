const { INPUT_USER } = require("./DOM");

let input = '';
let loginState = false;



function userInput(e) {
  e.preventDefault();
  input = e.target.value;
  loginState = true;
  return;
}


function user() {
  INPUT_USER.addEventListener('change', userInput);
}

export default user;