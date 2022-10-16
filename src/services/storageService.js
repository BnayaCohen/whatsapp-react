function store(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function load(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue;
  return JSON.parse(value);
}

function remove(key) {
  localStorage.removeChat(key)
}

export const storageService = {
  store,
  remove,
  load,
}