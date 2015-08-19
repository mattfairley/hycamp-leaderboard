//Takes an array, a property, and an optional boolean for ascending and sorts numerically

HYC.sort = function(array, prop, desc) {
	array.sort(function(a,b){
		if (a[prop] > b[prop]) {
			return 1;
		} else if (a[prop] < b[prop]) {
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