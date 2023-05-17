import moveToMatch from './moveToMatch'
import getCalculatedWordPosition from '../getCalculatedWordPosition'

const onLocate = (view, viewId, content) => {
  const newPosition = getCalculatedWordPosition(view, content)
  moveToMatch(view, 'main', newPosition.from, newPosition.to)
}

export default onLocate
