let options = {  year: 'numeric', month: '2-digit', day: 'numeric' };
const date = new Date();
console.log(date.toLocaleString('en-US', options));