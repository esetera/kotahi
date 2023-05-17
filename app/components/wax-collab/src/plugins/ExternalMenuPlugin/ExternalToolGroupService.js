import { Service } from 'wax-prosemirror-core'
import ExternalToolGroup from './ExternalToolGroup'

class ExternalToolGroupService extends Service {
  name = 'ExternalToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container.bind('ExternalToolGroup').to(ExternalToolGroup)
  }
}

export default ExternalToolGroupService
