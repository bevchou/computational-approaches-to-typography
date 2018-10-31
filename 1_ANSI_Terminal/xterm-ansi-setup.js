let term = new xterm.Terminal({
  fontFamily: "Courier",
  fontSize: 18,
  rows: 20,
  cols: 60
});
term.open(document.getElementById('terminal'));
// term.fit();
// window.addEventListener('resize', function() {
//   term.fit();
// });
