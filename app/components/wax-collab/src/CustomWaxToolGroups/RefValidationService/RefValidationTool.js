import React from "react";
import { ToolGroup } from "wax-prosemirror-core";
import ReferenceValidation from "./RefValidation";

export default class RefValidationTool extends ToolGroup {
  tools = [];

  constructor() {
    super();
  }

  renderTools() {
    return <ReferenceValidation />;
  }
}
