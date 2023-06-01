import { Service } from "wax-prosemirror-core";
import RefValidationTool from "./RefValidationTool";

class ReferenceValidationToolGroupService extends Service {
  name = "ReferenceValidationToolGroupService";

  boot() {}

  register() {
    this.container.bind("RefValidationTool").to(RefValidationTool);
  }
}

export default ReferenceValidationToolGroupService;
