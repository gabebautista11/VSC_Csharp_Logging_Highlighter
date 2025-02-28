"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
        highlightWords();
    });
    let onOpen = vscode.workspace.onDidOpenTextDocument(() => {
        highlightWords();
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(onOpen);
}
function deactivate() {
}
vscode.commands.registerCommand('extension.highlightLogging', highlightWords);
function highlightWords() {
    const editor = vscode.window.activeTextEditor;
    if (!editor)
        return;
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
function searchAndAssign(regex, highlightStyle, editor, text) {
    let decorations = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);
        decorations.push({ range });
        editor.setDecorations(highlightStyle, decorations);
    }
}
//# sourceMappingURL=extension.js.map