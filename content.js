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
	const el = document.getElementById("controls");

	el.remove();
}

function unhideNames() {
	const el = document.getElementById("names");

	el.remove();
}

//Listen for message telling it to hide controls
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	//Find what they want to hide and hide it

	if (request.type === "hideControls") {
		hideControls();
		controlsHidden = true;
	} else if (request.type === "hideNames") {
		hideNames();
		namesHidden = true;
	} else if (request.type === "hideBoth") {
		hideControls();
		hideNames();
		controlsHidden = true;
		namesHidden = true;
	} else if (request.type === "unhideControls") {
		unhideControls();
		controlsHidden = false;
	} else if (request.type === "unhideNames") {
		unhideNames();
		namesHidden = false;
	} else if (request.type === "unhideBoth") {
		unhideControls();
		unhideNames();
		controlsHidden = false;
		namesHidden = false;
	}

	//Send success response.
	sendResponse({
		status: "success",
		controlsHidden: controlsHidden,
		namesHidden: namesHidden,
	});
});
