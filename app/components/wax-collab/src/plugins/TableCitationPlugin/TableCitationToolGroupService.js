import { Service } from 'wax-prosemirror-core'
import TableCitationToolGroup from './TableCitationToolGroup'

class TableCitationToolGroupService extends Service {
  name = 'TableCitationToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container.bind('TableCitationToolGroup').to(TableCitationToolGroup)
  }
}

export default TableCitationToolGroupService
