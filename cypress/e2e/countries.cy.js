describe('countries', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  it('add and remove province in United Kingdom', () => {
    // Click in countries in side menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    // Select only enabled countries
    cy.get('[id="criteria_enabled"]').select('Yes');
    // Type to search a specify country
    cy.get('[id="criteria_code_value"]').type('GB');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the last country
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Click in add province to button
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    // Filling data of provinces
    cy.get('[id="sylius_country_provinces_0_code"]').type('GG-GG');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Gerson');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Gege');

    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Assert that country has been updated
    cy.get('body').should('contain', 'Country has been successfully updated.');

    // Click on Delete button
    cy.get('.required > #sylius_country_provinces > div > div > .red').click();
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Assert that country has been updated
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });
  it('add country', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
   
    cy.get('*[class^="ui labeled icon button  primary"]').click();
    
    cy.get('[id="sylius_country_code"]').first().invoke('val').then((value) => {
    cy.get('[id="sylius_country_code"]').select(value);
  });

    cy.get('*[class^="ui labeled icon primary button"]').click();

    cy.get('body').should('contain', 'Country has been successfully created.');

  });
  it('Disable country and then check if it is disabled in the list', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('GB');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('*[class^="ui toggle checkbox"]').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('No');
    cy.get('[id="criteria_code_value"]').type('GB');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('table.ui.sortable.stackable.very.basic.celled.table tbody tr.item')
  .first()
  .find('td:nth-child(3) span.ui.red.label')
  .should('contain', 'Disabled');
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('*[class^="ui toggle checkbox"]').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });

  it('Verify sortable sorted ascending sylius-table-column-enabled', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('DE');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('*[class^="ui toggle checkbox"]').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get("a:contains(Enabled)").click();
    cy.get('table.ui.sortable.stackable.very.basic.celled.table tbody tr.item')
  .first()
  .within(() => {
    cy.get('td:nth-child(3) span.ui.red.label').should('contain', 'Disabled');
    cy.get('td:nth-child(2)').should('contain', 'Germany');
  });
  cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('*[class^="ui toggle checkbox"]').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });
  it('check error when not informing the name of the province which is required', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('AU');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('GG-GG');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('Gege');

    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'This form contains errors.');

  });

  it('testing filter starts with letter C', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('#criteria_code_type').select('Starts with');
    cy.get('[id="criteria_code_value"]').type('C');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('tr.item:nth-child(1) > td:nth-child(1)').should('contain', 'CA');
  });
  it('test informing province code in wrong format', () => {
    // Navigating to country edit menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('CA');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Adding province with code AU/QLD
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('AU/QUE');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Queensland');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'This form contains errors.');
  });
  it('test creating province with already used code', () => {
    // Navigating to country edit menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('FR');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Adding first province with code AU-QLD
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('FR-PAR');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Paris');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Adding second province with same code
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_1_code"]').type('FR-PAR');
    cy.get('[id="sylius_country_provinces_1_name"]').type('Queensland2');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Assert that province form was not valid
    cy.get('body').should('contain', 'This form contains errors.');
    // Deleting provinces to make sure tests are independent
    cy.get('.required > #sylius_country_provinces > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)').click();
    cy.get('.required > #sylius_country_provinces > div > div > .red').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });
  
  it('test creating province with same name and different code', () => {
    // Navigating to country edit menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('NZ');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Adding first province with code AU-QLD
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('NZ-NTL');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Northland');
    // Adding second province with different code but same name
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_1_code"]').type('NZ-STL');
    cy.get('[id="sylius_country_provinces_1_name"]').type('Northland');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Assert that province form was not valid
    cy.get('body').should('contain', 'This form contains errors.');
    // Deleting provinces to make sure tests are independent
    cy.get('.required > #sylius_country_provinces > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)').click();
    cy.get('.required > #sylius_country_provinces > div > div > .red').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  });
  it('test create provinces with same abbreviation, should not cause error', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    // Navigating to country edit menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('[id="criteria_code_value"]').type('CN');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Adding first province with code CN-GD
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('CN-GD');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Guangdong');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('China');
    // Adding second province with same abbreviation
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_1_code"]').type('CN-FJ');
    cy.get('[id="sylius_country_provinces_1_name"]').type('Fujian');
    cy.get('[id="sylius_country_provinces_0_abbreviation"]').type('China');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Assert that provinces were added successfully
    cy.get('body').should('contain', 'Country has been successfully updated.');
    // Deleting provinces to make sure tests are independent
    cy.get('.required > #sylius_country_provinces > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)').click();
    cy.get('.required > #sylius_country_provinces > div > div > .red').click();
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    cy.get('body').should('contain', 'Country has been successfully updated.');
  }); 
    
    
});