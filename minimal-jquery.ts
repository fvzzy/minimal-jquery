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

  append(content: HTMLElement | String) {
    if (content instanceof HTMLElement) {
      this.forEach((element) => element.appendChild(content));
    } else {
      this.forEach((element) => (element.innerHTML += content));
    }
    return this;
  }

  css(propertyName: any, value?: String) {
    // using "any" here as I don't believe there's a default bundled
    // collection of valid CSS properties to reference
    if (!value) {
      return window
        .getComputedStyle(this[0], null)
        .getPropertyValue(propertyName);
    }

    this.forEach((element) => {
      element.style.setProperty(
        propertyName,
        this._formatPropertyValue(propertyName, value)
      );
    });
    return this;
  }

  attr(attributeName: any, value?: String) {
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

  width(value?: Number) {
    return this.css("width", value ? `${value}px` : undefined);
  _formatPropertyValue(propertyName: String, value: String) {
    // an example list of style properties that might require units
    const measurements = ["top", "left", "bottom", "right", "width", "height"];
    return measurements.indexOf(propertyName.toString()) !== -1
      ? `${parseInt(value.toString())}px`
      : value.toString();
  }
}

function $(selectorOrElement: String | HTMLElement) {
  if (typeof selectorOrElement === "string") {
    const selector = selectorOrElement;
    const eqSelectorRegex = new RegExp(/^(.*):eq\((\d)\)$/);
    if (eqSelectorRegex.test(selector)) {
      const match = selector.match(eqSelectorRegex);
      return new ElementCollection(
        document.querySelectorAll<HTMLElement>(match![1])[Number(match![2])]
      );
    }
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
