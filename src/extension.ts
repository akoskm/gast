// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "gast" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("gast.dependabot", () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (workspaceFolders) {
      const rootPath = workspaceFolders[0].uri.fsPath;
      const githubFolderPath = path.join(rootPath, ".github");

      if (!fs.existsSync(githubFolderPath)) {
        fs.mkdirSync(githubFolderPath);
      }

      const autoMergePath = path.join(
        context.extensionPath,
        "src",
        "dependabot",
        "auto-merge.yml",
      );
      const autoMergeContent = fs.readFileSync(autoMergePath, "utf8");

      const dependabotFolderPath = path.join(
        context.extensionPath,
        "src",
        "dependabot",
        "dependabot.yml",
      );
      const dependabotContent = fs.readFileSync(dependabotFolderPath, "utf8");

      const files = [
        { name: "auto-merge.yml", content: autoMergeContent },
        { name: "dependabot.yml", content: dependabotContent },
      ];

      files.forEach((file) => {
        const filePath = path.join(githubFolderPath, file.name);

        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, file.content);
        }
      });

      vscode.window.showInformationMessage(
        "Dependabot workflow files created!",
      );
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}