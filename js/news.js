var news = []

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('news')) {
    news = JSON.parse(localStorage.getItem('news'))
    for (i = 0; i < news.length; i++) {
      publishNews(news[i]);
    }
  }
});

window.addEventListener('online', function() {
  if (localStorage.getItem('news')) {
    localStorage.removeItem('news')
    news = []
    // Data Transfer function
    console.log('News successfuly transfered from localStorage to server!')
  }
});

function publishNews(data) {
  var generalDiv = document.createElement('div');
  generalDiv.className = "card news-card";

  var image = document.createElement('img');
  image.src = data.img;
  image.className = "card-img-top";
  image.alt = "News";

  var bodyDiv = document.createElement('div');
  bodyDiv.className = "card-body";

  var title = document.createElement('h5');
  title.className = "card-title";
  title.innerHTML = data.title;

  var body = document.createElement('p');
  body.className = "card-text";
  body.innerHTML = data.body;

  bodyDiv.appendChild(title);
  bodyDiv.appendChild(body);

  generalDiv.appendChild(image);
  generalDiv.appendChild(bodyDiv);

  document.getElementById('news').appendChild(generalDiv);
}

function isOnline() {
  return window.navigator.onLine;
}
