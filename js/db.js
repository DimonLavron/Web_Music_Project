var useLocalStorage = false;

function LocalStorageProvider(){};

LocalStorageProvider.prototype.add = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

LocalStorageProvider.prototype.get = function(key, func) {
  func(JSON.parse(localStorage.getItem(key)));
};

LocalStorageProvider.prototype.delete = function(key) {
  localStorage.removeItem(key);
}

var db;

function IndexedDBProvider(){
  var openRequest = indexedDB.open('webMusicProject', 1);

  openRequest.onerror = function() {
    console.error("Error", openRequest.error);
  };

  openRequest.onsuccess = function() {
    console.log("Success!");
    db = openRequest.result;
  };

  openRequest.onupgradeneeded = function() {
      console.log("Upgrading...");
      db = openRequest.result;
      db.createObjectStore("appeals", {keyPath: "id", autoIncrement: true});
      db.createObjectStore("news", {keyPath: "id", autoIncrement: true});
  }
};

IndexedDBProvider.prototype.add = function(key, value) {
  var transaction = db.transaction(key, "readwrite");
  var os = transaction.objectStore(key);
  os.clear();
  for (i = 0; i < value.length; i++) {
    os.add(value[i]);
  }
};

IndexedDBProvider.prototype.get = function(key, func) {
  var transaction = db.transaction(key, "readwrite");
  var os = transaction.objectStore(key);
  var request = os.getAll();
  request.onsuccess = function() {
    func(request.result);
  };
};

IndexedDBProvider.prototype.delete = function(key) {
  var transaction = db.transaction(key, "readwrite");
  var os = transaction.objectStore(key);
  os.clear();
}

var Provider = function() {
  if (useLocalStorage) {
    this.provider = new LocalStorageProvider();
  }
  else {
    this.provider = new IndexedDBProvider();
  }
}
