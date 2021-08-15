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
      element.addEventListener(event, (evt: Event) =>
        handler.call(element, evt)
      )
    );
  }

  click(handler: Function) {
    this.on("click", handler);
  }

  hover(handlerIn: Function, handlerOut: Function) {
    this.on("mouseenter", handlerIn);
    this.on("mouseleave", handlerOut);
  }

  html(htmlString: String) {
    if (!htmlString) {
      return this[0].innerHTML;
    }
    this.forEach((element) => (element.innerHTML = htmlString.toString()));
    return this;
  }

  css(propertyName: any, value: String) {
    // using "any" here as I don't believe there's a default bundled
    // collection of valid CSS properties to reference
    if (!value) {
      return this[0].style[propertyName];
    }
    this.forEach((element) => (element.style[propertyName] = value.toString()));
    return this;
  }

  attr(attributeName: any, value: String) {
    if (!value) {
      return this[0].getAttribute(attributeName);
    }
    this.forEach((element) =>
      element.setAttribute(attributeName, value.toString())
    );
    return this;
  }

  addClass(className: String) {
    this.forEach((element) => {
      element.classList.add(className.toString());
    });
    return this;
  }

  removeClass(className: String) {
    this.forEach((element) => element.classList.remove(className.toString()));
    return this;
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
  elementCollection.forEach((element) => callback.call(element));
};
