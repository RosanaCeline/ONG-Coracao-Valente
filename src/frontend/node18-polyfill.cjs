// Polyfill necessário para Vite 8 rodar no Node.js 18
if (typeof globalThis.CustomEvent === 'undefined') {
  globalThis.CustomEvent = class CustomEvent extends Event {
    constructor(type, init) {
      super(type, init);
      this.detail = init ? init.detail : undefined;
    }
  };
}
