/** @babel */

import { CompositeDisposable } from 'atom';
import TerminalView from './terminal-view';

export default {

  disposables: null,
  terminalViews: [],

  activate(state) {
    this.disposables = new CompositeDisposable();

    // Register Opener for the Terminal URI (`terminal://`)
    this.disposables.add(atom.workspace.addOpener((uri) => {
      if (uri.indexOf('terminal:') == 0) {
        const terminalView = new TerminalView();
        this.terminalViews.push(terminalView);
        return terminalView;
      }
    }));

    this.disposables.add(atom.commands.add('atom-workspace', {
      'terminal:open': this.open.bind(this),
      'terminal:copy': this.handleCopy.bind(this),
      'terminal:paste': this.handlePaste.bind(this),
      'terminal:clear': this.handleClear.bind(this)
    }));
  },

  deactivate() {
    this.disposables.dispose();
  },

  open() {
    atom.workspace.open('terminal://');
  },

  handleCopy(event) {
    let activeTerminalView = atom.workspace.getActivePaneItem();
    activeTerminalView.copySelection();
  },

  handlePaste(event) {
    let activeTerminalView = atom.workspace.getActivePaneItem();
    activeTerminalView.pasteFromClipboard();
  },

  handleClear(event) {
    let activeTerminalView = atom.workspace.getActivePaneItem();
    activeTerminalView.clear();
  }

};