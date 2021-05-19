//wrap the whole script in a function so that it stays isolated
//from other injected content scripts
(function(){
//#region Functions

let controlsHidden = false;
let namesHidden = false;

//Create a function that removes the controls from the
function hideControls() {
	if (document.getElementById("controls")) {
		return;
	}

	// Create our stylesheet
	var style = document.createElement("style");
	style.innerHTML = ".Jrb8ue,.rG0ybd,.LCXT6{display: none !important;}";

	style.setAttribute("id", "controls");

	// Get the first script tag
	var ref = document.querySelector("script");

	// Insert our new styles before the first script tag
	ref.parentNode.insertBefore(style, ref);
}

function hideNames() {
	if (document.getElementById("names")) {
		return;
	}

	// Create our stylesheet
	var style = document.createElement("style");
	style.innerHTML = ".epqixc, .t4ocwe,.gtgjre {display: none !important;}";

	style.setAttribute("id", "names");

	// Get the first script tag
	var ref = document.querySelector("script");

	// Insert our new styles before the first script tag
	ref.parentNode.insertBefore(style, ref);
}

function unhideControls() {
	//get the controls style tag
	const el = document.getElementById("controls");
	//remove it
	el.remove();
}

function unhideNames() {
	//same here as in the last one
	const el = document.getElementById("names");

	el.remove();
}

//#endregion

//Listen for message telling it to hide controls
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	//Find what they want to hide and hide it

	switch(request.type) {
		case 'hideControls':
			hideControls();
			controlsHidden = true;
			break;
		case 'hideNames':
			hideNames();
			namesHidden = true;
			break;
		case 'hideBoth':
			hideControls();
			hideNames();
			controlsHidden = true;
			namesHidden = true;
			break;
		case 'unhideControls':
			unhideControls();
			controlsHidden = false;
			break;
		case 'unhideNames':
			unhideNames();
			namesHidden = false;
			break;
		case 'unhideBoth':
			unhideControls();
			unhideNames();
			controlsHidden = false;
			namesHidden = false;
			break;
	}

	//tell the background script to update the context menus
	//This is for future features, and don't want to remove it.
	// chrome.runtime.sendMessage(
	// 	{
	// 		type: "updateContext",
	// 		controlsHidden: controlsHidden,
	// 		namesHidden: namesHidden,
	// 	},
	// 	function (response) {}
	// );

	//Send success response.
	sendResponse({
		status: "success",
		controlsHidden: controlsHidden,
		namesHidden: namesHidden,
	});
});

//end the wrapping function
})(); // <- invoke the function (with the last 2 parenthesis.)
