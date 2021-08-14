class ElementCollection extends Array<HTMLElement> {
  width(value: number | undefined) {
    if (!value) return this[0].offsetWidth;
    this.forEach((element) => (element.style.width = `${value}px`));
    return value; // I'm only guessing this is what passing a new width would return
  }
}

function $(selectorOrElement: String | HTMLElement) {
  if (typeof selectorOrElement === "string") {
    const selector = selectorOrElement;
    return new ElementCollection(
      ...document.querySelectorAll<HTMLElement>(selector)
    );
  } else {
    const element = selectorOrElement;
    return new ElementCollection(element as HTMLElement);
  }
}
