/*
  TODO:

*/

let view = 1;
let v_input = document.getElementById('view_input');
let v_output = document.getElementById('view_output');

let f_output = document.getElementById('field_output');
let f_input = document.getElementById('field_input');

let f_key = document.getElementById('field_key');

let l_output = document.getElementById('log_output');

let alpha = "qwertyuiopasdfghjklzxcvbnm"

function encodeText() {
  let text = f_input.value;
  let output = "";
  let binary = "";
  let key = (f_key.value).toLowerCase();
  let rest = alpha;
  let padding = "00000000";

  if(!validateKey()){
    return 0;
  }

  for(let k of key){
    rest = rest.replace(k, "");
  }

  for(let i = 0; i < text.length; i++){
    let binaryNumber = text.charCodeAt(i).toString(2);
    binaryNumber = padding.substring(0, (8-binaryNumber.length)) + binaryNumber;
    binary += binaryNumber;
  }

  for (let i = 0; i < binary.length; i++) {
    let randomIndex = Math.floor(Math.random() * 13);
    if(binary[i] == 0){
      output += key.substr(randomIndex, 1);
    }else if(binary[i] == 1){
      output += rest.substr(randomIndex, 1);
    }
  }

  f_output.value = output;

  changeView();
}

function decodeText() {
  let text = f_input.value;
  let output = "";
  let binary = "";
  let key = (f_key.value).toLowerCase();
  let rest = alpha;

  if(!validateKey()){
    return 0;
  }

  for(let k of key){
    rest = rest.replace(k, "");
  }

  for(let c of text){
    if(key.includes(c)){
      binary += "0";
    } else if (rest.includes(c)) {
      binary += "1";
    }
  }

  for(let i = 0; i < binary.length; i += 8){
    output += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
  }


  f_output.value = output;

  changeView();
}

function changeView() {
  view *= -1;
  if(view === 1){
    v_input.style.display = "flex";
    v_output.style.display = "none";
  }else{
    v_input.style.display = "none";
    v_output.style.display = "flex";
  }
}



/*
Check if key is valid.
*/
function validateKey() {
  let key = (f_key.value).toLowerCase();
  let checked = "";
  let error_log = "";
  let error_output = "";
  let valid = true;

  const error_text = ["Key needs to be 13 letters", "Key must contain letters a-z only", "Duplicate letters in key are not allowed"];

  // Key must be 13 chars long
  if(key.length !== 13){
    error_log += "0";
    valid = false;
  }

  // Key cannot have duplicate letters and must be a-z only
  for(let k of key){
    if(!alpha.includes(k)){
      if(!error_log.includes("1")){
        error_log += "1";
        valid = false;
      }
    }
    if (checked.includes(k)){
      if(!error_log.includes("2")){
        error_log += "2";
        valid = false;
      }
    }
    checked += k;
  }

  if(error_log){
    error_output = "Key is invalid: ";
    for(let e of error_log){
      error_output += "<br>" + error_text[e];
    }
  }

  l_output.innerHTML = error_output;

  return valid;

}
