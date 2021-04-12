// HTML in messages
var openCode = "<code>"
var closeCode = "</code>"
var pOpen = "<p>"
var pClose = "</p>"
var linebreak = "<br>"
var openBold = "<b>"
var closeBold = "</b>"

// Strings
var messages = {
  nofieldsrequiredincapture: " does not require any fields in a Capture request.",

  nofieldsrequiredinvoid: " does not require any fields in a Void request.",

  nofieldsrequiredinrefund: " does not require any fields in a Refund request.",

  amountrequiredinsubsequentcaptures: "An"+openCode+"amount"+closeCode+"field is required for the second and subsequent Capture requests.",

  amountrequiredinsubsequentrefunds: "An"+openCode+"amount"+closeCode+"field is required for the second and subsequent Refund requests.",

  authorizerequestnotsupported: ": You cannot use an Authorize request with this provider. See the Provider Integration Guide for a list of supported requests.",

  capturerequestnotsupported: ": You cannot use a Capture request with this provider. See the Provider Integration Guide for a list of supported requests.",

  chargerequestnotsupported: ": You cannot use a Charge request with this provider. See the Provider Integration Guide for a list of supported requests.",

  creditrequestnotsupported: ": You cannot use a Credit request with this provider. See the Provider Integration Guide for a list of supported requests.",

  voidrequestnotsupported: ": You cannot use a Void request with this provider. See the Provider Integration Guide for a list of supported requests.",

  refundrequestnotsupported: ": You cannot use a Refund request with this provider. See the Provider Integration Guide for a list of supported requests.",

  shvacpatureconsiderations: "Shva: Review the items you must consider when creating a Capture. See " + "<a href='/docs/providers/shva.html#considerations-when-creating-a-capture'>Considerations when Creating a Capture</a>" + ".",

  shvachargeconsiderations: "Shva: Review the items you must consider when creating a Charge. See " + "<a href='/docs/providers/shva.html#considerations-when-creating-a-charge'>Considerations when Creating a Charge</a>" + ".",

  shvarefundconsiderations: "Shva: Review the items you must consider when creating a Refund. See " + "<a href='/docs/providers/shva.html#considerations-when-creating-a-refund'>Considerations when Creating a Refund</a>" + ".",

  shvavoidconsiderations: "Shva: Review the items you must consider when creating a Void. See " + "<a href='/docs/providers/shva.html#considerations-when-creating-a-void'>Considerations when Creating a Void</a>" + ".",

  capturereconciliationidnotsupported: " does not support"+openCode+"reconciliation_id"+closeCode+".",

  installmentsnotsupported: openBold+" Installments are not supported"+closeBold+". Installments should therefore not be included in a request. If installments are included, then the"+openCode+"installments.number_of_installments"+closeCode+"value must be set to 1. If it is not 1, then the request will fail.",

  payucitrusindiaredirectaftercharge: "PayU Citrus (India) requires that you redirect your customer for payer authentication after sending a post charge request. For details, see "+'<a href="/docs/providers/payu-citrus.html#redirecting-your-customer-for-authentication" target="_blank">Redirecting your Customer for Authentication</a>'+" in the PayU Citrus (India) Provider Guide.",

  chasepreventrefundhigherthancapture: " To prevent refunding the customer for an amount higher than the captured amount, make sure to set the idempotency key when invoking the refund API request. Instead of doing this in the API request, you can also ask your Chase Paymentech account executive to block refunds if the amount to be refunded is higher than the captured amount.",


  payusadisablecvvoptionals: "PayU South Africa: If you disabled the cvv check in your account, you will need to pass "+openCode+"recurring"+closeCode+" with a value of "+openCode+"true"+closeCode+" in the request's"+openCode+"provider_specific_data"+closeCode+"object. When generating a request, check the "+openBold+"Include optional fields in the output "+closeBold+" checkbox to generate an example body that includes the "+openCode+"recurring"+closeCode+" field.",

  payusadisablecvv: "PayU South Africa: If you disabled the cvv check in your account, you will need to pass "+openCode+"recurring"+closeCode+" with a value of "+openCode+"true"+closeCode+" in the request's"+openCode+"provider_specific_data"+closeCode+"object.",

  payukenyadisablecvvoptionals: "PayU Kenya: If you disabled the cvv check in your account, you will need to pass "+openCode+"recurring"+closeCode+" with a value of "+openCode+"true"+closeCode+" in the request's"+openCode+"provider_specific_data"+closeCode+"object. When generating a request, check the "+openBold+"Include optional fields in the output "+closeBold+" checkbox to generate an example body that includes the "+openCode+"recurring"+closeCode+" field.",

  payukenyadisablecvv: "PayU Kenya: If you disabled the cvv check in your account, you will need to pass "+openCode+"recurring"+closeCode+" with a value of "+openCode+"true"+closeCode+" in the request's"+openCode+"provider_specific_data"+closeCode+"object.",

  payunigeriadisablecvvoptionals: "PayU Nigeria: If you disabled the cvv check in your account, you will need to pass "+openCode+"recurring"+closeCode+" with a value of "+openCode+"true"+closeCode+" in the request's"+openCode+"provider_specific_data"+closeCode+"object. When generating a request, check the "+openBold+"Include optional fields in the output "+closeBold+" checkbox to generate an example body that includes the "+openCode+"recurring"+closeCode+" field.",

  payunigeriadisablecvv: "PayU Nigeria: If you disabled the cvv check in your account, you will need to pass "+openCode+"recurring"+closeCode+" with a value of "+openCode+"true"+closeCode+" in the request's"+openCode+"provider_specific_data"+closeCode+"object.",

  braintreesubmittedsettlementstatus: "All transactions with the Braintree status of "+openCode+"Submitted for settlement"+closeCode+" ,are treated as "+openCode+"pending"+closeCode+" status.",

  payuchilehandlechargeresponse: "PayU Chile: You must handle the response of the charge request. For details, see "+'<a href="/docs/providers/payu-chile.html#handling-the-charge-request-response-for-cash-transactions" target="_blank">Handling the Charge Request Response for Cash Transactions</a>'+" in the PayU Chile Provider Guide.",

  payuargentinahandlechargeresponse: "PayU Argentina: You must handle the response of the charge request. For details, see "+'<a href="/docs/providers/payu-argentina.html#handling-the-charge-request-response-for-cash-transactions" target="_blank">Handling the Charge Request Response for Cash Transactions</a>'+" in the PayU Argentina Provider Guide.",

  payubrazilhandlechargeresponse: "PayU Brazil: You must handle the response of the charge request. For details, see "+'<a href="/docs/providers/payu-brazil.html#handling-the-charge-request-response-for-cash-transactions" target="_blank">Handling the Charge Request Response for Cash Transactions</a>'+" in the PayU Brazil Provider Guide.",

  payucolombiahandlechargeresponse: "PayU Colombia: You must handle the response of the charge request. For details, see "+'<a href="/docs/providers/payu-colombia.html#handling-the-charge-request-response-for-cash-transactions" target="_blank">Handling the Charge Request Response for Cash Transactions</a>'+" in the PayU Colombia Provider Guide.",

  payumexicohandlechargeresponse: "PayU Mexico: You must handle the response of the charge request. For details, see "+'<a href="/docs/providers/payu-mexico.html#handling-the-charge-request-response-for-cash-transactions" target="_blank">Handling the Charge Request Response for Cash Transactions</a>'+" in the PayU Mexico Provider Guide.",

  payuperuhandlechargeresponse: "PayU Peru: You must handle the response of the charge request. For details, see "+'<a href="/docs/providers/payu-peru.html#handling-the-charge-request-response-for-cash-transactions" target="_blank">Handling the Charge Request Response for Cash Transactions</a>'+" in the PayU Peru Provider Guide.",

  captureidmultiplecaptures: "If you sent multiple captures, then passing a " + openCode + "capture_id" + closeCode + " is " + openBold + "required" + closeBold + " so that PaymentsOS can relate the refund to the correct capture (for single captures, " + openCode + "capture_id" + closeCode + " is optional and thus not shown in the example below).",

  amountfromcaptureid: "The " + openCode + "amount" + closeCode + " field is optional (and thus not shown in the example below). If the refund request that is sent does not contain an amount, then the amount is determined using the " + openCode + "capture_id" + closeCode + "(if no " + openCode + "capture_id" + closeCode + " was provided, as may be the case in a single capture, then the full authorization amount is used for the refund amount).",

  showlevel23fields: "To see an example with level 2 and 3 fields, generate a sample request with optional fields.",

  requiredLevel23Fields: openBold + "Beware! " + closeBold + "If you send Level 2 and 3 data, make sure to include all fields required as part of the data you send." + openBold + " Failing to send the fields required by Level 2 and 3 data will cause the request to fail." + closeBold,

  continueAuthFlow: openBold + "The following applies to a 3DS 2 flow." + closeBold +  " Initiating a 3DS transaction through a mobile SDK is not supported (" + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode +" can only have a value of" + openCode + "02" + closeCode+"). If a data collection step was required, then you must invoke the "+'<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/continue-authorization-flow" target="_blank">Continue Authorization Flow</a>' + " API request following the Authorize or Charge request.",

  threeDsShowInIframe: "The response of the "+'<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-an-authorization" target="_blank">Create Authorization</a>' + " API request will include a " + openCode + "provider_specific_data.iframeAllowed" + closeCode + " field, indicating whether you may open the redirection url in an iFrame."
};
