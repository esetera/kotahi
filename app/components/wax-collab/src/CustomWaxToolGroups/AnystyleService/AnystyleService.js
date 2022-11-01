import { Service } from 'wax-prosemirror-core'
import { imageNode, figureNode } from './schema'
import PlaceHolderPlugin from './plugins/placeHolderPlugin'
import Anystyle from './Anystyle'
import AltComponent from './AltComponent'

class AnystyleService extends Service {
  name = 'AnystyleService'

  boot() {
    this.app.PmPlugins.add(
      'anystylePlaceHolder',
      PlaceHolderPlugin('anystylePlaceHolder'),
    )
  }

  register() {
    this.container.bind('Anystyle').to(Anystyle)
    const createNode = this.container.get('CreateNode')
    const createOverlay = this.container.get('CreateOverlay')
    createNode({
      figure: figureNode,
    })

    createNode(
      {
        image: imageNode,
      },
      { toWaxSchema: true },
    )

    createOverlay(
      AltComponent,
      {},
      {
        nodeType: 'mixedcitation',
        findInParent: false,
        markType: '',
        followCursor: false,
        selection: false,
      },
    )
  }
}

export default AnystyleService
