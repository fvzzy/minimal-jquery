class ElementCollection extends Array<HTMLElement> {
  ready(handler: Function) {
    // according to the jQuery docs, the ready handler always waits for
    // the *document* to be ready, regardless of the element collection
    // this method is called on
    if (document.readyState !== "loading") {
      handler();
    } else {
      document.addEventListener("DOMContentLoaded", (evt: Event) =>
        handler(evt)
      );
    }
  }

  on(event: keyof HTMLElementEventMap, handler: Function) {
    this.forEach((element) =>
      element.addEventListener(event, (evt: Event) => handler(evt))
    );
  }

  click(handler: Function) {
    this.on("click", handler);
  }

  width(value: Number | undefined) {
    if (!value) {
      return this[0].offsetWidth;
    }
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

$.each = function (elementCollection: ElementCollection, callback: Function) {
  elementCollection.forEach((element) => callback.bind(element)());
};
