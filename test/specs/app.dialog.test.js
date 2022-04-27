import { expect } from 'chai';
import Dialog from '../pageObjects/dialog.page';

describe('Dialog', () => {
    let dialog;

    // Execute a block of code before every test
    // beforeEach( async () => {
    // });

    it('Verify username and password fields editable', async () => {
        dialog = new Dialog(); 

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
        dialog = new Dialog(); 

        await dialog.appBtn.click();
        await dialog.alertDialogBtn.click();
        await dialog.textEntryDialogBtn.click();
        await dialog.userNameField.addValue("Actual User");

        // fail intentionally to get a nice screenshot
        expect( await dialog.userNameField.getText()).equal("Actual Userrrrrr");
        await dialog.dialogOkBtn.click();
    });

    it('Verify app adjustment when orientation switched', async () => {
        await driver.setOrientation('LANDSCAPE');

        await driver.saveScreenshot(browser.config.screenshotPath + 'landscape.png');
        await dialog.appBtn.click();

        await driver.setOrientation('PORTRAIT');
        await driver.back();
        await driver.saveScreenshot('./screenshots/portrait.png');
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

        let isEnabled, isSelected, isDisplayed;

        for (let i = 0; i < 3; i++) {
            isEnabled = await dialog.tabs[i].isEnabled();
            isSelected = await dialog.tabs[i].isSelected();
            isDisplayed = await dialog.tabs[i].isDisplayed();
    
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
        //driver.setImplicitTimeout(10000);
        //driver.setTimeouts(10000);
        //driver.pause(10000);

        await dialog.viewBtn.click();
        //dialog.tabsBtn.click();
    });

    it('Verify the repeat alarm options has attribute checked set to true when selected', async ()=>{
        let isChecked, text;

        await dialog.appBtn.click();
        await dialog.alertDialogBtn.click();
        await dialog.repeatAlarmBtn.click();

        text = await dialog._weekdayCheckbox(0).getText();
        expect(text).equal('Every Monday');

        isChecked = await dialog._weekdayCheckbox(0).getAttribute('checked');
        expect(isChecked).equal('false');

        await dialog._weekdayCheckbox(0).click();

        isChecked = await dialog._weekdayCheckbox(0).getAttribute('checked');
        expect(isChecked).equal('true');
    });

    // Execute a block of code after every test
    afterEach( async() => {
        driver.reset();
    });
});
