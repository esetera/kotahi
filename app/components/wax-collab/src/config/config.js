import { emDash, ellipsis } from 'prosemirror-inputrules'

import { DefaultSchema } from 'wax-prosemirror-utilities'

import {
  AnnotationToolGroupService,
  ImageService,
  InlineAnnotationsService,
  LinkService,
  // ListsService,
  // ListToolGroupService,
  // TablesService,
  // TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  ImageToolGroupService,
  TextBlockLevelService,
  TextToolGroupService,
  // NoteService,
  // NoteToolGroupService,
  // TrackChangeService,
  // CommentsService,
} from 'wax-prosemirror-services'

// import _ from 'lodash'
import invisibles, {
  // space,
  hardBreak,
  // paragraph,
} from '@guardian/prosemirror-invisibles'

export default {
  SchemaService: DefaultSchema,
  MenuService: [
    {
      templateArea: 'topBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          exclude: ['Subscript', 'Superscript', 'SmallCaps'],
        },
      ],
    },
  ],

  RulesService: [emDash, ellipsis],

  ShortCutsService: {},

  PmPlugins: [invisibles([hardBreak()])],

  services: [
    new ImageService(),
    // new ListsService(),
    new InlineAnnotationsService(),
    new LinkService(),
    // new TablesService(),
    new TextBlockLevelService(),
    new BaseService(),
    new BaseToolGroupService(),
    new DisplayBlockLevelService(),
    // new TableToolGroupService(),
    new DisplayToolGroupService(),
    new ImageToolGroupService(),
    new TextToolGroupService(),
    new AnnotationToolGroupService(),
    // new NoteToolGroupService(),
    // new ListToolGroupService(),
  ],
}
