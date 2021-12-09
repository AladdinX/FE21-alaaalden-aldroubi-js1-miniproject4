const api_key = '33cb1898c0e2867524bc169b333e42ec';
const searchBtn = document.querySelector('button');
const div = document.querySelector('#warper');
const txtInput = document.querySelector('.input-search');
let number = document.querySelector('#quantity');

searchBtn.addEventListener(
  'click', function app() {
    if (number.value == '') {
      alert('plz write a number')
    } if (txtInput.value == '') {
      alert('plz write a text')
    }
    const divEl = document.querySelectorAll('#warper *')
    for (let el of divEl) { el.remove() };
    setMessage("Searching for...");
    searchImage(txtInput.value, number.value);
    animateMessage.play();
  }
)

function searchImage(searchText, searchNumber) {
  const url = `https://www.flickr.com/services/rest/?api_key=${api_key}&method=flickr.photos.search&text=${searchText}&sort=relevance&safe_search=1&accuracy=1&content_type=1&format=json&nojsoncallback=1&per_page=${searchNumber}&page=6`;
  fetch(url).then(
    function (response) {
      // console.log(response);
      if (response.status >= 200 && response.status < 300) {
        // console.log(response.json())
        return response.json();
      }
      else {
        throw 'Something went wrong. :(';
      }
    }
  ).then(
    function (data) {
      console.log(data);
      const h2 = document.querySelector("#message");
      h2.style.display = "none";
      for (let i = 0; i < searchNumber; i++) {
        getImageUrl(data.photos.photo[i]);
      }
      addImageGallery();
      animateMessage.pause();

    }
  ).catch(
    function (error) {
      setMessage("Something went wrong. :( Try again!");
    }
  );
}

function getImageUrl(photoObject) {
  let photo = photoObject;
  let size1 = 'n';
  let size2 = 'b';
  let smallUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size1}.jpg`;
  let bigUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size2}.jpg`;
  displayImg(bigUrl, smallUrl);
}

function displayImg(urlB, urlS) {
  let link = document.createElement('a');
  link.dataset.fslightbox = 'gallery';
  link.href = urlB;
  let img = document.createElement('img');
  img.src = urlS;
  link.appendChild(img);
  div.appendChild(link);
}

setTimeout(function () {
  document.querySelector('h3').innerText = '';
}, 10000);

//fslightbox-js
function addImageGallery() {
  let script = document.createElement('script');
  script.src = "js/fslightbox.js";
  document.body.appendChild(script)
}

//p5-js
let trail = [];
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  noStroke();
}
function draw() {
  background(189);
  textAlign(CENTER);
  textSize(250)
  fill(255);
  text(txtInput.value, 750, 400);
  fill(255);
  trail.push(new p5.Vector(mouseX, mouseY));
  if (trail.length > 25) {
    trail.shift();
  }
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    let size = 50.0 * i / trail.length;
    if (mouseIsPressed) {
      size = 200.0 * i / trail.length;
    }
    circle(p.x, p.y, size);
  }
}

//Anime-js
let animateMessage = anime({
  targets: message,
  scale: 3,
  direction: 'alternate',
  duration: 500,
  loop: 10,
  color: 'rgb(250, 250, 250)'
})

function setMessage(message) {
  let h2 = document.getElementById("message");
  console.log(h2);
  h2.style.display = "block";
  h2.innerText = message;
}