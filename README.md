# Cursor Wrap Extension

This extension wraps the cursor back to the start of the document when the cursor reaches the end while moving to the right.

## Features

- Moves the cursor to the start of the document when the right arrow key is pressed and the cursor is at the end of the document.

## How to Use

Install the extension and start typing in any document. When the cursor reaches the end of the document, it will wrap back to the beginning.

code --install-extension cursorwrapextension-0.0.1.vsix

##Steps to make extention
No worries! Let’s walk through the process step-by-step, keeping it simple. Here's how to create a VSCode extension that wraps the cursor to the start when it reaches the end of the document.

Step 1: Install Necessary Tools
Install Node.js:

Go to Node.js official site and download the LTS version.
Follow the installation steps for your operating system.
Install Yeoman and Generator for VSCode Extensions:
Once Node.js is installed, you can install the necessary tools via your terminal/command prompt:

Open a terminal/command prompt.
Run:
npm install -g yo generator-code
This will install Yeoman (yo) and the generator (generator-code) to help create a VSCode extension.

Step 2: Create a Folder for Your Extension
Create a New Folder:

Open a terminal/command prompt.
Run the following to create and move into a new folder (replace the path if you want to use a different directory):

mkdir D:\VSCodeExtensions\CursorWrapExtension
cd D:\VSCodeExtensions\CursorWrapExtension
Open VSCode in This Folder:

Now that you're in the folder, open VSCode by running:

code .
VSCode will launch with this folder as the workspace.

Step 3: Generate the Extension
Run Yeoman to Scaffold the Extension:

In your terminal (inside VSCode or externally), run:

yo code
Answer the Prompts:
Select New Extension (TypeScript).
Provide a name (e.g., CursorWrapExtension).
Follow the rest of the prompts, leaving most options as default or setting them as per your preference.
Yeoman will generate all the necessary files and folders for your extension.

Step 4: Modify the Extension Code
Open the Main Extension File:

Navigate to the src folder and open extension.ts.
Replace the Contents:
Replace the contents of extension.ts with the following code. This code will handle moving the cursor back to the start of the document when it reaches the end:

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
Save the File:

Press Ctrl + S to save the file.

Step 5: Add a Keybinding to Trigger the Command
Open package.json:

In the root of your project, find and open the package.json file.
Add the Keybinding:
Inside the package.json file, add the following lines under the "contributes" section to bind the right arrow key (right) to your command:

json
Copy code
"contributes": {
    "commands": [
        {
            "command": "extension.wrapCursor",
            "title": "Wrap Cursor to Start"
        }
    ],
    "keybindings": [
        {
            "command": "extension.wrapCursor",
            "key": "right",
            "when": "editorTextFocus"
        }
    ]
}
Save the File:

Again, press Ctrl + S to save your changes.

Step 6: Test Your Extension
Run the Extension:
Press F5 in VSCode. This will open a new VSCode window with your extension loaded.
In the new window, open any text file and start pressing the right arrow key. The cursor will wrap to the beginning of the document when it reaches the end.

Step 7: Package and Install the Extension Locally (Optional)
Install vsce:

If you want to package and install your extension locally (instead of running it via F5), install vsce:

npm install -g vsce
Package Your Extension:
Run this command in your extension’s root folder:


vsce package
This will create a .vsix file.

Install the Extension Locally:
Use the generated .vsix file to install the extension:

code --install-extension your-extension-name.vsix
Restart VSCode, and your extension will be ready for use.

