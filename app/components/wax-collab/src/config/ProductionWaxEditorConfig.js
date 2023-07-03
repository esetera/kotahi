// import { WaxSelectionPlugin } from 'wax-prosemirror-plugins'
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
  EditingSuggestingService,
  TrackingAndEditingToolGroupService,
} from 'wax-prosemirror-services'
import {
  KotahiBlockDropDownToolGroupService,
  JatsSideMenuToolGroupService,
  JatsAnnotationListTooolGroupService,
  JatsTagsService,
} from '../CustomWaxToolGroups'
import CharactersList from './CharactersList'
import KotahiSchema from './KotahiSchema'
import AnyStyleService from '../CustomWaxToolGroups/AnystyleService/AnyStyleService'
import RefService from '../CustomWaxToolGroups/RefCitationService/RefCitationService'
import {
  ProductionExtensionServices,
  ProductionExtensionLayoutElements,
} from '../extensions'

const serviceList = [
  new AnnotationToolGroupService(),
  new BaseService(),
  new BaseToolGroupService(),
  new BottomInfoService(),
  new DisplayToolGroupService(),
  new EditorInfoToolGroupServices(),
  new FindAndReplaceService(),
  new ImageToolGroupService(),
  new InlineAnnotationsService(),
  new LinkService(),
  new ListsService(),
  new ListToolGroupService(),
  new MathService(),
  new ImageService(),
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
  // for side menu
  new JatsTagsService(),
  new JatsSideMenuToolGroupService(),
  new JatsAnnotationListTooolGroupService(),
  new AnyStyleService(),
  new RefService(),
  new NoteService(),
]

// generate a list which replaces any service in serviceList with a service of the same name from PluginServices

for (let i = 0; i < serviceList.length; i += 1) {
  const service = serviceList[i]

  if (service.name) {
    const index = ProductionExtensionServices.findIndex(
      x => x.name === service.name,
    )

    if (index > -1) {
      /* eslint-disable-next-line no-console */
      console.log('Replacing default Wax Production service: ', service.name)
      serviceList[i] = ProductionExtensionServices[index]
      ProductionExtensionServices.splice(index, 1)
    }
  }
}

const updateTitle = title => {
  // this gets fired when the title is changed in original version of this—not called now, but might still be needed
  // console.log(`Title changed: ${title}`)
}

const productionWaxEditorConfig = (
  readOnlyComments,
  handleAssetManager,
  updateAnystyle,
) => ({
  EnableTrackChangeService: {
    enabled: false,
    toggle: true,
    updateTrackStatus: () => true,
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
  CommentsService: { readOnly: readOnlyComments || false }, // this should make it work though this is not yet in Wax
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
      templateArea: 'leftSideBar',
      toolGroups: ['JatsSideMenu'],
    },
    {
      templateArea: 'commentTrackToolBar',
      toolGroups: ['TrackCommentOptions'],
    },
    {
      templateArea: 'bottomRightInfo',
      toolGroups: [{ name: 'InfoToolGroup', exclude: ['ShortCutsInfo'] }],
    },
    ...ProductionExtensionLayoutElements,
  ],

  PmPlugins: [columnResizing(), tableEditing() /* WaxSelectionPlugin */],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},
  SpecialCharactersService: CharactersList,

  TitleService: { updateTitle },
  AnyStyleService: { AnyStyleTransformation: updateAnystyle },
  ImageService: handleAssetManager ? { handleAssetManager } : {},
  services: [...serviceList, ...ProductionExtensionServices],
})

export default productionWaxEditorConfig
