// const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');

pageObject = (driver, url) => {
    this.driver = driver;
    this.url = url;
    return {
      visit: () => {
        return this.driver.get(this.url);
      },
      login: (user, password) => {
        const driver = this.driver;
        let element;

        driver.findElement({linkText: 'Login'}).click();
        element = driver.wait(until.elementLocated(By.name('email')), 10 * 1000);
        driver.wait(until.elementIsVisible(element)).sendKeys(user);
        element = driver.wait(until.elementLocated(By.name('password')), 10 * 1000);
        driver.wait(until.elementIsVisible(element)).sendKeys(password);
        return driver.findElement({className: 'auth0-label-submit'}).click();
      },
      elementWait: (by) => {
        const element = driver.wait(until.elementLocated(by), 10 * 1000);
        return driver.wait(until.elementIsVisible(element));
      }
    };
};

module.exports = pageObject;
