import {eachRight} from 'lodash'


const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

const preEditingMatches = (
    doc,
    searchValue = "",
    matchCase = false,
    expression = false,
    tag,
    customExpression = false,
  ) => {
    const allNodes = [],
      supNodes = [],
      softNodes = [];
  
    doc.descendants((node, pos) => {
      if (node.type.name == 'hard_break') {
        softNodes.push({ node, pos });
      }
      if (tag === 'sup' && (node.marks[0] && node.marks[0].type.name === "superscript")) {
        supNodes.push({ node, pos });
      } else {
        allNodes.push({ node, pos });
      }
    });
  
    eachRight(allNodes, (node, index) => {
      if (node.node.type.groups.includes("notes")) {
        allNodes.splice(index + 1, node.node.childCount);
      }
    });
  
  
    const results = [];
    const mergedTextNodes = [];
    let index = 0;
  
    const isDeletionNode = ({ marks }) => {
      return (
        marks.length > 0 &&
        marks.some(({ type: { name } }) => name === "deletion")
      );
    };
  
    if (tag === 'sup') {
      supNodes.forEach((node, index) => {
        if (node.node.isText) {
          if (isDeletionNode(node.node)) {
            return;
          }
          if (mergedTextNodes[index]) {
            mergedTextNodes[index] = {
              text: mergedTextNodes[index].text + node.node.text,
              pos: mergedTextNodes[index].pos,
            };
          } else {
            mergedTextNodes[index] = {
              text: node.node.text,
              pos: node.pos,
            };
          }
        } else {
          index += 1;
        }
      });
    } else if (softNodes.length) {
      softNodes.forEach((node, index) => {
        if (!node.node.isText) {
          if (isDeletionNode(node.node)) {
            return;
          }
          if (mergedTextNodes[index]) {
            mergedTextNodes[index] = {
              text: mergedTextNodes[index].text + node.node.text,
              pos: mergedTextNodes[index].pos,
            };
          } else {
            mergedTextNodes[index] = {
              text: node.node.text,
              pos: node.pos,
            };
          }
        } else {
          index += 1;
        }
      });
      mergedTextNodes.forEach(({ text, pos }) => {
        results.push({
          from: pos,
          to: pos,
          text: "",
        });
      });
      return results;
    } else if (tag == 'HardBreak') {
      allNodes.forEach((node, index) => {
        if (node.node.isBlock && node.node.attrs.class == 'paragraph' && node.node.textContent == '') {
          mergedTextNodes[index] = {
            text: mergedTextNodes[index].text + node.node.text,
            pos: mergedTextNodes[index].pos,
          };
        } else {
          index += 1;
        }
      })
      mergedTextNodes.forEach(({ text, pos }) => {
        results.push({
          from: pos,
          to: pos,
          text: 'HardBreak',
        });
      });
    }
    else {
      allNodes.forEach((node, index) => {
        if (node.node.isText) {
          if (isDeletionNode(node.node)) {
            return;
          }
          if (mergedTextNodes[index]) {
            mergedTextNodes[index] = {
              text: mergedTextNodes[index].text + node.node.text,
              pos: mergedTextNodes[index].pos,
            };
          } else {
            mergedTextNodes[index] = {
              text: node.node.text,
              pos: node.pos,
            };
          }
        } else {
          index += 1;
        }
      });
    }
  
    mergedTextNodes.forEach(({ text, pos }) => {
      const search = expression ? searchValue : RegExp(escapeRegExp(searchValue), matchCase ? "gu" : "gui");
      let m;
      // eslint-disable-next-line no-cond-assign
      while ((m = search.exec(text))) {
        if (m[0] === "") {
          break;
        }
  
        results.push({
          from: pos + m.index,
          to: pos + m.index + m[0].length,
          text: text.substring(m.index - 10, m.index + m[0].length + 10),
        });
      }
    });
    return results;
  };
  

  export default preEditingMatches;