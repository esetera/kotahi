import { Service } from 'wax-prosemirror-core'
import ReferenceUncitationToolGroup from './ReferenceUncitationToolGroup'

class ReferenceUncitationToolGroupService extends Service {
  name = 'ReferenceUncitationToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container
      .bind('ReferenceUncitationToolGroup')
      .to(ReferenceUncitationToolGroup)
  }
}

export default ReferenceUncitationToolGroupService
