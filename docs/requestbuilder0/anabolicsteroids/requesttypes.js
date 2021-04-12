module.exports = () => {

    return {

        ccards: {
            "paymentcc":"Payment",
            "authorizecc":"Authorize",
            "capturecc":"Capture",
            "chargecc":"Charge",
            "creditcc":"Credit",
            "voidcc":"Void",
            "refundcc":"Refund",
            "tokencc":"Token"
        },
        dredirect: {
            "paymentdr":"Payment",
            "chargedr":"Charge"
        },
        cash: {
            "paymentcash":"Payment",
            "chargecash":"Charge"
        },
        banktransfer: {
            "paymentbanktransfer":"Payment",
            "authorizebt":"Authorize",
            "chargebt":"Charge",
            "capturebt":"Capture",
            "refundbt":"Refund"
        },
        ewallet: {
            "paymentewallet":"Payment",
            "authorizewallet":"Authorize",
            "capturewallet":"Capture",
            "chargewallet":"Charge",
            "voidwallet":"Void",
            "refundwallet":"Refund",
            "tokenwallet":"Token"
        },
        loyalty: {
            "paymentloyalty":"Payment",
            "authorizeloyalty":"Authorize",
            "captureloyalty":"Capture",
            "chargeloyalty":"Charge",
            "refundloyalty":"Refund",
        },
        paymentpage: {
            "paymentpaymentpage":"Payment",
            // "authorizepaymentpage":"Authorize",
            // "capturepaymentpage":"Capture",
            "chargepaymentpage":"Charge",
            "refundpaymentpage":"Refund",
            "voidpaymentpage":"Void"
        }

    }

}