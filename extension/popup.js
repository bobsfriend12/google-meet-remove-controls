const controls = document.getElementById("controls");
const names = document.getElementById("names");
const both = document.getElementById("both");
let controlsHidden, namesHidden;

chrome.runtime.sendMessage({type: 'injectContent'}, () => {});

function updateBtns() {
	if (controlsHidden === true && namesHidden === true) {
		controls.innerText = "Unhide Controls";
		names.innerText = "Unhide Names";
		both.innerText = "Unhide Both";
	} else if (controlsHidden === true && namesHidden === false) {
		controls.innerText = "Unhide Controls";
	} else if (controlsHidden === false && namesHidden === true) {
		names.innerText = "Unhide Names";
	}
}

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
	chrome.tabs.sendMessage(tabs[0].id, { type: "query" }, response => {
		controlsHidden = response.controlsHidden;
		namesHidden = response.namesHidden;
		updateBtns();
	});
});

controls.addEventListener("click", e => {
	e.preventDefault();
	let type;

	if (controls.innerText === "Unhide Controls") {
		type = "unhideControls";
	} else {
		type = "hideControls";
	}

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{ type: type },
			function (response) {
				if (
					response.controlsHidden === true &&
					response.namesHidden === true
				) {
					controls.innerText = "Unhide Controls";
					names.innerText = "Unhide Names";
					both.innerText = "Unhide Both";

					chrome.storage.sync.set;

					return;
				} else if (
					response.controlsHidden === true &&
					response.namesHidden === false
				) {
					controls.innerText = "Unhide Controls";
					names.innerText = "Hide Names";
					both.innerText = "Hide Both";
					return;
				} else if (
					response.controlsHidden === false &&
					response.namesHidden === true
				) {
					controls.innerText = "Hide Controls";
					names.innerText = "Unhide Names";
					both.innerText = "Hide Both";
					return;
				} else if (
					response.controlsHidden === false &&
					response.namesHidden === false
				) {
					controls.innerText = "Hide Controls";
					names.innerText = "Hide Names";
					both.innerText = "Hide Both";
					return;
				}
			}
		);
	});
});

names.addEventListener("click", e => {
	e.preventDefault();
	let type;

	if (names.innerText === "Unhide Names") {
		type = "unhideNames";
	} else {
		type = "hideNames";
	}

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{ type: type },
			function (response) {
				if (
					response.controlsHidden === true &&
					response.namesHidden === true
				) {
					controls.innerText = "Unhide Controls";
					names.innerText = "Unhide Names";
					both.innerText = "Unhide Both";
					return;
				} else if (
					response.controlsHidden === true &&
					response.namesHidden === false
				) {
					controls.innerText = "Unhide Controls";
					names.innerText = "Hide Names";
					both.innerText = "Hide Both";
					return;
				} else if (
					response.controlsHidden === false &&
					response.namesHidden === true
				) {
					controls.innerText = "Hide Controls";
					names.innerText = "Unhide Names";
					both.innerText = "Hide Both";
					return;
				} else if (
					response.controlsHidden === false &&
					response.namesHidden === false
				) {
					controls.innerText = "Hide Controls";
					names.innerText = "Hide Names";
					both.innerText = "Hide Both";
					return;
				}
			}
		);
	});
});

both.addEventListener("click", e => {
	e.preventDefault();
	let type;

	if (both.innerText === "Unhide Both") {
		type = "unhideBoth";
	} else {
		type = "hideBoth";
	}

	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{ type: type },
			function (response) {
				if (
					response.controlsHidden === true &&
					response.namesHidden === true
				) {
					controls.innerText = "Unhide Controls";
					names.innerText = "Unhide Names";
					both.innerText = "Unhide Both";
					return;
				} else if (
					response.controlsHidden === true &&
					response.namesHidden === false
				) {
					controls.innerText = "Unhide Controls";
					names.innerText = "Hide Names";
					both.innerText = "Hide Both";
					return;
				} else if (
					response.controlsHidden === false &&
					response.namesHidden === true
				) {
					controls.innerText = "Hide Controls";
					names.innerText = "Unhide Names";
					both.innerText = "Hide Both";
					return;
				} else if (
					response.controlsHidden === false &&
					response.namesHidden === false
				) {
					controls.innerText = "Hide Controls";
					names.innerText = "Hide Names";
					both.innerText = "Hide Both";
					return;
				}
			}
		);
	});
});
