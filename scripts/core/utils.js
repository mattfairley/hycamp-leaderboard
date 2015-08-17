//Takes an array, a property, and an optional boolean for ascending and sorts numerically

HYC.numSort = function(array, prop, desc) {
	array.sort(function(a,b){
		if (Number(a[prop]) > Number(b[prop])) {
			return 1;
		} else if (Number(a[prop]) < Number(b[prop])) {
			return -1;
		} else {
			return 0;
		}
	});
	if (desc) {
		array.reverse();
	}
	return array;
};