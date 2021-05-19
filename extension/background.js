//#region contentScript

function injectContentScript() {
	//Search the tabs
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		const target = tabs[0].id;
		//Inject the script on the current tab
		chrome.scripting.executeScript({
			target: { tabId: target },
			files: ["content.js"],
		});
	});
}

//#endregion

//#region message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "updateContext") {
		// updateContextMenus(request.controlsHidden, request.namesHidden);
	} else if (request.type === "injectContent") {
		injectContentScript();
	}
});

//#endregion