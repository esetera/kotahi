/* eslint-disable prettier/prettier */
/* eslint-disable jest/expect-expect */
import { dashboard, manuscripts } from '../../support/routes'
import { ManuscriptsPage } from '../../page-object/manuscripts-page'
import { NewSubmissionPage } from '../../page-object/new-submission-page'
import { SubmissionFormPage } from '../../page-object/submission-form-page'
import { Menu } from '../../page-object/page-component/menu'
import { DashboardPage } from '../../page-object/dashboard-page'

describe('manuscripts page checkboxes tests', () => {
  context('unsubmitted manuscripts checkbox tests', () => {
    before(() => {
      cy.task('restore', 'commons/bootstrap')
      cy.task('seedForms')
      // login as admin
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin.name, dashboard)
      })
      cy.awaitDisappearSpinner()
      DashboardPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      SubmissionFormPage.fillInTitle('123')
      Menu.clickDashboardAndVerifyPageLoaded()
      DashboardPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      SubmissionFormPage.fillInTitle('abc')
      Menu.clickDashboardAndVerifyPageLoaded()
      DashboardPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      SubmissionFormPage.fillInTitle('def')
      Menu.clickManuscriptsAndAssertPageLoad()
      cy.wait(3000)
    })
    beforeEach(() => {
      // login as admin
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin.name, manuscripts)
      })
      cy.awaitDisappearSpinner()
    })
    it('checkbox visibility', () => {
      ManuscriptsPage.getSelectAllCheckbox().should('be.visible')
      ManuscriptsPage.getAllArticleCheckboxesLength().should('eq', 3)
    })
    it('select an article & check selection', () => {
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 0)
      ManuscriptsPage.clickArticleCheckbox(1)
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 1)
    })
    it('select & deselect all articles and check count', () => {
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 0)
      ManuscriptsPage.getSelectAllCheckbox().click()
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 3)
      ManuscriptsPage.getSelectAllCheckbox().click()
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 0)
    })
  })
  context('submitted manuscripts checkbox tests', () => {
    it('checkbox should not be visible for submitted manuscripts', () => {
      cy.task('restore', 'commons/bootstrap')
      cy.task('seedForms')
      // login as admin
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin.name, dashboard)
      })
      cy.awaitDisappearSpinner()
      DashboardPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInDoi(data.doi)
        SubmissionFormPage.getWaxInputBox(0).fillInput(data.abstract)
        SubmissionFormPage.fillInDatePublished(data.date)
        SubmissionFormPage.getWaxInputBox(1).fillInput(data.ourTake)
        SubmissionFormPage.getWaxInputBox(2).fillInput(data.mainFindings)
        SubmissionFormPage.getWaxInputBox(3).fillInput(data.studyStrengths)
        SubmissionFormPage.getWaxInputBox(4).fillInput(data.limitations)
      })
      SubmissionFormPage.clickSubmitResearch()
      SubmissionFormPage.clickSubmitYourManuscript()
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.getAllArticleCheckboxes().should('not.exist')
    })
  })
})
