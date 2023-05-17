import ExampleBlockDropDownToolGroupService from './BlockDropdownService'

// This is an example of a plugin. It's a tool added to the default menu. This does not export a specific component
// because it is not adding anything especially new to the Wax layout--the tool goes in "topBar" which puts it in the existing menu.

const ExampleBlockDropDownToolGroup = {
  templateArea: 'topBar',
  toolGroups: ['ExampleBlockDropDown'],
}

export { ExampleBlockDropDownToolGroupService, ExampleBlockDropDownToolGroup }
