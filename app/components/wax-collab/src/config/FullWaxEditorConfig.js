import { emDash, ellipsis } from 'prosemirror-inputrules'
import { columnResizing, tableEditing } from 'prosemirror-tables'
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  TextBlockLevelService,
  TextToolGroupService,
  NoteService,
  NoteToolGroupService,
  TrackChangeService,
  CommentsService,
  MathService,
  FindAndReplaceService,
  FullScreenService,
  FullScreenToolGroupService,
  SpecialCharactersService,
  SpecialCharactersToolGroupService,
  EditorInfoToolGroupServices,
  BottomInfoService,
  TrackOptionsToolGroupService,
  TrackCommentOptionsToolGroupService,
  TrackingAndEditingToolGroupService,
  EditingSuggestingService,
} from 'wax-prosemirror-services'
import {
  KotahiBlockDropDownToolGroupService,
  JatsTagsService,
} from '../CustomWaxToolGroups'
// import JatsTagsService from '../JatsTags'
import CharactersList from './CharactersList'
import KotahiSchema from './KotahiSchema'
import {
  FullExtensionServices,
  FullExtensionLayoutElements,
} from '../extensions'

const serviceList = [
  new AnnotationToolGroupService(),
  new BaseService(),
  new BaseToolGroupService(),
  new BottomInfoService(),
  new DisplayToolGroupService(),
  new EditorInfoToolGroupServices(),
  new FindAndReplaceService(),
  new ImageService(),
  new ImageToolGroupService(),
  new InlineAnnotationsService(),
  new LinkService(),
  new ListsService(),
  new ListToolGroupService(),
  new MathService(),
  new NoteService(),
  new NoteToolGroupService(),
  new SpecialCharactersService(),
  new SpecialCharactersToolGroupService(),
  new TablesService(),
  new TableToolGroupService(),
  new TextBlockLevelService(),
  new TextToolGroupService(),
  // needed for track changes
  new EditingSuggestingService(),
  new TrackingAndEditingToolGroupService(),
  // these are added for paragraph dropdown:
  new KotahiBlockDropDownToolGroupService(),
  new DisplayBlockLevelService(),
  // these are added for full screen
  new FullScreenService(),
  new FullScreenToolGroupService(),
  // needed for comments
  new TrackChangeService(),
  new CommentsService(),
  new TrackCommentOptionsToolGroupService(),
  new TrackOptionsToolGroupService(),
  new JatsTagsService(),
]

for (let i = 0; i < serviceList.length; i += 1) {
  const service = serviceList[i]

  if (service.name) {
    const index = FullExtensionServices.findIndex(x => x.name === service.name)

    if (index > -1) {
      /* eslint-disable-next-line no-console */
      console.log('Replacing default Wax Full service: ', service.name)
      serviceList[i] = FullExtensionServices[index]
      FullExtensionServices.splice(index, 1)
    }
  }
}

const updateTrackStatus = change => {
  // this returns "true" when Suggesting Mode is turned on.
  // eslint-disable-next-line no-console
  // console.log(change)
}

const updateTitle = title => {
  // this gets fired when the title is changed in original version of this—not called now, but might still be needed
  // eslint-disable-next-line no-console
  // console.log(`Title changed: ${title}`)
}

const fullWaxEditorConfig = handleAssetManager => ({
  EnableTrackChangeService: { enabled: false, toggle: true, updateTrackStatus },
  AcceptTrackChangeService: {
    own: {
      accept: true,
    },
    others: {
      accept: true,
    },
  },
  RejectTrackChangeService: {
    own: {
      reject: true,
    },
    others: {
      reject: true,
    },
  },

  SchemaService: KotahiSchema,
  CommentsService: { readOnly: false },
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: [
        {
          name: 'Base',
          exclude: ['Save'],
        },
        'KotahiBlockDropDown',
        {
          name: 'Annotations',
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
            'Underline',
            'StrikeThrough',
            'Code',
          ],
        },
        'SpecialCharacters',
        'Lists',
        'Notes',
        'Tables',
        'Images',
        'TrackingAndEditing',
        'FullScreen',
      ],
    },
    {
      templateArea: 'commentTrackToolBar',
      toolGroups: ['TrackCommentOptions'],
    },
    {
      templateArea: 'bottomRightInfo',
      toolGroups: [{ name: 'InfoToolGroup', exclude: ['ShortCutsInfo'] }],
    },
    ...FullExtensionLayoutElements,
  ],

  PmPlugins: [columnResizing(), tableEditing()],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},

  SpecialCharactersService: CharactersList,

  TitleService: { updateTitle },

  ImageService: handleAssetManager ? { handleAssetManager } : {},

  // end insertion

  services: [...serviceList, ...FullExtensionServices],
})

export default fullWaxEditorConfig
