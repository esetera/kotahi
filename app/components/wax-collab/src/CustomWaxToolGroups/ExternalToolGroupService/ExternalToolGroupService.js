import { Service } from "wax-prosemirror-services";
import ExternalToolGroup from './ExternalToolGroup';

class ExternalToolGroupService extends Service {
    name = 'ExternalToolGroupService';

    boot() {
    }

    register() {
        this.container.bind('ExternalToolGroup').to(ExternalToolGroup);
    }
}


export default ExternalToolGroupService