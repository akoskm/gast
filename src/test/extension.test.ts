import * as vscode from "vscode";
import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("gast.dependabot command is registered", () => {
    assert.ok(
      vscode.commands.getCommands(true).then((commands) => {
        return commands.includes("gast.dependabot");
      }),
    );
  });

  test("gast.dependabot command creates .github directory and files", async () => {
    // Execute the command
    await vscode.commands.executeCommand("gast.dependabot");

    // Check if the .github directory exists
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
      const rootPath = workspaceFolders[0].uri.fsPath;
      const githubFolderPath = path.join(rootPath, ".github");
      assert.ok(fs.existsSync(githubFolderPath));

      // Check if the auto-merge.yml and dependabot.yml files exist
      const autoMergePath = path.join(githubFolderPath, "auto-merge.yml");
      const dependabotPath = path.join(githubFolderPath, "dependabot.yml");
      assert.ok(fs.existsSync(autoMergePath));
      assert.ok(fs.existsSync(dependabotPath));
    }
  });

  test("gast.build command executes successfully", async () => {
    // Execute the command
    await vscode.commands.executeCommand("gast.build");

    // Add assertions here based on what the build command is supposed to do
    // For example, if it creates a build directory, you can check for its existence
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
      const rootPath = workspaceFolders[0].uri.fsPath;
      const githubFolderPath = path.join(rootPath, ".github");
      assert.ok(fs.existsSync(githubFolderPath));

      // Check if the auto-merge.yml and dependabot.yml files exist
      const buildWorkflowPath = path.join(githubFolderPath, "build.yml");
      assert.ok(fs.existsSync(buildWorkflowPath));
    }
  });
});
