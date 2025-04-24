// Ai generated code
const saveCaretPosition = (editableEl) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(editableEl);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  const position = preCaretRange.toString().length;
  return position;
};

// Ai generated code
const restoreCaretPosition = (editableEl, pos) => {
  const selection = window.getSelection();
  if (!selection) return;
  const nodeStack = [editableEl];
  let charIndex = 0;
  let node,
    foundStart = false;
  let stop = false;

  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType === 3) {
      // TEXT_NODE
      const nextCharIndex = charIndex + node.length;
      if (!foundStart && pos <= nextCharIndex) {
        const range = document.createRange();
        range.setStart(node, pos - charIndex);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        stop = true;
      }
      charIndex = nextCharIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }
};

const focusAtEnd = (el) => {
  if (!el || !el.isContentEditable) return;

  el.focus();

  // Move caret to the end
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false); // Collapse to end

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
};

export { saveCaretPosition, restoreCaretPosition, focusAtEnd };
