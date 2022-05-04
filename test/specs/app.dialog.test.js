import { expect } from 'chai';
import Dialog from '../pageObjects/dialog.page';

describe('Dialog', () => {
    let dialog;

    // Execute a block of code before every test
    beforeEach( async () => {
        dialog = new Dialog(); 
    });

    it('Verify username and password fields editable', async () => {
        await dialog.appBtn.click();
        await dialog.alertDialogBtn.click();
        await dialog.textEntryDialogBtn.click();

        await dialog.userNameField.addValue("Test User");
        await dialog.userNameField.clearValue();
        await dialog.userNameField.addValue("Actual User");

        await dialog.passwordField.clearValue();
        await dialog.passwordField.addValue("Test Pass");

        expect( await dialog.userNameField.getText()).equal("Actual User");
        await dialog.dialogOkBtn.click();
    });

    it('Verify username and password fields editable - fail', async () => {
        await dialog.appBtn.click();
        await dialog.alertDialogBtn.click();
        await dialog.textEntryDialogBtn.click();
        await dialog.userNameField.addValue("Actual User");

        // fail intentionally to get the screenshot on error
        expect( await dialog.userNameField.getText()).equal("Actual Userrrrrr");
        await dialog.dialogOkBtn.click();
    });

    it('Verify app adjustment when orientation switched', async () => {
        await driver.setOrientation('LANDSCAPE');

        await driver.saveScreenshot(browser.config.screenshotPath + 'landscape.png');
        await dialog.appBtn.click();

        await driver.setOrientation('PORTRAIT');
        await driver.back();
        await driver.saveScreenshot(browser.config.screenshotPath + 'portrait.png');
    });

    it('Verify isSelected, isEnabled & isDisplayed', async () => {
        await dialog.viewBtn.click();
        await driver.touchAction([
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release',
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release',
            { action: 'press', x: 500, y: 1400 },
            { action: 'moveTo', x: 500, y: 300 },
            'release'
        ])

        await dialog.tabsBtn.click();
        await dialog.contentByIdBtn.click();

        for (let i = 0; i < 3; i++) {
            const isEnabled = await dialog.tabs[i].isEnabled();
            const isSelected = await dialog.tabs[i].isSelected();
            const isDisplayed = await dialog.tabs[i].isDisplayed();
    
            console.log(`Tab ${i + 1}`)
            console.log('isEnabled:', isEnabled);
            console.log('isSelected:', isSelected);
            console.log('isDisplayed:', isDisplayed);

            if(isEnabled && isSelected){
                console.log("Tab Details 1:", await dialog.tab1Details.isDisplayed());
                console.log("Tab Details 2:", await dialog.tab2Details.isDisplayed());
                console.log("Tab Details 3:", await dialog.tab3Details.isDisplayed());
            }
        }
    });

    it('Verify Timeouts', async () => {
        //driver.setImplicitTimeout(10000); //implicit wait
        //driver.setTimeouts(10000); // implicit wait
        //driver.pause(10000); // explicit wait

        await dialog.viewBtn.click();
        //dialog.tabsBtn.click();
    });

    it('Verify the repeat alarm options has attribute checked set to true when selected', async () => {
        await dialog.appBtn.click();
        await dialog.alertDialogBtn.click();
        await dialog.repeatAlarmBtn.click();

        expect(await dialog._weekdayCheckbox(0).getText()).equal('Every Monday');
        expect(await dialog._weekdayCheckbox(0).getAttribute('checked')).equal('false');

        await dialog._weekdayCheckbox(0).click();
        expect(await dialog._weekdayCheckbox(0).getAttribute('checked')).equal('true');
    });

    // Execute a block of code after every test
    afterEach( async() => {
        driver.reset();
    });
});
