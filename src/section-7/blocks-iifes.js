// LECTURE: BLOCKS AND IIFEs

{
  const a = 1;
  let b = 2;
}

// ES5
(function() {
  var c = 3;
})();

console.log('c=' + c);
