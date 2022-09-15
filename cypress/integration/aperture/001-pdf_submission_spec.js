/* eslint-disable no-unused-vars */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/expect-expect */
import { DashboardPage } from '../../page-object/dashboard-page'
import { SubmissionFormPage } from '../../page-object/submission-form-page'
import { Menu } from '../../page-object/page-component/menu'
import { dashboard } from '../../support/routes'

describe('Upload manuscript test', () => {
  it('can upload a manuscript and some metadata', () => {
    // task to restore the database as per the  dumps/initialState.sql
    cy.task('restore', 'initialState')
    cy.task('seedForms')

    // login as author
    cy.fixture('role_names').then(name => {
      cy.login(name.role.author, dashboard)
    })

    cy.task('log', 'Login successful')

    // enter email
    cy.contains('Enter Email').click()
    cy.task('log', 'entering email for the user')
    cy.get('#enter-email').type('emily@gmail.com')
    cy.task('log', 'clicking on next')
    // submit the email
    cy.contains('Next').click()
    // Click on dashboard to submit manuscript
    // cy.visit('http://localhost:4000/kotahi/dashboard')
    cy.visit(dashboard)
    
    // Click on new submission
    cy.get('button').contains('＋ New submission').click()
    // Upload manuscript
    cy.get('input[type=file]').attachFile('test-pdf.pdf')
 
    cy.fixture('submission_form_data').then(data => {
      SubmissionFormPage.fillInTitle(data.title)
      cy.task('log', 'clicking on submit research')
      SubmissionFormPage.clickSubmitResearch()

      // Submit your form
      cy.task('log', 'submiting manuscript')
      SubmissionFormPage.clickSubmitYourManuscript()

      // assert form exists in dashboard
      DashboardPage.getSectionTitleWithText('My Submissions')
      DashboardPage.getSubmissionTitle().should('contain', data.title)

      // task to dump data in dumps/submission_complete.sql
      cy.task('dump', 'submission_complete')
    })
  })
 })
