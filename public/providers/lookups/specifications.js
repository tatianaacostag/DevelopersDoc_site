var stringsGenerator = require('./strings.js')
// HTML in messages
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

  const strings = stringsGenerator(providerNameInText);

  return {

    minapiversion: {

      ccards: {

        safecharge: "1.2.0",

        credorax: "1.2.0",

        payuchile: "1.0.0",

        payumexico: "1.0.0",

        payuargentina: "1.0.0",

        payucolombia: "1.0.0",

        payubrazil: "1.0.0",

        payupanama: "1.0.0",

        payuperu: "1.0.0",

        alfabank: "1.1.0",

        braintree: "1.0.0",

        chasepaymentech: "1.1.0",

        cybersource: "1.0.0",

        payucitrusindia: "1.0.0",

        payeasecup: "1.1.0",

        payuindia: "1.2.0",

        payukenya: "1.1.0",

        payuturkey: "1.0.0",

        payuromania: "1.0.0",

        payusouthafrica: "1.1.0",

        payunigeria: "1.1.0",

        rsb: "1.1.0",

        sberbank: "1.1.0",

        payurussia: "1.0.0",

        stripe: "1.0.0",

        worldpayeu: "1.0.0",

        wirecard: "1.1.0",

        shva: "1.1.0",

        vantiv: "1.1.0",

        payusingleplatform: "1.0.0",

        dalenys: "1.2.0",

        payeezy: "1.2.0"

      },

      dredirect: {

        payuchile: "1.2.0"

      },

      cash: {

        payuchile: "1.0.0",

        payumexico: "1.1.0",

        payuargentina: "1.1.0",

        payucolombia: "1.0.0",

        payubrazil: "1.0.0",

        payuperu: "1.0.0"

      },

      banktransfer: {

        payucolombia: "1.0.0",

        payucitrusindia: "1.0.0",

        payuturkey: "1.0.0",

        payurussia: "1.0.0",

        payusingleplatform: "1.0.0",

        payusouthafrica: "1.2.0",

        payukenya: "1.2.0",

        payunigeria: "1.2.0"

      },

      ewallet: {

        paypal: "1.2.0",

        payusouthafrica: "1.2.0",

        payukenya: "1.2.0"        

      },

      loyalty: {

        payusouthafrica: "1.2.0"
      }


    },

    regions: {

      ccards: {

        payusingleplatform: "Poland, Czech Republic, Hungary, Slovakia",

        paypal: "See " + "<a href='https://www.paypal.com/us/webapps/mpp/country-worldwide' target='_blank'>PayPal Countries and Regions</a>."
      },

      banktransfer: {

        payusingleplatform: "Poland, Czech Republic, Hungary, Slovakia"
      },

    },

    currencies: {

      ccards: {

        safecharge: "AED, ARS, AUD, AZN, BGN, BHD, BND, BRL, BYN, BYR, CAD, CHF, CLP, CNH, CNY, COP, CRC, CZK, DKK, DZD, EEK, EGP, EUR, GBP, GEL, HKD, HRK, HUF, IDR, INR, IQD, ISK, JOD, KGS, KRW, KWD, KZT, LBP, LTL, LVL, MAD, MDL, MXN, MYR, NIS, NOK, NZD, OMR, PEN, PHP, PKR, PLN, QAR, RON, RSD, RUB, SAR, SEK, SGD, SKK, THB, TND, TRY, TWD, UAH, USD, UYU, VEF, VND, YEN, YER, ZAR.",

        credorax: strings.supportsRangeOfCurrencies,

        payuchile: "CLP",

        payumexico: "MXN, USD",

        payuargentina: "ARS, USD",

        payucolombia: "COP, USD",

        payubrazil: "BRL, USD",

        payupanama: "USD",

        payuperu: "PEN, USD",

        alfabank: strings.supportsRangeOfCurrencies,

        braintree: "See " + "<a href='https://developers.braintreepayments.com/reference/general/currencies' target='_blank'>Braintree Currencies</a>.",

        chasepaymentech: "For charging a customer:" + linebreak + "DZD, ARS, AMD, AUD, BDT, BZD, BOB, BWP, BRL, GBP, BND, BGN, BIF, XOF, XAF, CAD, KHR, CLP, CNY, COP, KMF, CRC, CZK, DKK, DJF, DOP, EGP, ETB, EUR, GEL, GTQ, HNL, HKD, HUF, INR, IDR, ILS, JMD, JPY, KZT, KES, KGS, LBP, MOP, MYR, MUR, MXN, MDL, MAD, NAD, NPR, NZD, NIO, NGN, NOK, PKR, PAB, PYG, PEN, PHP, PLN, QAR, RUB, RWF, SAR, SGD, SOS, ZAR, KRW, LKR, SEK, CHF, TWD, TZS, THB, TOP, TTD, TRY, UGX, UAH, AED,  UYU, USD, UZS,  YER, AZN, BYN, GHS, GNF, ISK, MGA, MZN, RON, VES, VND" + linebreak  + "For settlements:" + linebreak + "CAD, GBP, EUR, AUD, USD",

        cybersource: "CyberSource supports many " + "<a href='http://apps.cybersource.com/library/documentation/sbc/quickref/currencies.pdf' target='_blank'>currencies</a>" + ", but not all currencies are supported by all providers. Contact " + "<a href='https://support.cybersource.com/' target='_blank'>CyberSource support</a>" + " for provider-specific currency details.",

        payucitrusindia: "INR",

        payeasecup: "CNY",

        payuindia: "USD, EUR, JPY, GBP, CHF, SEK, DKK, NOK, SGD, AUD, CAD, AED, HKD, QAR, SAR, OMR, ZAR, MYR, KWD, MUR, LKR, KES, PHP, NZD, THB, BDT, CNY, NPR, BHD, INR",

        payukenya: "KES, USD",

        payuturkey: "TRY, USD, EUR, RUB, GBP, RON, CHF, DKK, SEK, and KWD.",

        payuromania: "RON, USD, EUR, GBP, HUF, BGN, CZK, DKK, PLN, SEK, HRK, and UAH.",

        payusouthafrica: "ZAR",

        payunigeria: "NGN, USD",

        rsb: "RUB",

        sberbank: "RUB",

        payurussia: "RUB",

        stripe: "See the " + "<a href='https://stripe.com/docs/currencies#supported-charge-currencies' target='_blank'>Stripe documentation</a>" + ".",

        worldpayeu: "Worldpay supports many " + "<a href='http://support.worldpay.com/support/kb/gg/corporate-gateway-guide/content/reference/usefultables.htm#ISO' target='_blank'>currencies</a>" + " (click the link and see <b>ISO currency codes</b>), but not all currencies are supported by all providers. Contact " + "<a href='http://www.worldpay.com/global/support/' target='_blank'>Worldpay support</a>" + " for provider-specific currency details.",

        wirecard: "Wirecard supports all currencies.",

        shva: "ILS, USD, EUR, GBP, AUD, CAD, CHF, DKK, EGP, JOD, NOK, SEK",

        vantiv: "Vantiv supports all currencies with 2 or less digits after the decimal separator. See " + "<a href='/minor-currency-units.html' target='_blank'>Minor Units Format</a>" + ". Note that a Vantiv merchant account can only be associated with one currency.",

        payusingleplatform: "BGN, CHF, CZK, DKK, EUR, GBP, HRK, HUF, NOK, PLN, RON, RUB, SEK, UAH, USD",

        dalenys: "Over 100 currencies are supported. See " + "<a href='https://www.dalenys.com/en/areas-of-expertise/international-expansion/' target='_blank'>currencies.</a>" ,

        payeezy: "See " + "<a href='https://developer.payeezy.com/faqs/what-currencies-does-payeezy-support' target='_blank'>Payeezy Currencies</a>.",

      },

      dredirect: {

        payuchile: "CLP",

      },

      cash: {

        payuchile: "CLP",

        payumexico: "MXN, USD",

        payuargentina: "ARS, USD",

        payucolombia: "COP, USD",

        payubrazil: "BRL, USD",

        payuperu: "PEN, USD"

      },

      banktransfer: {

        payucolombia: "COP, USD",

        payucitrusindia: "INR",

        payuturkey: "TRY, USD, EUR, RUB, GBP, RON, CHF, DKK, SEK, and KWD.",

        payurussia: "RUB",

        payusingleplatform: "CZK, EUR, PLN"

      },

      ewallet: {

        paypal: "See " + "<a href='https://www.paypal.com/us/webapps/mpp/country-worldwide' target='_blank'>PayPal Currency Codes</a>."
      }


    },

    paymentmethods: {

      ccards: {

        safecharge: displayListItems([strings.visa, strings.mastercard], true) +
          "Contact your SafeCharge account representative if you require additional payment methods.",

        credorax: displayListItems([strings.visa, strings.mastercard, strings.meastro], true),

        payuchile: displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners], true),

        payumexico: displayListItems([strings.visa, strings.mastercard, strings.amex], true),

        payuargentina:
          "Global credit card vendors:" + displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners], true) +
          "Local card vendors:" + displayListItems(["Argencard", "Cabal", "Cencosud", "Naranja", "Shopping"], true),

        payucolombia: displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners], true),

        payubrazil:
          "Global credit card vendors:" + displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners], true) +
          "Local card vendors:" + displayListItems(["Elo", "Hipercard"], true),

        payupanama: strings.mastercard,

        payuperu: displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners], true),

        alfabank: displayListItems([strings.visa, strings.mastercard, strings.jcb, strings.mir], true),

        braintree:
          "US merchant accounts:" + displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners, strings.jcb, strings.discover], true) +
          "EU merchant accounts:" + displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners + " (only EUR, GBP, USD", strings.jcb, strings.meastro, strings.discover + " (only EUR, GBP, USD)"], true),

        chasepaymentech: displayListItems([strings.visa, strings.mastercard, strings.discover, "Discover Diners", strings.americanexpress, strings.jcb, "ChaseNet"],true),

        cybersource: "Contact " + "<a href='https://support.cybersource.com/' target='_blank'>CyberSource support</a>" + " for provider-specific details.",

        payucitrusindia: displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners, strings.jcb, strings.meastro, strings.rupay], true),

        payeasecup: "UnionPay credit and debit cards (domestic) - CUP (China Union Pay)." + linebreak + "For list of supported banks, contact Payease.",

        payuindia: displayListItems([strings.visa, strings.mastercard, strings.amex, strings.diners, strings.jcb, strings.meastro, strings.rupay], true),

        payukenya: displayListItems([strings.mastercard, strings.visa], true),

        payuturkey: "Global card vendors: " + displayListItems([strings.visa, strings.mastercard, strings.meastro, strings.diners, strings.americanexpress, strings.jcb, strings.carteblanche, strings.discover, strings.australianbankcard, strings.cirrus, strings.visaplus, strings.visaelectron, strings.mir], true) + "Local card vendor: Troy",

        payuromania: "Credit cards with installments: " + displayListItems([strings.visa, strings.visaelectron, strings.mastercard, strings.meastro], true) +
          "Credit cards without installments: " + displayListItems(["BRDF", "CARD_AVANTAJ", "STAR_BT", "RAIFFEISEN", "GARANTI_RO", "BCR_INSTALLMENTS", "ALPHABANK_INSTALLMENTS", "OPTIMO", "BRD_INSTALLMENTS"], true) + "Before starting your implementation, you should verify with your PayU Romania Account Manager, which of the payment methods with installments are enabled in your account.",

        payusouthafrica: displayListItems([strings.mastercard, strings.visa, strings.amex, strings.diners], true),

        payunigeria: displayListItems([strings.mastercard, strings.visa, strings.amex, strings.diners], true),

        rsb: displayListItems([strings.visa, strings.amex, strings.diners, strings.jcb, strings.mir, strings.mastercard], true),

        sberbank: displayListItems([strings.visa, strings.mastercard, strings.mir], true),

        payurussia: displayListItems([strings.visa, strings.visaelectron, strings.mastercard, strings.meastro, strings.mir], true),

        stripe: displayListItems([strings.visa, strings.mastercard, strings.americanexpress, strings.discover, strings.diners, strings.jcb], true),

        worldpayeu: displayListItems([strings.visa, strings.amex, strings.diners, strings.jcb, strings.meastro, strings.mastercard, "AirPlus", "Aurore", "Carte Bancaire", "Carte Bleue", "Dankort", strings.discover, "GE Capital", "UATP"], true) + linebreak + "Click " + "<a href='http://support.worldpay.com/support/kb/gg/corporate-gateway-guide/content/reference/usefultables.htm#Payment' target='_blank'>here</a>" + " to see the list of supported payment methods on Worldpay's site, or contact " + "<a href='http://www.worldpay.com/global/support' target='_blank'>Worldpay support</a>" + " for more information.",

        wirecard: "See " + '<a href="https://document-center.wirecard.com/display/PTD/Appendix+D%3A+Card+Types">Card Types</a>' + " in the Wirecard documentation.",

        shva: displayListItems([strings.visa, strings.mastercard, "Isracard", strings.diners, strings.amex, strings.jcb, strings.meastro, "PL (local cards, for example, a gift card from Leumicard or Isracard."], true),

        vantiv: displayListItems([strings.visa, strings.mastercard, strings.jcb, strings.amex, strings.diners, strings.discover], true),

        payusingleplatform: displayListItems([strings.visa, strings.meastro, strings.mastercard], true),

        dalenys: displayListItems([strings.visa, strings.mastercard, strings.amex, strings.cartebancaire],true),

        payeezy: displayListItems([strings.americanexpress,strings.visa,strings.mastercard,strings.jcb,strings.diners,strings.discover],true)

      },

      dredirect: {

        payuchile: "Redcompra"

      },

      cash: {

        payuchile: "MULTICAJA",

        payumexico: displayListItems(["OXXO", "BANK_REFERENCED. Payment office: BANCOMER", "SEVEN_ELEVEN", "OTHERS_CASH_MX"], true),

        payuargentina: displayListItems(["RAPIPAGO", "COBRO_EXPRESS", "SEVEN_ELEVEN", "PAGOFACIL"], true),

        payucolombia: displayListItems(["BALOTO", "EFECTY", "BANK_REFERENCED. Payment offices: Davivienda, Banco de Bogotá, Bancolombia.", "OTHERS_CASH. Payment offices: PagaTodo, Gana Gana, Gana, Acertemos, Apuestas Cúcuta 75, Su Chance, La Perla, Apuestas Unidas, JER."], true),

        payubrazil: "BOLETO_BANCARIO",

        payuperu: displayListItems(["BCP", "PAGOEFECTIVO"], true),

      },

      banktransfer: {

        payucolombia: "PSE (bank transfers)",

        payucitrusindia: displayListItems(["Netbanking", "UPI"], true),

        payuturkey: displayListItems(["BKM", "UPT", "COMPAY", "WIRE"], true),

        payurussia: "QIWI",

        payusingleplatform: displayListItems(["PBL (Pay by Link)", "payment_wall"], true),

        payusouthafrica: displayListItems(["EFT","EFT_PRO"],true),

        payukenya: "MOBILE_BANKING",

        payunigeria: "EFT_BANK_TRANSFER"

      },

      ewallet: {

        paypal: displayListItems(["PayPal Express Checkout", "PayPal Billing Agreement"],true),

        payusouthafrica: displayListItems(["MASTERPASS","VISA_CHECKOUT","MOBICRED"],true),

        payukenya: displayListItems(["MPESA","EQUITEL","AIRTEL_MONEY"],true)


      },
      
      loyalty: {

        payusouthafrica: displayListItems(["DISCOVERYMILES","EBUCKS"],true)

      }


    },

    requests: {

      ccards: {

        safecharge: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest, strings.credit],true),

        credorax: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest, strings.credit],true),

        payuchile: displayListItems([strings.charge, strings.refund],true) +
          "Limitations:" + displayListItems([strings.refundWithoutPartial, strings.payuLatamPayOSTestEnvNoRequestsSupported]),

        payumexico: displayListItems([strings.authorize, strings.capture, strings.charge, strings.refundPartial],true) +
          "Limitations:" + displayListItems([strings.captureWithoutPartial, strings.PartialRefundSupportedForPaymentMethods + " " + strings.visa + ", " + strings.mastercard, strings.AuthCaptureOnlySupportedForLocalCurr, strings.payuLatamPayOSTestEnvAuthOnly]),

        payuargentina: displayListItems([strings.authorize, strings.capture, strings.charge, strings.refundPartial, strings.voidrequest],true) +
          "Limitations:" + displayListItems([strings.captureWithoutMultiple, strings.PartialRefundSupportedForPaymentMethods + " " + strings.visa + ", " + strings.mastercard + ", " + strings.amex + ", " + strings.diners + ", " + "Argencard", strings.AuthCaptureOnlySupportedForLocalCurr, strings.payuLatamPayOSTestEnvAuthCaptureOnly]),

        payucolombia: displayListItems([strings.charge, strings.refundPartial],true) +
          "Limitations:" + displayListItems(["Partial refunds require that you send unique partial refund requests.", strings.payuLatamPayOSTestEnvNoRequestsSupported]),

        payubrazil: displayListItems([strings.authorize, strings.capture, strings.charge, strings.refundPartial, strings.voidrequest],true) +
          "Limitations:" + displayListItems([strings.captureWithoutPartial, strings.PartialRefundSupportedForPaymentMethods + " " + strings.visa + ", " + strings.mastercard + ", " + strings.amex + ", " + strings.diners, strings.AuthCaptureOnlySupportedForLocalCurr, strings.payuLatamPayOSTestEnvAuthCaptureOnly]),

        payupanama: displayListItems([strings.charge, strings.refund],true) +
          "Limitations:" + displayListItems([strings.refundWithoutPartial, strings.payuLatamPayOSTestEnvNoRequestsSupported]),

        payuperu: displayListItems([strings.authorize, strings.capturePartial, strings.charge, strings.refundPartial, strings.voidrequest],true) +
          "Limitations:" + displayListItems([strings.AuthCaptureOnlySupportedForLocalCurr, strings.payuLatamPayOSTestEnvAuthCaptureOnly]),

        alfabank: displayListItems([strings.authorize, strings.capturePartial, strings.charge, strings.refundPartialMultiple, strings.voidrequest],true) +
          "Limitations:" + " Void is only supported after Authorize",

        braintree: displayListItems([strings.authorize, strings.capture, strings.charge, strings.refundMultiple, strings.voidrequest],true) +
          "Limitations:" + displayListItems([strings.captureWithoutMultiple, strings.installmentsNotSupported]),

        chasepaymentech: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest + ". If you void a Capture, make sure to do so  before the nightly batch. Else the Void will fail.", strings.credit],true) + 
          "Supported Void types:" + openul +
          openli + "Block before capture: Funds are unfrozen according to the issuing bank's transaction expiration time, and capture is blocked." + closeli +
          openli + "Reversal: This type of Void unfreezes the funds immediately." + closeli + closeul + "The type of Void request that is invoked is determined by the " + openCode + "onlineReversalIndicator" + closeCode + " field, which you may optionally pass in the " + openCode + "provider_specific_data" + closeCode + " object of the Void request. For an example, use the " + strings.bodyBuilderDocsURL + " to generate a Void request with optional fields.",

        cybersource: displayListItems([strings.authorizePartial, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest + ". Void after capture on the same day is supported (before the nightly batch)."],true) +
          "Limitations:" + openul +
          openli + "Support for multiple/partial Capture depends on the specific provider." + closeli +
          openli + "Support for multiple/partial Refund depends on the specific provider." + closeli + closeul,

        payucitrusindia: displayListItems([strings.charge, strings.refund],true) +
          "Limitations:" + linebreak +
          "The Indian Central Bank has a requirement that every POST Charge request must be accompanied by a customer authentication session. Therefore, after sending a POST Charge request, you'll need to redirect your customer to a payer authentication page. For more information, see " + '<a href="./payu-citrus.html#redirecting-your-customer-for-authentication">Redirecting your Customer for Authentication</a>' + " below",

        payuindia: displayListItems([strings.charge, strings.refundPartialMultiple],true),

        payeasecup: displayListItems([strings.charge, strings.refundPartialMultiple],true) + "Supported Charge flows:" + openul +
          openli + "Non-recurring shopper flow (SMS-based customer authentication):" + closeli +
          openli + "Recurring shopper flow (no SMS authentication)" + closeli + closeul + "The type of Charge flow that is invoked is determined by the " + openCode + "sms_validation_required" + closeCode + " field, which you may optionally pass in the " + openCode + "provider_specific_data" + closeCode + " object of the Charge request. For an example, use the " + 
          strings.bodyBuilderDocsURL + " to generate a Charge request with optional fields.",

        payukenya: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest],true),  

        payuturkey: displayListItems([strings.authorize, strings.capturePartial, strings.refundPartialMultiple, strings.voidrequest]) +
          "Limitations:" + linebreak + "Support for partial Capture depends on the specific acquirer.",

        payuromania: displayListItems([strings.authorize, strings.capturePartial, strings.refundPartial, strings.voidrequest],true) +
          "Limitations:" + linebreak + "Support for partial Capture depends on the specific acquirer.",

        payusouthafrica: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest],true),

        payunigeria: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest],true),

        rsb: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refundPartialMultiple, strings.voidrequest],true),

        sberbank: displayListItems([strings.authorize, strings.capturePartial, strings.charge, strings.refundPartialMultiple, strings.voidrequest],true) +
          "Limitations:" + linebreak + "Void is only supported after Authorize.",

        payurussia: displayListItems([strings.authorize, strings.capture, strings.refund, strings.voidrequest],true),

        stripe: displayListItems([strings.authorize, strings.capturePartial, strings.charge, strings.refundPartialMultiple, strings.voidrequest],true) +
          "Limitations:" + linebreak + strings.captureWithoutMultiple,

        worldpayeu: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.refundPartialMultiple, strings.voidrequest, strings.credit],true),

        wirecard: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.refund, strings.voidrequest],true),

        shva: displayListItems([strings.authorize, strings.capturePartial, strings.charge, strings.refundMultiple, strings.voidrequest + ". Void after capture on the same day is supported (before the nightly batch).", strings.credit],true),

        vantiv: displayListItems([strings.authorize, strings.capturePartial, strings.charge, strings.refundPartial, strings.voidrequest + ". Supported for valid authorizations. Void is also supported for Capture and Charge requests within the same day."],true) + "Limitations:" + openul +
          openli + "An authorization is valid for seven days for MASTERCARD, VISA, and AMEX. For DISCOVER it is valid for ten days." + closeli +
          openli + "Vantiv recommends to leave at least a one minute 'processing time gap' between the POST Authorize and POST Void requests." +
          openli + "Partial capture  is only supported for USD or CAD." + closeli +
          openli + "Partial refund is not supported with AMEX.",

        payusingleplatform: displayListItems([strings.authorize,strings.capture,strings.refundPartial,strings.voidrequest],true) +
        "Limitations:" + linebreak + strings.captureWithoutPartial,

        dalenys: displayListItems([strings.authorize,strings.capturePartial,strings.charge,strings.refundPartialMultiple,strings.credit],true) +
        "Limitations:" + linebreak + "Partial and multiple capture depend on your MCC. Contact your Dalenys payment manager for more information.",

        payeezy: displayListItems([strings.authorize,strings.capturePartialMultiple,strings.charge,strings.refundPartialMultiple,strings.voidrequest],true)

      },

      dredirect: {

        payuchile: strings.charge

      },

      cash: {

        payuchile: strings.charge,

        payumexico: strings.charge,

        payuargentina: strings.charge,

        payucolombia: strings.charge,

        payubrazil: strings.charge,

        payuperu: strings.charge

      },

      banktransfer: {

        payucolombia: strings.charge,

        payucitrusindia: displayListItems([strings.charge, strings.refund]) +
          "Limitations:" + linebreak +
          "The Indian Central Bank has a requirement that every POST Charge request must be accompanied by a customer authentication session. Therefore, after sending a POST Charge request, you'll need to redirect your customer to the customer's bank authentication site. For more information, see " + '<a href="./payu-citrus.html#redirecting-your-customer-for-authentication">Redirecting your Customer for Authentication</a>' + " below",

        payuturkey: strings.authorize,

        payurussia: strings.authorize,

        payusingleplatform: strings.authorize,

        payusouthafrica: strings.charge,

        payukenya: strings.charge,

        payunigeria: strings.charge

      },

      ewallet: {

        paypal: displayListItems([strings.authorize, strings.capturePartialMultiple, strings.charge, strings.voidrequest, strings.refundPartialMultiple]) + "Limitations:" + linebreak + "Multiple refunds can be made as long as the cumulative refunded amount does not exceed the original transaction value.",

        payusouthafrica: displayListItems([strings.charge,strings.authorize,strings.capture],true),

        payukenya: strings.charge
      },

      loyalty: {

        payusouthafrica: displayListItems([strings.authorize,strings.capture,strings.charge],true)
      }
    },

    cvvtransactionswithout: {

      ccards: {

        payuchile: strings.notsupported,

        payumexico: strings.supported,

        credorax: strings.supported,

        payuargentina: strings.supported + ". Not supported with " + strings.visa,

        payucolombia: strings.supported,

        payubrazil: strings.supported,

        payukenya: strings.supported,

        payupanama: strings.notsupported,

        payuperu: strings.supported,

        alfabank: strings.supported,

        sberbank: strings.supported,

        chasepaymentech: strings.supported,

        payusouthafrica: strings.supported,

        payunigeria: strings.supported,

        rsb: strings.supported,

        payusingleplatform: strings.supported,

        dalenys: strings.supported,

        payeezy: strings.supported
      }



    },

    threeds: {

      ccards: {

        alfabank: strings.notsupported,
        braintree: strings.notsupported,
        chasepaymentech: strings.notsupported,
        credorax: strings.notsupported,//only send external
        cybersource: strings.notsupported,
        dalenys: strings.supported,
        payeasecup: strings.notsupported,
        payuargentina: strings.notsupported,
        payubrazil: strings.notsupported,
        payuchile: strings.notsupported,
        payucitrusindia: strings.supported,
        payucolombia: strings.notsupported,
        payuindia: strings.supported,
        payukenya: strings.supported,
        payumexico: strings.notsupported,
        payunigeria: strings.supported,
        payupanama: strings.notsupported,
        payuperu: strings.notsupported,
        payuromania: strings.supported,
        payurussia: strings.supported,
        payusingleplatform: strings.supported,
        payusouthafrica: strings.supported,
        payuturkey: strings.supported,
        rsb: strings.supported,
        safecharge: strings.supported,
        sberbank: strings.notsupported,
        shva: strings.notsupported,
        stripe: strings.notsupported,
        vantiv: strings.notsupported,
        wirecard: strings.notsupported,//only send external
        worldpayeu: strings.notsupported,
        payeezy: strings.notsupported
      }



    }


  }

}

function displayListItems(paymentmethods, sort) {

  if (sort) paymentmethods.sort();

  var paymentMethodList = openul;

  for (var paymentmethod of paymentmethods) {
    paymentMethodList = paymentMethodList + openli + paymentmethod + closeli
  }

  return paymentMethodList + closeul

}