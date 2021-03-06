// links
// https://stackoverflow.com/questions/18643766/find-and-replace-specific-text-characters-across-a-document-with-js
// https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
// https://developer.mozilla.org/en-US/docs/Web/API/Text
// https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/elementsFromPoint
// https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/elementFromPoint



window.addEventListener('load', function() {

  //get all text nodes in the webpage
  var textnodes = textNodesUnder(document.body);
  console.log(textnodes);
  for (let i = 0; i < textnodes.length; i++) {
    //new element for each node
    let newNode = document.createElement('charGroup');
    newNode.innerHTML = textToParticle(textnodes[i].nodeValue);
    textnodes[i].parentNode.replaceChild(newNode, textnodes[i]);
    if (i == textnodes.length - 1) {
      changeLetters();
      console.log('done');
    }
  }

  //modify css of elements
  function changeLetters() {
    document.addEventListener('mousemove', function(e) {
      let activeItems = document.elementsFromPoint(e.x, e.y);
      // test = activeItems;
      // console.log(test);
      let letter = activeItems.find(letter => letter.localName == "characater");
      if (letter) {
        letter.style.color = "red";
      }
    });
  }


  //borrowed from https://github.com/plehoux/fontBomb/blob/master/js/explosion.js
  //look at "explosifyText" function
  function textToParticle(string) {
    var char, chars, index;
    chars = (function() {
      let ref = string.split('');
      let results = [];
      for (let i = 0; i < ref.length; i++) {
        char = ref[i];
        if (!/^\s*$/.test(char)) {
          results.push("<characater style='display:inline-block;'>" + char + "</characater>");
        } else {
          results.push('&nbsp;');
        }
      }
      return results;
    })();
    chars = chars.join('');
    chars = (function() {
      let ref = chars.split('&nbsp;');
      let results = [];
      for (let i = 0; i < ref.length; i++) {
        char = ref[i];
        if (!/^\s*$/.test(char)) {
          results.push("<word style='white-space:nowrap'>" + char + "</word>");
        } else {
          results.push(char);
        }
      }
      return results;
    })();
    return chars.join(' ');
  };


// https://stackoverflow.com/questions/22921242/remove-carriage-return-and-space-from-a-string
// https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
  function textNodesUnder(el) {
    //get all the text nodes
    var n, a = [], b = []
      walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) a.push(n);
    //remove all text nodes with whitespace or carriage return
    for (let i =0; i < a.length; i++){
      if (a[i].nodeValue.replace(/[\n\r]+/g, '')){
        b.push(a[i]);
      }
    }
    return b;
  }

});
