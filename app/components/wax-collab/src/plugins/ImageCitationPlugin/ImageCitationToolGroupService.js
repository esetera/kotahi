import { Service } from 'wax-prosemirror-core'
import ImageCitationToolGroup from './ImageCitationToolGroup'

class ImageCitationToolGroupService extends Service {
  name = 'ImageCitationToolGroupService'

  /* eslint-disable-next-line */
  boot() {}

  register() {
    this.container.bind('ImageCitationToolGroup').to(ImageCitationToolGroup)
  }
}

export default ImageCitationToolGroupService
