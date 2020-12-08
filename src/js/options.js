(function(window) {

  var document = window.document;

  // Handy alias.
  function $(id) {
      return document.getElementById(id);
  }

  // Default options.
  var options = {
      noiseValue: 0.25,
      disallowed: [],
  };

  document.addEventListener('DOMContentLoaded', function() {
      // Read the actual URL hostname, since `window.location` is not available in extensions.
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

          var tab = tabs[0];
          var url = new URL(tab.url);
          var domain = url.hostname;

          // Populate already stored data.
          chrome.storage.sync.get(options, function(prefs) {
              $('noise').value = prefs.noiseValue;
              $('allow').checked = prefs.disallowed.indexOf(domain) === -1;

              options = prefs;
          });

          function save() {
              var allow = $('allow').checked;
              var index = options.disallowed.indexOf(domain);
              // Ensure domain is not already stored.
              if (!allow && index === -1) {
                  options.disallowed.push(domain);
              } else {
                  options.disallowed.splice(index, 1);
              }

              options.noiseValue = $('noise').value;

              chrome.storage.sync.set(options, function() {
                  // Update status to let user know options were saved.
                  $('status').classList.remove('hidden');
                  setTimeout(function delay() {
                      $('status').classList.add('hidden');
                  }, 900);
              });
          }

          $('noise').addEventListener('click', save);
          $('allow').addEventListener('click', save);

      });
  });

})(this);
