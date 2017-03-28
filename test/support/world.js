require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');
const pageObject = require('./pageObject.js');

function CustomWorld() {

  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .build();

  this.page = pageObject(this.driver, 'http://localhost:3000');

}

defineSupportCode(function({setWorldConstructor}) {
  setWorldConstructor(CustomWorld)
})
