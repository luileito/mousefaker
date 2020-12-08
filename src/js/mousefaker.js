/*
Implements the adversarial noise strategy described in:
  L.A. Leiva, I. Arapakis, C. Iordanou (2021).
  My Mouse, My Rules: Privacy Issues of Behavioral User Profiling via Mouse Tracking.
  Proc. CHIIR'21.
*/
(function(window) {

  var document = window.document;

  // Default extension options.
  var options = {
      noiseValue: 0.25,
      disallowed: [],
  };

  var isExtension = window.chrome && chrome.extension;
  if (isExtension) {
      // User data is stored in `storage.sync` instead of `storage.local`,
      // to allow syncing across devices. It also fallbacks to local storage.
      chrome.storage.sync.get(options, function(prefs) {
          // Override stored options.
          options = prefs;

          start();
      });
  } else {
      // Code not running as a Chrome extension.
      start();
  }

  function start() {
      if (document.readyState == 'loading') {
          document.addEventListener('DOMContentLoaded', main);
      } else if (document.readyState !== 'complete') {
          window.addEventListener('load', main);
      } else {
          main();
      }
  }

  function main() {
      var domain = window.location.hostname;

      var enabled = options.disallowed.indexOf(domain) === -1;
      if (!enabled) return;

      document.addEventListener('mousemove', fakeMove);
  }

  function fakeMove(e) {
      // Don't trigger fake moves for an already simulated move.
      if (!e.isTrusted) return;

      var props = {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: noise(e.clientX),
          clientY: noise(e.clientY),
          screenX: noise(e.screenX),
          screenY: noise(e.screenY),
      };

      var event = new MouseEvent('mousemove', props);
      document.dispatchEvent(event);
  }

  function noise(pos, sigma) {
      if (!sigma) sigma = options.noiseValue;

      var newPos = pos + generateGaussian(0, sigma);
      if (newPos < 0) newPos = 0;

      return parseInt(newPos);
  }

  // From https://github.com/errcw/gaussian/
  function generateGaussian(mean, std) {
      var _2PI = Math.PI * 2;

      var u1 = Math.random();
      var u2 = Math.random();

      var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(_2PI * u2);
      var z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(_2PI * u2);

      return z0 * std + mean;
  }

})(this);
