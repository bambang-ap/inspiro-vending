const data = require("./data.json");
const Denomination = require("./denomination");

function machineLogic(money, { snack }) {
	const numberMoney = parseFloat(money);

	const price = data[snack].price;
	const isMoneyEnough = numberMoney > price;

	if (isMoneyEnough) {
		const denom = new Denomination();
		const input = denom.getChange(numberMoney)

		if (input.length <= 0) return console.error(`Harap masukkan uang dengan nominal berikut:\n${denom.currency.join(' / ')}`)

		const changes = denom.getChange(numberMoney - price);
		const digitChanges = changes.map((e) => e.length);
		const minDigit = Math.min(...digitChanges);
		const index = digitChanges.indexOf(minDigit);

		const change = changes[index]

		if (!change) {
			console.error('Pembelian batal, nominal yang anda masukkan tidak valid')
		} else {
			console.log(`Pembelian ${snack} berhasil.\nKembalian anda adalah ${change.reduce((total, cur) => total + cur, 0)}.\nDengan nominal ${change.join(', ')}.`,);
		}
	} else {
		return console.error("Maaf, uang anda tidak cukup");
	}
}

module.exports = machineLogic