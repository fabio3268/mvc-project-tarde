export function Element(tagName, textContent) {
    this.tagName = tagName;
    this.textContent = textContent;
}

Element.prototype.render = function() {
    const element = document.createElement(this.tagName);
    element.textContent = this.textContent;
    return element;
};

export function Button(textContent, onClick) {
    Element.call(this, 'button', textContent);
    this.onClick = onClick;
}

Button.prototype = Object.create(Element.prototype);
Button.prototype.constructor = Button;

Button.prototype.render = function() {
    const button = Element.prototype.render.call(this);
    button.addEventListener('click', this.onClick);
    return button;
};