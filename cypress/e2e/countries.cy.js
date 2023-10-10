describe('countries', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
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
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Adding first province with code AU-QLD
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('AU-QLD');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Queensland');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Adding second province with same code
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_1_code"]').type('AU-QLD');
    cy.get('[id="sylius_country_provinces_1_name"]').type('Queensland2');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    cy.get('body').should('contain', 'This form contains errors.');
  });
  
  it('test creating province with same name and different code', () => {
    // Navigating to country edit menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Adding first province with code AU-QLD
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('AU-QLD');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Queensland');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
    // Adding second province with different code but same name
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_1_code"]').type('AU-VIC');
    cy.get('[id="sylius_country_provinces_1_name"]').type('Queensland');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    cy.get('body').should('contain', 'This form contains errors.');
  });
  it('test create provinces with same abbreviation, should not cause error', () => {
    cy.clickInFirst('a[href="/admin/countries/"]');
    // Navigating to country edit menu
    cy.clickInFirst('a[href="/admin/countries/"]');
    cy.get('[id="criteria_enabled"]').select('Yes');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Adding first province with code AU-QLD
    cy.get('.ui > .ui > .required > #sylius_country_provinces > .ui').click();
    cy.get('[id="sylius_country_provinces_0_code"]').type('AU-QLD');
    cy.get('[id="sylius_country_provinces_0_name"]').type('Queensland');
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();
  }); 

  // Implement the remaining test cases in a similar manner
});
