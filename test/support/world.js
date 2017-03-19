require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');

function CustomWorld() {

  this.browser = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .build();
}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})
