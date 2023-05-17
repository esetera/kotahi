// Simplest possible example of how this works. This adds a plugin without a component--it's the same as the block dropdown.
// If you turn this on, you will get a duplicate of the Kotahi Block Dropdown service on the right side of the menu.

import {
  ExampleBlockDropDownToolGroupService,
  ExampleBlockDropDownToolGroup,
} from './ExamplePlugin/index'

// Plugin components are React elements added to the Wax layout. They are not strictly necessary.

const PluginToolComponents = []

// Plugin layout elements are added into the Wax layout. This is required; this one just attaches the block dropdown to the right side of the menu.

const PluginLayoutElements = [ExampleBlockDropDownToolGroup]

// Plugin services need to be added to add the plugin functionality. This is required.

const PluginServices = [new ExampleBlockDropDownToolGroupService()]

// import {
//   ExternalMenuTool,
//   ExternalMenuTemplateArea,
//   ExternalToolGroupService,
// } from './ExternalMenuPlugin'

// const PluginToolComponents = [] // ExternalMenuTool]
// const PluginLayoutElements = [KotahiBlockDropDownToolGroup] // ExternalMenuTemplateArea]
// const PluginServices = [new KotahiBlockDropDownToolGroupService()] // new ExternalToolGroupService()]

// These things get exported; they are imported by the config and layout of the editors.

export { PluginToolComponents, PluginLayoutElements, PluginServices }
