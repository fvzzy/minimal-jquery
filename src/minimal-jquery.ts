class NodeCollection extends Array<HTMLElement> {
  width(value: number | undefined) {
    if (!value) return this[0].offsetWidth;
    this.forEach((node) => (node.style.width = `${value}px`));
    return value; // I'm only guessing this is what passing a new width would return
  }
}

function $(selectorOrNode: String | HTMLElement) {
  if (typeof selectorOrNode === "string") {
    const selector = selectorOrNode;
    return new NodeCollection(
      ...document.querySelectorAll<HTMLElement>(selector)
    );
  } else {
    const node = selectorOrNode;
    return new NodeCollection(node as HTMLElement);
  }
}
