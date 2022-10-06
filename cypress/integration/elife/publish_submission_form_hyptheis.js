/* eslint-disable jest/expect-expect */
import { FormsPage } from '../../page-object/forms-page'
import { Menu } from '../../page-object/page-component/menu'
import { dashboard } from '../../support/routes'

describe('Form builder', () => {
  it('views a form field', () => {
    // task to restore the database as per the  dumps/commons/bootstrap.sql
    cy.task('restore', 'commons/bootstrap')
    cy.task('seedForms')

    // login as admin
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.fixture('role_names').then(name => {
      cy.login(name.role.admin.name, dashboard)
    })

    // enter the from page and assert the fileds()
    Menu.getSettingsButton().click()
    Menu.clickForms()
    cy.contains('Submission').click()

    // For Submission field
    FormsPage.getFormTitleTab(0).should(
      'contain',
      'Research Object Submission Form',
    )
    FormsPage.clickFormOption(3)
    FormsPage.getFieldValidate()
    // cy.get(':nth-child(8) > .style__Legend-sc-1npdrat-1')
    // cy.get(
    //   ':nth-child(8) > :nth-child(2) > .css-3x5r4n-container > .react-select__control > .react-select__value-container',
    // ).click()
    // cy.get('.react-select__option').eq(0).click()
    // cy.contains('Update Field').click()
    // // adding a field in submission form
    // cy.contains('Add Field').click({ force: true })
    // cy.contains('Choose in the list').click()
    // cy.get('button')
    // cy.contains('VisualAbstract').click()
    // cy.contains('Name (internal field name)').click()
    // cy.get('[name=name]').type('submission.visualAbstract')
    // cy.contains('Update Field').click()
    })
})