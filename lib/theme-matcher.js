/** @babel */

// TODO: Atom has a wonderful Color class (https://atom.io/docs/api/v1.23.3/Color), but I can't figure out how to import it directly... It's not exported: https://github.com/atom/atom/blob/ff6dc42fcd7d533cf4f50b2874e09cce24c77c28/exports/atom.js
import rgbHex from 'rgb-hex';

const COLOR_KEYS = [
  'foreground', 'background', 'cursor', 'cursorAccent', 'selection', 'black',
  'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'brightBlack',
  'brightRed', 'brightGreen', 'brightYellow', 'brightBlue', 'brightMagenta',
  'brightCyan', 'brightWhite'
];

export default class ThemeMatcher {

  writeElements() {
    this.colorElements = document.createElement('div');
    this.colorElements.classList.add('terminal-view-color-elements');

    COLOR_KEYS.forEach((colorKey) => {
      const colorElement = document.createElement('span');
      colorElement.dataset.colorKey = colorKey;
      this.colorElements.appendChild(colorElement);
    });

    document.body.appendChild(this.colorElements);
  }

  readStyles() {
    const colors = {};

    Array.from(this.colorElements.children).forEach((colorElement) => {
      const colorKey = colorElement.dataset.colorKey;
      const computedStyle = window.getComputedStyle(colorElement);
      colors[colorKey] = `#${rgbHex(computedStyle.color)}`;
    });

    return colors;
  }

  static parseThemeStyles() {
    const themeMatcher = new this();
    themeMatcher.writeElements();
    return themeMatcher.readStyles();
  }

}
