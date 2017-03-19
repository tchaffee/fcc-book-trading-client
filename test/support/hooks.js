const { defineSupportCode } = require('cucumber');

// Xvfb is required for headless browser tests.
const Xvfb = require('xvfb');
const xvfb = new Xvfb({
  reuse: true,
  xvfb_args: ['-screen', '0', '1024x768x24']
});

defineSupportCode(function({ After, registerHandler }) {

  After(function() {
    console.log('trying to quit browser...');
    return this.browser.quit();
  });

  registerHandler('BeforeFeatures', function (features, callback) {
    xvfb.startSync()
    callback();
  });

  registerHandler('AfterFeatures', function (features, callback) {
    // return xvfb.stopSync()
    callback();
  });

});
