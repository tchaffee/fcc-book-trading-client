// features/step_definitions/driver_steps.js
const { defineSupportCode } = require('cucumber');
const { By } = require('selenium-webdriver');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

defineSupportCode(function({Given, When, Then}) {

  Given('I am on the book trading website home page', {timeout: 15 * 1000}, function() {
    return this.page.visit();
  });

  Then('I should see {stringInDoubleQuotes}', function (text) {
    return this.page.elementWait(By.css(`[data-test="${text}"]`));
  });

  When('I click on {stringInDoubleQuotes}', function (text) {
    return this.page.elementWait(By.linkText(text)).click();
  });

  Given('I login with user {stringInDoubleQuotes} and password {stringInDoubleQuotes}', function (user, password) {
    return this.page.login(user, password);
  });

  Then('I should see a book with title {stringInDoubleQuotes}', function (title) {
    const text = this.page.elementWait(By.className('Book')).getText()
    return expect(text).to.eventually.equal(title);
  });

  When('I type {stringInDoubleQuotes} in the {stringInDoubleQuotes} input', function (userInput, formInput) {
    // Write code here that turns the phrase above into concrete actions
    return this.page.elementWait(By.css(`[data-test="${formInput}"]`)).sendKeys(userInput);
  });


  Then('I should see a list of my trade requests', function () {
    callback(null, 'ok');
  });


});
