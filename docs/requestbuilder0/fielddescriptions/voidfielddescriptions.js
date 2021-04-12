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
var paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-void" target="_blank">see the API Reference</a>'+"."

// Strings
var fielddescr = {

  chasepaymentech: {

    provider_specific_data__chasepaymentech: openBold+"Notes specific to Chase Paymentech"+closeBold+linebreak+"Parameters specific to Chase Paymentech.",

    provider_specific_data__chasepaymentech___additional_details____onlineReversalIndicator: openBold+"Notes specific to Chase Paymentech"+closeBold+linebreak+"This field is required if you did not configure the 'Attempt Authorization Reversal when Voiding' setting in your Chase Paymentech account." + linebreak + "When voiding an authorization, you can pass in a value of either"+openBold+" Y "+closeBold+"or"+openBold+" N "+closeBold+":"+openul+openli+"Y: Reversal. Chase Paymentech will reverse the authorization. This unfreezes any holds on funds immediately. With this type of void, you may be charged a fee (check with your Chase Paymentech account executive to see if this applies to you)."+closeli+openli+"N: Block before capture. Funds are unfrozen according to the issuing bank's transaction expiration time, and capture is blocked. When choosing this option, no fees apply." + closeli + closeul + "Passing this field overrides the 'Attempt Authorization Reversal when Voiding' setting in your Chase Paymentech account."

  },

  shva: {

    provider_specific_data__shva___additional_details____addendum1: openBold+"Notes specific to Shva"+closeBold+linebreak+"Use this field for passing in additional data required by the card issuing companies. If you omit this field in the void request, then PaymentsOS will take this field from the authorization or charge request (if provided). Maximum number of characters: 98. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum2: openBold+"Notes specific to Shva"+closeBold+linebreak+"Use this field for passing in additional data required by the card issuing companies. If you omit this field in the void request, then PaymentsOS will take this field from the authorization or charge request (if provided). Maximum number of characters: 98. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum1settl: openBold+"Notes specific to Shva"+closeBold+linebreak+"Use this field for passing in additional data required by the card issuing companies. If you omit this field in the void request, then PaymentsOS will take this field from the authorization or charge request (if provided). Maximum number of characters: 298. Note:If you provided a"+openCode+"statement_soft_descript or"+closeCode+" in the create payment request, then we will pass this in this field as well (adding it to any data you added yourself). Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum2settl: openBold+"Notes specific to Shva"+closeBold+linebreak+"Use this field for passing in additional data required by the card issuing companies. If you omit this field in the void request, then PaymentsOS will take this field from the authorization or charge request (if provided). Maximum number of characters: 298. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum3settl: openBold+"Notes specific to Shva"+closeBold+linebreak+"Use this field for passing in additional data required by the card issuing companies. If you omit this field in the void request, then PaymentsOS will take this field from the authorization or charge request (if provided). Maximum number of characters: 298. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum4settl: openBold+"Notes specific to Shva"+closeBold+linebreak+"Use this field for passing in additional data required by the card issuing companies. If you omit this field in the void request, then PaymentsOS will take this field from the authorization or charge request (if provided). Maximum number of characters: 298. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum5settl: openBold+"Notes specific to Shva"+closeBold+linebreak+"Use this field for passing in additional data required by the card issuing companies. If you omit this field in the void request, then PaymentsOS will take this field from the authorization or charge request (if provided). Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____remove_from_batch: openBold+"Notes specific to Shva"+closeBold+linebreak+"Default: "+ openCode+"true"+ closeCode +". Passing a value of " + openCode + "true" + closeCode + " will remove the transaction from the daily batch when the charge or capture is pending. If successfully removed from the batch, we will return a status of " + openCode + "Succeed" + closeCode +". Note that we will also try to release the funds; if this fails (for instance, due to a network error) the status of the transaction will remain " + openCode + "Succeed" + closeCode +".",
  }

}
