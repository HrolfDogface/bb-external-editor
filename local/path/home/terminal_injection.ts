export async function main(ns: NS) {

    runTerminalCommand("expr 10e3");
}



/**
 * runTerminalCommand: Runs the given string in the terminal window.
 *
 * @param	{string}	command		A string with the terminal command(s) to run.
 **/
function runTerminalCommand (command) {
	let terminalInput = eval("document").getElementById("terminal-input"), terminalEventHandlerKey = Object.keys(terminalInput)[1];
	terminalInput.value = command;
	terminalInput[terminalEventHandlerKey].onChange({ target: terminalInput });
	setTimeout(function (event) {
		terminalInput.focus();
		terminalInput[terminalEventHandlerKey].onKeyDown({ key: 'Enter', preventDefault: () => 0 });
	}, 0);
};