var appeals = []

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('appeals')) {
    appeals = JSON.parse(localStorage.getItem('appeals'))
    for (i = 0; i < appeals.length; i++) {
      publishAppeal(appeals[i].text);
    }
  }
});

window.addEventListener('online', function() {
  if (localStorage.getItem('appeals')) {
    localStorage.removeItem('appeals')
    appeals = []
    // Data Transfer function
    console.log('Appeals successfuly transfered from localStorage to server!')
  }
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

function publishAppeal(text) {
  var date = new Date();
  var header = createCard('Fan name <br>' + formatDate(date.getHours()) + ':' + formatDate(date.getMinutes()) + '<br>' + formatDate(date.getDate()) + '.' + formatDate(date.getMonth() + 1) + '.' + formatDate(date.getFullYear() % 100), true);
  var body = createCard(text, false);
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

  if (isOnline()) {
    console.log("Your appeal was successfuly sent to the server!");
  }
  else {
    appeals.push({text : text});
    localStorage.setItem('appeals', JSON.stringify(appeals));

    console.log("Your appeal was successfuly sent to the localStorage!");
  }
}

function isOnline() {
  return window.navigator.onLine;
}
