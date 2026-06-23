const {Builder, By, until, Options} = require('selenium-webdriver');
const assert = require("assert");
const chrome = require('selenium-webdriver/chrome');

describe('tugas sesi 9', function (){
    let driver;

    it('Membuka website SauceDemo', async function () {
        options = new chrome.Options();
        options.addArguments('--incognito');
        driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let buttonLogin = await driver.findElement(By.xpath('//*[@id="login-button"]'))
        await inputUsername.sendKeys('visual_user')
        await inputPassword.sendKeys('secret_sauce')
        await buttonLogin.click();

        let burgerMenu = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="react-burger-menu-btn"]')),
            8000
        );

        await burgerMenu.isDisplayed()

        await driver.sleep(1000)


        //disini saya ganti jadi "Name (Z to A)", karena saat membuka website filternya defaultnya name = A to Z. Jadi saya ganti biar keliatan bedanya
        let dropDown = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropDown.click()
        let filter = await driver.findElement(By.xpath('//option[text()="Name (Z to A)"]'))
        await filter.click();

        await driver.sleep(2000)

        await driver.quit();

        
    })
});