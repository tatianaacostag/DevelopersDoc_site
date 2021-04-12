var controlCenterURL =  `<a href='https://control.paymentsos.com/login'>PaymentsOS Control Center</a>`
var authenticationrequired = "In the " + controlCenterURL +", configure the following credentials:"
var webHooksDocsURL = "<a href='/webhooks.html'>webhooks</a>"
var bodyBuilderDocsURL = "<a href='/providers.html'>Bodybuilder</a>"
var flowsOperationsOverviewDocsURL = "<a href='/flows_operations_overview.html'>Flows and Operations</a>"
var payLatamValidateUniqueURL =  "<a href='http://developers.payulatam.com/en/administrative_module/configuration.html' target='_blank'>validate unique</a>"
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



module.exports = (providerNameInText) => ({
    // general texts
    notApplicable: "Not Applicable",
    flowsOperationsOverviewDocsURL: `${flowsOperationsOverviewDocsURL}`,
    bodyBuilderDocsURL: `${bodyBuilderDocsURL}`, 
    controlCenterURL: `${controlCenterURL}`,
    inTheOPaymentsOSControlCenter: `In the ${controlCenterURL}, `,
    authenticationrequired: `In the ${controlCenterURL}, configure the following credentials: `,
    required: "Required",
    optional: "Optional",
    username: `The user name supplied by ${providerNameInText}`,
    password: `The password name supplied by ${providerNameInText}`,
    inYourProviderAccount: `In your ${providerNameInText} account, `,
    disableCVVInYourAccount: `In your ${providerNameInText} account, disable the CVV check if desired.`,
    configureWebhooks: `In the ${controlCenterURL}, register ${webHooksDocsURL} to be notified when a transaction changes its status.`,
    recommended3ds: "This is recommended if you enabled 3DS.",
    canOnlyBeDoneByProviderSupport: `This can only be done by ${providerNameInText} support.`,
    contactProviderSupport: `Contact ${providerNameInText} support for assistance.`,
    configureTheCurrenciesToUse: "configure the currencies you want to use in transactions. ",
    authentication: `${authenticationrequired}  `,
    supportsRangeOfCurrencies: providerNameInText + " supports a wide range of currencies. Refer to the " + providerNameInText + " documentation for a complete list of supported currencies.",
    supported: "Supported",
    notsupported: "Not supported",
    AuthCaptureOnlySupportedForLocalCurr: "Authorize and Capture are only supported for the local currency, USD is not supported.",
    authOnlySupportedForLocalCurr: "Authorize is only supported for the local currency, USD is not supported.",
    captureOnlySupportedForLocalCurr: "Capture is only supported for the local currency, USD is not supported.",
    PartialRefundSupportedForPaymentMethods: "Partial refund is only supported for the following payment methods: ",
    asynchIfTimeout: "The request is asynchronous in the event of a timeout.",
    asyncOrSyncDependingOnSetup: "The request can be synchronous or asynchronous, depending on your setup.",
    asyncOrSyncDependingOnThreeDS: "The request can be synchronous or asynchronous, depending on whether you implemented a 3DS flow.",
    captureIsManualAfterAuth: `After the Authorize request, ${providerNameInText} will capture the funds manually. You should thus not invoke a Capture request yourself. To receive a notification when the Capture is done, register ${webHooksDocsURL} and enable notifications for Create Capture events.`,

    // Tooltips
    threeDSMpi: "If you use an MPI (merchant plug-in) to authorize a card using 3DSecure, then you can pass the 3DS data returned from the MPI in your PaymentsOS transaction requests",
    cof: "A stored credential flag indicates whether you are using a customer's stored card information in a transaction request. If you set this flag, we will pass it onto the provider you are transacting against.",

    // PayU Latam Texts
    payuLatamAccountID: `The identifier of the account in ${providerNameInText}`,
    payuLatamMerchantID: `The merchant ID in ${providerNameInText}`,
    payLatamValidateUniqueURL: `${payLatamValidateUniqueURL}`,
    payuLatamGetListOfMinPaymentAmounts: `Contact PayU Latam Support to get a list of the minimum payment amounts required by the payment methods that you intend to use. ${linebreak} ${linebreak} To avoid unnecessary request failures, we recommend that you include some 'minimum value' validation for the transaction ${openCode} payment.amount ${closeCode} in your system.`,
    payuLatamSelectLatamInControlCenter: `When creating a new provider configuration in the ${controlCenterURL}, select PayU Latam as the provider.`,
    payuLatamPayOSTestEnvAuthCaptureOnly: "The PaymentsOS test environment only supports Authorize and Capture requests (this is a limitation of the PayU Latam sandbox environment).",
    payuLatamPayOSTestEnvAuthOnly: "The PaymentsOS test environment only supports Authorize requests (this is a limitation of the PayU Latam sandbox environment).",
    payuLatamPayOSTestEnvNoRequestsSupported: "The PaymentsOS test environment does not support the requests listed (this is a limitation of the PayU Latam sandbox environment).",

    // Requests
    authorize:"Authorize",
    capture:"Capture",
    charge:"Charge",
    refund:"Refund",
    voidrequest:"Void",
    credit:"Credit",

    authorizePartial:"Authorize (including partial)",
    refundPartial:"Refund (including partial)",
    capturePartial:"Capture (including partial)",
    capturePartialMultiple:"Capture (including multiple/partial)",
    refundPartialMultiple:"Refund (including multiple/partial)",
    refundMultiple:"Refund (including multiple)",
    captureWithoutPartial:"Partial Capture is not supported. Sending less than the full amount will generate an error.",
    captureWithoutMultiple:"Multiple Captures are not supported.",
    refundWithoutPartial:"Partial Refund is not supported.",
    installmentsNotSupported:"Installments are not supported",


    // Payment Methods
    visa:"VISA",
    visaplus:"VISA Plus",
    visaelectron:"VISA Electron",
    mastercard:"MASTERCARD",
    jcb:"JCB",
    mir:"MIR",
    meastro:"MAESTRO",
    amex:"AMEX",
    diners:"DINERS",
    discover:"DISCOVER",
    rupay:"RUPAY",
    americanexpress:"American Express",
    carteblanche:"Carte Blanche",
    cartebancaire:"Carte Bancaire",
    australianbankcard:"Australian Bankcard",
    cirrus:"Cirrus",
   
})

