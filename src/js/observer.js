class Observer {
  constructor() {
    this.store = {};
  }

  subscribe(name, cb) {
    if(this.store[name]) {
      this.store[name].push(cb);
    }
    else {
      this.store[name] = [cb];
    }
  }

  emit(name, payload) {
    const functions = this.store[name];
    if(!functions) {
      throw new Error(`Not found listeners for event ${name}`);
    }
    functions.forEach((cb) => {
      cb(payload);
    });
  }
}

export const observer = new Observer();
