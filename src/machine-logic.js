const fs = require("fs");
const Denomination = require("./denomination");

function showStocks() {
	const data = require("./data.json");
	console.log("List produk:\n")

	Object.entries(data).forEach(([item, { price, stock }]) => console.log(`- ${item}\nHarga: ${price} - Stok: ${stock}`))

	console.log("\n\n")
}

function machineLogic(money, { snack }) {
	showStocks()

	if (!money) return console.error("Harap masukkan uang.")

	let data = require("./data.json");
	const { price, stock } = data[snack]
	const numberMoney = parseFloat(money);
	const isMoneyEnough = numberMoney > price;

	if (stock <= 0) return console.log("Maaf, stok ${snack} habis. Silahkan pilih produk lain.")

	if (!isMoneyEnough) return console.error("Maaf, uang anda tidak cukup");



	const denom = new Denomination();
	const input = denom.getChange(numberMoney)

	if (input.length <= 0) {
		return console.error(`Harap masukkan uang dengan nominal berikut:\n${denom.currency.join(' / ')}`)
	}

	const changes = denom.getChange(numberMoney - price);
	const digitChanges = changes.map((e) => e.length);
	const minDigit = Math.min(...digitChanges);
	const index = digitChanges.indexOf(minDigit);

	const change = changes[index]

	if (!change) {
		return console.error('Pembelian batal, nominal yang anda masukkan tidak valid')
	}

	data[snack].stock -= 1


	fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data))
	return console.log(`Pembelian ${snack} berhasil.\nKembalian anda adalah ${change.reduce((total, cur) => total + cur, 0)}.\nDengan nominal ${change.join(', ')}.\n\n`,);
}

module.exports = machineLogic