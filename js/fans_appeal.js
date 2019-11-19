var appeals = [];
var storage;

document.addEventListener('DOMContentLoaded', function() {
  storage = new Provider();

  if (isOnline()) {
    var req = new XMLHttpRequest();
    req.open("GET", "/fans_appeal", true);
    req.send();

    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status != 200) {
          console.log("Something goes wrong!");
        }
        else {
          var data = JSON.parse(req.responseText);
          for (i = 0; i < data.length; i++) {
            publishAppeal(data[i]);
          }
        }
      }
    }
  }

  window.addEventListener('online', function() {
    storage.provider.get('appeals', function(data) { 
      if (data) {
        for (i = 0; i < data.length; i++) {
          publishAppeal(data[i]);
        }
        storage.provider.delete('appeals');
        appeals = [];

        var req = new XMLHttpRequest();
        req.open("POST", "/fans_appeal", true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));

        req.onreadystatechange = function() {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status != 200) {
              console.log("Something goes wrong!");
            }
            else {
              console.log('Appeals successfuly transfered from provider to server!');
            }
          }
        }
      }
    });
  });
});

function createCard(text, isHeader) {
  var card = document.createElement('div');
  card.className = 'card ';
  if (isHeader) {
    card.className += 'fan-card ';
  }
  card.style.border = '1px solid black';

  var cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.innerHTML = text;

  card.appendChild(cardBody);

  return card;
}

function formatDate(num) {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
}

function getCurrentDate() {
  var date = new Date();
  return formatDate(date.getDate()) + '.' + formatDate(date.getMonth() + 1) + '.' + formatDate(date.getFullYear() % 100);
}

function getCurrentTime() {
  var date = new Date();
  return formatDate(date.getHours()) + ':' + formatDate(date.getMinutes());
}

function publishAppeal(appeal) {
  var header = createCard(appeal.fanName + '<br>' + appeal.time + '<br>' + appeal.date, true);
  var body = createCard(appeal.text, false);
  var sec = document.createElement('section');
  sec.className = 'overflow-auto';
  sec.appendChild(header);
  sec.appendChild(body);

  var hr = document.createElement('hr');
  hr.className = 'fans-appeal';

  document.getElementsByTagName('main')[0].insertBefore(sec, document.getElementsByTagName('h3')[0]);
  document.getElementsByTagName('main')[0].insertBefore(hr, document.getElementsByTagName('h3')[0]);
}

function sendAppeal() {
  var text = document.getElementById('appeal').value;
  document.getElementById('appeal').value = '';
  if (text.trim() == '') {
    alert('Appeal can not be empty!');
    return;
  }
  var obj = {fanName: "Fan name", date: getCurrentDate(), time: getCurrentTime(), text: text.trim()}

  if (isOnline()) {
    var req = new XMLHttpRequest();
    req.open("POST", "/fans_appeal", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(obj));

    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status != 200) {
          alert("Something goes wrong!");
        }
        else {
          alert("Success!");
        }
      }
    }
  }
  else {
    storage.provider.get('appeals', function(data) {
      if (data) {
        appeals = data;
      }
      else {
        appeals = [];
      }
      appeals.push(obj);
      storage.provider.add('appeals', appeals);

      console.log("Your appeal was successfuly sent to the provider!");
    });
  }
}

function isOnline() {
  return window.navigator.onLine;
}
