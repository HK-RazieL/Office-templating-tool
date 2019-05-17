function emailTemplate(inputText, output, format) {
	let input = "" + inputText;
	let template;

	let merchantRefRegex;

	let transactionId = (/(Details\\n)(\d+)/g).exec(input);

	let amount = (/\d+\.\d{2}/gm).exec(input);

	let currencyRegex = (/([A-Z]{3})/g).exec(input);
	let currency = currencyRegex[0];

	//let dates = (/(?:(\d{2}.(?:\d{2}|\w{3}).\d{4}\s{1}\d{2}:\d{2})|((?:\d{2}|\w{3}).\d{2}.\d{4}\s{1}\d{2}:\d{2}))/g).exec(input);
	let allDates = input.match(/(\d{2}.\d{2}.\d{4}\s{1}\d{2}:\d{2})/g);
	let specifficDate = allDates[allDates.length - 1];

	let paymentMethodRegex = (/(transaction|Completed)\\n([^\\]*)/g).exec(input);
	let paymentMethod = paymentMethodRegex[2];

	let error = (/(Error in transaction\\u0009)([^\\]*)/gm).exec(input);

	let merchantUsernameRegex;
	let merchantUsername;

	if (format === "WDError") {
		merchantUsernameRegex = (/(\d{2}:\d{2}[\\n]+)(\s*?\d*?\s*?)([\d]{6,})/g).exec(input);
		merchantUsername = merchantUsernameRegex[3];

		merchantRefRegex = input.match(/([\d]{5,})/g);
		merchantRef = merchantRefRegex[0]
	} else if (format === "MissingWD") {
		merchantUsernameRegex = (/\d{5,}/g).exec(input);
		merchantUsername = merchantUsernameRegex[0];

		merchantRefRegex = (/(Processed on\\u0009\\n \\n)(\d+)/g).exec(input);
		merchantRef = merchantRefRegex[2]
	}

	let subject = $("#subject");
	let contacts = $("#contact");

	switch (paymentMethod) {
		case "Astropay Cashout":
			let bankCode = input.match(/Bank Code: \d*/g);
			let branchAccount = input.match(/Bank Branch: \d*/g);
			let bankAccount = input.match(/Bank Account: \d*-*\d*/g);
			let accountType = input.match(/Account Type: \w/g);
			let CPF = (/CPF:\s*\d*/g).exec(input);
			contacts.val("payouts@astropay.com");
			subject.val(`${paymentMethod} WD Error ${merchantUsername} / ${merchantRef}`);
			template = `Hello,\n\nCould you please check the case as we encountered an issue: \"${error[2]}\"\n\nMerchant Reference: ${merchantRef}
Transaction ID : ${transactionId[2]}\nAmount : ${amount[0]} ${currency}\nDate : ${specifficDate}\n${bankCode}\n${branchAccount}
${bankAccount}\n${accountType}\n${CPF}\n\nCould you please confirm the status of the transaction on your end?\n
Best Regards,\nTempobet Team`;
			break;
		case "SD pay":
			let sdPayId = input.match(/(sdpay_id:\\u0009\d+)/gm);
			let sdPayIdFormatted = sdPayId[0].match(/\d+/g);
			let sdPayIdSliced = sdPayIdFormatted[0].substr(sdPayIdFormatted.length - 9);
			contacts.val("martina@tempobet.org, gergana@tempobet.email");
			subject.val(`${paymentMethod} WD Error ${merchantUsername} / ${merchantRef}`);
			template = `Hello,\n\nCould you please check the case as we encountered an issue: \"${error[2]}\"\n\nThe details are:\n
Merchant Reference: ${merchantRef}\nTransaction ID: ${transactionId[2]}\nSD Pay ID: ${sdPayIdSliced}\nAmount: ${amount[0]} ${currency}
Date: ${specifficDate}\n\nBest Regards,\nTempobet Team`;
			break;
		case "Gpaysafe":
			let GPaySafeTransactionId = (/transactionId:\\u([^"]*)/g).exec(input);
			let GPaySafeRefID = input.match(/(W[\d]+)/g);
			contacts.val("support@gpaysafe.com");
			if (format === "WDError") {
				subject.val(`${paymentMethod} WD Error ${merchantUsername} / ${merchantRef}`);
				template = `Hello,\n\nCould you please check the case as we encountered an issue: \"${error[2]}\"\n\nMerchant Reference: ${merchantRef}
Transaction ID: ${GPaySafeTransactionId[1]}\nReference ID: ${GPaySafeRefID[0]}\nAmount: ${amount[0]} ${currency}\nDate: ${specifficDate}\n\nBest Regards,\nTempobet Team`;
			} else if (format === "MissingWD") {
				subject.val(`Missing ${paymentMethod} WD ${merchantUsername} / ${merchantRef}`);
				template = `Hello,\n\nPlease check the transaction below as we received an complaint that the withdrawal is missing.\n\nMerchant Reference: ${merchantRef}
Transaction ID: ${GPaySafeTransactionId[1]}\nReference ID: ${GPaySafeRefID[0]}\nAmount: ${amount[0]} ${currency}\nDate: ${specifficDate}\n\nBest Regards,\nTempobet Team`;
			}
			break;
		case "GP Papara":
			let GPPaparaRefID = input.match(/(W[\d]+)/g);
			let paparaAccountId = input.match(/(Papara Acount Id: \d+)/g);
			contacts.val("techsupport@jeton.com");
			subject.val(`${paymentMethod} WD Error ${merchantUsername} / ${merchantRef}`);
			template = `Hello,/n/nCould you please check the case as we encountered an issue: \"${error[2]}\"\n\nMerchant Reference: ${merchantRef}
Transaction Id: ${transactionId[2]}\nReference ID: ${GPPaparaRefID[0]}\n${paparaAccountId}\nAmount: ${amount[0]} ${currency}\nDate: ${specifficDate}\n
Best Regards,\nTempobet Team`;
			break;
		case "Jeton Wallet":
			let accountNumber = (/(Acount Number: )(\d+)/g).exec(input);
			contacts.val("techsupport@jeton.com");
			subject.val(`${paymentMethod} WD Error ${merchantUsername} / ${merchantRef}`);
			template = `Hello,\n\nCould you please check the case as we encountered an issue: \"${error[2]}\"\n\nMerchant Reference: ${merchantRef}
Account ID: ${accountNumber[2]}\nAmount: ${amount[0]} ${currency}\nDate: ${specifficDate}\n\nBest Regards,\nTempobet Team`;
			break;
		case "ecoPayz":
			let ecoPayzAccountNumber = (/(Acount Number: )(\d+)/g).exec(input);
			contacts.val("support@ecopayz.com");
			subject.val(`${paymentMethod} WD Error ${merchantUsername} / ${merchantRef}`);
			template = `Hello\n\nCould you please check the case as we encountered an issue: \"${error[2]}\"\n\nEcopayz account: ${ecoPayzAccountNumber[2]}
Date: ${specifficDate}\nMerchant Reference: ${merchantRef}\nTransaction ID: ${transactionId[2]}\nAmount: ${amount[0]} ${currency}\n
Best Regards,\nTempobet Team`;
			break;
		default:
			template = "Please make sure this is a valid data."
			break;
	}

	output.value = template;
}

function hexdigit(v) {
	symbs = "0123456789ABCDEF";
	return symbs.charAt(v & 0x0f);
}

function hexval(v) {
	return hexdigit(v >>> 12) + hexdigit(v >>> 8) + hexdigit(v >>> 4) + hexdigit(v);
}

function uni2j(val) {
	if (val == 10) return "\\n"
	else if (val == 13) return "\\r"
	else if (val == 92) return "\\\\"
	else if (val == 34) return "\\\""
	else if (val < 32 || val > 126) return "\\u" + hexval(val)
	else return String.fromCharCode(val);
}

function uni2java(uni) {
	lit = '"';
	for (i = 0; i < uni.length; i++) {
		v = uni.charCodeAt(i);
		lit = lit + uni2j(v);
	}

	return lit + '"';
}

function inchange() {
	return uni2java(document.getElementById("inputBox").value);
}


function addToTable(inputText) {
	let inputForTable = "" + inputText;

	let merchantRefRegex = (/([\d]+)/g);
	let merchantRef = merchantRefRegex.exec(inputForTable);

	let amount = inputForTable.match(/(amount' => ')(\d+)/gm);
	let numberString = amount[0].match(/(\d+)/g);
	let formattedNumber = numberString[0].slice(0, numberString[0].length - 2) + "." + numberString[0].slice(numberString[0].length - 2);

	let refID = inputForTable.match(/(W[\d]+)/g);

	let allDates = inputForTable.match(/(\d{2}.\d{2}.\d{4}\s{1}\d{2}:\d{2})/g);
	let specifficDate = allDates[allDates.length - 1];

	let error = inputForTable.match(/(message' => '[a-zA-Z]+)/g);
	let errorFormatted = error[0].slice(13);

	let table = document.getElementById("myTable");
	let row = table.insertRow(-1)
	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);
	let cell3 = row.insertCell(2);
	let cell4 = row.insertCell(3);

	cell1.innerHTML = `${merchantRef[0]}`;
	cell2.innerHTML = `${refID[0]}`;
	cell3.innerHTML = `${formattedNumber}`;
	cell4.innerHTML = `${specifficDate}`;
}

function deleteFromTable() {
	let table = document.getElementById("myTable");
	let count = table.rows.length;

	if (table.rows.length > 1) {
		table.deleteRow(count - 1);
	}
}

function fnExcelReport() {
	var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
	var textRange;
	var j = 0;
	tab = document.getElementById("myTable"); // id of table

	for (j = 0; j < tab.rows.length; j++) {
		tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
		//tab_text=tab_text+"</tr>";
	}

	tab_text = tab_text + "</table>";
	tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
	tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
	tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // removes input params

	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");

	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
	{
		txtArea1.document.open("txt/html", "replace");
		txtArea1.document.write(tab_text);
		txtArea1.document.close();
		txtArea1.focus();
		sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.ods");
	} else //other browser not tested on IE 11
		sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

	return (sa);
}