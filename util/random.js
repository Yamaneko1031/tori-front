export function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function randomArray(min, max) {
  let array = []
  let i
  for(i = min; i <= max; i++){
    array.push(i)
  }
  for(i = array.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
