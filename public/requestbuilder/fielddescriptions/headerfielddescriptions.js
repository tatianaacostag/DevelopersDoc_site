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
var paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0#/reference/tokens/tokens/create-a-token" target="_blank">see the API Reference</a>'+"."
var mdnUserAgentHyperlink = '<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent" target="_blank">see the MDN web docs</a>'+"."

// Strings
var headerfielddescr = {

  "api-version": "The version of the API that should process the request. The latest version is 1.3.0."+linebreak+openBold+"Note: "+closeBold+"The request examples are based on the latest API version (1.3.0). We recommend you use the latest version. If you do not specify a version, the default version (1.0.0) is used.",

  "x-payments-os-env": "The PaymentsOS environment you are operating in. Either"+openCode+"test"+closeCode+"or"+openCode+"live"+closeCode+"."+linebreak+openBold+"Note"+closeBold+": The default of the x-payments-os-env header is"+openCode+" live "+closeCode+"if not specified, or if an unrecognized value is provided.",

  "idempotency-key": "Allows you to send a POST request that is 'idempotent safe'. The " + openCode + "idempotency-key" + closeCode + " must be unique and should only be used in one request. The content of the key is completely up to you. For example, you can use some transaction related string, or generate a random string. Sending an "+ openCode + "idempotency-key" + closeCode + " is optional.",

  "public-key": "Your public authentication key. Grab the key from your business unit configuration.",

  "private-key": "Your private authentication key. Grab the key from your business unit configuration.",

  "app-id": "The ID that uniquely identifies the business unit accepting the payment. Grab the ID from your business unit configuration.",

  "x-client-ip-address": "The IP address of the customer device from which the request is invoked.",

  "x-client-user-agent": "A characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. For more information, "+ mdnUserAgentHyperlink

}

var providerheaderdescr = {

  "braintree": openBold+"Braintree"+closeBold+": Remember to use the header keys from the provider configuration that matches the currency of the payment.",

  "paypal": openBold+"PayPal"+closeBold+": The " + openCode +"idempotency-key" + closeCode+" has a maximum length of 78 characters.",

  "safecharge": openBold+"SafeCharge"+closeBold+": You can request SafeCharge to make "+openCode+"x-client-ip-address"+closeCode+" optional.",

  "credorax": openBold+"Credorax: "+closeBold+ openCode + "x-client-user-agent" + closeCode + " and " + openCode + "x-client-ip-address" + closeCode + " are required with 3DS transactions in the event that the device channel is a browser (passed in field "+openCode+"three_d_secure_attributes.internal.device_channel"+ closeCode+" with a value of " + openCode + "02" + closeCode +".)",

  "payusingleplatform": openBold+"PayU Single Platform: "+closeBold+ openCode + "x-client-user-agent" + closeCode + " and " + openCode + "x-client-ip-address" + closeCode + " are required with 3DS transactions in the event that you pass browser information."
}
