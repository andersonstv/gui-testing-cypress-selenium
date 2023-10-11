const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('countries', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:8080/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  //Remove .only and implement others test cases!
  it('add and remove province in United Kingdom', async () => {
    // Click in countries in side menu
    await driver.findElement(By.linkText('Countries')).click();

    // Select only enabled countries
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();

    // Type to search a specify country
    await driver.findElement(By.id('criteria_code_value')).sendKeys('GB');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last country
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Click in filter blue button
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();

    // Filling data of provinces
    await driver.findElement(By.id('sylius_country_provinces_0_code')).sendKeys('GG-GG');
    await driver.findElement(By.id('sylius_country_provinces_0_name')).sendKeys('Gerson');
    await driver.findElement(By.id('sylius_country_provinces_0_abbreviation')).sendKeys('Gege');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Assert that country has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Country has been successfully updated.'));

    // Click on Delete button
    await driver.findElement(By.css('.required > #sylius_country_provinces > div > div > .red')).click();
    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Assert that country has been updated
    const bodyTextAfterRemove = await driver.findElement(By.tagName('body')).getText();
    assert(bodyTextAfterRemove.includes('Country has been successfully updated.'));
  });

  it('should add a country', async () => {

    await driver.findElement(By.linkText('Countries')).click();
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button  primary "]'));
    await buttons[0].click();
    await driver.findElement(By.css('*[class^="ui labeled icon primary button"]')).click();
    const bodyTextAfterRemove = await driver.findElement(By.tagName('body')).getText();
    assert(bodyTextAfterRemove.includes('Country has been successfully created.'));
  });

  it('Disable country and then check if it is disabled in the list', async () => {
    await driver.findElement(By.linkText('Countries')).click();
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('GB');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();
    const button = await driver.findElements(By.css('*[class^="ui toggle checkbox"]'));
    await button[0].click();
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Country has been successfully updated.'));
    await driver.findElement(By.linkText('Countries')).click();
    let dropdown2 = await driver.findElement(By.id('criteria_enabled'));
    await dropdown2.findElement(By.xpath("//option[. = 'No']")).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('GB');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const bodyTextAfterRemove = await driver.findElement(By.tagName('body')).getText();
    assert(bodyTextAfterRemove.includes('GB'));
    const buttons2 = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons2[buttons.length - 1].click();
    const button2 = await driver.findElements(By.css('*[class^="ui toggle checkbox"]'));
    await button2[0].click();
   await driver.findElement(By.id('sylius_save_changes_button')).click();
  });

  it('Verify sortable sorted ascending sylius-table-column-enabled', async () => {
    await driver.findElement(By.linkText('Countries')).click();
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('GB');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();
    const button = await driver.findElements(By.css('*[class^="ui toggle checkbox"]'));
    await button[0].click();
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Country has been successfully updated.'));
    await driver.findElement(By.linkText('Countries')).click();
    await driver.findElement(By.css('*[class^="sortable sylius-table-column-enabled"]')).click();
    const texttbody = await driver.findElement(By.css('table.ui.sortable.stackable.very.basic.celled.table tbody tr.item td:nth-child(3) span.ui.red.label')).getText();
    assert(texttbody.includes('Disabled'));
    const texttbody2 = await driver.findElement(By.css('table.ui.sortable.stackable.very.basic.celled.table tbody tr.item td:nth-child(2)')).getText();
    assert(texttbody2.includes('United Kingdom'));
    const buttons2 = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons2[buttons.length - 1].click();
    const button2 = await driver.findElements(By.css('*[class^="ui toggle checkbox"]'));
    await button2[0].click();
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    const bodyTextAfterRemove = await driver.findElement(By.tagName('body')).getText();
    assert(bodyTextAfterRemove.includes('Country has been successfully updated.'));

    

  });

  it('check error when not informing the name of the province which is required', async () => {
    await driver.findElement(By.linkText('Countries')).click();

    // Select only enabled countries
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();

    // Type to search a specify country
    await driver.findElement(By.id('criteria_code_value')).sendKeys('GB');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the last country
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Click in filter blue button
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();

    // Filling data of provinces
    await driver.findElement(By.id('sylius_country_provinces_0_code')).sendKeys('GG-GG');
    await driver.findElement(By.id('sylius_country_provinces_0_abbreviation')).sendKeys('Gege');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Assert that country has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
    
  });
  it('testing filter "starts with", using letter C', async () => {
    // Navigating to Countries
    await driver.findElement(By.linkText('Countries')).click();

    let filterElement = await driver.findElement(By.id('criteria_code_type'));
    await filterElement.findElement(By.css('option[value="starts_with"]')).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('C');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    await driver.wait(until.elementLocated(By.css('tr.item:nth-child(1) > td:nth-child(1)')), 10000);
    const result = await driver.findElement(By.css('tr.item:nth-child(1) > td:nth-child(1)')).getText();
    assert(result == 'CA')
  });
  it('test wrong format province code', async () => {
    // Selecting Country
    await driver.findElement(By.linkText('Countries')).click();
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('CA');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Navigate to Edit Country
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Filling first province
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();
    await driver.findElement(By.id('sylius_country_provinces_0_code')).sendKeys('CA/QUE');
    await driver.findElement(By.id('sylius_country_provinces_0_name')).sendKeys('Quebec');
    // Save changes
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that country has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });
  it('test province code repeated', async () => {
    // Selecting Country
    await driver.findElement(By.linkText('Countries')).click();
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('FR');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Navigate to Edit Country
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Filling first province
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();
    await driver.findElement(By.id('sylius_country_provinces_0_code')).sendKeys('FR-PAR');
    await driver.findElement(By.id('sylius_country_provinces_0_name')).sendKeys('Paris');
    // Save changes
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Filling second province
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();
    await driver.findElement(By.id('sylius_country_provinces_1_code')).sendKeys('FR-PAR');
    await driver.findElement(By.id('sylius_country_provinces_1_name')).sendKeys('Brittany');
    // Try to save changes
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Assert that country has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
    // Deleting ensures that this test does not alter the environment
    await driver.findElement(By.css('.required > #sylius_country_provinces > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)')).click();
    await driver.findElement(By.css('.required > #sylius_country_provinces > div > div > .red')).click();
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    const bodyTextAfterRemove = await driver.findElement(By.tagName('body')).getText();
    assert(bodyTextAfterRemove.includes('Country has been successfully updated.'));
  });
  it('test province name repeated', async () => {
    // Selecting Country
    await driver.findElement(By.linkText('Countries')).click();
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('NZ');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    // Navigate to Edit Country
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();
    // Filling first province
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();
    await driver.findElement(By.id('sylius_country_provinces_0_code')).sendKeys('NZ-NTL');
    await driver.findElement(By.id('sylius_country_provinces_0_name')).sendKeys('Northland');
    // Save changes
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Filling second province
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();
    await driver.findElement(By.id('sylius_country_provinces_1_code')).sendKeys('NZ-CAN');
    await driver.findElement(By.id('sylius_country_provinces_1_name')).sendKeys('Northland');
    // Try to save changes
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    // Assert that country has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
    // Deleting ensures that this test does not alter the environment
    await driver.findElement(By.css('.required > #sylius_country_provinces > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)')).click();
    await driver.findElement(By.css('.required > #sylius_country_provinces > div > div > .red')).click();
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    const bodyTextAfterRemove = await driver.findElement(By.tagName('body')).getText();
    assert(bodyTextAfterRemove.includes('Country has been successfully updated.'));
  });

  it('test create provinces with same abbreviation, should not cause error', async () => {
    // Selecting Country
    await driver.findElement(By.linkText('Countries')).click();
    let dropdown = await driver.findElement(By.id('criteria_enabled'));
    await dropdown.findElement(By.xpath("//option[. = 'Yes']")).click();
    await driver.findElement(By.id('criteria_code_value')).sendKeys('CN');
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Navigate to Edit Country
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[buttons.length - 1].click();

    // Filling first province
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();
    await driver.findElement(By.id('sylius_country_provinces_0_code')).sendKeys('CN-GD');
    await driver.findElement(By.id('sylius_country_provinces_0_name')).sendKeys('Guangdong');
    await driver.findElement(By.id('sylius_country_provinces_0_abbreviation')).sendKeys('China');
    // Filling second province
    await driver.findElement(By.css('.ui > .ui > .required > #sylius_country_provinces > .ui')).click();
    await driver.findElement(By.id('sylius_country_provinces_1_code')).sendKeys('CN-FJ');
    await driver.findElement(By.id('sylius_country_provinces_1_name')).sendKeys('Fujian');
    await driver.findElement(By.id('sylius_country_provinces_1_abbreviation')).sendKeys('China');
    // Save changes
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that country has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Country has been successfully updated.'));

    // Deleting ensures that this test does not alter the environment
    await driver.findElement(By.css('.required > #sylius_country_provinces > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)')).click();
    await driver.findElement(By.css('.required > #sylius_country_provinces > div > div > .red')).click();
    await driver.findElement(By.id('sylius_save_changes_button')).click();
    const bodyTextAfterRemove = await driver.findElement(By.tagName('body')).getText();
    assert(bodyTextAfterRemove.includes('Country has been successfully updated.'));

  }); 
  

  // Implement the remaining test cases in a similar manner
});
