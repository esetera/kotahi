import { Service } from 'wax-prosemirror-core'
import ReferenceValidationToolGroup from './ReferenceValidationToolGroup'

class ReferenceValidationToolGroupService extends Service {
  name = 'ReferenceValidationToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container
      .bind('ReferenceValidationToolGroup')
      .to(ReferenceValidationToolGroup)
  }
}

export default ReferenceValidationToolGroupService
