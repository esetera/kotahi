import { Service } from 'wax-prosemirror-services'
import EditingSuggesting from './EditingSuggesting'

class EditingSuggestingService extends Service {
  name = 'EditingSuggestingService'

  register() {
    this.container.bind('EditingSuggesting').to(EditingSuggesting)
  }
}
export default EditingSuggestingService
