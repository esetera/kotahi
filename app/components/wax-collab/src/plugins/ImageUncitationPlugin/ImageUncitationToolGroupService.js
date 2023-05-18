import { Service } from 'wax-prosemirror-core'
import ImageUncitationToolGroup from './ImageUncitationToolGroup'

class ImageUncitationToolGroupService extends Service {
  name = 'ImageUncitationToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container.bind('ImageUncitationToolGroup').to(ImageUncitationToolGroup)
  }
}

export default ImageUncitationToolGroupService
