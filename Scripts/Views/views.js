$(document).ready(() => {
	$("#withdrawals .depositMethods button").on("click", (a) => {
		toggleWDs(event.currentTarget);
	});
});

function home() {
	$(".toggleable").slideUp(100);
}

/*---------------- General Toggle ----------------*/
function toggleInfo(window) {
	$(".toggleable").slideUp(100);
	$(window).delay(100).slideToggle(100);

	let buttons = document.getElementsByClassName("menumybtn");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].removeAttribute("disabled");
	}

	let button = event.currentTarget;
	button.setAttribute("disabled", "disabled");
}

/*---------------- Errors Toggle ----------------*/
function wdError(method) {
	$(".toggleable").slideUp(100);
	$(".wdErrors").slideUp(100);
	$(method).delay(100).slideToggle(100);
	$("#wdErrorProc").slideDown(100);

}