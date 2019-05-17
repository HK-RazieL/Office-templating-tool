function toggleWDs(button) {
	let turkey = document.getElementById("turkey").classList.contains("ui-accordion-header-active");
	let brazil = document.getElementById("brazil").classList.contains("ui-accordion-header-active");
	let china = document.getElementById("china").classList.contains("ui-accordion-header-active");
	let currentCountryDeposits;
	let currentCountryWithdrawals;
	let withdrawals = {};
	if (turkey) {
		currentCountryDeposits = "turkishDepositMethods";
		currentCountryWithdrawals = "turkishWithdrawalMethods";

		withdrawals = {
			"BankTransfer": ["BankTransfer", "GPPapara*", "Bitcoins"],
			"Vouchers": ["BankTransfer", "GPPapara", "Voucher", "Bitcoins"],
			"E-Wallets": ["E-wallet", "Bitcoins"],
			"GPPapara": ["BankTransfer", "GPPapara", "Bitcoins"],
			"Bitcoins": ["BankTransfer", "GPPapara", "Voucher", "Bitcoins"],
			"CEPDeposits": ["BankTransfer", "GPPapara"],
			"QR": ["BankTransfer", "GPPapara", "E-wallet", "Voucher"],
		}
	} else if (brazil) {
		currentCountryDeposits = "brazilDepositMethods";
		currentCountryWithdrawals = "brazilWithdrawalMethods";

		withdrawals = {
			"AstroPayDirect": ["AstroPayCashOut", "Voucher"],
			"vCreditos": ["AstroPayCashOut", "vCreditos"],
			"EcoPayz": ["EcoPayz"],
			"Vouchers": ["AstroPayCashOut", "Voucher"],
		}
	} else if (china) {
		currentCountryDeposits = "chineseDepositMethods";
		currentCountryWithdrawals = "chineseWithdrawalMethods";

		withdrawals = {
			"SDPay": ["SDPay"],
			"E-Wallets": ["EcoPayz"],
			"Vouchers": ["SDPay", "Voucher", "Bitcoins"],
		}
	}

	let buttonTxt = button.innerText.split(" ").join("");
	if (buttonTxt in withdrawals) {
		let wds = document.getElementById(currentCountryWithdrawals).getElementsByTagName("button");
		let dps = document.getElementById(currentCountryDeposits).getElementsByTagName("button");
		let allowedMethodsForWD = withdrawals[buttonTxt];

		resettingButtonOpacity();

		for (let i = 0; i < dps.length; i++) {
			if (i < wds.length) {
				if (allowedMethodsForWD.indexOf(wds[i].innerText.split(" ").join("")) < 0) {
					wds[i].style.opacity = "0.3";

				}
			}
			if (dps[i].innerText.split(" ").join("") !== buttonTxt) {
				dps[i].style.opacity = "0.3";
			}
		}

		function resettingButtonOpacity() {
			for (let i = 0; i < dps.length; i++) {
				if (i < wds.length) {
					wds[i].style.opacity = "1";
				}
				dps[i].style.opacity = "1";
			}
		}
	}
}

/*---------------- Accordion ----------------*/
(() => {
	$(function () {
		$("#accordion").accordion({
			heightStyle: "content",
			collapsible: true,
			active: false,
		});
	});
})();