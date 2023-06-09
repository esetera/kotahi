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
import { KotahiBlockDropDownToolGroupService } from '../../../../wax-collab/src/CustomWaxToolGroups'
import JatsTagsService from '../../../../wax-collab/src/JatsTags'
import CharactersList from '../../../../wax-collab/src/config/CharactersList'
import KotahiSchema from '../../../../wax-collab/src/config/KotahiSchema'

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
        'Tables',
        'Images',
        // 'find',
        // 'TrackingAndEditing',
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
  ],

  PmPlugins: [columnResizing(), tableEditing()],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},

  SpecialCharactersService: CharactersList,

  TitleService: { updateTitle },

  ImageService: handleAssetManager ? { handleAssetManager } : {},

  // end insertion

  services: [
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
    new TrackCommentOptionsToolGroupService(),
    new TrackOptionsToolGroupService(),
    new JatsTagsService(),
  ],
})

export default fullWaxEditorConfig