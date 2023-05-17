import { Service } from 'wax-prosemirror-core'
import CleanupUtilsToolGroup from './CleanupUtilsToolGroup'

class CleanupUtilsToolGroupService extends Service {
  name = 'CleanupUtilsToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container.bind('CleanupUtilsToolGroup').to(CleanupUtilsToolGroup)
  }
}

export default CleanupUtilsToolGroupService
