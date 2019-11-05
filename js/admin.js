var storage;

window.addEventListener('DOMContentLoaded', function() {
  storage = new Provider();
});

function sentNews() {
  var title = document.getElementById('news-title');
  var body = document.getElementById('news-body');
  var file = document.querySelector('input[type=file]').files[0];

  if (!file || file['type'].split('/')[0] != "image") {
    document.querySelector('input[type=file]').style.outline = '1px dotted red';
  }
  else {
    document.querySelector('input[type=file]').style.outline = 'none';
  }

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

  if (title.value.trim() != '' && body.value.trim() != '' && file && file['type'].split('/')[0] == "image") {
    if (isOnline()) {
      console.log("Your appeal was successfuly sent to the server!");
      alert('Publish successful!');
      title.value = '';
      body.value = '';
      document.querySelector('input[type=file]').value = '';
      document.getElementById('preview').src = "images/noimage-md.png";
    }
    else {
      storage.provider.get('news', function(data) {
        var news;
        if (data) {
          news = data;
        }
        else {
          news = [];
        }
        news.push({img : document.getElementById('preview').src, title : title.value.trim(), body : body.value.trim()});
        storage.provider.add('news', news);

        console.log("Your news was successfuly sent to the provider!");

        alert('Publish successful!');
        title.value = '';
        body.value = '';
        document.querySelector('input[type=file]').value = '';
        document.getElementById('preview').src = "images/noimage-md.png";
      });
    }
  }
}

function imagePreview() {
  var preview = document.getElementById('preview');
  var file = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onload = function() {
    preview.src = reader.result;
  }

  if (file && file['type'].split('/')[0] == "image") {
    reader.readAsDataURL(file);
  }
  else {
    preview.src = "images/noimage-md.png";
  }
}

function isOnline() {
  return window.navigator.onLine;
}
