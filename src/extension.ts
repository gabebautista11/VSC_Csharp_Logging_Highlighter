// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext){
	  
	  let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
        highlightWords();
    });
	let onOpen = vscode.workspace.onDidOpenTextDocument(() => {
		highlightWords();
	});
	
    context.subscriptions.push(disposable);
	context.subscriptions.push(onOpen);
	
}


export function deactivate() {
  
}


vscode.commands.registerCommand('extension.highlightLogging', highlightWords);



function highlightWords() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return;

	const text = editor.document.getText();
	const traceRegex = /\[VRB\]/mg;
	const debugRegex = /\[DBG\]/mg;
	const infoRegex = /\[INF\]/mg;
	const warningRegex = /\[WRN\]/mg;
	const errorRegex = /\[ERR\]/mg;
	const criticalRegex = /\[FTL\]/mg; 

	const traceStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: '#808080',

	});
	const debugStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: '#008000',

	});

	const infoStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: '#808080',
		color: "black"

	});
	const warningStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: '#ece63d',
		color: "black",

	});

	const errorStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: "#cc0202",
		color: "white"
	});
	const criticalStyle = vscode.window.createTextEditorDecorationType({
		backgroundColor: '#000000',
		color: "white"

	});


	searchAndAssign(traceRegex, traceStyle, editor, text);
	searchAndAssign(debugRegex, debugStyle, editor, text);
	searchAndAssign(infoRegex, infoStyle, editor, text);
	searchAndAssign(warningRegex, warningStyle, editor, text);
	searchAndAssign(errorRegex, errorStyle, editor, text);
	searchAndAssign(criticalRegex, criticalStyle, editor, text);

}


function searchAndAssign(regex: RegExp, highlightStyle: vscode.TextEditorDecorationType, editor: vscode.TextEditor, text: string) {

	let decorations: vscode.DecorationOptions[] = [];
	let match;
	while ((match = regex.exec(text)) !== null) {
		const startPos = editor.document.positionAt(match.index);
		const endPos = editor.document.positionAt(match.index + match[0].length);
		const range = new vscode.Range(startPos, endPos);
		decorations.push({ range });

		editor.setDecorations(highlightStyle, decorations);
	}

}