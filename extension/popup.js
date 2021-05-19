const controls = document.getElementById("controls");
const names = document.getElementById("names");
const both = document.getElementById("both");
let controlsHidden, namesHidden;

chrome.runtime.sendMessage({type: 'injectContent'}, () => {
	//I put the whole thing in the function so that is executes after the content script is loaded.
	
	function showBtns() {
		const btnContainer = document.getElementsByClassName('btn-container')[0];
		const errContainer = document.getElementsByClassName('error-container')[0];

		btnContainer.classList.toggle('hide');
		errContainer.classList.toggle('hide');
	}

	function updateBtns(url) {

		if(url.indexOf('meet.google.com/') >= 0 && url.length >= 35) {
			showBtns();
		}

		//Set the buttons to have the right text.
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


	//Get the controlsHidden and namesHidden varibles from the content script
	//then run update btns
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { type: "query" }, response => {
			controlsHidden = response.controlsHidden;
			namesHidden = response.namesHidden;
			updateBtns(tabs[0].url);
		});
	});

	controls.addEventListener("click", e => {
		e.preventDefault();
		let type;

		//change the type based on the text in the buttons
		//using the text in the buttons as varibles
		//smart right?
		if (controls.innerText === "Unhide Controls") {
			type = "unhideControls";
		} else {
			type = "hideControls";
		}

		//get the current tab
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			//tell it to do the action
			//it could be to hide or unhide
			chrome.tabs.sendMessage(
				tabs[0].id,
				{ type: type },
				function (response) {
					//change the buttons to the oposite of what they were
					if (e.controlsHidden === true &&
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


	//its the same here as for the last one. Its the same code on a different element.
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


	//and again here.
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
});