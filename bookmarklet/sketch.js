
window.addEventListener('load', function() {
  var textnodes = textNodesUnder(document.body);
  for (let i = 0; i < textnodes.length; i++) {
    let newNode = document.createElement('charGroup');
    newNode.innerHTML = textToParticle(textnodes[i].nodeValue);
    textnodes[i].parentNode.replaceChild(newNode, textnodes[i]);
    if (i == textnodes.length - 1) {
      allWords = document.getElementsByTagName('word');
      document.body.addEventListener('mousemove', function(e) {
        animateLetters(e.clientX, e.clientY);
      });
      lightSensor();
      console.log('done converting elements');
    }
  }


  function animateLetters(mouseX, mouseY) {
    let activeItems = document.elementsFromPoint(mouseX, mouseY);
    let letter = activeItems.find(letter => letter.localName == "character");
    if (letter) {
      let posData = letter.getBoundingClientRect();
      let dx = (mouseX - posData.x) * 1.25;
      let dy = -(mouseY - posData.y) * 1.25;
      letter.animate([{
          transform: "translate(0px, 0px)"
        },
        {
          transform: "translate(" + dx + "px," + dy + "px )"
        },
        {
          transform: "translate(0px, 0px)"
        }
      ], {
        duration: 1200,
        easing: "ease-out",
      });
    }

  }


  function textToParticle(string) {
    var char, chars;
    chars = (function() {
      let ref = string.split('');
      let results = [];
      for (let i = 0; i < ref.length; i++) {
        char = ref[i];
        if (!/^\s*$/.test(char)) {
          results.push("<character style='display:inline-block;' class='dostuff animate'>" + char + "</character>");
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

  function textNodesUnder(el) {
    var n, a = [],
      b = []
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) a.push(n);
    for (let i = 0; i < a.length; i++) {
      if (a[i].nodeValue.replace(/[\n\r]+/g, '')) {
        b.push(a[i]);
      }
    }
    return b;
  }

  function lightSensor() {
    if ('AmbientLightSensor' in window) {
      const sensor = new AmbientLightSensor();
      sensor.onreading = () => {
        let luxLevel = sensor.illuminance;
        if (luxLevel <= 35) {
          let scaleFactor = mapRange(luxLevel, 0, 40, 0.3, 1);
          for (i = 0; i < allWords.length; i++) {
            allWords[i].style.opacity = scaleFactor;
          }
        } else {
          document.body.style.opacity = 1;
        }
      };
      sensor.onerror = (event) => {
        console.log(event.error.name, event.error.message);
      };
      sensor.start();
    }
  }

});



function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}
