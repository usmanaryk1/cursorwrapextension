import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Register the command for right arrow key
    let disposableRight = vscode.commands.registerCommand('extension.wrapCursorRight', () => {
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

    // Register the command for down arrow key
    let disposableDown = vscode.commands.registerCommand('extension.wrapCursorDown', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const cursorPosition = editor.selection.active;
            const lastLine = document.lineAt(document.lineCount - 1);
            const documentEnd = new vscode.Position(document.lineCount - 1, lastLine.text.length);

            // If the cursor is at the last line of the document
            if (cursorPosition.line === document.lineCount - 1 && cursorPosition.isEqual(documentEnd)) {
                // Move to the start of the document
                const startOfDocument = new vscode.Position(0, 0);
                editor.selection = new vscode.Selection(startOfDocument, startOfDocument);
                vscode.window.showInformationMessage('Cursor moved to the start of the document!');
            } else {
                // Otherwise, move the cursor down one line
                vscode.commands.executeCommand('cursorMove', {
                    to: 'down',
                    by: 'line'
                });
            }
        }
    });

    // Register the command for page end key
    let disposableEnd = vscode.commands.registerCommand('extension.wrapCursorEnd', () => {
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
                // Otherwise, move the cursor to the end of the document
                editor.selection = new vscode.Selection(documentEnd, documentEnd);
            }
        }
    });

    context.subscriptions.push(disposableRight, disposableDown, disposableEnd);
}

export function deactivate() {}
