import React from 'react'
import DecisionVersion from '../../app/components/component-review/src/components/DecisionVersion'
import { JournalProvider } from '../../app/components/xpub-journal/src'
import { XpubProvider } from '../../app/components/xpub-with-context/src'
import { ConfigProvider } from '../../app/components/config/src'
import * as journal from '../../config/journal'
import config from '../../config/sampleConfigFormData'
import DesignEmbed from '../common/utils'
import { roles } from '../../app/globals'

export const Base = args => (
  <XpubProvider>
    <JournalProvider journal={JSON.parse(JSON.stringify(journal))}>
      <ConfigProvider config={config}>
        <DecisionVersion {...props} />
      </ConfigProvider>
    </JournalProvider>
  </XpubProvider>
)

const props = {
  dois: [],
  roles,
  form: {
    __typename: 'FormStructure',
    name: 'Research Object Submission Form',
    description:
      '<p>Aperture is now accepting Research Object Submissions. Please fill out the form below to complete your submission.</p>',
    haspopup: 'true',
    popuptitle:
      'By submitting the manuscript, you agree to the following statements.',
    popupdescription:
      '<p>The corresponding author confirms that all co-authors are included, and that everyone listed as a co-author agrees to that role and all the following requirements and acknowledgements.</p><p></p><p>The submission represents original work and that sources are given proper attribution. The journal employs CrossCheck to compare submissions against a large and growing database of published scholarly content. If in the judgment of a senior editor a submission is genuinely suspected of plagiarism, it will be returned to the author(s) with a request for explanation.</p><p></p><p>The research was conducted in accordance with ethical principles.</p><p></p><p>There is a Data Accessibility Statement, containing information about the location of open data and materials, in the manuscript.</p><p></p><p>A conflict of interest statement is present in the manuscript, even if to state no conflicts of interest.</p>',
    children: [
      {
        __typename: 'FormElement',
        title: 'Upload supplementary materials',
        id: 'b769b4d5-f9b3-48d3-a6d5-77bb6a9e95b0',
        component: 'SupplementaryFiles',
        name: 'fileName',
        description: '<p>Upload your files.</p>',
      },
      {
        __typename: 'FormElement',
        title: 'Abstract',
        shortDescription: 'Abstract',
        id: 'd80b2c88-6144-4003-b671-63990b9b2793',
        component: 'AbstractEditor',
        name: 'submission.abstract',
        description: '<p>Please provide a short summary of your submission</p>',
        placeholder: 'Input your abstract...',
      },
      {
        __typename: 'FormElement',
        title:
          'Did your study involve healthy subjects only or patients (note that patient studies may also involve healthy subjects)',
        shortDescription: 'Patients/healthy subjects',
        id: 'ebe75cec-0ba8-4f00-9024-20e77ed94f1c',
        component: 'Select',
        name: 'submission.subjects',
        description: '<p></p>',
        options: [
          {
            __typename: 'FormElementOption',
            id: '5fa97761-1b46-4a67-87f6-1dbe772381eb',
            label: 'Healthy subjects',
            value: 'healthy_subjects',
          },
          {
            __typename: 'FormElementOption',
            id: '40f48822-786c-46dd-9026-287f96c4929d',
            label: 'Patients',
            value: 'patients',
          },
        ],
      },
      {
        __typename: 'FormElement',
        title: 'Cover letter',
        id: '347dc171-f008-45ac-8433-ca0711bf213c',
        component: 'AbstractEditor',
        name: 'submission.cover',
        description:
          '<p>Cover letter describing submission, relevant implications, and timely information to consider</p>',
        placeholder: 'Enter your cover letter',
      },
      {
        __typename: 'FormElement',
        title: 'Title',
        id: '47fd802f-ed30-460d-9617-c8a9b9025e95',
        component: 'TextField',
        name: 'meta.title',
        description: '<p></p>',
        placeholder: "Enter the manuscript's title",
      },
      {
        __typename: 'FormElement',
        title: 'Affiliation',
        id: '1c2e9325-3fa8-41f3-8607-180eb8a25aa3',
        component: 'TextField',
        name: 'submission.affiliation',
        placeholder: 'Enter your affiliation',
      },
      {
        __typename: 'FormElement',
        title: 'Name',
        id: '62ca72ad-04b0-41fc-85d1-415469d7e895',
        component: 'TextField',
        name: 'submission.name',
        placeholder: 'Enter your name',
        validate: [
          {
            __typename: 'FormElementOption',
            id: '0b053fde-8ebd-4fcb-aa98-8585e8571717',
            label: 'minimum Characters',
            value: 'minChars',
          },
        ],
        validateValue: {
          __typename: 'FormElementValidation',
          minChars: '4',
        },
      },
      {
        __typename: 'FormElement',
        title: 'Ethics statement',
        id: 'fa5e5b75-4b6f-4a2d-9113-c2b4db73ef8a',
        component: 'AbstractEditor',
        name: 'submission.ethics',
        placeholder: 'Enter your ethics statements',
      },
      {
        __typename: 'FormElement',
        title: 'Research object links',
        id: 'bf0c8b8f-7523-4c7d-a74c-7635838f1451',
        component: 'LinksInput',
        name: 'submission.links',
      },
      {
        __typename: 'FormElement',
        title: 'Email and contact information',
        id: '7f5aa395-3486-4067-b636-ae204d472c16',
        component: 'TextField',
        name: 'submission.contact',
        placeholder: 'Enter your contact information',
      },
      {
        __typename: 'FormElement',
        title: 'Type of Research Object',
        id: 'fa0c39ca-0486-4e29-ba24-f86f7d375c3f',
        component: 'Select',
        name: 'submission.objectType',
        options: [
          {
            __typename: 'FormElementOption',
            id: 'df5fc212-b055-4cba-9d0e-e85222e3d4f2',
            label: 'Dataset',
            value: 'dataset',
          },
          {
            __typename: 'FormElementOption',
            id: 'ef2ddada-105a-412e-8d7f-56b1df44c02f',
            label: 'Software',
            value: 'software',
          },
          {
            __typename: 'FormElementOption',
            id: '0fafbfc3-6797-46e3-aff4-3fd4f16261b1',
            label: 'Figure',
            value: 'figure',
          },
          {
            __typename: 'FormElementOption',
            id: '5117a7c6-2fcf-414b-ac60-47f8d93ccfef',
            label: 'Notebook',
            value: 'notebook',
          },
        ],
      },
      {
        __typename: 'FormElement',
        title: 'Suggested reviewers',
        id: '14b8da7d-5924-4098-8d1f-e528c7c440b9',
        component: 'TextField',
        name: 'submission.suggested',
        placeholder: 'Add reviewer names...',
        parse: 'split',
        format: 'join',
      },
      {
        __typename: 'FormElement',
        title: 'Keywords',
        id: '6342cff7-c57a-4fd9-b91d-c4cf77b4c309',
        component: 'TextField',
        name: 'submission.keywords',
        placeholder: 'Enter keywords...',
        parse: 'split',
        format: 'join',
        validate: [
          {
            __typename: 'FormElementOption',
            id: '1a19d1c8-8ca8-43de-8b20-5ee161a0e825',
            label: 'minimum Characters',
            value: 'minChars',
          },
          {
            __typename: 'FormElementOption',
            id: 'ee308c3e-cda9-4970-9afd-ec4243975a8f',
            label: 'Required',
            value: 'required',
          },
        ],
        validateValue: {
          __typename: 'FormElementValidation',
          minChars: '2',
          maxChars: '6',
        },
      },
      {
        __typename: 'FormElement',
        title: 'Visual Abstract',
        id: '8b858adc-5f65-4385-9f79-5c5af1f67bd5',
        component: 'VisualAbstract',
        name: 'visualAbstract',
        description:
          '<p>Provide a visual abstract or figure to represent your manuscript.</p>',
      },
      {
        __typename: 'FormElement',
        title:
          'If your research involved human subjects, was the research approved by the relevant Institutional Review Board or ethics panel?',
        shortDescription: 'Ethics panel',
        id: '6871680a-2278-40b3-80c6-7de06f21aafb',
        component: 'Select',
        name: 'submission.irb',
        description:
          '<p><i>NOTE: Any human subjects studies without IRB approval will be automatically rejected.</i></p>',
        options: [
          {
            __typename: 'FormElementOption',
            id: 'bc2549db-8819-412d-9f36-816c2586ef12',
            label: 'Yes',
            value: 'yes',
          },
          {
            __typename: 'FormElementOption',
            id: '91bd7c42-a5e7-4290-a085-65566218df15',
            label: 'No',
            value: 'no',
          },
          {
            __typename: 'FormElementOption',
            id: '3e7689c2-2a6a-408e-b57d-680d441cf2e5',
            label:
              ' Not applicable (My Research Object does not involve human subjects) ',
            value: 'N/A',
          },
        ],
      },
      {
        __typename: 'FormElement',
        title:
          'Was any animal research approved by the relevant IACUC or other animal research panel?',
        shortDescription: 'Animal research panel',
        id: 'b127ecb1-4862-4662-a958-3266eb284353',
        component: 'Select',
        name: 'submission.animal_research_approval',
        description:
          '<p><i>NOTE: Any animal studies without IACUC approval will be automatically rejected.</i></p>',
        options: [
          {
            __typename: 'FormElementOption',
            id: 'fd3c8237-d080-43b7-9353-28c16d9bfcfc',
            label: 'Yes',
            value: 'yes',
          },
          {
            __typename: 'FormElementOption',
            id: 'de158fbc-a5b5-4c76-bd5a-2c546aa42fee',
            label: 'No',
            value: 'no',
          },
          {
            __typename: 'FormElementOption',
            id: '56159591-4c84-434c-b66c-1969b5f7afae',
            label:
              ' Not applicable (My Research Object does not involve animal subjects)',
            value: 'N/A',
          },
        ],
      },
      {
        __typename: 'FormElement',
        title: 'Please indicate which methods were used in your research:',
        shortDescription: 'Methods',
        id: '6deaacc6-759a-4a68-b494-c38c664bb665',
        component: 'CheckboxGroup',
        name: 'submission.methods',
        options: [
          {
            __typename: 'FormElementOption',
            id: '50ccff9e-f3e5-410b-b0b4-390f5474ba09',
            label: 'Structural MRI',
            value: 'Structural MRI',
          },
          {
            __typename: 'FormElementOption',
            id: 'dccc2374-ccc8-4ce1-9907-107445ba261a',
            label: 'Functional MRI',
            value: 'Functional MRI',
          },
          {
            __typename: 'FormElementOption',
            id: '0567acdf-5fb4-4fea-aae7-d2f0875792e9',
            label: 'Diffusion MRI',
            value: 'Diffusion MRI',
          },
          {
            __typename: 'FormElementOption',
            id: '0f8bdc88-4e87-46e6-bb59-bc2c53221494',
            label: 'EEG/ERP',
            value: 'EEG/ERP',
          },
          {
            __typename: 'FormElementOption',
            id: '8e10e2c7-b10e-4dd2-b0c5-74e6e87d3b1e',
            label: 'Neurophysiology',
            value: 'Neurophysiology',
          },
          {
            __typename: 'FormElementOption',
            id: '5822b3f8-80e6-47ee-bcdd-e17d1db47f7b',
            label: 'PET',
            value: 'PET',
          },
          {
            __typename: 'FormElementOption',
            id: 'd21a5be5-8a51-42f3-9e47-c15f8a4fc141',
            label: 'MEG',
            value: 'MEG',
          },
          {
            __typename: 'FormElementOption',
            id: '89a5e7de-df90-44bf-8971-5b49154331f6',
            label: 'Optical Imaging',
            value: 'Optical Imaging',
          },
          {
            __typename: 'FormElementOption',
            id: '22a428a7-bf65-49cd-9104-0122ae43f956',
            label: 'Postmortem anatomy',
            value: 'Postmortem anatomy',
          },
          {
            __typename: 'FormElementOption',
            id: '5b98a344-0438-4d79-85ab-9ae9f0e28d2d',
            label: 'TMS',
            value: 'TMS',
          },
          {
            __typename: 'FormElementOption',
            id: '5fbc6edd-e2e9-4dc2-a1a4-a6c67f6eef43',
            label: 'Behavior',
            value: 'Behavior',
          },
          {
            __typename: 'FormElementOption',
            id: '8cc52203-ca5b-4580-944f-748a62d449b5',
            label: 'Neuropsychological testing',
            value: 'Neuropsychological testing',
          },
          {
            __typename: 'FormElementOption',
            id: '86d5b15b-5377-4d93-855b-b30627161a76',
            label: 'Computational modeling',
            value: 'Computational modeling',
          },
        ],
      },
      {
        __typename: 'FormElement',
        title: 'If you used other research methods, please specify:',
        shortDescription: 'Other methods',
        id: '6bfdc237-814d-4af8-b0f0-064099d679ba',
        component: 'TextField',
        name: 'submission.otherMethods',
        placeholder: 'Enter any additional methods used, if applicable',
      },
      {
        __typename: 'FormElement',
        title: 'Data and Code availability statements',
        id: 'bf2f9b4a-377b-4303-8f51-70d836eb1456',
        component: 'AbstractEditor',
        name: 'submission.datacode',
        placeholder: 'Enter your data and code availability statement',
      },
      {
        __typename: 'FormElement',
        title: 'For human MRI, what field strength scanner do you use?',
        shortDescription: 'MRI strength',
        id: '38736c42-53bb-488d-a171-f6a102d7fa02',
        component: 'Select',
        name: 'submission.humanMRI',
        options: [
          {
            __typename: 'FormElementOption',
            id: '04c3be3e-4f34-4ace-87bb-58730b1d8f75',
            label: '1T',
            value: '1T',
          },
          {
            __typename: 'FormElementOption',
            id: '7cdb3256-aa80-48fa-a440-2bff62d5bbff',
            label: '1.5T',
            value: '1.5T',
          },
          {
            __typename: 'FormElementOption',
            id: '24edb964-56df-45a4-b78d-b12ca484795d',
            label: '2T',
            value: '2T',
          },
          {
            __typename: 'FormElementOption',
            id: '9b2c24fd-c778-4fb0-a100-d3c90ff21efb',
            label: '3T',
            value: '3T',
          },
          {
            __typename: 'FormElementOption',
            id: '42444841-aac8-4369-af6f-2c982332f3a9',
            label: '4T',
            value: '4T',
          },
          {
            __typename: 'FormElementOption',
            id: 'ae217273-dbcf-4966-a434-ffd25f7f0948',
            label: '7T',
            value: '7T',
          },
        ],
      },
      {
        __typename: 'FormElement',
        title: 'If other, please specify:',
        shortDescription: 'Other MRI strength',
        id: '88304f10-fbed-4597-9c25-0a4cdde7d7cf',
        component: 'TextField',
        name: 'submission.humanMRIother',
        validate: [],
        validateValue: {
          __typename: 'FormElementValidation',
          minChars: '10',
        },
      },
      {
        __typename: 'FormElement',
        title: 'Which processing packages did you use for your study?',
        shortDescription: 'Processing packages',
        id: 'a2fc5de1-b173-42e6-839c-5082f62ba65d',
        component: 'CheckboxGroup',
        name: 'submission.packages',
        options: [
          {
            __typename: 'FormElementOption',
            id: '4e7f721b-a4eb-4dd6-a162-8db8a041d466',
            label: 'AFNI',
            value: 'AFNI',
          },
          {
            __typename: 'FormElementOption',
            id: 'c970e5be-2c86-452a-ad1f-aadb45c6c761',
            label: 'SPM',
            value: 'SPM',
          },
          {
            __typename: 'FormElementOption',
            id: '443bae43-64a2-478b-b48c-ba30463c1c43',
            label: 'Brain Voyager',
            value: 'Brain Voyager',
          },
          {
            __typename: 'FormElementOption',
            id: 'effedca5-4a53-4dca-a291-550ec222c915',
            label: 'FSL',
            value: 'FSL',
          },
          {
            __typename: 'FormElementOption',
            id: 'c9496435-230b-47ec-860f-446dcb718664',
            label: 'Analyze',
            value: 'Analyze',
          },
          {
            __typename: 'FormElementOption',
            id: '61e6f3cb-a34c-4d2a-9077-1b03b433226b',
            label: 'Free Surfer',
            value: 'Free Surfer',
          },
          {
            __typename: 'FormElementOption',
            id: '08ef7884-0255-4a5e-af84-9481712df018',
            label: 'LONI Pipeline',
            value: 'LONI Pipeline',
          },
        ],
      },
      {
        __typename: 'FormElement',
        title:
          'If you used any other processing packages, please list them here:',
        shortDescription: 'Other processing packages',
        id: '92988a50-40f1-43a6-833c-31702c232728',
        component: 'TextField',
        name: 'submission.otherPackages',
      },
      {
        __typename: 'FormElement',
        title: 'Provide references using author date format:',
        shortDescription: 'References',
        id: 'e8af0c63-e46f-46a8-bc90-5023fe50a541',
        component: 'AbstractEditor',
        name: 'submission.references',
      },
      {
        __typename: 'FormElement',
        title: 'Category',
        id: 'e2fede08-9c51-4e64-bf4e-666b409d341e',
        component: 'Select',
        name: 'submission.test',
        placeholder: 'select the category',
        options: [
          {
            __typename: 'FormElementOption',
            id: 'ed080912-4491-4a0f-a815-7d8411a6c9e0',
            label: 'test one',
            value: 'testone',
          },
          {
            __typename: 'FormElementOption',
            id: 'ef7addf6-ab3e-487e-a6db-5b07cab76200',
            label: 'test two',
            value: 'testtwo',
          },
          {
            __typename: 'FormElementOption',
            id: 'cb982ebf-87de-4e7b-8bd0-00a4c4252301',
            label: 'test three',
            value: 'testthree',
          },
          {
            __typename: 'FormElementOption',
            id: 'ba6f6bf8-5a6d-44a9-ac63-4478f75347aa',
            label: 'test four',
            value: 'test four',
          },
        ],
      },
    ],
  },
  decisionForm: {
    name: 'Decision',
    children: [
      {
        id: '1600fcc9-ebf4-42f5-af97-c242ea04ae21',
        name: 'comment',
        title: 'Decision',
        component: 'AbstractEditor',
        placeholder:
          'Write/paste your decision letter here, or upload it by dragging it onto the box below.',
        validate: [
          {
            id: '39796769-23a9-4788-b1f3-78d08b59f97e',
            label: 'Required',
            value: 'required',
          },
        ],
      },
      {
        id: '695a5b2f-a0d7-4b1e-a750-107bff5628bc',
        name: 'files',
        title: ' ',
        component: 'SupplementaryFiles',
        shortDescription: 'Files',
      },
      {
        id: '7423ad09-d01b-49bc-8c2e-807829b86653',
        name: 'verdict',
        title: 'Decision Status',
        inline: 'true',
        options: [
          {
            id: '78653e7a-32b3-4283-9a9e-36e79876da28',
            label: 'Accept',
            value: 'accept',
            labelColor: '#048802',
          },
          {
            id: '44c2dad6-8316-42ed-a2b7-3f2e98d49823',
            label: 'Revise',
            value: 'revise',
            labelColor: '#ebc400',
          },
          {
            id: 'a8ae5a69-9f34-4e3c-b3d2-c6572ac2e225',
            label: 'Reject',
            value: 'reject',
            labelColor: '#ea412e',
          },
        ],
        validate: [
          {
            id: '4eb14d13-4d17-40d0-95a1-3e68e9397269',
            label: 'Required',
            value: 'required',
          },
        ],
        component: 'RadioGroup',
      },
    ],
    haspopup: 'false',
  },
  isCurrentVersion: true,
  currentUser: {
    __typename: 'User',
    id: '92f99a84-fc8b-4f94-bc9e-10bb3f7c3902',
    username: 'Harriet Handling-Editor',
    admin: true,
  },
  version: {
    __typename: 'Manuscript',
    id: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
    shortId: 23863,
    created: '2022-02-11T03:17:05.850Z',
    files: [],
    reviews: [],
    decision: '',
    teams: [
      {
        __typename: 'Team',
        id: '2ea0530f-c2c1-4524-b16b-782c0d81d5e4',
        name: 'Author',
        role: 'author',
        manuscript: {
          __typename: 'Manuscript',
          id: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
        },
        members: [
          {
            __typename: 'TeamMember',
            id: '2b74f783-d8a0-4f1a-a53c-b998618b5293',
            user: {
              __typename: 'User',
              id: '92f99a84-fc8b-4f94-bc9e-10bb3f7c3902',
              username: 'Harriet Handling-Editor',
              defaultIdentity: {
                __typename: 'Identity',
                id: 'aeb8257c-2fd4-44b9-a464-0c38e0eae7b5',
                name: 'Harriet Handling-Editor',
              },
            },
            status: null,
          },
        ],
      },
      {
        __typename: 'Team',
        id: '0c3dcae3-8c4a-43b0-8924-93b7ecc1d7e8',
        name: 'Reviewers',
        role: 'reviewer',
        manuscript: {
          __typename: 'Manuscript',
          id: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
        },
        members: [
          {
            __typename: 'TeamMember',
            id: '4cfc3559-bf1b-4e5f-8338-60f65f99be31',
            user: {
              __typename: 'User',
              id: '187f6a96-84c9-4785-b01a-89de4003099e',
              username: 'Shanthi',
              defaultIdentity: {
                __typename: 'Identity',
                id: '43b57bf4-3bda-4832-9b4b-ea5d594f9d5e',
                name: 'Shanthi ',
              },
            },
            status: 'invited',
          },
        ],
      },
    ],
    status: 'new',
    meta: {
      __typename: 'ManuscriptMeta',
      manuscriptId: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
      title: 'New submission 2/11/2022, 8:47:05 AM',
    },
    submission:
      '{"irb":"","name":"","test":"","cover":"","links":[],"title":"","ethics":"","contact":"","methods":[],"abstract":"","datacode":"","editDate":"2022-02-11","humanMRI":"","keywords":"","packages":[],"subjects":"","suggested":"","objectType":"","references":"","affiliation":"","otherMethods":"","humanMRIother":"","otherPackages":"","animal_research_approval":""}',
    manuscriptVersions: [],
    channels: [
      {
        __typename: 'Channel',
        id: '220809f3-48e3-41f0-b930-506132c48c10',
        type: 'all',
        topic: 'Manuscript discussion',
      },
      {
        __typename: 'Channel',
        id: 'ca95a049-ae9c-404d-a408-eb631fd2fa38',
        type: 'editorial',
        topic: 'Editorial discussion',
      },
    ],
    formFieldsToPublish: [],
    tasks: [],
  },
  parent: {
    __typename: 'Manuscript',
    id: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
    shortId: 23863,
    created: '2022-02-11T03:17:05.850Z',
    files: [],
    reviews: [],
    decision: '',
    teams: [
      {
        __typename: 'Team',
        id: '2ea0530f-c2c1-4524-b16b-782c0d81d5e4',
        name: 'Author',
        role: 'author',
        manuscript: {
          __typename: 'Manuscript',
          id: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
        },
        members: [
          {
            __typename: 'TeamMember',
            id: '2b74f783-d8a0-4f1a-a53c-b998618b5293',
            user: {
              __typename: 'User',
              id: '92f99a84-fc8b-4f94-bc9e-10bb3f7c3902',
              username: 'Harriet Handling-Editor',
              defaultIdentity: {
                __typename: 'Identity',
                id: 'aeb8257c-2fd4-44b9-a464-0c38e0eae7b5',
                name: 'Harriet Handling-Editor',
              },
            },
            status: null,
          },
        ],
      },
      {
        __typename: 'Team',
        id: '0c3dcae3-8c4a-43b0-8924-93b7ecc1d7e8',
        name: 'Reviewers',
        role: 'reviewer',
        manuscript: {
          __typename: 'Manuscript',
          id: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
        },
        members: [
          {
            __typename: 'TeamMember',
            id: '4cfc3559-bf1b-4e5f-8338-60f65f99be31',
            user: {
              __typename: 'User',
              id: '187f6a96-84c9-4785-b01a-89de4003099e',
              username: 'Shanthi',
              defaultIdentity: {
                __typename: 'Identity',
                id: '43b57bf4-3bda-4832-9b4b-ea5d594f9d5e',
                name: 'Shanthi ',
              },
            },
            status: 'invited',
          },
        ],
      },
    ],
    status: 'new',
    meta: {
      __typename: 'ManuscriptMeta',
      manuscriptId: '2f920e7f-066a-496b-a9b8-e207ff7326d3',
      title: 'New submission 2/11/2022, 8:47:05 AM',
    },
    submission:
      '{"irb":"","name":"","test":"","cover":"","links":[],"title":"","ethics":"","contact":"","methods":[],"abstract":"","datacode":"","editDate":"2022-02-11","humanMRI":"","keywords":"","packages":[],"subjects":"","suggested":"","objectType":"","references":"","affiliation":"","otherMethods":"","humanMRIother":"","otherPackages":"","animal_research_approval":""}',
    manuscriptVersions: [],
    channels: [
      {
        __typename: 'Channel',
        id: '220809f3-48e3-41f0-b930-506132c48c10',
        type: 'all',
        topic: 'Manuscript discussion',
      },
      {
        __typename: 'Channel',
        id: 'ca95a049-ae9c-404d-a408-eb631fd2fa38',
        type: 'editorial',
        topic: 'Editorial discussion',
      },
    ],
    formFieldsToPublish: [],
  },
  updateManuscript: () => {},
  onChange: () => {},
  allUsers: [
    {
      __typename: 'User',
      id: '187f6a96-84c9-4785-b01a-89de4003099e',
      username: 'Shanthi',
      email: 'shanthitestemails@mailinator.com',
      admin: null,
      defaultIdentity: {
        __typename: 'Identity',
        id: '43b57bf4-3bda-4832-9b4b-ea5d594f9d5e',
      },
    },
    {
      __typename: 'User',
      id: '92f99a84-fc8b-4f94-bc9e-10bb3f7c3902',
      username: 'Harriet Handling-Editor',
      email: 'shanthitestemail@mailinator.com',
      admin: true,
      defaultIdentity: {
        __typename: 'Identity',
        id: 'aeb8257c-2fd4-44b9-a464-0c38e0eae7b5',
      },
    },
  ],
  sendNotifyEmail: {},
  sendChannelMessageCb: {},
  publishManuscript: {},
  assignEditors: {
    called: true,
    data: {
      users: [
        {
          __typename: 'User',
          id: '187f6a96-84c9-4785-b01a-89de4003099e',
          username: 'Shanthi',
          email: 'shanthitestemails@mailinator.com',
          admin: null,
          defaultIdentity: {
            __typename: 'Identity',
            id: '43b57bf4-3bda-4832-9b4b-ea5d594f9d5e',
          },
        },
        {
          __typename: 'User',
          id: '92f99a84-fc8b-4f94-bc9e-10bb3f7c3902',
          username: 'Harriet Handling-Editor',
          email: 'shanthitestemail@mailinator.com',
          admin: true,
          defaultIdentity: {
            __typename: 'Identity',
            id: 'aeb8257c-2fd4-44b9-a464-0c38e0eae7b5',
          },
        },
      ],
    },
    error: undefined,
    loading: false,
    networkStatus: 7,
    variables: {},
  },
  updateTeam: {},
  createTeam: {},
  updateReview: {},
  reviewers: [],
  teamLabels: {
    seniorEditor: {
      name: 'Senior Editor',
    },
    handlingEditor: {
      name: 'Handling Editor',
    },
    editor: {
      name: 'Editor',
    },
    managingEditor: {
      name: 'Managing Editor',
    },
    reviewer: {
      name: 'Reviewer',
    },
    author: {
      name: 'Author',
    },
  },
  canHideReviews: false,
  urlFrag: '/kotahi',
  displayShortIdAsIdentifier: true,
  brand: 'Kotahi',
  brandLink: '/kotahi/dashboard',
  className: '',
  loginLink: '/login?next=/kotahi/dashboard',
  navLinkComponents: [
    {
      link: '/kotahi/dashboard',
      name: 'Dashboard',
      icon: 'home',
    },
    {
      link: '/kotahi/admin/form-builder',
      name: 'Forms',
      icon: 'check-square',
    },
    {
      link: '/kotahi/admin/users',
      name: 'Users',
      icon: 'users',
    },
    {
      link: '/kotahi/admin/manuscripts',
      name: 'Manuscripts',
      icon: 'file-text',
    },
    {
      link: '/kotahi/admin/reports',
      name: 'Reports',
      icon: 'activity',
    },
    {
      link: '/kotahi/profile',
      name: 'My profile',
      icon: 'user',
    },
  ],
  notice: ' ',
  profileLink: '/kotahi/profile',
  user: {
    __typename: 'User',
    id: 'ed0d6990-b32a-4b32-8bf6-39bd20078643',
    profilePicture: null,
    username: 'Shanthi',
    admin: true,
    email: 'shanthitestemail@mailinator.com',
    defaultIdentity: {
      __typename: 'Identity',
      identifier: '0000-0002-2473-4784',
      email: null,
      type: 'orcid',
      aff: '',
      id: '7b03f794-ed3c-4dac-933d-a6616b3d70c2',
    },
    isOnline: true,
    _currentRoles: [],
    teams: [],
  },
  channelId: 'fa75c598-ea43-4666-a0e0-67d93d413be2',
  networkOnline: true,
  websocketConnection: 'connected',
  data: true,
  queryObject: {
    data: {
      paginatedManuscripts: {
        __typename: 'PaginatedManuscripts',
        totalCount: 1,
        manuscripts: [
          {
            __typename: 'Manuscript',
            id: '130fed3c-f436-4075-9080-b7a51652a8fb',
            shortId: 1,
            meta: {
              __typename: 'ManuscriptMeta',
              manuscriptId: '130fed3c-f436-4075-9080-b7a51652a8fb',
              title: 'New submission 1/26/2022, 1:50:57 AM',
            },
            submission:
              '{"irb":"","name":"","cover":"","links":[],"title":"","ethics":"","contact":"","methods":[],"abstract":"","datacode":"","humanMRI":"","keywords":"","packages":[],"subjects":"","suggested":"","objectType":"","references":"","affiliation":"","otherMethods":"","humanMRIother":"","otherPackages":"","animal_research_approval":""}',
            created: '2022-01-25T20:20:57.340Z',
            updated: '2022-01-25T20:20:57.340Z',
            status: 'new',
            published: null,
            teams: [
              {
                __typename: 'Team',
                id: '97922b55-82fe-4d0a-997b-4f3d3811845a',
                role: 'author',
                members: [
                  {
                    __typename: 'TeamMember',
                    id: '2e5b149e-33ef-41e1-bb52-194630e179b3',
                    user: {
                      __typename: 'User',
                      id: 'fa926e5f-2e6e-4bf6-9f8b-74f3c5b7b2a9',
                      username: 'Shanthi',
                    },
                  },
                ],
              },
            ],
            manuscriptVersions: [],
            submitter: {
              __typename: 'User',
              username: 'Shanthi',
              isOnline: null,
              defaultIdentity: {
                __typename: 'Identity',
                id: '415d69fa-4e74-4e6d-9286-f5257545127b',
                identifier: '0000-0002-2473-4784',
                name: 'Shanthi ',
              },
              profilePicture: null,
            },
            formFieldsToPublish: [],
            tasks: [],
          },
        ],
      },
      formForPurpose: {
        __typename: 'Form',
        structure: {
          __typename: 'FormStructure',
          children: [
            {
              __typename: 'FormElement',
              id: 'bf0c8b8f-7523-4c7d-a74c-7635838f1451',
              component: 'LinksInput',
              name: 'submission.links',
              title: 'Research object links',
            },
            {
              __typename: 'FormElement',
              id: '47fd802f-ed30-460d-9617-c8a9b9025e95',
              component: 'TextField',
              name: 'meta.title',
              title: 'Title',
            },
            {
              __typename: 'FormElement',
              id: '62ca72ad-04b0-41fc-85d1-415469d7e895',
              component: 'TextField',
              name: 'submission.name',
              title: 'Name',
            },
            {
              __typename: 'FormElement',
              id: '1c2e9325-3fa8-41f3-8607-180eb8a25aa3',
              component: 'TextField',
              name: 'submission.affiliation',
              title: 'Affiliation',
            },
            {
              __typename: 'FormElement',
              id: '7f5aa395-3486-4067-b636-ae204d472c16',
              component: 'TextField',
              name: 'submission.contact',
              title: 'Email and contact information',
            },
            {
              __typename: 'FormElement',
              id: '347dc171-f008-45ac-8433-ca0711bf213c',
              component: 'AbstractEditor',
              name: 'submission.cover',
              title: 'Cover letter',
            },
            {
              __typename: 'FormElement',
              id: 'bf2f9b4a-377b-4303-8f51-70d836eb1456',
              component: 'AbstractEditor',
              name: 'submission.datacode',
              title: 'Data and Code availability statements',
            },
            {
              __typename: 'FormElement',
              id: 'fa5e5b75-4b6f-4a2d-9113-c2b4db73ef8a',
              component: 'AbstractEditor',
              name: 'submission.ethics',
              title: 'Ethics statement',
            },
            {
              __typename: 'FormElement',
              id: 'fa0c39ca-0486-4e29-ba24-f86f7d375c3f',
              component: 'Select',
              name: 'submission.objectType',
              title: 'Type of Research Object',
              options: [
                {
                  __typename: 'FormElementOption',
                  id: 'df5fc212-b055-4cba-9d0e-e85222e3d4f2',
                  label: 'Dataset',
                  labelColor: null,
                  value: 'dataset',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'ef2ddada-105a-412e-8d7f-56b1df44c02f',
                  label: 'Software',
                  labelColor: null,
                  value: 'software',
                },
                {
                  __typename: 'FormElementOption',
                  id: '0fafbfc3-6797-46e3-aff4-3fd4f16261b1',
                  label: 'Figure',
                  labelColor: null,
                  value: 'figure',
                },
                {
                  __typename: 'FormElementOption',
                  id: '5117a7c6-2fcf-414b-ac60-47f8d93ccfef',
                  label: 'Notebook',
                  labelColor: null,
                  value: 'notebook',
                },
              ],
            },
            {
              __typename: 'FormElement',
              id: '14b8da7d-5924-4098-8d1f-e528c7c440b9',
              component: 'TextField',
              name: 'submission.suggested',
              title: 'Suggested reviewers',
            },
            {
              __typename: 'FormElement',
              id: 'b769b4d5-f9b3-48d3-a6d5-77bb6a9e95b0',
              component: 'SupplementaryFiles',
              name: 'fileName',
              title: 'Upload supplementary materials',
            },
            {
              __typename: 'FormElement',
              id: '6342cff7-c57a-4fd9-b91d-c4cf77b4c309',
              component: 'TextField',
              name: 'submission.keywords',
              title: 'Keywords',
            },
            {
              __typename: 'FormElement',
              id: 'ebe75cec-0ba8-4f00-9024-20e77ed94f1c',
              component: 'Select',
              name: 'submission.subjects',
              title:
                'Did your study involve healthy subjects only or patients (note that patient studies may also involve healthy subjects)',
              shortDescription: 'Patients/healthy subjects',
              options: [
                {
                  __typename: 'FormElementOption',
                  id: '5fa97761-1b46-4a67-87f6-1dbe772381eb',
                  label: 'Healthy subjects',
                  labelColor: null,
                  value: 'healthy_subjects',
                },
                {
                  __typename: 'FormElementOption',
                  id: '40f48822-786c-46dd-9026-287f96c4929d',
                  label: 'Patients',
                  labelColor: null,
                  value: 'patients',
                },
              ],
            },
            {
              __typename: 'FormElement',
              id: '6871680a-2278-40b3-80c6-7de06f21aafb',
              component: 'Select',
              name: 'submission.irb',
              title:
                'If your research involved human subjects, was the research approved by the relevant Institutional Review Board or ethics panel?',
              shortDescription: 'Ethics panel',
              options: [
                {
                  __typename: 'FormElementOption',
                  id: 'bc2549db-8819-412d-9f36-816c2586ef12',
                  label: 'Yes',
                  labelColor: null,
                  value: 'yes',
                },
                {
                  __typename: 'FormElementOption',
                  id: '91bd7c42-a5e7-4290-a085-65566218df15',
                  label: 'No',
                  labelColor: null,
                  value: 'no',
                },
                {
                  __typename: 'FormElementOption',
                  id: '3e7689c2-2a6a-408e-b57d-680d441cf2e5',
                  label:
                    ' Not applicable (My Research Object does not involve human subjects) ',
                  labelColor: null,
                  value: 'N/A',
                },
              ],
            },
            {
              __typename: 'FormElement',
              id: 'b127ecb1-4862-4662-a958-3266eb284353',
              component: 'Select',
              name: 'submission.animal_research_approval',
              title:
                'Was any animal research approved by the relevant IACUC or other animal research panel?',
              shortDescription: 'Animal research panel',
              options: [
                {
                  __typename: 'FormElementOption',
                  id: 'fd3c8237-d080-43b7-9353-28c16d9bfcfc',
                  label: 'Yes',
                  labelColor: null,
                  value: 'yes',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'de158fbc-a5b5-4c76-bd5a-2c546aa42fee',
                  label: 'No',
                  labelColor: null,
                  value: 'no',
                },
                {
                  __typename: 'FormElementOption',
                  id: '56159591-4c84-434c-b66c-1969b5f7afae',
                  label:
                    ' Not applicable (My Research Object does not involve animal subjects)',
                  labelColor: null,
                  value: 'N/A',
                },
              ],
            },
            {
              __typename: 'FormElement',
              id: '6deaacc6-759a-4a68-b494-c38c664bb665',
              component: 'CheckboxGroup',
              name: 'submission.methods',
              title:
                'Please indicate which methods were used in your research:',
              shortDescription: 'Methods',
              options: [
                {
                  __typename: 'FormElementOption',
                  id: '50ccff9e-f3e5-410b-b0b4-390f5474ba09',
                  label: 'Structural MRI',
                  labelColor: null,
                  value: 'Structural MRI',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'dccc2374-ccc8-4ce1-9907-107445ba261a',
                  label: 'Functional MRI',
                  labelColor: null,
                  value: 'Functional MRI',
                },
                {
                  __typename: 'FormElementOption',
                  id: '0567acdf-5fb4-4fea-aae7-d2f0875792e9',
                  label: 'Diffusion MRI',
                  labelColor: null,
                  value: 'Diffusion MRI',
                },
                {
                  __typename: 'FormElementOption',
                  id: '0f8bdc88-4e87-46e6-bb59-bc2c53221494',
                  label: 'EEG/ERP',
                  labelColor: null,
                  value: 'EEG/ERP',
                },
                {
                  __typename: 'FormElementOption',
                  id: '8e10e2c7-b10e-4dd2-b0c5-74e6e87d3b1e',
                  label: 'Neurophysiology',
                  labelColor: null,
                  value: 'Neurophysiology',
                },
                {
                  __typename: 'FormElementOption',
                  id: '5822b3f8-80e6-47ee-bcdd-e17d1db47f7b',
                  label: 'PET',
                  labelColor: null,
                  value: 'PET',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'd21a5be5-8a51-42f3-9e47-c15f8a4fc141',
                  label: 'MEG',
                  labelColor: null,
                  value: 'MEG',
                },
                {
                  __typename: 'FormElementOption',
                  id: '89a5e7de-df90-44bf-8971-5b49154331f6',
                  label: 'Optical Imaging',
                  labelColor: null,
                  value: 'Optical Imaging',
                },
                {
                  __typename: 'FormElementOption',
                  id: '22a428a7-bf65-49cd-9104-0122ae43f956',
                  label: 'Postmortem anatomy',
                  labelColor: null,
                  value: 'Postmortem anatomy',
                },
                {
                  __typename: 'FormElementOption',
                  id: '5b98a344-0438-4d79-85ab-9ae9f0e28d2d',
                  label: 'TMS',
                  labelColor: null,
                  value: 'TMS',
                },
                {
                  __typename: 'FormElementOption',
                  id: '5fbc6edd-e2e9-4dc2-a1a4-a6c67f6eef43',
                  label: 'Behavior',
                  labelColor: null,
                  value: 'Behavior',
                },
                {
                  __typename: 'FormElementOption',
                  id: '8cc52203-ca5b-4580-944f-748a62d449b5',
                  label: 'Neuropsychological testing',
                  labelColor: null,
                  value: 'Neuropsychological testing',
                },
                {
                  __typename: 'FormElementOption',
                  id: '86d5b15b-5377-4d93-855b-b30627161a76',
                  label: 'Computational modeling',
                  labelColor: null,
                  value: 'Computational modeling',
                },
              ],
            },
            {
              __typename: 'FormElement',
              id: '6bfdc237-814d-4af8-b0f0-064099d679ba',
              component: 'TextField',
              name: 'submission.otherMethods',
              title: 'If you used other research methods, please specify:',
              shortDescription: 'Other methods',
            },
            {
              __typename: 'FormElement',
              id: '38736c42-53bb-488d-a171-f6a102d7fa02',
              component: 'Select',
              name: 'submission.humanMRI',
              title: 'For human MRI, what field strength scanner do you use?',
              shortDescription: 'MRI strength',
              options: [
                {
                  __typename: 'FormElementOption',
                  id: '04c3be3e-4f34-4ace-87bb-58730b1d8f75',
                  label: '1T',
                  labelColor: null,
                  value: '1T',
                },
                {
                  __typename: 'FormElementOption',
                  id: '7cdb3256-aa80-48fa-a440-2bff62d5bbff',
                  label: '1.5T',
                  labelColor: null,
                  value: '1.5T',
                },
                {
                  __typename: 'FormElementOption',
                  id: '24edb964-56df-45a4-b78d-b12ca484795d',
                  label: '2T',
                  labelColor: null,
                  value: '2T',
                },
                {
                  __typename: 'FormElementOption',
                  id: '9b2c24fd-c778-4fb0-a100-d3c90ff21efb',
                  label: '3T',
                  labelColor: null,
                  value: '3T',
                },
                {
                  __typename: 'FormElementOption',
                  id: '42444841-aac8-4369-af6f-2c982332f3a9',
                  label: '4T',
                  labelColor: null,
                  value: '4T',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'ae217273-dbcf-4966-a434-ffd25f7f0948',
                  label: '7T',
                  labelColor: null,
                  value: '7T',
                },
              ],
            },
            {
              __typename: 'FormElement',
              id: '88304f10-fbed-4597-9c25-0a4cdde7d7cf',
              component: 'TextField',
              name: 'submission.humanMRIother',
              title: 'If other, please specify:',
              shortDescription: 'Other MRI strength',
            },
            {
              __typename: 'FormElement',
              id: 'a2fc5de1-b173-42e6-839c-5082f62ba65d',
              component: 'CheckboxGroup',
              name: 'submission.packages',
              title: 'Which processing packages did you use for your study?',
              shortDescription: 'Processing packages',
              options: [
                {
                  __typename: 'FormElementOption',
                  id: '4e7f721b-a4eb-4dd6-a162-8db8a041d466',
                  label: 'AFNI',
                  labelColor: null,
                  value: 'AFNI',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'c970e5be-2c86-452a-ad1f-aadb45c6c761',
                  label: 'SPM',
                  labelColor: null,
                  value: 'SPM',
                },
                {
                  __typename: 'FormElementOption',
                  id: '443bae43-64a2-478b-b48c-ba30463c1c43',
                  label: 'Brain Voyager',
                  labelColor: null,
                  value: 'Brain Voyager',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'effedca5-4a53-4dca-a291-550ec222c915',
                  label: 'FSL',
                  labelColor: null,
                  value: 'FSL',
                },
                {
                  __typename: 'FormElementOption',
                  id: 'c9496435-230b-47ec-860f-446dcb718664',
                  label: 'Analyze',
                  labelColor: null,
                  value: 'Analyze',
                },
                {
                  __typename: 'FormElementOption',
                  id: '61e6f3cb-a34c-4d2a-9077-1b03b433226b',
                  label: 'Free Surfer',
                  labelColor: null,
                  value: 'Free Surfer',
                },
                {
                  __typename: 'FormElementOption',
                  id: '08ef7884-0255-4a5e-af84-9481712df018',
                  label: 'LONI Pipeline',
                  labelColor: null,
                  value: 'LONI Pipeline',
                },
              ],
            },
            {
              __typename: 'FormElement',
              id: '92988a50-40f1-43a6-833c-31702c232728',
              component: 'TextField',
              name: 'submission.otherPackages',
              title:
                'If you used any other processing packages, please list them here:',
              shortDescription: 'Other processing packages',
            },
            {
              __typename: 'FormElement',
              id: 'e8af0c63-e46f-46a8-bc90-5023fe50a541',
              component: 'AbstractEditor',
              name: 'submission.references',
              title: 'Provide references using author date format:',
              shortDescription: 'References',
            },
            {
              __typename: 'FormElement',
              id: '8b858adc-5f65-4385-9f79-5c5af1f67bd5',
              component: 'VisualAbstract',
              name: 'visualAbstract',
              title: 'Visual Abstract',
            },
            {
              __typename: 'FormElement',
              id: 'd80b2c88-6144-4003-b671-63990b9b2793',
              component: 'AbstractEditor',
              name: 'submission.abstract',
              title: 'Abstract',
              shortDescription: 'Abstract',
            },
          ],
        },
      },
    },
  },
  configuredColumnNames: [
    'shortId',
    'meta.title',
    'created',
    'updated',
    'status',
    'author',
  ],
  page: 1,
  sortDirection: 'DESC',
  sortName: 'created',
  threadedDiscussions: [],
  updatePendingComment: () => null,
  currentDecisionData: {
    id: '955518ff-9ee5-4a0c-93ea-16e6d46b699a',
    isDecision: true,
    userId: '92f99a84-fc8b-4f94-bc9e-10bb3f7c3902',
  },
  updateTask: () => null,
  updateTasks: () => null,
}

Base.args = props

export default {
  title: 'ControlPanel/DecisionVersion',
  component: DecisionVersion,
  parameters: {
    docs: {
      page: () => (
        <DesignEmbed figmaEmbedLink="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FuDxsjgDWxjiof0qSNFLelr%2FKotahi-storybook%3Fnode-id%3D0%253A1" />
      ),
    },
  },
  argTypes: {},
}
