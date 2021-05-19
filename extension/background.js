//#region contentScript

function injectContentScript() {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		console.log(tabs[0].id);

		const target = tabs[0].id;
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

// chrome.action.onClicked.addListener(() => {
// 	console.log('action clicked');
// 	injectContentScript();
// });

//#endregion