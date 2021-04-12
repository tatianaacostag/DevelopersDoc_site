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
var paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-capture" target="_blank">see the API Reference</a>'+"."

// Strings
var fielddescr = {

  chasepaymentech: {

    level_2_3__shipping_address: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__tax_mode: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__discount_amount: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Used for VISA only. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___first_name:  openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. Optional if last name is provided. Maximum length: 30 characters. If combined with " + openCode + "level_2_3.shipping_address.last_name" + closeCode + " ,then the length of both fields combined should not exceed 29 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___last_name:  openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. Optional if first name is provided. Maximum length: 30 characters. If combined with " + openCode + "level_2_3.shipping_address.first_name" + closeCode + " ,then the length of both fields combined should not exceed 29 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___tax_mode: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "With Visa, you cannot pass a value of" + openCode + "nontaxable" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__tax_amount: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data." + paymentsRESTAPIHyperlink,

    level_2_3__order_id: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. Do not include the following characters: <>?;’:”[]\{}|`=~!@#%^&*()_+. Maximum length: 17 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___zip_code:openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. For Zip Code + 4, separate with a hyphen (-). Maximum length: 10 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___line1: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. Maximum length: 30 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___line2: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. Maximum length: 30 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___city: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data.  Maximum length: 20 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___state: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. Maximum length: 2 characters (2 character state code). For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn1: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. The TAA (Transaction Advice Addendum) record is used to further identify the purchase associated with the charge to the cardholder. It is also used to provide specific details about the transaction to the cardholder for tracking purposes. TAAs should be as concise as possible, while still providing adequate information. For example, a TAA of Merchandise would not be acceptable. Maximum length: 40 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn2: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. The TAA (Transaction Advice Addendum) record is used to further identify the purchase associated with the charge to the cardholder. It is also used to provide specific details about the transaction to the cardholder for tracking purposes. TAAs should be as concise as possible, while still providing adequate information. For example, a TAA of Merchandise would not be acceptable. Maximum length: 40 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn3: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. The TAA (Transaction Advice Addendum) record is used to further identify the purchase associated with the charge to the cardholder. It is also used to provide specific details about the transaction to the cardholder for tracking purposes. TAAs should be as concise as possible, while still providing adequate information. For example, a TAA of Merchandise would not be acceptable. Maximum length: 40 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn4: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Stratus only/required for Amex Purchasing Card Data. The TAA (Transaction Advice Addendum) record is used to further identify the purchase associated with the charge to the cardholder. It is also used to provide specific details about the transaction to the cardholder for tracking purposes. TAAs should be as concise as possible, while still providing adequate information. For example, a TAA of Merchandise would not be acceptable. Maximum length: 40 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__shipping_address___country: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "A 3 character ISO-assigned country code. Required for Level 3 Data. If no value is submitted, defaults to the United States (USA). For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__from_shipping_zip_code: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for best interchange rate. Cannot be all zeros or nines. Maximum length: 10 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___discount_amount: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___id: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. Cannot be all zeros. Maximum length: 12 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___commodity_code:  openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Visa.  Maximum length: 12 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___discount_percentage: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Discover only. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___name:  openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. Cannot be all zeros. Maximum length: 35 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___quantity: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. Minimum required quantity: 1. Maximum length: 13 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___tax_amount: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 3 Data. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___tax_percentage: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 3 Data. Maximum length: 5 characters. The interest rate must not exceed 99.99%. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___unit_of_measure: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 3 Data. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___sub_total:  openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 2 and 3 Data. For a general description of this field, " + paymentsRESTAPIHyperlink,

    level_2_3__line_items___unit_price: openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Required for Level 3 Data. For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  credorax: {

    reconciliation_id: openBold+"Notes specific to Credorax"+closeBold+linebreak+"Must be unique and different from the " + openCode +"reconciliation_id" + closeCode +" sent in the Authorization request. The maximum length is 32 characters. For a general description of this field, "+paymentsRESTAPIHyperlink

  },

  wirecard: {

    reconciliation_id: openBold+"Notes specific to Credorax"+closeBold+linebreak+"Must be unique and different from the " + openCode +"reconciliation_id" + closeCode +" sent in the Authorization request. For a general description of this field, "+paymentsRESTAPIHyperlink

  },

  cybersource: {

    reconciliation_id: openBold+"Notes specific to CyberSource"+closeBold+linebreak+"A unique ID generated by you, used for transaction reconciliation. If the provider supports the"+openCode+"reconciliation_id"+closeCode+"then it will be used for the CyberSource Merchant Reference Number and Transaction Reference Number."+linebreak+"Additional information:"+openul+openli+"Not all providers support the"+openCode+"reconciliation_id"+closeCode+"field."+closeli+openli+"For some providers the maximum field length is 22 alphanumeric characters (the UUID field type is too long)"+closeli+closeul+"For a general description of this field, "+paymentsRESTAPIHyperlink,

    amount: openBold+"Notes specific to CyberSource"+closeBold+linebreak+" If not supplied, then the"+openCode+"authorization.amount"+closeCode+"will be used. For a general description of this field, "+paymentsRESTAPIHyperlink

  },

  payusouthafrica: {

    reconciliation_id: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    amount: openBold+"Notes specific to PayU South Africa"+closeBold+linebreak+" If not supplied, then the"+openCode+"authorization.amount"+closeCode+"will be used. If supplied, then the value can different to the authorization amount. For a general description of this field, "+paymentsRESTAPIHyperlink
  },

  payukenya: {

    reconciliation_id: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    amount: openBold+"Notes specific to PayU Kenya"+closeBold+linebreak+" If not supplied, then the"+openCode+"authorization.amount"+closeCode+"will be used. If supplied, then the value can different to the authorization amount. For a general description of this field, "+paymentsRESTAPIHyperlink
  },

  payunigeria: {

    reconciliation_id: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    amount: openBold+"Notes specific to PayU Nigeria"+closeBold+linebreak+" If not supplied, then the"+openCode+"authorization.amount"+closeCode+"will be used. If supplied, then the value can different to the authorization amount. For a general description of this field, "+paymentsRESTAPIHyperlink
  },

  paypal: {

    additional_details__is_final_capture: openBold + "Notes specific to PayPal"+closeBold+linebreak+"Set to " + openCode + "true" + closeCode + " to prevent future captures."

  },

  shva: {

    reconciliation_id: openBold + "Notes specific to Shva" + closeBold + linebreak + "A unique ID generated by you, used for transaction reconciliation. Format: Numbers only, not more than eight digits. Note - If more than eight digits are sent, then only the last eight digits will be used.",

  }


}
