/*
 * CryptoJS HMAC-SHA256
 * (if you're using modular CryptoJS)
 */

// Assuming you already have CryptoJS core loaded
(function (root, factory) {
    if (typeof exports === "object") {
        // Node/CommonJS
        module.exports = factory(require("./core"), require("./sha256"));
    } else if (typeof define === "function" && define.amd) {
        // AMD
        define(["./core", "./sha256"], factory);
    } else {
        // Global browser
        root.CryptoJS = factory(root.CryptoJS);
    }
}(this, function (CryptoJS) {
    (function () {
        var C = CryptoJS;
        var HMAC = C.algo.HMAC;

        C.HmacSHA256 = function (message, key) {
            return HMAC.create(C.algo.SHA256, key).finalize(message);
        };
    }());

    return CryptoJS;
}));