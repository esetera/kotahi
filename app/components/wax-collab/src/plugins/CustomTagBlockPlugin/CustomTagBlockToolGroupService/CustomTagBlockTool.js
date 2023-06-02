// import { injectable } from 'inversify'
import { Commands, Tools } from 'wax-prosemirror-core'
import { v4 as uuidv4 } from 'uuid'

// @injectable()
class CustomTagBlockTool extends Tools {
  title = 'Custom Tag Block'
  name = 'CustomTagBlock'

  // eslint-disable-next-line class-methods-use-this
  get run() {
    return (state, dispatch, val) => {
      Commands.setBlockType(state.config.schema.nodes.customTagBlock, {
        class: val.replace(/ /g, '-').toLowerCase(),
        id: uuidv4(),
      })(state, dispatch)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get active() {
    return (state, activeViewId, className, allTags) => {
      const isActive = Commands.customTagBlockActive(
        state.config.schema.nodes.customTagBlock,
        { class: className },
      )(state)

      const blockTags = allTags.filter(tag => {
        return tag.tagType === 'block'
      })

      const tagsActive = {}
      blockTags.forEach(tag => {
        if (
          isActive &&
          className === tag.label.replace(/ /g, '-').toLowerCase()
        ) {
          tagsActive[tag.label] = true
        } else {
          tagsActive[tag.label] = false
        }
      })
      return tagsActive
    }
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false
    return true
  }
}

export default CustomTagBlockTool
