if (typeof(HYC) === 'undefined') var HYC = {};

HYC.hasClass = function(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

HYC.addClass = function(ele, cls) {
    if (!HYC.hasClass(ele, cls)) ele.className += " " + cls;
}

HYC.removeClass = function(ele, cls) {
    if (HYC.hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}