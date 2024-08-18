import * as vscode from 'vscode';

let isMoving = false;
let intervalId: NodeJS.Timeout | null = null;

export function activate(context: vscode.ExtensionContext) {

  let moveCursorCommand = vscode.commands.registerCommand('extension.startStopMoveCursor', () => {
    if (isMoving) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      isMoving = false;
    } else {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const totalLines = document.lineCount;
        const lastLine = totalLines - 1;

        intervalId = setInterval(() => {
          const cursorPosition = editor.selection.active;
          const currentLine = cursorPosition.line;
          const currentChar = cursorPosition.character;

          let newLine = currentLine;
          let newChar = currentChar + 1;

          // Check if we need to move to the next line
          if (newChar >= document.lineAt(newLine).text.length) {
            newChar = 0;
            newLine += 1;
            // Check if we need to wrap to the top of the document
            if (newLine >= totalLines) {
              newLine = 0;
            }
          }

          const newPosition = new vscode.Position(newLine, newChar);
          editor.selection = new vscode.Selection(newPosition, newPosition);
          editor.revealRange(new vscode.Range(newPosition, newPosition));
        }, 100); // Adjust the interval speed if needed
      }
      isMoving = true;
    }
  });

  context.subscriptions.push(moveCursorCommand);
}

export function deactivate() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}
