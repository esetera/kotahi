import { Service } from 'wax-prosemirror-core'
import TableUncitationToolGroup from './TableUncitationToolGroup'

class TableUncitationToolGroupService extends Service {
  name = 'TableUncitationToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container.bind('TableUncitationToolGroup').to(TableUncitationToolGroup)
  }
}

export default TableUncitationToolGroupService
