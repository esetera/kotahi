import ExampleBlockDropDownToolGroupService from './BlockDropdownService'

// This is an example of a plugin. It's a tool added to the default menu. This does not export a specific component
// because it is not adding anything especially new to the Wax layout--the tool goes in "topBar" which puts it in the existing menu.

// Two ways to do this. If you want to have it as a separate component in Wax, do somethign like this:
/*

const ExternalMenuComponent = (
  <ExternalMenu>
    <ExternalMenuToolBar />
  </ExternalMenu>
)

and then export ExternalMenuComponent 

const ExternalMenuToolGroup = {
  templateArea: 'externalMenuToolBar',
  toolGroups: ['ExternalToolGroup'],
}
*/
// Or, if you want to have it as part of the existing menu (probably smarter), do this:

const ExampleBlockDropDownToolGroup = {
  templateArea: 'topBar',
  toolGroups: ['ExampleBlockDropDown'],
}

export { ExampleBlockDropDownToolGroupService, ExampleBlockDropDownToolGroup }
