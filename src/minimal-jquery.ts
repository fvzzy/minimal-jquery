class NodeCollection extends Array {
  width(value) {
    if (!value) return this[0].offsetWidth;
    this.forEach((node) => (node.offsetWidth = value));
    return value; // I'm only guessing this is what passing a new width would return
  }
}

function $(selectorOrNode) {
  if (typeof selectorOrNode === "string") {
    const selector = selectorOrNode;
    return new NodeCollection(...document.querySelectorAll(selector));
  } else {
    const node = selectorOrNode;
    return new NodeCollection(node);
  }
}
