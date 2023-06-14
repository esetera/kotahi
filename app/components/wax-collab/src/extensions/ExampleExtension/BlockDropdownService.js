import { Service } from 'wax-prosemirror-core'
import ExampleBlockDropDown from './BlockDropdown'

class ExampleBlockDropDownToolGroupService extends Service {
  register() {
    this.container.bind('ExampleBlockDropDown').to(ExampleBlockDropDown)
  }
}

export default ExampleBlockDropDownToolGroupService
