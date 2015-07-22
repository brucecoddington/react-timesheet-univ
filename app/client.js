import ScrollWatch from 'scrollwatch';
import Router from './router';
import progress from './util/progress';

progress();

// Fire off the router and get the app rolling
new Router().run(function () {
  // sets any video to scale nicely in the page
  //$('body').fitVids();

  new ScrollWatch({});
});
