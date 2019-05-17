$(function () {
	let availableTags = ["EcoPayz", "Vouchers", "China", "Kartsiz", "InPay", "GPaySafe", "Bank TR"];

	$("#tags").autocomplete({
		source: availableTags,
	});
});

function search() {
	let text = $("#tags").val();
	let toggle = {
		"EcoPayz": ecoPayzVouchersChina,
		"Vouchers": ecoPayzVouchersChina,
		"China": ecoPayzVouchersChina,
		"Kartsiz": kartsizError,
		"InPay": inPayError,
		"GPaySafe": gpaysafeError,
		"Bank TR": bankTRError,
	};

	wdError(toggle[text]);
};