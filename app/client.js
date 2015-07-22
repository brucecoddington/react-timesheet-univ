import Router from './router';
import progress from './util/progress';
import LoginStore from './stores/login.store';

progress();

// Fire off the router and get the app rolling
LoginStore.current().then(new Router().run);
