class NodeCollection extends Array {
  // jQuery methods will exist in this class, returned by the $ function
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
