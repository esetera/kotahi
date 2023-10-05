// import { WaxSelectionPlugin } from 'wax-prosemirror-plugins'
import { emDash, ellipsis } from 'prosemirror-inputrules'
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
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
  EditingSuggestingService,
  TrackingAndEditingToolGroupService,
} from 'wax-prosemirror-services'
import {
  TablesService,
  /* tableEditing, */ columnResizing,
} from 'wax-table-service'
import {
  KotahiBlockDropDownToolGroupService,
  JatsSideMenuToolGroupService,
  JatsAnnotationListTooolGroupService,
} from '../CustomWaxToolGroups'
import JatsTagsService from '../JatsTags'
import CharactersList from './CharactersList'
import KotahiSchema from './KotahiSchema'
// import AnyStyleService from '../CustomWaxToolGroups/AnystyleService/AnyStyleService'
import CitationService from '../CustomWaxToolGroups/CitationService/CitationService'
import 'wax-table-service/dist/index.css'

const updateTitle = title => {
  // this gets fired when the title is changed in original version of this—not called now, but might still be needed
  // console.log(`Title changed: ${title}`)
}

// WEIRD THINGS NOTICED:

// 1) List functionality doesn't actually work. Why? I've commented that out for now.
// 2) Tables, images, footnotes, comments work.
// 3) Changing block formats works (though there's no record of it)
// 4) Sidebar seems to work–-we could take that out.

const authorProofingEditorConfig = (
  handleAssetManager,
  updateAnystyle,
  updateCrossRef,
  styleReference,
) => ({
  EnableTrackChangeService: {
    enabled: true, // Why does this not function?
    toggle: false,
    updateTrackStatus: () => {
      // console.log('update track status fired')
      return true
    },
  },
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
  CommentsService: { readOnly: false }, // this should make it work though this is not yet in Wax
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
        // 'Lists',
        'Notes',
        'Tables',
        'Images',
        'TrackingAndEditing',
        'FullScreen',
      ],
    },
    // {
    //   templateArea: 'leftSideBar',
    //   toolGroups: ['JatsSideMenu'],
    // },
    {
      templateArea: 'commentTrackToolBar',
      toolGroups: ['TrackCommentOptions'],
    },
    {
      templateArea: 'bottomRightInfo',
      toolGroups: [{ name: 'InfoToolGroup', exclude: ['ShortCutsInfo'] }],
    },
  ],

  PmPlugins: [columnResizing() /* tableEditing() */ /* WaxSelectionPlugin */],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},
  SpecialCharactersService: CharactersList,

  TitleService: { updateTitle },
  // AnyStyleService: {},
  ImageService: handleAssetManager ? { handleAssetManager } : {},
  CitationService: {
    AnyStyleTransformation: updateAnystyle,
    CrossRefTransformation: updateCrossRef,
    CiteProcTransformation: styleReference,
    readOnly: false,
  },
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
    // for side menu
    new JatsTagsService(),
    new JatsSideMenuToolGroupService(),
    new JatsAnnotationListTooolGroupService(),
    // new AnyStyleService(),
    new CitationService(),
  ],
})

export default authorProofingEditorConfig
