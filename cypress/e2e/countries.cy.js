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
  // Implement the remaining test cases in a similar manner
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
    
});
