if (typeof(HYC) === 'undefined') var HYC = {};

HYC.router = {
    rr: null,

    init: function(){
        HYC.router.rr = new RouteRecognizer();
    }
};