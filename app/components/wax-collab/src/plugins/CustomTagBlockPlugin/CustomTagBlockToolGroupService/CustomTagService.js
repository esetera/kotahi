import { Service, CustomTagInlineService } from 'wax-prosemirror-services'

import CustomTagBlockService from './customTagBlockService'

class CustomTagService extends Service {
  dependencies = [new CustomTagBlockService(), new CustomTagInlineService()]
}

export default CustomTagService
