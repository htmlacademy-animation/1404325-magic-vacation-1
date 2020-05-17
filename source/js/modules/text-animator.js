export default class TextAnimator {
  constructor(node, options = {}) {
    const {
      property = `transform`,
      activeClass = `text-animation--active`,
      startDelay = 0,
      stepDelay = 40,
      duration = 350
    } = options;

    this.node = node;
    this.property = property;
    this.activeClass = activeClass;
    this.startDelay = startDelay;
    this.stepDelay = stepDelay;
    this.duration = duration;
    this.stepOffset = 0;

    this.prepareText();
  }

  prepareText() {
    if (!this.node) {
      return;
    }
    this.node.classList.add(`text-animation`);
    const words = this.node.textContent.trim().split(` `).filter((word) => word);

    const content = words.reduce((wordFragment, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((fragment, letter, letterIndex) => {
        fragment.appendChild(this.createLetter(letter, letterIndex));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text-animation__word`);
      wordContainer.appendChild(wordElement);
      wordFragment.appendChild(wordContainer);
      if (wordIndex < words.length - 1) {
        wordFragment.appendChild(document.createTextNode(` `));
      }

      return wordFragment;
    }, document.createDocumentFragment());

    this.node.innerHTML = ``;
    this.node.appendChild(content);
  }

  createLetter(letter, index) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.classList.add(`text-animation__letter`);
    const delayOffset = this.getDelayOffset(index);
    span.style.transition = `${this.property} ${this.duration}ms ease ${this.stepOffset + delayOffset}ms`;
    this.stepOffset += this.stepDelay;
    return span;
  }

  getDelayOffset(index) {
    const groupIndex = index % 3;
    let offset;
    switch (groupIndex) {
      case 0:
        offset = 0;
        break;

      case 1:
        offset = this.stepDelay;
        break;

      case 2:
        offset = -this.stepDelay;
        break;
    }

    return offset;
  }

  runAnimation() {
    if (!this.node) {
      return;
    }

    this.timerId = setTimeout(() => {
      this.node.classList.add(this.activeClass);
    }, this.startDelay);
  }

  stopAnimation() {
    if (!this.node) {
      return;
    }
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.node.classList.remove(this.activeClass);
  }
}
