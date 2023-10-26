
class Denomination {
	currency = [2000, 5000, 10000, 20000, 50000];

	getChange = (amount) => {
		return this._getChange(amount, this.currency, [[]]);
	};

	_getChange = (amount, currency, result) => {
		if (amount < 0 || currency.length == 0) {
			return [];
		} else if (amount == 0) {
			return result;
		} else {
			let newArr = result.map((e) => [...e, currency[0]]);
			return this._getChange(amount - currency[0], currency, newArr).concat(
				this._getChange(amount, currency.slice(1), result)
			);
		}
	};
}


module.exports = Denomination