/* eslint-disable prettier/prettier,jest/valid-expect-in-promise */
/* eslint-disable jest/expect-expect */

import { dashboard, manuscripts } from '../../support/routes'
import { ManuscriptsPage } from '../../page-object/manuscripts-page'
import { NewSubmissionPage } from '../../page-object/new-submission-page'
import { Menu } from '../../page-object/page-component/menu'
import { DashboardPage } from '../../page-object/dashboard-page'
import { ControlPage } from '../../page-object/control-page'
import { ReviewersPage } from '../../page-object/reviewers-page'
import { ReviewPage } from '../../page-object/review-page'
import { SubmissionFormPage } from '../../page-object/submission-form-page'

describe('control page tests', () => {
  context('shared message', () => {
    beforeEach(() => {
      cy.task('restore', 'commons/bootstrap')
      cy.task('seedForms')
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin.name, dashboard)
        cy.awaitDisappearSpinner()
        DashboardPage.clickSubmit()
        NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
        Menu.clickManuscriptsAndAssertPageLoad()
        ManuscriptsPage.clickControlAndVerifyPageLoaded()
        ControlPage.clickAssignSeniorEditorDropdown()
        ControlPage.selectDropdownOptionByName(name.role.reviewers[1].username)
        ControlPage.clickManageReviewers()
        ReviewersPage.inviteReviewer(name.role.reviewers[1].username)
      })
    })
    it('shared message is visible', () => {
      ReviewersPage.clickSharedCheckbox(0)
      ReviewersPage.waitThreeSec()
      ReviewersPage.clickBackToControlPage()
      cy.fixture('role_names').then(name => {
        cy.login(name.role.reviewers[1].name, dashboard)
        cy.awaitDisappearSpinner()
        DashboardPage.clickAcceptReviewButton()
        DashboardPage.clickDoReviewAndVerifyPageLoaded()
        cy.fixture('submission_form_data').then(data => {
          ReviewPage.fillInReviewComment(data.review1)
        })
        ReviewPage.clickAcceptRadioButton()
        ReviewPage.clickSubmitButton()
        ReviewPage.waitThreeSec()
        cy.login(name.role.admin.name, manuscripts)    
      })
      cy.awaitDisappearSpinner()
      ManuscriptsPage.clickControlAndVerifyPageLoaded()
      cy.fixture('submission_form_data').then(data => {
        ControlPage.getReviewMessage().should('contain', data.review1)
      })
    })
    it('shared message is not visible', () => {
      ReviewersPage.clickBackToControlPage()
      ReviewersPage.waitThreeSec()
      cy.fixture('role_names').then(name => {
       cy.login(name.role.reviewers[1].name, dashboard)
        cy.awaitDisappearSpinner()
        DashboardPage.clickAcceptReviewButton()
        DashboardPage.clickDoReviewAndVerifyPageLoaded()
        cy.fixture('submission_form_data').then(data => {
          ReviewPage.fillInReviewComment(data.review1)
        })
        ReviewPage.clickAcceptRadioButton()
        ReviewPage.clickSubmitButton()
        ReviewPage.waitThreeSec()
        cy.login(name.role.admin.name, manuscripts)
      })
      cy.awaitDisappearSpinner()
      ManuscriptsPage.clickControlAndVerifyPageLoaded()
      ControlPage.getShowButton().should('not.exist')
    })
    it('checkbox can be published publicly is visible', () => {
      ReviewersPage.clickSharedCheckbox(0)
      ReviewersPage.waitThreeSec()
      ReviewersPage.clickBackToControlPage()
      cy.fixture('role_names').then(name => {
        cy.login(name.role.reviewers[1].name, dashboard)
      })
      cy.awaitDisappearSpinner()
      DashboardPage.clickAcceptReviewButton()
      DashboardPage.clickDoReviewAndVerifyPageLoaded()
      cy.fixture('submission_form_data').then(data => {
        ReviewPage.fillInReviewComment(data.review1)
      })
      ReviewPage.getCanBePublishedPubliclyCheckbox()
        .scrollIntoView()
        .should('be.visible')
      ReviewPage.clickCanBePublishedPublicly()
      ReviewPage.getCanBePublishedPubliclyCheckbox().should(
        'have.value',
        'true',
      )
    })
    it('icon for accepted to publish review is visible', () => {
      ReviewersPage.clickSharedCheckbox(0)
      ReviewersPage.waitThreeSec()
      ReviewersPage.clickBackToControlPage()
      cy.fixture('role_names').then(name => {
        cy.login(name.role.reviewers[1].name, dashboard)
      })
      cy.awaitDisappearSpinner()
      DashboardPage.clickAcceptReviewButton()
      DashboardPage.clickDoReviewAndVerifyPageLoaded()
      cy.fixture('submission_form_data').then(data => {
        ReviewPage.fillInReviewComment(data.review1)
      })
      ReviewPage.clickCanBePublishedPublicly()
      ReviewPage.getCanBePublishedPubliclyCheckbox().should(
        'have.value',
        'true',
      )
      ReviewPage.clickAcceptRadioButton()
      ReviewPage.clickSubmitButton()
      ReviewPage.waitThreeSec()
      DashboardPage.clickControlPanel()
      ControlPage.clickShow()
      ControlPage.getAcceptedToPublishReview().should('be.visible')
    })
  })

  context('hide review and review name from author', () => {
    beforeEach(() => {
      cy.task('restore', 'commons/bootstrap')
      cy.task('seedForms')
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin.name, dashboard)
        cy.awaitDisappearSpinner()
        DashboardPage.clickSubmit()
        NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
        Menu.clickManuscriptsAndAssertPageLoad()
        ManuscriptsPage.clickControlAndVerifyPageLoaded()
        ControlPage.clickAssignSeniorEditorDropdown()
        ControlPage.selectDropdownOptionByName(name.role.reviewers[1].name)
        ControlPage.clickManageReviewers()
        ReviewersPage.inviteReviewer(name.role.reviewers[1].name)
        ReviewersPage.clickSharedCheckbox(0)
        ReviewersPage.waitThreeSec()
        cy.login(name.role.reviewers[1].name, dashboard)
        cy.awaitDisappearSpinner()
        DashboardPage.clickAcceptReviewButton()
        DashboardPage.clickDoReview()
        cy.fixture('submission_form_data').then(data => {
          ReviewPage.fillInReviewComment(data.review1)
        })
        ReviewPage.clickAcceptRadioButton()
        ReviewPage.clickSubmitButton()
        ReviewPage.waitThreeSec()
        cy.login(name.role.admin.name, manuscripts)
        cy.awaitDisappearSpinner()
        ManuscriptsPage.clickControlAndVerifyPageLoaded()
        ControlPage.clickShow()
        cy.fixture('submission_form_data').then(data => {
          ControlPage.getReviewMessage().should('contain', data.review1)
        })
        cy.login(name.role.reviewers[1].name, dashboard)
      })
      cy.awaitDisappearSpinner()
      DashboardPage.clickControlPanel()
    })
    it('review is hidden from the author of the article', () => {
      ControlPage.clickHideReviewToAuthor()
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin.name, manuscripts)
        cy.awaitDisappearSpinner()
        ManuscriptsPage.clickControl()
        ControlPage.getNoReviewsMessage().should(
          'contain',
          'No reviews completed yet.',
        )
        ControlPage.getShowButton().should('not.exist')
      })
    })
    it('hide reviewer name', () => {
      ControlPage.clickHideReviewerNameToAuthor()
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin.name, manuscripts)
        cy.awaitDisappearSpinner()
        ManuscriptsPage.clickControlAndVerifyPageLoaded()
        ControlPage.clickShow()
        ControlPage.getReviewerName().should('contain', 'Anonymous')
      })
    })
  })

  context('admin user can see the icons', () => {
    beforeEach(() => {
      cy.task('restore', 'commons/bootstrap')
      cy.task('seedForms')
      cy.fixture('role_names').then(name => {
        cy.login(name.role.reviewers[1].name, dashboard)
        cy.awaitDisappearSpinner()
        DashboardPage.clickSubmit()
        NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
        cy.fixture('submission_form_data').then(data => {
          SubmissionFormPage.fillInDoi(data.doi)
          SubmissionFormPage.getWaxInputBox(0).fillInput(data.abstract)
          SubmissionFormPage.fillInFirstAuthor(data.creator)
          SubmissionFormPage.fillInDatePublished(data.date)
          SubmissionFormPage.fillInLink(data.doi)
          SubmissionFormPage.getWaxInputBox(1).fillInput(data.ourTake)
          SubmissionFormPage.getWaxInputBox(2).fillInput(data.mainFindings)
          SubmissionFormPage.getWaxInputBox(3).fillInput(data.studyStrengths)
          SubmissionFormPage.getWaxInputBox(4).fillInput(data.limitations)
          SubmissionFormPage.fillInKeywords(data.keywords)
          SubmissionFormPage.fillInReviewCreator(data.creator)
        })
        SubmissionFormPage.clickSubmitResearch()
        SubmissionFormPage.clickSubmitManuscriptAndWaitPageLoad()
        cy.login(name.role.admin.name, manuscripts)
        cy.awaitDisappearSpinner()
        Menu.clickManuscriptsAndAssertPageLoad()
        ManuscriptsPage.clickControlAndVerifyPageLoaded()
        ControlPage.clickAssignSeniorEditorDropdown()
        ControlPage.selectDropdownOptionByName(name.role.reviewers[2].username)
        ControlPage.clickManageReviewers()
        ReviewersPage.inviteReviewer(name.role.reviewers[2].username)
        ReviewersPage.clickSharedCheckbox(0)
        ReviewersPage.waitThreeSec()
        cy.login(name.role.reviewers[2].name, dashboard)
        cy.awaitDisappearSpinner()
        DashboardPage.clickAcceptReviewButton()
        DashboardPage.clickDoReview()
        cy.fixture('submission_form_data').then(data => {
          ReviewPage.fillInReviewComment(data.review1)
        })
        ReviewPage.clickCanBePublishedPublicly()
        ReviewPage.clickAcceptRadioButton()
        ReviewPage.clickSubmitButton()
        ReviewPage.waitThreeSec()
        cy.login(name.role.admin.name, manuscripts)
        cy.awaitDisappearSpinner()
        ManuscriptsPage.clickControlAndVerifyPageLoaded()
        ControlPage.clickShow()
        cy.fixture('submission_form_data').then(data => {
          ControlPage.getReviewMessage().should('contain', data.review1)
        })
      })
    })
    it('admin user is able to see share icon, Hide review and Hide reviewer name checkboxs', () => {
      ControlPage.getAcceptedToPublishReview().should('be.visible')
      ControlPage.getHideReviewToAuthorCheckbox().should('be.visible')
      ControlPage.getHideReviewerNameCheckbox().should('be.visible')
    })
    it('admin user hide reviewer name', () => {
      ControlPage.clickHideReviewerNameToAuthor()
      cy.fixture('role_names').then(name => {
        cy.login(name.role.reviewers[1].name, dashboard)
      })
      DashboardPage.getVersionTitle().click()
      ControlPage.getReviewerName().should('contain', 'Anonymous')
      ControlPage.getHideReviewerNameCheckbox().should('be.visible')
    })
    it('admin user hide review', () => {
      ControlPage.clickHideReviewToAuthor()
      ControlPage.clickHideReviewerNameToAuthor()
      cy.fixture('role_names').then(name => {
        cy.login(name.role.reviewers[1].name, dashboard)
      })
      ControlPage.getHideReviewToAuthorCheckbox().should('be.visible')
    })
  })
})
