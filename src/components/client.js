let LOCAL_STORAGE_KEY = '';

class Client {
  constructor() {
    this.useLocalStorage = typeof localStorage !== 'undefined';
    this.subscribers = [];

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
    }
  }

  getToken() {
    return this.token;
  }

  isLoggedIn() {
    console.log(this.token);
    return !!this.token;
  }

  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    console.log('Token removed');
  }
}

export const client = new Client();
