Object.defineProperty(Object.prototype, 'getValueCaseInsensitive', {
  value: function getValueCaseInsensitive(key) {
    for (var name in this) {
      if (this.hasOwnProperty(name)) {
        if (name.toLowerCase() === key.toLowerCase()) {
          return this[name];
        }
      }
    }
    return undefined;
  },
  writable: true,
  configurable: true,
});
Object.defineProperty(Object.prototype, 'setValueCaseInsensitive', {
  value: function setValueCaseInsensitive(key, val) {
    for (var name in this) {
      if (this.hasOwnProperty(name)) {
        if (name.toLowerCase() === key.toLowerCase()) {
          this[name] = val;
        }
      }
    }
    return undefined;
  },
  writable: true,
  configurable: true,
});
Object.defineProperty(Object.prototype, 'deleteCaseInsensitive', {
  value: function deleteCaseInsensitive(key) {
    for (var name in this) {
      if (this.hasOwnProperty(name)) {
        if (name.toLowerCase() === key.toLowerCase()) {
          delete this[name];
        }
      }
    }
    return undefined;
  },
  writable: true,
  configurable: true,
});
