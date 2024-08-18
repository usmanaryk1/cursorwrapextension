import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register the command
    let disposable = vscode.commands.registerCommand('extension.wrapCursor', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const cursorPosition = editor.selection.active;
            const documentEnd = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);

            // If the cursor is at the end of the document
            if (cursorPosition.isEqual(documentEnd)) {
                // Move to the start of the document
                const startOfDocument = new vscode.Position(0, 0);
                editor.selection = new vscode.Selection(startOfDocument, startOfDocument);
                vscode.window.showInformationMessage('Cursor moved to the start of the document!');
            } else {
                // Otherwise, move the cursor to the next character
                vscode.commands.executeCommand('cursorMove', {
                    to: 'right',
                    by: 'character'
                });
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
