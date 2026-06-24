const {Builder, By, until, Options} = require('selenium-webdriver');
const assert = require("assert");
const chrome = require('selenium-webdriver/chrome');

describe('tugas sesi 9', function (){
    let driver;

    before(async function () {
        console.log('ini di dalam before() hook')
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
    });

    after(async function () {
        console.log('test selesai')
        await driver.quit();
    });

    it('Merubah filter Name (Z to A)', async function(){
        let dropDown = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropDown.click()
        let filter = await driver.findElement(By.xpath('//option[text()="Price (low to high)"]'))
        await filter.click();

        await driver.sleep(2000)
    });
    
    it('Menambahkan barang ke cart', async function(){
        let addCart = await driver.findElement(By.xpath('//*[@id="add-to-cart-sauce-labs-onesie"]'))
        await addCart.click();

        await driver.sleep(2000)
    });

    it('Membuka shopping Cart', async function(){
        let shoppingCart = await driver.findElement(By.xpath('//*[@id="shopping_cart_container"]'))
        await shoppingCart.click();

        let textShoppingCart = await driver.findElement(By.className('title'))
        let cartText = await textShoppingCart.getText()
        assert.strictEqual(cartText, 'Your Cart')

        await driver.sleep(2000)
    });
});