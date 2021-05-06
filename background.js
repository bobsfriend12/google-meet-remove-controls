const clickHandler = result => {
	let controlsType = "hideControls";
	let namesType = "hideNames";
	let bothType = "hideBoth";

	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { type: "query" }, response => {
			if (response.controlsHidden === true) {
				controlsType = "unhideControls";
			}
			if (response.namesHidden === true) {
				namesType = "unhideNames";
			}
			if (
				response.controlsHidden === true &&
				response.namesHidden === true
			) {
				bothType = "unhideBoth";
			}
		});
	});

	//#region
	if (result.menuItemId === "51") {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ type: controlsType },
					function (response) {}
				);
			}
		);
	} else if (result.menuItemId === "52") {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ type: namesType },
					function (response) {}
				);
			}
		);
	} else if (result.menuItemId === "53") {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ type: bothType },
					function (response) {}
				);
			}
		);
	}
	//#endregion
};

function updateContextMenus(controlsHidden, namesHidden) {
	if (controlsHidden === true && namesHidden === true) {
		chrome.contextMenus.update("51", { title: "Unhide Controls" });
		chrome.contextMenus.update("52", { title: "Unhide Names" });
		chrome.contextMenus.update("53", { title: "Unhide Both" });
	} else if (controlsHidden === true && namesHidden === false) {
		chrome.contextMenus.update("51", { title: "Unhide Controls" });
		chrome.contextMenus.update("52", { title: "Hide Names" });
		chrome.contextMenus.update("53", { title: "Hide Both" });
	} else if (controlsHidden === false && namesHidden === true) {
		chrome.contextMenus.update("51", { title: "Hide Controls" });
		chrome.contextMenus.update("52", { title: "Unhide Names" });
		chrome.contextMenus.update("53", { title: "Hide Both" });
	} else if (controlsHidden === true && namesHidden === false) {
		chrome.contextMenus.update("51", { title: "Hide Controls" });
		chrome.contextMenus.update("52", { title: "Hide Names" });
		chrome.contextMenus.update("53", { title: "Hide Both" });
	}
}

chrome.contextMenus.create({
	title: "Google Meet Remove Controls",
	contexts: ["page"],
	id: "50",
	documentUrlPatterns: ["*://meet.google.com/*"],
});

chrome.contextMenus.create({
	title: "Hide Controls",
	contexts: ["page"],
	id: "51",
	parentId: "50",
});

chrome.contextMenus.create({
	title: "Hide Names",
	contexts: ["page"],
	id: "52",
	parentId: "50",
});

chrome.contextMenus.create({
	title: "Hide Both",
	contexts: ["page"],
	id: "53",
	parentId: "50",
});

chrome.contextMenus.onClicked.addListener(clickHandler);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "updateContext") {
		console.log(request);
		updateContextMenus(request.controlsHidden, request.namesHidden);
	}
});
