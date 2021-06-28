/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable prettier/prettier */
/* eslint-disable jest/expect-expect */
import { manuscripts } from '../../support/routes'
import { ManuscriptsPage } from '../../page-object/manuscripts-page'
import { NewSubmissionPage } from '../../page-object/new-submission-page'
import { SubmissionFormPage } from '../../page-object/submission-form-page'
import { Menu } from '../../page-object/page-component/menu'

describe('manuscripts page tests', () => {
  beforeEach(() => {
    // task to restore the database as per the  dumps/initialState.sql
    cy.task('restore', 'initial_state_ncrc')
    cy.task('seedForms')

    // login as admin
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.fixture('role_names').then(name => {
      cy.login(name.role.admin, manuscripts)
    })
    cy.awaitDisappearSpinner()
    ManuscriptsPage.getTableHeader().should('be.visible')
  })

  context('elements visibility', () => {
    it('submit button, live chat button and dashboard page should be visible', () => {
      ManuscriptsPage.getSubmitButton().should('be.visible')
      ManuscriptsPage.getLiveChatButton().should('be.visible')
      Menu.getDashboardButton().should('be.visible')
    })

    it('evaluation button should be visible and publish button should not be visible for unsubmitted articles', () => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // fill the submit form and submit it
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInArticleDescription(data.articleId)
      })
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.getEvaluationButton()
        .scrollIntoView()
        .should('be.visible')
      ManuscriptsPage.getOptionWithText('Publish').should('not.exist')
    })

    it('label & topics should be visible on manuscripts page', () => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // fill the submit form and submit it
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.clickDropdown(-3)
        SubmissionFormPage.selectDropdownOption(1)
        SubmissionFormPage.clickTopicsCheckboxWithText(data.topic)
        SubmissionFormPage.clickTopicsCheckboxWithText('epidemiology')
        Menu.clickManuscriptsAndAssertPageLoad()
        ManuscriptsPage.getArticleTopic(0).should('contain', data.topic)
        ManuscriptsPage.getArticleTopic(1).should('contain', 'epidemiology')
        ManuscriptsPage.getArticleLabel()
          .scrollIntoView()
          .should('be.visible')
          .and('contain', 'evaluated')
      })
    })

    it('editors column should be visible', () => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // fill the submit form and submit it
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInArticleDescription(data.articleId)
      })
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.getTableHead(-1)
        .scrollIntoView()
        .should('contain', 'Editor')
        .and('be.visible')
    })
  })

  context('unsubmitted article tests', () => {
    beforeEach(() => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
    })

    it('unsubmitted article is evaluated', () => {
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInArticleDescription(data.title)
      })
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.clickEvaluation()
      cy.url().should('contain', 'evaluation')
      SubmissionFormPage.getArticleUrl().should('have.value', '')
      // eslint-disable-next-line
      SubmissionFormPage.getOurTakeContent().should('be.eq', '')
      SubmissionFormPage.getDropdown(0).should('have.value', '')
      SubmissionFormPage.getStudySettingContent().should('have.value', '')
      SubmissionFormPage.getMainFindingsContent().should('have.value', '')
      SubmissionFormPage.getStudyStrengthsContent().should('have.value', '')
      SubmissionFormPage.getLimitationsContent().should('have.value', '')
      SubmissionFormPage.getValueAddedContent().should('have.value', '')
      SubmissionFormPage.getDropdown(1).should('have.value', '')
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInArticleUrl(data.doi)
        SubmissionFormPage.fillInArticleDescription(data.articleId)
        SubmissionFormPage.fillInOurTake(data.ourTake)
        SubmissionFormPage.clickDropdown(2)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.fillInMainFindings(data.mainFindings)
        SubmissionFormPage.fillInStudyStrengths(data.studyStrengths)
        SubmissionFormPage.fillInLimitations(data.limitations)
        SubmissionFormPage.fillInValueAdded(data.valueAdded)
        SubmissionFormPage.clickDropdown(-3)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.clickTopicsCheckboxWithText(data.topic)
        SubmissionFormPage.fillInFirstAuthor(data.creator)
        SubmissionFormPage.fillInDatePublished(data.date)
        SubmissionFormPage.fillInJournal(data.journal)
        SubmissionFormPage.fillInReviewer(data.creator)
        SubmissionFormPage.fillInEditDate(data.date)
        SubmissionFormPage.fillInReviewCreator(data.creator)
        SubmissionFormPage.clickSubmitResearchAndWaitPageLoad()
        ManuscriptsPage.getStatus(0).should('eq', 'evaluated')
        ManuscriptsPage.getArticleTopic(0)
          .should('be.visible')
          .should('contain', data.topic)
        ManuscriptsPage.getArticleLabel().should('contain', 'ready to evaluate')
      })
    })
  })

  context('submitted and evaluated article tests', () => {
    beforeEach(() => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // fill the submit form and submit it
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInArticleUrl(data.doi)
        SubmissionFormPage.fillInArticleDescription(data.articleId)
        SubmissionFormPage.fillInOurTake(data.ourTake)
        SubmissionFormPage.clickDropdown(2)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.fillInMainFindings(data.mainFindings)
        SubmissionFormPage.fillInStudyStrengths(data.studyStrengths)
        SubmissionFormPage.fillInLimitations(data.limitations)
        SubmissionFormPage.fillInValueAdded(data.valueAdded)
        SubmissionFormPage.clickDropdown(-3)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.clickTopicsCheckboxWithText(data.topic)
        SubmissionFormPage.fillInFirstAuthor(data.creator)
        SubmissionFormPage.fillInDatePublished(data.date)
        SubmissionFormPage.fillInJournal(data.journal)
        SubmissionFormPage.fillInReviewer(data.creator)
        SubmissionFormPage.fillInEditDate(data.date)
        SubmissionFormPage.fillInReviewCreator(data.creator)
        // eslint-disable-next-line
        SubmissionFormPage.waitThreeSec()
        SubmissionFormPage.clickSubmitResearchAndWaitPageLoad()
      })
    })

    it('manuscripts page should contain the correct details after submission', () => {
      cy.url().should('contain', 'manuscripts')
      ManuscriptsPage.getStatus(0).should('eq', 'Submitted')
      ManuscriptsPage.getManuscriptsPageTitle().should('be.visible')
      ManuscriptsPage.getEvaluationButton()
        .scrollIntoView()
        .should('be.visible')
      ManuscriptsPage.getControlButton().should('not.exist')
      ManuscriptsPage.getOptionWithText('View').should('be.visible')
      ManuscriptsPage.getOptionWithText('Delete').should('be.visible')
      ManuscriptsPage.getOptionWithText('Publish').should('not.exist')
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        ManuscriptsPage.getArticleTopic(0)
          .scrollIntoView()
          .should('be.visible')
          .should('contain', data.topic)
      })
      ManuscriptsPage.getArticleLabel().should('contain', 'ready to evaluate')
    })

    it('evaluate article and check status is changed and publish button is visible', () => {
      ManuscriptsPage.getStatus(0).should('eq', 'Submitted')
      ManuscriptsPage.clickEvaluation()

      SubmissionFormPage.clickSubmitResearchAndWaitPageLoad()

      ManuscriptsPage.getStatus(0).should('eq', 'evaluated')
      ManuscriptsPage.getOptionWithText('Publish')
        .scrollIntoView()
        .should('be.visible')
    })

    it('evaluation changes should be visible', () => {
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        ManuscriptsPage.getStatus(0).should('eq', 'Submitted')
        ManuscriptsPage.clickEvaluation()
        SubmissionFormPage.fillInValueAdded('Evaluated')
        SubmissionFormPage.clickTopicsCheckboxWithText('vaccines')
        // eslint-disable-next-line
        SubmissionFormPage.waitThreeSec()
        SubmissionFormPage.clickSubmitResearchAndWaitPageLoad()
        ManuscriptsPage.clickEvaluation()
        // eslint-disable-next-line
        SubmissionFormPage.getValueAddedField().should(
          'not.have.text',
          data.valueAdded,
        )
        SubmissionFormPage.getValueAddedField().should('have.text', 'Evaluated')
      })
    })
  })

  context('filter and sort articles', () => {
    beforeEach(() => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('form_option').then(data => {
        SubmissionFormPage.fillInArticleDescription('123')
        SubmissionFormPage.clickElementFromFormOptionList(8)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.clickTopicsCheckboxWithText(
          data.ncrc.topicTypes.vaccines,
        )
        Menu.clickManuscriptsAndAssertPageLoad()
        ManuscriptsPage.clickSubmit()
        NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
        SubmissionFormPage.fillInArticleDescription('abc')
        SubmissionFormPage.clickElementFromFormOptionList(8)
        SubmissionFormPage.selectDropdownOption(1)
        SubmissionFormPage.clickTopicsCheckboxWithText(
          data.ncrc.topicTypes.ecologyAndSpillover,
        )
        SubmissionFormPage.clickTopicsCheckboxWithText(
          data.ncrc.topicTypes.diagnostics,
        )
        Menu.clickManuscriptsAndAssertPageLoad()
        ManuscriptsPage.clickSubmit()
        NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
        SubmissionFormPage.fillInArticleDescription('def')
        SubmissionFormPage.clickElementFromFormOptionList(8)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.clickTopicsCheckboxWithText(
          data.ncrc.topicTypes.modeling,
        )
        SubmissionFormPage.clickTopicsCheckboxWithText(
          data.ncrc.topicTypes.diagnostics,
        )
        Menu.clickManuscriptsAndAssertPageLoad()
      })
    })

    it('filter article after topic and url contain that topic', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000)
      ManuscriptsPage.clickArticleTopic(-1)
      ManuscriptsPage.getTableRowsCount().should('eq', 1)
      cy.url().should('contain', 'vaccines')
      ManuscriptsPage.getArticleTopic(0).should('contain', 'vaccines')
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.clickArticleTopic(1)
      ManuscriptsPage.getTableRowsCount().should('eq', 2)
      cy.url().should('contain', 'diagnostics')
      ManuscriptsPage.getArticleTopic(0).should('contain', 'modeling')
      ManuscriptsPage.getArticleTopic(1).should('contain', 'diagnostics')
      ManuscriptsPage.getArticleTopic(2).should(
        'contain',
        'ecology and spillover',
      )
      ManuscriptsPage.getArticleTopic(3).should('contain', 'diagnostics')
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.clickArticleTopic(0)
      ManuscriptsPage.getTableRowsCount().should('eq', 1)
      cy.url().should('contain', 'modeling')
      ManuscriptsPage.getArticleTopic(0).should('contain', 'modeling')
      ManuscriptsPage.getArticleTopic(1).should('contain', 'diagnostics')
    })

    it('sort article by label', () => {
      ManuscriptsPage.getArticleLabel().should('have.length', 3)
      ManuscriptsPage.getTableRow().eq(2).should('be.visible')
      ManuscriptsPage.getLabelRow(0).should('contain', 'ready to evaluate')
      ManuscriptsPage.getLabelRow(1).should('contain', 'evaluated')
      ManuscriptsPage.getLabelRow(2).should('contain', 'ready to evaluate')
      ManuscriptsPage.clickTableHead(6)
      ManuscriptsPage.getArticleLabel().should('have.length', 3)
      ManuscriptsPage.getLabelRow(0).scrollIntoView().should('be.visible')
      ManuscriptsPage.getLabelRow(1).scrollIntoView().should('be.visible')
      ManuscriptsPage.getLabelRow(2).scrollIntoView().should('be.visible')
       ManuscriptsPage.getLabelRow(0).should('contain', 'evaluated')
      ManuscriptsPage.getLabelRow(1).should('contain', 'ready to evaluate')
      ManuscriptsPage.getLabelRow(2).should('contain', 'ready to evaluate')
    })

    it('filter article after label and url contain that label', () => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000)
      ManuscriptsPage.clickArticleLabel(-1)
      ManuscriptsPage.getTableRowsCount().should('eq', 2)
      cy.url().should('contain', 'readyToEvaluate')
      ManuscriptsPage.getLabelRow(0).should('contain', 'ready to evaluate')
      ManuscriptsPage.getLabelRow(1).should('contain', 'ready to evaluate')
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.clickArticleLabel(1)
      ManuscriptsPage.getTableRowsCount().should('eq', 1)
      cy.url().should('contain', 'evaluated')
       ManuscriptsPage.getLabelRow(0).should('contain', 'evaluated')
       Menu.clickManuscriptsAndAssertPageLoad()
       ManuscriptsPage.clickArticleLabel(0)
      ManuscriptsPage.getTableRowsCount().should('eq', 2)
      cy.url().should('contain', 'readyToEvaluate')
      ManuscriptsPage.getLabelRow(0).should('contain', 'ready to evaluate')
      ManuscriptsPage.getLabelRow(1).should('contain', 'ready to evaluate')
    })

    it('sort article by Description', () => {
      ManuscriptsPage.getTableHead(0).should('contain', 'Description')
      ManuscriptsPage.getArticleTitleByRow(0).should('contain', 'def')
      ManuscriptsPage.getArticleTitleByRow(1).should('contain', 'abc')
      ManuscriptsPage.getArticleTitleByRow(2).should('contain', '123')
      ManuscriptsPage.clickTableHead(0)
      ManuscriptsPage.getArticleTitleByRow(0).should('contain', '123')
      ManuscriptsPage.getArticleTitleByRow(1).should('contain', 'abc')
      ManuscriptsPage.getArticleTitleByRow(2).should('contain', 'def')
    })

    it('filter article after status and url contain that status', () => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // fill the submit form and submit it
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInArticleUrl(data.doi)
        SubmissionFormPage.fillInArticleDescription(data.articleId)
        SubmissionFormPage.fillInOurTake(data.ourTake)
        SubmissionFormPage.clickDropdown(3)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.fillInMainFindings(data.mainFindings)
        SubmissionFormPage.fillInStudyStrengths(data.studyStrengths)
        SubmissionFormPage.fillInLimitations(data.limitations)
        SubmissionFormPage.fillInValueAdded(data.valueAdded)
        SubmissionFormPage.clickDropdown(-3)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.clickTopicsCheckboxWithText(data.topic)
        SubmissionFormPage.fillInFirstAuthor(data.creator)
        SubmissionFormPage.fillInDatePublished(data.date)
        SubmissionFormPage.fillInJournal(data.journal)
        SubmissionFormPage.fillInReviewer(data.creator)
        SubmissionFormPage.fillInEditDate(data.date)
        SubmissionFormPage.fillInReviewCreator(data.creator)
        // eslint-disable-next-line
        SubmissionFormPage.waitThreeSec()
        SubmissionFormPage.clickSubmitResearchAndWaitPageLoad()
      })
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000)
      ManuscriptsPage.clickStatus(-1)
      ManuscriptsPage.getTableRowsCount().should('eq', 3)
      ManuscriptsPage.getStatus(0).should('contain', 'Unsubmitted')
      cy.url().should('contain', 'new')
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.clickStatus(0)
      ManuscriptsPage.getTableRowsCount().should('eq', 1)
      ManuscriptsPage.getStatus(0).should('contain', 'Submitted')
      cy.url().should('contain', 'submitted')
    })

    it('combined filtering after status, topic and label, link content that combination', () => {
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      // fill the submit form and submit it
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('submission_form_data').then(data => {
        SubmissionFormPage.fillInArticleUrl(data.doi)
        SubmissionFormPage.fillInArticleDescription(data.articleId)
        SubmissionFormPage.fillInOurTake(data.ourTake)
        SubmissionFormPage.clickDropdown(3)
        SubmissionFormPage.selectDropdownOption(5)
        SubmissionFormPage.fillInMainFindings(data.mainFindings)
        SubmissionFormPage.fillInStudyStrengths(data.studyStrengths)
        SubmissionFormPage.fillInLimitations(data.limitations)
        SubmissionFormPage.fillInValueAdded(data.valueAdded)
        SubmissionFormPage.clickDropdown(-3)
        SubmissionFormPage.selectDropdownOption(0)
        SubmissionFormPage.clickTopicsCheckboxWithText(data.topic)
        SubmissionFormPage.fillInFirstAuthor(data.creator)
        SubmissionFormPage.fillInDatePublished(data.date)
        SubmissionFormPage.fillInJournal(data.journal)
        SubmissionFormPage.fillInReviewer(data.creator)
        SubmissionFormPage.fillInEditDate(data.date)
        SubmissionFormPage.fillInReviewCreator(data.creator)
        // eslint-disable-next-line
        SubmissionFormPage.waitThreeSec()
        SubmissionFormPage.clickSubmitResearchAndWaitPageLoad()
      })
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000)
      ManuscriptsPage.clickStatus(-1)
      ManuscriptsPage.getTableRowsCount().should('eq', 3)
      ManuscriptsPage.getStatus(0).should('contain', 'Unsubmitted')
      cy.url().should('contain', 'new')
      ManuscriptsPage.clickArticleTopic(1)
      ManuscriptsPage.getTableRowsCount().should('eq', 2)
      cy.url().should('contain', 'status=new&topic=diagnostics')
      ManuscriptsPage.clickArticleLabel(0)
      ManuscriptsPage.getTableRowsCount().should('eq', 1)
      cy.url().should('contain', 'status=new&topic=diagnostics&label=readyToEvaluate')
      
    })









  })

  context('video chat button', () => {
    it('check the video chat link, and if it returns 200', () => {
      ManuscriptsPage.getLiveChatButton().invoke('attr', 'href').should('contain', '//8x8.vc/coko/')
      ManuscriptsPage.getLiveChatButton()
        .then(link => {
          cy
            .request(link.prop('href'))
            .its('status')
            .should('eq', 200)
        })
    })
  })
  context('select button from Label column', () => {
    beforeEach(() => {
      cy.task('restore', 'initial_state_ncrc')
      cy.task('seedForms')
      // login as admin
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.fixture('role_names').then(name => {
        cy.login(name.role.admin, manuscripts)
      })
      cy.awaitDisappearSpinner()
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      SubmissionFormPage.fillInArticleDescription('123')
      Menu.clickManuscriptsAndAssertPageLoad()
      ManuscriptsPage.clickSubmit()
      NewSubmissionPage.clickSubmitUrlAndWaitPageLoad()
      SubmissionFormPage.fillInArticleDescription('abc')
      Menu.clickManuscriptsAndAssertPageLoad()
    })
    it('select button is visible', () => {
      ManuscriptsPage.getSelectButton().should('be.visible')
      ManuscriptsPage.getArticleLabel().should('not.exist')
    })
    it('after click on Select new status is displayed ', () => {
      ManuscriptsPage.getSelectAllCheckbox().click()
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 2)
      ManuscriptsPage.getSelectAllCheckbox().click()
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 0)
      ManuscriptsPage.clickSelect()
      ManuscriptsPage.getArticleLabel().should('contain', 'ready to evaluate')
      ManuscriptsPage.getSelectAllCheckbox().click()
      ManuscriptsPage.getSelectedArticlesCount().should('contain', 1)
    })
    it('check label field after bulk delete', () => {
      ManuscriptsPage.clickArticleCheckbox(1)
      ManuscriptsPage.clickDelete()
      ManuscriptsPage.getNumberOfAvailableArticles().should('contain', 1)
      ManuscriptsPage.getArticleLabel().should('contain', 'ready to evaluate')
    })
  })
})
