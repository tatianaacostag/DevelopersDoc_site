var fs = require('fs');
var stringsGenerator = require('./strings.js')
const requestTypes = Object.freeze({ "token": "Token", "authorize": "Authorize", "capture": "Capture", "charge": "Charge", "refund": "Refund", "void": "Void", "credit": "Credit" });
const features = Object.freeze({ "nocvv": "Transaction Processing without CVV", "threedsone": "3DS 1.0 Internal","threedstwointernal":"3DS 2.0 Internal","threedstwoexternal":"3DS 2.0 External","installments":"Installments","threedsoneexternal":"3DS 1.0 External","statementsoftdescriptor":"Statement Soft Descriptor","cof":"Stored Credentials Flag","getsupportedpms": "Retrieve Supported Payment Methods","level23data":"Level 2 and 3 Data" });
const reach = Object.freeze({ "global": "Global", "local": "Local" });
const ccardsPaymentMethods = Object.freeze(
    {
        "all": "All",
        "jcb": "JCB",
        "mastercard": "MASTERCARD",
        "mir": "MIR",
        "visa": "VISA",
        "maestro": "MAESTRO",
        "maestrouk": "MAESTRO UK",
        "jal": "JAL",
        "visaplus": "VISA Plus",
        "visaelectron": "VISA Electron",
        "amex": "AMEX",
        "diners": "DINERS",
        "discover": "DISCOVER",
        "discoverdiners": "DISCOVER DINERS",
        "rupay": "RUPAY",
        "americanexpress": "American Express",
        "carteblanche": "Carte Blanche",
        "cartebancaire": "Carte Bancaire",
        "cartebleue": "Carte Bleue",
        "australianbankcard": "Australian Bankcard",
        "cirrus": "Cirrus",
        "cartebancaire": "Carte Bancaire",
        "nicos": "NICOS",
        "dankort": "Dankort",
        "cartasi":"CartaSi",
        "uatp":"UATP",
        "hipercard": "Hipercard",
        "hiper": "Hiper",
        "aura": "Aura",
        "orico": "ORICO",
        "arca":"ArCa",
        "cup":"China Union Pay",
        "postepay":"PostePay",
        "upi":"UPO",
        "upop": "UnionPay Online Payments",
        "uzcard": "Uzcard",
        "vpay": "V PAY"

    });

const cashPaymentMethods = Object.freeze(
    {
        "all": "All"
    });

const requestModes = Object.freeze({ "sync": "Synchronous", "async": "Asynchronous", "asyncorsync": "Asynchronous or Synchronous", "asyncorsync": "Asynchronous or Synchronous","asyncandsync": "Asynchronous and Synchronous" });
var dataDictAuth = require('../../requestbuilder/datadict/fieldsmetaauthorizechargecredit.js')
var dataDictCapture = require('../../requestbuilder/datadict/fieldsmetacapture.js')
var dataDictPayment = require('../../requestbuilder/datadict/fieldsmetapayment.js')
var dataDictRefund = require('../../requestbuilder/datadict/fieldsmetarefund.js')
var dataDictToken = require('../../requestbuilder/datadict/fieldsmetatoken.js')
var dataDictVoid = require('../../requestbuilder/datadict/fieldsmetavoid.js')

// HTML in notes
var pOpen = "<p>"
var pClose = "</p>"
var linebreak = "<br>"
var openul = "<ul>"
var closeul = "</ul>"
var openli = "<li>"
var closeli = "</li>"
var openCode = "<code>"
var closeCode = "</code>"
var openBold = "<b>"
var closeBold = "</b>"
var paragraph = "<p>"


module.exports = (providerNameInText) => {

    const strings = stringsGenerator(providerNameInText)

    return {

        alfabank: {

            displayName: "Alfa-Bank",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/alfabank.html"
            },
            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: strings.asynchIfTimeout
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asynchIfTimeout
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync,
                        notes: "Void is only supported after Authorize."
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.jcb,
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]

                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global

                    },
                    {
                        type: ccardsPaymentMethods.mir,
                        // reach: reach.global

                    },
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global


                    }
                ]
            },
            currencies: {
                currencyList: "Alfa-Bank supports a wide range of currencies. Refer to the Alfa-Bank documentation for a complete list of supported currencies."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","alfabank")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","alfabank") 
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","alfabank")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","alfabank")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","alfabank")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","alfabank")
                    }
                ]
            }
        },

        alipay: {

            displayName: "Alipay",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/alipay.html"
            },
            requests: {
                ewallet: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncandsync,
                        multiple: true,
                        partial: true,
                        notes: "Installments are not supported."
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync,
                        notes: "The refund must be initiated within a certain time period after the payment, which is specified in your contract with Alipay. Usually, a 365-day period is specified."
                    }
                ]
            },
            paymentmethods: {

                ewallet: [
                    {
                        type: "Forex Trade Global",
                        id: "forextrade",
                        bbgroupid: "ewalletalipay"
                    }
                ]
            },
            currencies: {
                currencyList: "Forex Trade (Global): "+sortStringArray(["GBP","HKD","USD","CHF","SGD","SEK","DKK","NOK","JPY","CAD","AUD","EUR","NZD","KRW","THB"]) + linebreak + "Settlement currencies: "  + sortStringArray(["USD", "EUR", "JPY", "GBP", "CAD", "AUD", "SGD", "CHF", "SEK", "DKK", "NOK", "NZD", "THB", "HKD"]) + paragraph + "If you price your products in CNY, then you can pass CNY in your transaction requests. In this case, PaymentsOS will pass the settlement currency (instead of CNY) to Alipay. PaymentsOS does not convert the amount to the settlement currency (the original amount is passed 'as is')."
            },
            features: {

            }
        },

        braintree: {

            displayName: "Braintree",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/braintree.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync,
                        notes: "Installments are not supported."
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async,
                        notes: "Installments are not supported."
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ]
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.diners,
                        // reach: reach.global
                        notes: "EU merchant accounts only support EUR, GBP, USD."

                    },
                    {
                        type: ccardsPaymentMethods.discover,
                        // reach: reach.global
                        notes: "EU merchant accounts only support EUR, GBP, USD."
                    },
                    {
                        type: ccardsPaymentMethods.jcb,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.maestro,
                        // reach: reach.global
                        notes: "Supported with EU merchant accounts only."
                    }
                ]
            },
            currencies: {
                currencyList: "See " + "<a href='https://developers.braintreepayments.com/reference/general/currencies' target='_blank'>Braintree Currencies</a>."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false // @TODO: verify
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","braintree")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","braintree")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","braintree")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","braintree")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","braintree")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","braintree")
                    }
                ]
            }
        },

        chasepaymentech: {
            
            displayName: "Chase Paymentech",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/chase-paymentech.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.credit,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync,
                        notes: "If you void a Capture, make sure to do so  before the nightly batch. Else the Void will fail." + linebreak + "Supported Void types:" + openul + openli + "Block before capture: Funds are unfrozen according to the issuing bank's transaction expiration time, and capture is blocked." + closeli + openli + "Reversal: This type of Void unfreezes the funds immediately." + closeli + closeul + "The type of Void request that is invoked is determined by the " + openCode + "onlineReversalIndicator" + closeCode + " field, which you may optionally pass in the " + openCode + "provider_specific_data" + closeCode +" object of the Void request. For an example, use the " + strings.bodyBuilderDocsURL + " to generate a Void request with optional fields."
                    }
                ]
            },

            paymentmethods: {

                ccards: [ // TODO make sure updated from latest specs
                    {
                        type: ccardsPaymentMethods.americanexpress,
                    },
                    {
                        type: ccardsPaymentMethods.jcb,
                    },
                    {
                        type: ccardsPaymentMethods.visa,
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                    },
                    {
                        type: ccardsPaymentMethods.discover,
                    },
                    {
                        type: ccardsPaymentMethods.discoverdiners,
                    },
                    {
                        type: "ChaseNet"
                    },
                ]
            },
            currencies: { // TODO make sure updated from latest specs
                currencyList: "For charging a customer:" + linebreak + sortStringArray(["DZD","ARS","AMD","AUD","BDT","BZD","BOB","BWP","BRL","GBP","BND","BGN","BIF","XOF","XAF","CAD","KHR","CLP","CNY","COP","KMF","CRC","CZK","DKK","DJF","DOP","EGP","ETB","EUR","GEL","GTQ","HNL","HKD","HUF","INR","IDR","ILS","JMD","JPY","KZT","KES","KGS","LBP","MOP","MYR","MUR","MXN","MDL","MAD","NAD","NPR","NZD","NIO","NGN","NOK","PKR","PAB","PYG","PEN","PHP","PLN","QAR","RUB","RWF","SAR","SGD","SOS","ZAR","KRW","LKR","SEK","CHF","TWD","TZS","THB","TOP","TTD","TRY","UGX","UAH","AED","UYU","USD","UZS","YER","AZN","BYN","GHS","GNF","ISK","MGA","MZN","RON","VES","VND"])+linebreak+"Forsettlements:"+linebreak+ sortStringArray (["CAD","GBP","EUR","AUD","USD"]),
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true,
                        notes: "Transaction processing without CVV is not supported with " + ccardsPaymentMethods.visa +" and " + ccardsPaymentMethods.discover+"."
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","chasepaymentech")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","chasepaymentech")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","chasepaymentech")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","chasepaymentech")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","chasepaymentech")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","chasepaymentech")
                    }
                ]
            }
        },

        credorax: {

            displayName: "Credorax",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/credorax.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.credit,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa
                    },
                    {
                        type: ccardsPaymentMethods.mastercard

                    },
                    {
                        type: ccardsPaymentMethods.maestro

                    }
                ]
            },
            currencies: {
                currencyList: "Credorax supports a wide range of currencies. Refer to the Credorax documentation for a complete list of supported currencies."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true, 
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","credorax")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","credorax")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: true
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","credorax")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","credorax")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","credorax")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","credorax")
                    }
                ]
            }
        },

        dalenys: {

            displayName: "Dalenys",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/dalenys.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnThreeDS
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync,
                        notes: "Partial and multiple capture depend on your MCC. Contact your Dalenys payment manager for more information."
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnThreeDS
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.credit,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        notes: "Both 3DS 1 external flows and 3DS 2 external flows are not yet supported for American Express."
                    },
                    {
                        type: ccardsPaymentMethods.cartebancaire
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    },
                    {
                        type: ccardsPaymentMethods.mastercard

                    }
                ]
            },
            currencies: {
                currencyList: "Over 100 currencies are supported. See " + "<a href='https://www.dalenys.com/en/areas-of-expertise/international-expansion/' target='_blank'>currencies</a>" + "."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true,
                        notes: "Not supported with Credit requests."
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","dalenys")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","dalenys")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: true
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","dalenys")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","dalenys")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","dalenys")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","dalenys")
                    }
                ]
            }
        },

        cybersource: {

            displayName: "CyberSource",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/cybersource.html"
            },
            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync,
                        notes: "Support for multiple/partial capture depends on the specific provider."
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync,
                        notes: "Support for multiple/partial refund depends on the specific provider."
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync,
                        notes: "Void after capture on the same day is supported (before the nightly batch)."
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                    },
                    {
                        type: ccardsPaymentMethods.americanexpress,
                    },
                    {
                        type: ccardsPaymentMethods.discover,
                    },
                    {
                        type: ccardsPaymentMethods.diners,
                    },
                    {
                        type: ccardsPaymentMethods.carteblanche,
                    },
                    {
                        type: ccardsPaymentMethods.jcb,
                    },
                    {
                        type: ccardsPaymentMethods.jal,
                    },
                    {
                        type: ccardsPaymentMethods.maestrouk,
                    },
                    {
                        type: ccardsPaymentMethods.nicos,
                    },
                    {
                        type: ccardsPaymentMethods.dankort,
                    },
                    {
                        type: ccardsPaymentMethods.cartebleue,
                    },
                    {
                        type: ccardsPaymentMethods.cartasi,
                    },
                    {
                        type: ccardsPaymentMethods.uatp,
                    },
                    {
                        type: ccardsPaymentMethods.maestro,
                    },
                    {
                        type: ccardsPaymentMethods.hipercard,
                    },
                    {
                        type: ccardsPaymentMethods.aura,
                    },
                    {
                        type: ccardsPaymentMethods.orico,
                    },
                    {
                        type: ccardsPaymentMethods.elo,
                    }
                ]
            },
            currencies: {
                currencyList: "CyberSource supports many " + "<a href='http://apps.cybersource.com/library/documentation/sbc/quickref/currencies.pdf' target='_blank'>currencies</a>, but not all currencies are supported by all providers. Contact " + "<a href='https://support.cybersource.com/s/' target='_blank'>CyberSource support</a> " + "for provider-specific details."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false // TODO check
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","cybersource")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","cybersource")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","cybersource")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","cybersource")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","cybersource")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","cybersource")
                    }
                ]
            }
        },

        payeasecup: {

            displayName: "Payease CUP",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payease.html"
            },
            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: "The request mode is asynchronous in the event of a provider network error." + linebreak + "Supported Charge flows:" + openul + openli + "Non-recurring shopper flow (SMS-based customer authentication)" + closeli + openli + "Recurring shopper flow (no SMS authentication)" + closeli + closeul + "The type of Charge flow that is invoked is determined by the " + openCode + "sms_validation_required" + closeCode + " field, which you may optionally pass in the " + openCode + "provider_specific_data" + closeCode + " object of the Charge request. For an example, use the " +
                            strings.bodyBuilderDocsURL + " to generate a Charge request with optional fields."
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.asyncorsync,
                        notes: "The request mode is asynchronous in the event of a provider network error."
                    }
                ]
            },
            paymentmethods: {

                // ccards: [
                //     {
                //         type: ccardsPaymentMethods.upop,
                //         notes: "For list of supported banks, contact Payease."
                //     },
                //     {
                //         type: ccardsPaymentMethods.cup,
                //         notes: "For list of supported banks, contact Payease."
                //     }
                // ]
            },
            currencies: {
                currencyList: "CNY"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false // TODO check
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payeasecup")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payeasecup")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payeasecup")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payeasecup")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payeasecup")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payeasecup")
                    }
                ]
            }
        },

        payeezy: {

            displayName: "Payeezy",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/payeezy.html"
            },
            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync,
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress,
                    },
                    {
                        type: ccardsPaymentMethods.diners,
                    },
                    {
                        type: ccardsPaymentMethods.discover,
                    },
                    {
                        type: ccardsPaymentMethods.jcb,
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                    },
                    {
                        type: ccardsPaymentMethods.visa,
                    },
                ]
            },
            currencies: {
                currencyList: "See " + "<a href='https://developer.payeezy.com/faqs/what-currencies-does-payeezy-support' target='_blank'>Payeezy Currencies</a>."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false, // was false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payeezy")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payeezy")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payeezy")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payeezy")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payeezy")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payeezy")
                    }
                ]
            }
        },

        safecharge: {

            displayName: "SafeCharge",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/safecharge.html"
            },
            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.credit,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    }
                ],
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global,
                        // forRequests: [requestTypes.authorize, requestTypes.charge] // remove
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global


                    }
                ]
            },

            currencies: {

                currencyList: sortStringArray(["AED, ARS, AUD, AZN, BGN, BHD, BND, BRL, BYN, BYR, CAD, CHF, CLP, CNH, CNY, COP, CRC, CZK, DKK, DZD, EEK, EGP, EUR, GBP, GEL, HKD, HRK, HUF, IDR, INR, IQD, ISK, JOD, KGS, KRW, KWD, KZT, LBP, LTL, LVL, MAD, MDL, MXN, MYR, NIS, NOK, NZD, OMR, PEN, PHP, PKR, PLN, QAR, RON, RSD, RUB, SAR, SEK, SGD, SKK, THB, TND, TRY, TWD, UAH, USD, UYU, VEF, VND, YEN, YER, ZAR"]) 

            },

            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false // @TODO: verify
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","safecharge")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","safecharge")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","safecharge")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","safecharge")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","safecharge")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","safecharge")
                    }
                ]
            }
        },

        paypal: {

            displayName: "PayPal",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/paypal.html"
            },
            requests: {
                ewallet: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: "Asynchronous for PayPal Express Checkout. Synchronous for PayPal Billing Agreement."
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: "Asynchronous for PayPal Express Checkout. Synchronous for PayPal Billing Agreement."
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync,
                        notes: "Multiple refunds can be made as long as the cumulative refunded amount does not exceed the original transaction value."
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ]
            },

            paymentmethods: {

                ewallet: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "PayPal Express Checkout",
                        id: "paypalexpress",
                        bbgroupid: "ewalletpaypal",
                    },
                    {
                        type: "PayPal Billing Agreement",
                        id: "paypalbillingagreement",
                        bbgroupid: "ewalletpaypal"
                    }
                ]
            },

            currencies: {

                currencyList: "See " + "<a href='https://www.paypal.com/us/webapps/mpp/country-worldwide' target='_blank'>PayPal Currency Codes</a>."
            },

            features: {

            }
        },

        payuargentina: {

            displayName: "PayU Argentina",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-argentina.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + "Only supported for the local currency, USD is not supported." + closeli + closeul
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + "Only supported for the local currency, USD is not supported." + closeli + closeul
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnSetup
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async,
                        notes: "Partial refund is only supported for the following payment methods: VISA, MASTERCARD, AMEX, DINERS, Argencard"
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ],
                cash: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ]
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.diners,
                        // reach: reach.global
                    },
                    {
                        type: "Argencard",
                        // reach: reach.local
                        notes: "This is a local card vendor."
                    },
                    {
                        type: "Cabal",
                        // reach: reach.local
                        notes: "This is a local card vendor."
                    },
                    {
                        type: "Cencosud",
                        // reach: reach.local
                        notes: "This is a local card vendor."
                    },
                    {
                        type: "Naranja",
                        // reach: reach.local
                        notes: "This is a local card vendor."

                    },
                    {
                        type: "Shopping",
                        // reach: reach.local
                        notes: "This is a local card vendor."
                    }
                ],
                cash: [
                    {
                        type: "COBRO_EXPRESS",
                        id: "cobroexpress",
                        bbgroupid: "cashpayuargentina",
                        
                    },
                    {
                        type: "PAGOFACIL",
                        id: "pagofacil",
                        bbgroupid: "cashpayuargentina",
                    },
                    {
                        type: "RAPIPAGO",
                        id: "rapipago",
                        bbgroupid: "cashpayuargentina"
                    }
                ]
            },
            currencies: {
                currencyList: "ARS, USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true,
                        notes: "Not supported with VISA"
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payuargentina")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payuargentina")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payuargentina")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payuargentina")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payuargentina")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payuargentina")
                    }
                ]
            }
        },

        payuasiapacific: {

            displayName: "PayU Asia Pacific",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/payu-asia-pacific.html"
            },

            requests: {
                // cash: [
                //     {
                //         type: requestTypes.charge,
                //         multiple: false,
                //         partial: false,
                //         mode: requestModes.asyncorsync
                //     }
                // ],
                // banktransfer: [
                //     {
                //         type: requestTypes.authorize,
                //         multiple: false,
                //         partial: false,
                //         mode: requestModes.asyncorsync
                //     },
                //     {
                //         type: requestTypes.capture,
                //         multiple: false,
                //         partial: false,
                //         mode: requestModes.asyncorsync
                //     },
                //     {
                //         type: requestTypes.refund,
                //         multiple: false,
                //         partial: true,
                //         mode: requestModes.async,
                //     },
                //     {
                //         type: requestTypes.void,
                //         mode: requestModes.async
                //     }
                // ],
                ewallet: [
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.asyncorsync,
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.asyncorsync
                    }
                ],
                
            },

            paymentmethods: {

                ccards: [
                ],
                ewallet: [
                    // {
                    //     type: "Alipay",
                    //     id: "aplipay",
                    //     bbgroupid: "ewalletpayuasiapacific",
                        
                    // },
                    {
                        type: "WeChat",
                        id: "wechat",
                        bbgroupid: "ewalletpayuasiapacific",
                    },
                    // {
                    //     type: "OVO",
                    //     id: "ovo",
                    //     bbgroupid: "ewalletpayuasiapacific",
                    // },
                    // {
                    //     type: "DBS Paylah!",
                    //     id: "dbs_paylah",
                    //     bbgroupid: "ewalletpayuasiapacific",
                    // },
                    // {
                    //     type: "Grab",
                    //     id: "grab",
                    //     bbgroupid: "ewalletpayuasiapacific",
                    // },
                    // {
                    //     type: "BBL",
                    //     id: "bbl",
                    //     bbgroupid: "ewalletpayuasiapacific",
                    // },
                    // {
                    //     type: "Rabbit Line Pay",
                    //     id: "rabbit_line_pay",
                    //     bbgroupid: "ewalletpayuasiapacific",
                    // }
                ],
                banktransfer: [
                    // {
                    //     type: "Bank Danamon",
                    //     id: "bank_danamon",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "BCA KlikPay",
                    //     id: "bca_klikpay",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "BCA VA",
                    //     id: "bca_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "BNI VA",
                    //     id: "bni_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "BRI e-Pay",
                    //     id: "bri_epay",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "BRI Mocash",
                    //     id: "bri_mocash",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "CIMB Clicks",
                    //     id: "cimb_clicks",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "CIMB VA",
                    //     id: "cimb_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Indosat Dompetku",
                    //     id: "indosat_dompetku",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Mandiri Atm",
                    //     id: "mandiri_atm",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Mandiri Clickpay",
                    //     id: "mandiri_clickpay",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Mandiri VA",
                    //     id: "mandiri_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Maybank Mobile Payment",
                    //     id: "maybank_mobile_payment",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Maybank VA",
                    //     id: "maybank_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Maybank2U",
                    //     id: "maybank2u",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Mynt e-money",
                    //     id: "myntemoney",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Permata Bank VA",
                    //     id: "permata_bank_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Sinarmas VA",
                    //     id: "sinarmas_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Telkomsel tcash",
                    //     id: "telkomsel_tcash",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "XLTunai",
                    //     id: "xltunai",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "Bank Transfer (Direct Debit)",
                    //     id: "bank_transfer_direct_debit",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // },
                    // {
                    //     type: "KCP VA",
                    //     id: "kcp_va",
                    //     bbgroupid: "btpayuasiapacific",
                        
                    // }
                ],
                cash: [
                    // {
                    //     type: "Payment at Convenience Stores",
                    //     id: "payment_at_convenience_stores",
                    //     bbgroupid: "cashpayuasiapacific",
                    // }
                ],   
            },
            currencies: {
                currencyList:  sortStringArray(["AUD", "EUR", "GBP", "HKD", "JPY", "SGD", "USD"])
            },
            features: {
 
            }
        },

        payubrazil: {

            displayName: "PayU Brazil",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-brazil.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + "Only supported for the local currency, USD is not supported." + closeli + closeul
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + "Only supported for the local currency, USD is not supported. " + closeli + openli + strings.captureWithoutPartial + closeli + closeul
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnSetup
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async,
                        notes: "Partial refund is only supported for the following payment methods: VISA, MASTERCARD, AMEX, DINERS."
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ],
                cash: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ]
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.diners,
                        // reach: reach.global
                    },
                    {
                        type: "Elo",
                        // reach: reach.local
                        notes: "This is a local card vendor."
                    },
                    {
                        type: "Hipercard",
                        // reach: reach.local
                        notes: "This is a local card vendor."
                    }
                ],
                cash: [
                    {
                        type: "BOLETO BANCARIO",
                        id: "boletobancario",
                        bbgroupid: "cashpayubrazil"
                    }
                ]
            },
            currencies: {
                currencyList: "BRL, USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payubrazil")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payubrazil")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payubrazil")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payubrazil")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payubrazil")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payubrazil")
                    }
                ]
            }
        },

        payucitrusindia: {

            displayName: "PayU Citrus (India)",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-citrus.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async,
                        notes: "The Indian Central Bank has a requirement that every POST Charge request must be accompanied by a customer authentication session. Therefore, after sending a POST Charge request, you'll need to redirect your customer to the customer's bank authentication site. For more information, see " + '<a href="./payu-citrus.html#redirecting-your-customer-for-authentication">Redirecting your Customer for Authentication</a>' + " below"
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    }
                ],
                banktransfer: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async,
                        notes: "The Indian Central Bank has a requirement that every POST Charge request must be accompanied by a customer authentication session. Therefore, after sending a POST Charge request, you'll need to redirect your customer to the customer's bank authentication site. For more information, see " + '<a href="./payu-citrus.html#redirecting-your-customer-for-authentication">Redirecting your Customer for Authentication</a>' + " below"
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    }
                ]
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.diners
                        // // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.jcb
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.rupay
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.visa
                        // reach: reach.global
                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "Netbanking",
                        id: "netbanking",
                        bbgroupid: "banktrpayucitrusindia",
                    },
                    {
                        type: "UPI",
                        id: "upi",
                        bbgroupid: "banktrpayucitrusindia"
                    }
                ]
            },
            currencies: {
                currencyList: "INR"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false // TODO check
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payucitrusindia")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payucitrusindia")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payucitrusindia")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payucitrusindia")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payucitrusindia")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payucitrusindia")
                    }
                ]
            }
        },

        payuchile: {

            displayName: "PayU Chile",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/payu-chile.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnSetup
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    }
                ],
                cash: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ],
                dredirect: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ]
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.diners,
                        // reach: reach.global
                    }
                ],
                cash: [
                    {
                        type: "MULTICAJA",
                        id: "multicaja",
                        bbgroupid: "cashpayuchile",
                    }
                ],
                dredirect: [
                    {
                        type: "Redcompra",
                        id: "redcompra",
                        bbgroupid: "dredirectpayuchile",
                    }
                ]
            },
            currencies: {
                currencyList: "CLP"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payuchile")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payuchile")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payuchile")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payuchile")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payuchile")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payuchile")
                    }
                ]
            }
        },

        payucolombia: {

            displayName: "PayU Colombia",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-colombia.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnSetup
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async,
                        notes: "Partial refunds require that you send unique partial refund requests."
                    }
                ],
                cash: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ],
                banktransfer: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ]
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.diners,
                        // reach: reach.global
                    }
                ],
                cash: [
                    {
                        type: "BALOTO",
                        id: "baloto",
                        bbgroupid: "cashpayucolombia",
                    },
                    {
                        type: "BANK REFERENCED",
                        id: "bankreferenced",
                        bbgroupid: "cashpayucolombia",
                        notes: "Payment offices: Davivienda, Banco de Bogotá, Bancolombia."
                    },
                    {
                        type: "EFECTY",
                        id: "efecty",
                        bbgroupid: "cashpayucolombia",
                    },
                     {
                        type: "OTHERS CASH",
                        id: "otherscash",
                        bbgroupid: "cashpayucolombia",
                        notes: "Local name: Matrix (Su Red). Payment offices: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER."
                    }
                ],
                banktransfer: [
                    {
                        type: "PSE Bank Transfers",
                        id: "psebanktransfers",
                        bbgroupid: "banktrpayucolombia",
                    }
                ]
            },
            currencies: {
                currencyList: "COP, USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payucolombia")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payucolombia")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payucolombia")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payucolombia")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payucolombia")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payucolombia")
                    }
                ]
            }
        },

        payuindia: {

            displayName: "PayU India",

            zoozdata: {
                apiversion: "1.2.0",
                zoozdocsurl: "/providers/payu-india.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    }
                ],
                loyalty: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    }
                ],
                ewallet: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    },
                ],                
                banktransfer: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: ccardsPaymentMethods.maestro
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.rupay
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    },
                    {
                        type: ccardsPaymentMethods.visaelectron
                    }
                ],
                loyalty: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "Citibank Reward Points",
                        id: "citibankrewardpoints",
                        bbgroupid: "loyaltypayuindia",
                    },
                ],
                ewallet: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "ItzCash",
                        id: "itzcash",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "Airtel Money",
                        id: "airtelmoney",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "YPay Cash",
                        id: "ypaycash",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "Cash Card",
                        id: "cashcard",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "ICash Card",
                        id: "icashcard",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "PAYCASH CARD",
                        id: "paycashcard",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "ZIPcash card",
                        id: "zipcashcard",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "FreeCharge",
                        id: "freecharge",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "JioMoney",
                        id: "jiomoney",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "Amazon pay",
                        id: "amazonpay",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "Pay Zapp",
                        id: "payzapp",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "Ola Money",
                        id: "olamoney",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "Phonepe",
                        id: "phonepe",
                        bbgroupid: "ewalletpayuindia",
                    },
                    {
                        type: "Paytm",
                        id: "paytm",
                        bbgroupid: "ewalletpayuindia",   
                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "Netbanking",
                        id: "netbankingindia",
                        bbgroupid: "banktrpayuindia",
                    },
                    {
                        type: "UPI",
                        id: "upiindia",
                        bbgroupid: "banktrpayuindia"
                    }
                ]
            },
            currencies: {
                currencyList: sortStringArray(["USD, EUR, JPY, GBP, CHF, SEK, DKK, NOK, SGD, AUD, CAD, AED, HKD, QAR, SAR, OMR, ZAR, MYR, KWD, MUR, LKR, KES, PHP, NZD, THB, BDT, CNY, NPR, BHD, INR"])
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false // TO DO check
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payuindia")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payuindia")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payuindia")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payuindia")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payuindia")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: true
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payuindia")
                    }
                ]
            }
        },

        payukenya: {

            displayName: "PayU Kenya",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/payu-kenya.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                        notes: strings.asyncOrSyncDependingOnThreeDS
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async,
                        notes: strings.asyncOrSyncDependingOnThreeDS
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ],
                ewallet: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                ],
                banktransfer: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                ],
                paymentpage: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ],                
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ],
                ewallet: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "MPESA",
                        id: "MPESA",
                        bbgroupid: "ewalletpayukenya",
                    },
                    {
                        type: "EQUITEL",
                        id: "EQUITEL",
                        bbgroupid: "ewalletpayukenya",
                    },
                    {
                        type: "Airtel Money",
                        id: "AIRTEL_MONEY",
                        bbgroupid: "ewalletpayukenya",
                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "MOBILE BANKING",
                        id: "MOBILE_BANKING",
                        bbgroupid: "banktrpayukenya",
                    }
                ],
                // paymentpage: [
                //     {
                //         diffferentrequestdata: true
                //     },
                //     {
                //         type: "EFT PRO",
                //         id: "EFT_PRO"
                //     },
                //     {
                //         type: "Chicken",
                //         id: "chicken"
                //     },
                //     {
                //         type: "Elephant",
                //         id: "elephant"
                //     }
                // ],                
            },
            currencies: {
                currencyList: "KES, USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payukenya")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payukenya")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payukenya")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payukenya")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payukenya")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payukenya")
                    }
                ]
            }
        },

        payumexico: {

            displayName: "PayU Mexico",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-mexico.html"
            },
            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + strings.authOnlySupportedForLocalCurr + closeli + closeul
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul +  openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + strings.captureOnlySupportedForLocalCurr + closeli + openli + strings.captureWithoutPartial + closeli + closeul
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnSetup
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async,
                        notes: strings.PartialRefundSupportedForPaymentMethods + " " + ccardsPaymentMethods.visa + ", " + ccardsPaymentMethods.mastercard
                    }
                ],
                cash: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.mastercard

                    },
                    {
                        type: ccardsPaymentMethods.americanexpress

                    }
                ],
                cash: [
                    {
                        type: "BANK REFERENCED",
                        id: "bankreferencedmexico",
                        bbgroupid: "cashpayumexico",
                        notes: "Payment office: BANCOMER"
                    },
                    {
                        type: "OTHERS CASH MX",
                        id: "otherscashmx",
                        bbgroupid: "cashpayumexico",
                    },
                    {
                        type: "OXXO",
                        id: "oxxo",
                        bbgroupid: "cashpayumexico",
                    },
                    {
                        type: "SEVEN ELEVEN",
                        id: "seveneleven",
                        bbgroupid: "cashpayumexico",
                    }
                ]
            },
            currencies: {
                currencyList: "MXN, USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payumexico")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payumexico")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payumexico")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payumexico")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payumexico")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payumexico")
                    }
                ]
            }
        },

        payunigeria: {

            displayName: "PayU Nigeria",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/payu-nigeria.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnThreeDS + closeli + openli + strings.authOnlySupportedForLocalCurr + closeli + closeul
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnThreeDS
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ],
                banktransfer: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async,
                    }
                ],
                paymentpage: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ],                
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.visa,
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.mastercard

                    },
                    {
                        type: ccardsPaymentMethods.americanexpress

                    },
                    {
                        type: ccardsPaymentMethods.diners

                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "EFT BANK TRANSFER",
                        id: "EFT_BANK_TRANSFER",
                        bbgroupid: "banktrpayunigeria"
                    }

                ],
                // paymentpage: [
                //     {
                //         diffferentrequestdata: true
                //     },
                //     {
                //         type: "EFT PRO",
                //         id: "EFT_PRO"
                //     },
                //     {
                //         type: "Chicken",
                //         id: "chicken"
                //     },
                //     {
                //         type: "Elephant",
                //         id: "elephant"
                //     }
                // ],                
            },
            currencies: {
                currencyList: "NGN, USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payunigeria")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payunigeria")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payunigeria")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payunigeria")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payunigeria")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payunigeria")
                    }
                ]
            }
        },

        payupanama: {

            displayName: "PayU Panama",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-panama.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnSetup
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.mastercard
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.visa
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    }
                ]
            },
            currencies: {
                currencyList: "USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payupanama")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payupanama")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payupanama")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payupanama")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payupanama")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payupanama")
                    }
                ]
            }
        },

        payuperu: {

            displayName: "PayU Peru",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-peru.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + strings.authOnlySupportedForLocalCurr + closeul
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.asyncorsync,
                        notes: openul + openli + strings.asyncOrSyncDependingOnSetup + closeli + openli + strings.captureOnlySupportedForLocalCurr + closeul
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnSetup
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ],
                cash: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                ],
                cash: [
                    {
                        type: "BCP",
                        id: "bcp",
                        bbgroupid: "cashpayuperu",
                    },
                    {
                        type: "PAGOEFECTIVO",
                        id: "pagoefectivo",
                        bbgroupid: "cashpayuperu",
                    }
                ]
            },
            currencies: {
                currencyList: "PEN, USD"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payuperu")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payuperu")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payuperu")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payuperu")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payuperu")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payuperu")
                    }
                ]
            }
        },

        payuromania: {

            displayName: "PayU Romania",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-romania.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async,
                        notes: "Support for partial Capture depends on the specific acquirer."
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.maestro,
                        notes: "With installments"
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        notes: "With installments"
                    },
                    {
                        type: ccardsPaymentMethods.visa,
                        notes: "With installments"
                    },
                    {
                        type: ccardsPaymentMethods.visaelectron,
                        notes: "With installments"
                    },
                    {
                        type: "ALPHABANK INSTALLMENTS",
                        notes: "Without installments"
                    },
                    {
                        type: "BCR INSTALLMENTS",
                        notes: "Without installments"
                    },
                    {
                        type: "BRDF",
                        notes: "Without installments"
                    },
                    {
                        type: "BRD INSTALLMENTS",
                        notes: "Without installments"
                    },
                    {
                        type: "CARD AVANTAJ",
                        notes: "Without installments"
                    },
                    {
                        type: "GARANTI RO",
                        notes: "Without installments"
                    },
                    {
                        type: "OPTIMO",
                        notes: "Without installments"
                    },
                    {
                        type: "RAIFFEISEN",
                        notes: "Without installments"
                    },
                    {
                        type: "STAR_BT",
                        notes: "Without installments"
                    }
                ]
            },
            currencies: {
                currencyList: sortStringArray(["RON, USD, EUR, GBP, HUF, BGN, CZK, DKK, PLN, SEK, HRK, and UAH."]) 
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payuromania")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payuromania")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: true
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payuromania")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payuromania")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payuromania")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payuromania")
                    }
                ]
            }
        },

        payurussia: {

            displayName: "PayU Russia",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-russia.html"
            },
            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ],
                banktransfer: [
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                        notes: strings.captureIsManualAfterAuth
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.maestro
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.mir
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    },
                    {
                        type: ccardsPaymentMethods.visaelectron
                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "QIWI",
                        id: "qiwi",
                        bbgroupid: "banktrpayurussia",
                    }
                ]
            },
            currencies: {
                currencyList: "RUB"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payurussia")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payurussia")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payurussia")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payurussia")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payurussia")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payurussia")
                    }
                ]
            }
        },

        payusingleplatform: {

            displayName: "PayU Single Platform",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-singleplatform.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                        notes: "Following an Authorize request, the request will have a status of ‘Waiting for confirmation’ in your PayU Single Platform account."
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                        notes: openul + openli + strings.captureWithoutPartial + closeli
                                      + openli + "The hold on the funds will be released if you did not capture the funds within 5 days of the Authorize request." + closeli + closeul
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ],
                banktransfer: [
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                        notes: "Following an Authorize request, the request will have a status of ‘Waiting for confirmation’ in your PayU Single Platform account."
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                        notes: "The hold on the funds will be released if you did not capture the funds within 10 days of the Authorize request." 
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async
                    },
                ]
            },

            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.maestro,
                        // reach: reach.global
                        // forRequests: [requestTypes.authorize, requestTypes.charge]
                    },
                    {
                        type: ccardsPaymentMethods.mastercard,
                        // reach: reach.global
                    },
                    {
                        type: ccardsPaymentMethods.visa,
                        // reach: reach.global
                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "PBL Pay by Link",
                        id: "pbl",
                        bbgroupid: "banktrpayusingleplatform",
                        // reach: reach.local,
                        // forRequests: [requestTypes.authorize]
                    },
                    {
                        type: "Payment Wall",
                        id: "payment_wall",
                        bbgroupid: "banktrpayusingleplatform",
                        // reach: reach.local,
                        // forRequests: [requestTypes.authorize]
                    }
                ]
            },
            currencies: {
                currencyList: sortStringArray(["BGN, CHF, CZK, DKK, EUR, GBP, HRK, HUF, NOK, PLN, RON, RUB, SEK, UAH, USD"]),
                notes: "Bank transfer only supports CZK, EUR and PLN."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payusingleplatform")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payusingleplatform")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: true
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payusingleplatform")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payusingleplatform")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payusingleplatform")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: true
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payusingleplatform")
                    }
                ]
            }
        },

        payusouthafrica: {

            displayName: "PayU South Africa",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/payu-south-africa.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnThreeDS
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asyncOrSyncDependingOnThreeDS
                    },                  
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ],
                loyalty: [
                    {
                        type: requestTypes.authorize,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.capture,
                        mode: requestModes.async,
                        multiple: false,
                        partial: true,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ],
                ewallet: [
                    {
                        type: requestTypes.authorize,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.capture,
                        mode: requestModes.async,
                        multiple: false,
                        partial: true,
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    }
                ],
                banktransfer: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                ],
                paymentpage: [
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ],

            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ],
                ewallet: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "MASTERPASS",
                        id: "MASTERPASS",
                        bbgroupid:"ewalletpayusouthafrica",
                        forRequests: [requestTypes.charge]
                    },
                    {
                        type: "VISA CHECKOUT",
                        id: "VISA_CHECKOUT",
                        bbgroupid:"ewalletpayusouthafrica",
                        forRequests: [requestTypes.authorize, requestTypes.capture, requestTypes.charge]
                    },
                    {   
                        type: "MOBICRED",
                        id: "MOBICRED",
                        bbgroupid:"ewalletpayusouthafrica",
                        forRequests: [requestTypes.charge]
                    },
                ],
                loyalty: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "DISCOVERYMILES",
                        forRequests: [requestTypes.authorize, requestTypes.capture, requestTypes.charge],
                        id: "DISCOVERYMILES",
                        bbgroupid: "loyaltypayusouthafrica",
                    },
                    {
                        type: "EBUCKS",
                        forRequests: [requestTypes.charge],
                        id: "EBUCKS",
                        bbgroupid: "loyaltypayusouthafrica",
                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "EFT PRO",
                        id: "EFT_PRO",
                        bbgroupid: "banktrpayusouthafrica",
                    }
                ],
                // paymentpage: [
                //     {
                //         diffferentrequestdata: true
                //     },
                //     {
                //         type: "EFT PRO",
                //         id: "EFT_PRO"
                //     },
                //     {
                //         type: "Chicken",
                //         id: "chicken"
                //     },
                //     {
                //         type: "Elephant",
                //         id: "elephant"
                //     }
                // ],

            },
            currencies: {
                currencyList: "ZAR"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payusouthafrica")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payusouthafrica")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payusouthafrica")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payusouthafrica")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payusouthafrica")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payusouthafrica")
                    }
                ]
            }
        },

        payuturkey: {

            displayName: "PayU Turkey",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/payu-turkey.html"
                
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ],
                banktransfer: [
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async,
                        notes: strings.captureIsManualAfterAuth
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        notes: "Contact your sales representative for activating transactions for " + ccardsPaymentMethods.americanexpress + "."
                    },
                    {
                        type: ccardsPaymentMethods.maestro
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.mir
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    },
                    {
                        type: ccardsPaymentMethods.visaelectron
                    },
                    {
                        type: ccardsPaymentMethods.visaplus
                    },
                    {
                        type: "Troy",
                        notes: "This is a local card vendor."
                    }
                ],
                banktransfer: [
                    {
                        diffferentrequestdata: true
                    },
                    {
                        type: "BKM",
                        id: "bkm",
                        bbgroupid: "banktrpayuturkey",
                    },
                    {
                        type: "COMPAY",
                        id: "compay",
                        bbgroupid: "banktrpayuturkey",
                    },
                    {
                        type: "UPT",
                        id: "upt",
                        bbgroupid: "banktrpayuturkey",
                    },
                    {
                        type: "WIRE",
                        id: "wire",
                        bbgroupid: "banktrpayuturkey",
                    }
                ]
            },
            currencies: {
                currencyList: sortStringArray(["TRY, USD, EUR, RUB, GBP"]) 
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","payuturkey")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","payuturkey")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","payuturkey")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","payuturkey")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","payuturkey")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","payuturkey")
                    }
                ]
            }
        },

        rsb: {

            displayName: "RSB",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/rsb.html"
                
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: "The request is asynchronous (will return a status of " + openCode + "Pending" + closeCode + ") in the event of a provider network error. For more information, see " + '<a href="./rsb.html#request-retries-in-the-event-of-a-provider-network-error">Request Retries in the Event of a Provider Network Error</a>' + "."
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: "The request is asynchronous (will return a status of " + openCode + "Pending" + closeCode + ") in the event of a provider network error. For more information, see " + '<a href="./rsb.html#request-retries-in-the-event-of-a-provider-network-error">Request Retries in the Event of a Provider Network Error</a>' + "."
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.asyncorsync,
                        notes: "The request is asynchronous (will return a status of " + openCode + "Pending" + closeCode + ") in the event of a provider network error. For more information, see " + '<a href="./rsb.html#request-retries-in-the-event-of-a-provider-network-error">Request Retries in the Event of a Provider Network Error</a>' + "."
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: ccardsPaymentMethods.jcb
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.mir
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ]
            },
            currencies: {
                currencyList: "RUB"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","rsb")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","rsb")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","rsb")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","rsb")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","rsb")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","rsb")
                    }
                ]
            }
        },

        sberbank: {

            displayName: "Sberbank",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/sberbank.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.asyncorsync,
                        notes: strings.asynchIfTimeout
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.asyncorsync,
                        notes: strings.asynchIfTimeout
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.mir
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ]
            },
            currencies: {
                currencyList: "RUB"
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: true
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","sberbank")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","sberbank")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","sberbank")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","sberbank")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","sberbank")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","sberbank")
                    }
                ]
            }
        },

        stripe: {

            displayName: "Stripe",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/stripe.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: ccardsPaymentMethods.discover
                    },
                    {
                        type: ccardsPaymentMethods.jcb
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ]
            },
            currencies: {
                currencyList: "See the " + "<a href='https://stripe.com/docs/currencies#supported-charge-currencies' target='_blank'>Stripe documentation</a>."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true // TODO check
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","stripe")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","stripe")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","stripe")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","stripe")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","stripe")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","stripe")
                    }
                ]
            }
        },

        shva: {

            displayName: "Shva",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/shva.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async,
                        notes: "Capture requests are not supported with an automatic payment initialization request."
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.async,notes: "Charge requests are not supported with an automatic payment initialization request."

                    },
                    {
                        type: requestTypes.credit,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync,
                        notes: "Void after capture on the same day is supported (before the nightly batch). Void requests are not supported with automatic payments."
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: "Isracard"
                    },
                    {
                        type: ccardsPaymentMethods.jcb
                    },
                    {
                        type: ccardsPaymentMethods.maestro
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: "PL",
                        notes: "Local cards, for example, a gift card from Leumicard or Isracard."
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ]
            },
            currencies: {
                currencyList: sortStringArray(["ILS, USD, EUR, GBP, AUD, CAD, CHF, DKK, EGP, JOD, NOK, SEK"]) 
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false, // was false 
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","shva")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","shva")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","shva")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","shva")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","shva")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","shva")
                    }
                ]
            }
        },

        vantiv: {

            displayName: "Vantiv",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/vantiv.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync,
                        notes: openul + openli + "An authorization is valid for seven days for MASTERCARD, VISA, and AMEX. For DISCOVER it is valid for ten days." + closeli + openli + "Vantiv recommends to leave at least a one minute 'processing time gap' between the POST Authorize and POST Void requests." + closeli + closeul
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync,
                        notes: "Partial capture is only supported for USD or CAD."
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: true,
                        mode: requestModes.sync,
                        notes: "Partial refund is not supported with AMEX."
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync,
                        notes: openul +  openli + "Supported for valid authorizations. Void is also supported for Capture and Charge requests within the same day." + closeli +  openli + openBold + "Important" + closeBold +": Vantiv acknowledges receiving a Void request by returning a status of " + openCode + "Approved" + closeCode+". PaymentsOS then assumes that the transaction has been voided and sets the payment status to " + openCode + "Voided" + closeCode +". However, since the status of " + openCode + "Approved" + closeCode + " is an acknowledgement of receipt only, it does not reflect the final status of the transaction (for instance, the Void operation may have been declined). To view the transaction's final status, you must thus check the daily decline report that you receive from Vantiv."  + closeli +  openli + "Vantiv recommends to leave at least a one minute 'processing time gap' between the POST Authorize and POST Void requests." + closeli + closeul
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: ccardsPaymentMethods.discover
                    },
                    {
                        type: ccardsPaymentMethods.jcb
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ]
            },
            currencies: {
                currencyList: "Vantiv supports all currencies with 2 or less digits after the decimal separator. See " + "<a href='/minor-currency-units.html' target='_blank'>Minor Units Format</a>" + ". Note that a Vantiv merchant account can only be associated with one currency."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","vantiv")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","vantiv")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","vantiv")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","vantiv")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","vantiv")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","vantiv")
                    }
                ]
            }
        },

        wirecard: {

            displayName: "Wirecard",

            zoozdata: {
                apiversion: "1.1.0",
                zoozdocsurl: "/providers/wirecard.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: true,
                        partial: true,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.charge,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.refund,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.sync
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress,
                        notes: "3DS 2 external flows are not yet supported for American Express."
                    },
                    {
                        type: ccardsPaymentMethods.arca
                    },
                    {
                        type: ccardsPaymentMethods.aura
                    },
                    {
                        type: ccardsPaymentMethods.cartasi
                    },
                    {
                        type: ccardsPaymentMethods.cartebancaire
                    },
                    {
                        type: ccardsPaymentMethods.cartebleue
                    },
                    {
                        type: ccardsPaymentMethods.cup
                    },
                    {
                        type: ccardsPaymentMethods.elo
                    },
                    {
                        type: ccardsPaymentMethods.hiper
                    },
                    {
                        type: ccardsPaymentMethods.hipercard
                    },
                    {
                        type: ccardsPaymentMethods.jcb
                    },
                    {
                        type: ccardsPaymentMethods.maestro
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: ccardsPaymentMethods.mir
                    },
                    {
                        type: ccardsPaymentMethods.postepay
                    },
                    {
                        type: ccardsPaymentMethods.rupay
                    },
                    {
                        type: ccardsPaymentMethods.uatp
                    },
                    {
                        type: ccardsPaymentMethods.upi
                    },
                    {
                        type: ccardsPaymentMethods.upop
                    },
                    {
                        type: ccardsPaymentMethods.uzcard,
                    },
                    {
                        type: ccardsPaymentMethods.visa,
                    },
                    {
                        type: ccardsPaymentMethods.vpay,
                    }
                ]
            },
            currencies: {
                currencyList: "Wirecard supports all currencies."
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: true // TODO check
                    },
                    {
                        name: features.threedsone,
                        supported: false // was false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","wirecard")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","wirecard")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: true
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","wirecard")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","wirecard")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","wirecard")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","wirecard")
                    }
                ]
            }
        },

        worldpayeu: {

            displayName: "WorldPay",

            zoozdata: {
                apiversion: "1.0.0",
                zoozdocsurl: "/providers/worldpayeu.html"
            },

            requests: {
                ccards: [
                    {
                        type: requestTypes.token,
                        mode: requestModes.sync,
                    },
                    {
                        type: requestTypes.authorize,
                        multiple: false,
                        partial: false,
                        mode: requestModes.sync
                    },
                    {
                        type: requestTypes.capture,
                        multiple: false,
                        partial: true,
                        mode: requestModes.async
                    },
                    ,
                    {
                        type: requestTypes.credit,
                        multiple: false,
                        partial: false,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.refund,
                        multiple: true,
                        partial: true,
                        mode: requestModes.async
                    },
                    {
                        type: requestTypes.void,
                        mode: requestModes.async
                    }
                ]
            },
            paymentmethods: {

                ccards: [
                    {
                        type: ccardsPaymentMethods.americanexpress
                    },
                    {
                        type: "AirPlus"
                    },
                    {
                        type: "Aurore"
                    },
                    {
                        type: ccardsPaymentMethods.cartebancaire
                    },
                    {
                        type: ccardsPaymentMethods.cartebleue
                    },
                    {
                        type: ccardsPaymentMethods.diners
                    },
                    {
                        type: ccardsPaymentMethods.discover
                    },
                    {
                        type: "Dankort"
                    },
                    {
                        type: "GE Capital"
                    },
                    {
                        type: ccardsPaymentMethods.jcb
                    },
                    {
                        type: ccardsPaymentMethods.maestro
                    },
                    {
                        type: ccardsPaymentMethods.mastercard
                    },
                    {
                        type: "UATP"
                    },
                    {
                        type: ccardsPaymentMethods.visa
                    }
                ]
            },
            currencies: {
                currencyList: "Worldpay supports many " + "<a href='http://support.worldpay.com/support/kb/gg/corporate-gateway-guide/content/reference/usefultables.htm#ISO' target='_blank'>currencies</a>" + " (click the link and see <b>ISO currency codes</b>), but not all currencies are supported by all providers. Contact " + "<a href='http://www.worldpay.com/global/support/' target='_blank'>Worldpay support</a>" + " for provider-specific currency details. " + paragraph + "Note that Worldpay cannot process amounts in IDR that include decimal numbers. For payments in IDR, you should therefore not pass any decimal values." + paragraph + "Bear in mind that PaymentsOS requires you to pass amounts in " + "<a href='/docs/minor-currency-units.html' target='_blank'>minor units</a>" + " (this means that the last two digits of the amount are decimals). Since Worldpay cannot process amounts in IDR that include decimal numbers, you must make sure that the last two digits of the amount in minor units are always 00.  For example, you can pass an amount of 1000; you cannot pass an amount of 1010." 
            },
            features: {
                ccards: [
                    {
                        name: features.nocvv,
                        supported: false // TODO check
                    },
                    {
                        name: features.threedsone,
                        supported: false
                    },
                    {
                        name: features.threedsoneexternal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__external","worldpayeu")
                    },
                    {
                        name: features.threedstwointernal,
                        supported: readDataDict(dataDictAuth,"three_d_secure_attributes__internal","worldpayeu")
                    },
                    {
                        name: features.threedstwoexternal,
                        supported: false
                    },
                    {
                        name: features.installments,
                        supported: readDataDict(dataDictAuth,"installments","worldpayeu")
                    },
                    {
                        name: features.statementsoftdescriptor,
                        supported: readDataDict(dataDictPayment,"statement_soft_descriptor","worldpayeu")
                    },
                    {
                        name: features.cof,
                        supported: readDataDict(dataDictAuth,"cof_transaction_indicators","worldpayeu")
                    },
                    {
                        name: features.getsupportedpms,
                        supported: false
                    },
                    {
                        name: features.level23data,
                        supported: readDataDict(dataDictCapture,"level_2_3","worldpayeu")
                    }
                ]
            }
        }
    }

}

function readDataDict(datadict, field, provider) {
    
    if (typeof datadict()[field][provider] != "undefined") {

        return true;
    } 
    else return false;
    
}

function sortStringArray(stringsArrayToSort){
    return stringsArrayToSort.sort();
}

