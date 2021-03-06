var news = [];
var storage;

document.addEventListener('DOMContentLoaded', function() {
  storage = new Provider();

  if (isOnline()) {
    var req = new XMLHttpRequest();
    req.open("GET", "/news", true);
    req.send();

    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status != 200) {
          console.log("Something goes wrong!");
        }
        else {
          var data = JSON.parse(req.responseText);
          for (i = 0; i < data.length; i++) {
            publishNews(data[i]);
          }
        }
      }
    }
  }

  window.addEventListener('online', function() {
    storage.provider.get('news', function(data) {
      if (data) {
        for (i = 0; i < data.length; i++) {
          publishNews(data[i]);
        }
        storage.provider.delete('news');
        news = [];

        var req = new XMLHttpRequest();
        req.open("POST", "/news", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              console.log("Something goes wrong!");
            }
            else {
              console.log('News successfuly transfered from provider to server!');
            }
          }
        }
      }
    });
  });
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
