// features/step_definitions/browser_steps.js
const { By, until } = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');
const chai = require('chai');
const expect = chai.expect;

defineSupportCode(function({Given, When, Then}) {

  Given('I am on the book trading website home page', {timeout: 15 * 1000}, function() {
    return this.browser.get('http://localhost:3000');
  });

  Then('I should see {stringInDoubleQuotes}', function (text) {
    return this.browser.findElement(By.css(`[data-test="${text}"]`));
  });

  When('I click on {stringInDoubleQuotes}', function (text) {
    const browser = this.browser;

    return browser.wait(until.elementLocated(By.linkText(text)), 10 * 1000)
    .then(function (element) {
      browser.wait(until.elementIsVisible(element))
      .then(function (element) {
        element.click();
      });
    });
  });

  Given('I login with user {stringInDoubleQuotes} and password {stringInDoubleQuotes}', function (user, password) {
    const browser = this.browser;

    browser.findElement({linkText: 'Login'}).click();
    /*
    .then(function(login) {
      login.click();
    });
    */

    return browser.wait(until.elementLocated(By.name('email')), 10 * 1000)
    .then(function(emailElm) {
      browser.wait(until.elementIsVisible(emailElm))
      .then(function(emailElm) {
        emailElm.sendKeys(user);
      })
    })
    .then(function() {
      browser.wait(until.elementLocated(By.name('password')), 10 * 1000)
      .then(function(passwordElm) {
        browser.wait(until.elementIsVisible(passwordElm))
        .then(function(passwordElm) {
          passwordElm.sendKeys(password);
        })
      })
    })
    .then(function() {
      return browser.findElement({className: 'auth0-label-submit'})
      .then(function (authlogin) {
        authlogin.click();
      });
    });

  });

  /*
  Then('I should see {stringInDoubleQuotes}', function (text) {
    var xpath = "//*[contains(text(),'" + text + "')]";
    var condition = seleniumWebdriver.until.elementLocated({xpath: xpath});
    return this.driver.wait(condition, 5000);
  });
  */

  Then('I should see a book with title {stringInDoubleQuotes}', function (title) {
    const browser = this.browser;

    return browser.wait(until.elementLocated(By.className('Book')), 10 * 1000)
    .then(function(element) {
      browser.wait(until.elementIsVisible(element))
      .then(function (element) {
        element.getText()
        .then(function (text) {
          return expect(text).to.equal(title);
        })
      });
    });
  });

});
