function copyToClipboard() {
	let current = event.currentTarget;
	current.select();
	document.execCommand("copy");

	var tooltip = $(".copyTooltip");
	for (let tp of tooltip) {
		tp.innerHTML = "Copied!";
	};
}

function outFunc() {
	var tooltip = $(".copyTooltip");
	for (let tp of tooltip) {
		tp.innerHTML = "Click to Copy";
	};
}