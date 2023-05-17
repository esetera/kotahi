// Simplest possible example of how this works. This adds a plugin without a component--it's the same as the block dropdown.
// If you turn this on, you will get a duplicate of the Kotahi Block Dropdown service on the right side of the menu.

import {
  ExampleBlockDropDownToolGroupService,
  ExampleBlockDropDownToolGroup,
} from './ExamplePlugin/index'

import {
  ExternalMenuToolGroup,
  // ExternalMenuComponent,
  ExternalToolGroupService,
} from './ExternalMenuPlugin'

import {
  ReferenceStructuringToolGroup,
  // ReferenceStructuringComponent,
  ReferenceStructuringToolGroupService,
} from './ReferenceStructuringPlugin'

import {
  CleanupUtilsToolGroupService,
  CleanupUtilsToolGroup,
} from './CleanupUtilsPlugin'

console.log(CleanupUtilsToolGroup, CleanupUtilsToolGroupService)

// Plugin components are React elements added to the Wax layout. They are not strictly necessary.

const PluginToolComponents = [] // ExternalMenuComponent]

// Plugin layout elements are added into the Wax layout. This is required; this one just attaches the block dropdown to the right side of the menu.

const PluginLayoutElements = [
  ExternalMenuToolGroup,
  ExampleBlockDropDownToolGroup,
  CleanupUtilsToolGroup,
  // ReferenceStructuringToolGroup,
]

// Plugin services need to be added to add the plugin functionality. This is not required.

const PluginServices = [
  new ExternalToolGroupService(),
  new ExampleBlockDropDownToolGroupService(),
  new CleanupUtilsToolGroupService(),
  // new ReferenceStructuringToolGroupService(),
]

// const PluginToolComponents = [] // ExternalMenuTool]
// const PluginLayoutElements = [KotahiBlockDropDownToolGroup] // ExternalMenuTemplateArea]
// const PluginServices = [new KotahiBlockDropDownToolGroupService()] // new ExternalToolGroupService()]

// These things get exported; they are imported by the config and layout of the editors.

export { PluginToolComponents, PluginLayoutElements, PluginServices }
