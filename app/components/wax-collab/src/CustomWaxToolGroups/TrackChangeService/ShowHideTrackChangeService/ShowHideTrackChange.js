import { injectable } from 'inversify'
import { Tools } from 'wax-prosemirror-core'

@injectable()
class ShowHideTrackChange extends Tools {
  title = 'Show/Hide Changes'
  icon = 'showTrack'
  label = 'Show suggestions'
  name = 'ShowHideTrackChange'

  /* eslint-disable-next-line class-methods-use-this */
  get run() {
    return (state, dispatch) => {}
  }

  select = (state, activeViewId, activeView) => {
    return true
  }

  /* eslint-disable-next-line class-methods-use-this */
  get active() {
    return state => {}
  }
}

export default ShowHideTrackChange
