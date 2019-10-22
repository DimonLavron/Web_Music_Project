function publishNews() {
  var title = document.getElementById('news-title');
  var body = document.getElementById('news-body');

  if (title.value.trim() == '') {
    title.style.outline = '1px dotted red';
  }
  else {
    title.style.outline = 'none';
  }

  if (body.value.trim() == '') {
    body.style.outline = '1px dotted red';
  }
  else {
    body.style.outline = 'none';
  }

  if (title.value.trim() != '' && body.value.trim() != '') {
    alert('Publish successful!');
    title.value = '';
    body.value = '';
  }
}
