console.log('this is the main.js');

fetch('/cards')
  .then(res => res.json())
  .then(data => console.log(data));
