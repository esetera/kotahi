import { Service } from 'wax-prosemirror-core'
import AuthorCitationToolGroup from './AuthorCitationToolGroup'

class AuthorCitationToolGroupService extends Service {
  name = 'AuthorCitationToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container.bind('AuthorCitationToolGroup').to(AuthorCitationToolGroup)
  }
}

export default AuthorCitationToolGroupService
