/* eslint-disable no-unused-vars */
/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable jest/expect-expect */
import { DashboardPage } from '../../page-object/dashboard-page'
import { SubmissionFormPage } from '../../page-object/submission-form-page'
import { Menu } from '../../page-object/page-component/menu'
import { ManuscriptsPage } from '../../page-object/manuscripts-page'
import { ControlPage } from '../../page-object/control-page'
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

    // enter email
    cy.contains('Enter Email').click()
    cy.get('#enter-email').type('emily@gmail.com')

    // submit the email
    cy.contains('Next').click()
    cy.visit(dashboard)
    // Click on new submission
    cy.get('button').contains('＋ New submission').click()

    // Upload manuscript
    cy.get('input[type=file]').attachFile('test-docx.docx')

    // complete the submission form

    cy.fixture('submission_form_data').then(data => {
      SubmissionFormPage.fillInTitle(data.title2)
      cy.task('log', 'clicking on submit research')
      SubmissionFormPage.clickSubmitResearch()

      // Submit your form
      cy.task('log', 'submiting manuscript')
      SubmissionFormPage.clickSubmitYourManuscript()

      // assert form exists in dashboard
      DashboardPage.getSectionTitleWithText('My Submissions')
      DashboardPage.getSubmissionTitle().should('contain', data.title2)
      // task to dump data in dumps/submission_complete.sql

      cy.task('dump', 'submission_complete')
    })
  })

  it('senior editor can view the submission', () => {
    // task to restore the database as per the  dumps/submission_complete.sql
    cy.task('restore', 'submission_complete')
    cy.task('seedForms')

    cy.fixture('submission_form_data').then(data => {
      cy.fixture('role_names').then(name => {
        // login as admin
        cy.login(name.role.admin, dashboard)

        // enter email
        cy.contains('Enter Email').click()
        cy.get('#enter-email').type('admin@gmail.com')

        // submit the email
        cy.contains('Next').click()

        // select Control on the Manuscripts page
        Menu.clickManuscripts()

        ManuscriptsPage.clickControlButton()

        // assign seniorEditor
        ControlPage.clickAssignSeniorEditorDropdown()
        ControlPage.selectDropdownOptionByName(name.role.seniorEditor.uuid)
        ControlPage.clickAssignHandlingEditorDropdown()
        ControlPage.selectDropdownOptionByName(name.role.seniorEditor.uuid)
        ControlPage.clickAssignEditorDropdown()
        ControlPage.selectDropdownOptionByName(name.role.seniorEditor.uuid1)
        // assert the reviews
        ControlPage.fillInDecision(data.decision)
        ControlPage.clickAccept()
        ControlPage.clickSubmit()
      })
    })

    cy.contains('Dashboard').click()
  })
})
