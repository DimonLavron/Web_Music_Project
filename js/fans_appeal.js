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

function publishFansAppeal() {
  var text = document.getElementById('appeal').value;
  if (text.trim() == '') {
    alert('Appeal can not be empty!');
  }
  else {
    var header = createCard('Fan name <br> 22:22 <br> 09.09.19', true);
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

  document.getElementById('appeal').value = '';
}
