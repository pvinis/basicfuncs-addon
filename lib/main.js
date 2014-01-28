console.log("basicfuncs started");
var {Hotkey} = require("sdk/hotkeys");
var selection;
var tabs;
var sp;
var loaded = false;

var searchHighlightedTextHotkey = Hotkey({
	combo: "control-shift-s",
	onPress: function() {
		console.log("searchHighlightedText hotkey pressed");
		searchHighlightedText();
	}
});

var sendUrlToMailHotkey = Hotkey({
	combo: "control-shift-a",
	onPress: function() {
		console.log("sendUrlToMail hotkey pressed");
		sendUrlToMail();
	}
});

function searchHighlightedText() {
	if (!loaded) {
		console.log("loading modules")
		selection = require("sdk/selection");
		tabs = require("sdk/tabs");
		sp = require("sdk/simple-prefs");
		loaded = true;
	}
	if (selection.text) {
		console.log("searching for \"" + selection.text + "\"");
		if (sp.prefs['newtab']) {
			tabs.open({
				url: "http://google.com/search?q=" + selection.text,
				inBackground: sp.prefs['bgtab']
			});
		} else {
			tabs.activeTab.url = "http://google.com/search?q=" + selection.text;
		}
	}
}

function sendUrlToMail() {
	if (!loaded) {
		console.log("loading modules")
		selection = require("sdk/selection");
		tabs = require("sdk/tabs");
		sp = require("sdk/simple-prefs");
		loaded = true;
	}
	if (sp.prefs['email'] == "someone@example.com") {
		var panel = require("sdk/panel").Panel({
			width: 180,
			height: 180,
			contentURL: require("sdk/self").data.url("email-panel.html"),
			onHide: function() {
				tabs.open("about:addons")
			}
		});
		panel.show();
	} else {
		url = tabs.activeTab.url
		tabs.open("mailto:" + sp.prefs['email'] + "?subject=Sent from Firefox&body=" + url);
	}
}
