// Warning: ESLint is configured to ignore this file, because
// it doesn't like the `import` variable, and I can't get it
// to ignore it.

import App from "./App.svelte";
import "normalize.css";

const app = new App({ target: document.body });

export default app;

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.$destroy();
  });
}
