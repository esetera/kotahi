import { Service } from 'wax-prosemirror-services'
import Anystyle from './Anystyle'
import anystylemixedcitationMark from './schema/anystylemixedcitationMark'
import AnystylePlaceHolderPlugin from './plugins/anystylePlaceHolderPlugin'
import AnystyleAltComponent from './AnystyleAltComponent'

class AnystyleService extends Service {
  name = 'AnystyleService'
  boot() {
    this.app.PmPlugins.add(
      'anystylePlaceHolder',
      AnystylePlaceHolderPlugin('anystylePlaceHolder'),
    )
  }

  register() {
    this.container.bind('Anystyle').to(Anystyle)
    const createMark = this.container.get('CreateMark')
    const createOverlay = this.container.get('CreateOverlay')

    createOverlay(
      AnystyleAltComponent,
      {},
      {
        nodeType: '',
        markType: 'anystylemixedcitation',
        followCursor: false,
        selection: false,
      },
    )

    createMark(
      {
        anystylemixedcitation: anystylemixedcitationMark,
      },
      { toWaxSchema: true },
    )
  }
}

export default AnystyleService
