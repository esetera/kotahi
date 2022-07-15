/* eslint-disable jest/expect-expect */
import { DashboardPage } from '../../page-object/dashboard-page'
import { SubmissionFormPage } from '../../page-object/submission-form-page'
import { dashboard } from '../../support/routes'
import { Menu } from '../../page-object/page-component/menu'
import { FormsPage } from '../../page-object/forms-page'

describe('Submission with errors test', () => {
  describe('Form builder', () => {
    it('views a form field', () => {
      // task to restore the database as per the  dumps/initialState.sql
      cy.task('restore', 'initialState')
      cy.task('seedForms')

      // login as admin
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin, dashboard)
      })
      // enter email
      cy.contains('Enter Email').click()
      cy.get('#enter-email').type('admin@gmail.com')

      // submit the email
      cy.contains('Next').click()

      // enter the from page and assert the fileds
      Menu.clickForms()
      cy.contains('Submission').click()

      // For Submission field
      FormsPage.getFormTitleTab(0).should(
        'contain',
        'Research Object Submission Form',
      )
      FormsPage.clickFormOption(1)
      FormsPage.getFieldValidate()
      cy.get(':nth-child(8) > .style__Legend-sc-1npdrat-1')
      cy.get(
        ':nth-child(8) > :nth-child(2) > .css-3x5r4n-container > .react-select__control > .react-select__value-container',
      ).click()
      cy.get('.react-select__option').eq(0).click()
      cy.contains('Update Field').click()
    })

    it('can upload manuscript and some metadata', () => {
      // login as author and attempt to submit an incomplete submission form
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('role_names').then(name => {
        cy.login(name.role.author, dashboard)
        // enter email
        cy.contains('Enter Email').click()
        cy.get('#enter-email').type('emily@gmail.com')

        // submit the email
        cy.contains('Next').click()
        Menu.clickDashboard()
        // Click on new submission
        cy.get('button').contains('＋ New submission').click()

        // Upload manuscript
        cy.get('input[type=file]').attachFile('test-pdf.pdf')
        cy.get('[data-testid="meta.title"]').clear()
        cy.get('[data-testid="meta.title"]').should('have.length', 1)
        SubmissionFormPage.clickSubmitResearch()
      })

      // Change the title so that we can look for it
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInTitle(data.newTitle)
        SubmissionFormPage.clickSubmitResearch()
        // Submit the form
        SubmissionFormPage.clickSubmitYourManuscript()
        // Contains new title
        DashboardPage.getSubmissionTitle(0).should('contain', data.newTitle)
      })
    })
  })
})
