const apiKey = '0c227678969d4b6bb3e173717240910';

var button = document.querySelector('button');
var box = document.getElementById('square');

function changeColor() {
    if(box.style.background == 'red') {
        box.style.background = 'blue';
    }else {
        box.style.background = 'red';
    }
}
