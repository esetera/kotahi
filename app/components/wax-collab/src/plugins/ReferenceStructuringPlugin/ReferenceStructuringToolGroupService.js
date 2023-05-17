import { Service } from 'wax-prosemirror-core'
import ReferenceStructuringToolGroup from './ReferenceStructuringToolGroup'

class ReferenceStructuringToolGroupService extends Service {
  name = 'ReferenceStructuringToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container
      .bind('ReferenceStructuringToolGroup')
      .to(ReferenceStructuringToolGroup)
  }
}

export default ReferenceStructuringToolGroupService
