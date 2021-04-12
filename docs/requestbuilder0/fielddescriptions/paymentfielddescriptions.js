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
var paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-payment" target="_blank">see the API Reference</a>' + "."

var retrieveCustomerRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/retrieve-a-customer-by-customer-reference" target="_blank">grab the ID from an existing customer record</a>'

var associateCustWithPaymentDOCArgentinaHyperlink = '<a href="/providers/payu-argentina.html#associating-a-customer-with-a-payment" target="_blank"> associate a customer with the payment</a>'

var associateCustWithPaymentDOCChileHyperlink = '<a href="/providers/payu-argentina.html#associating-a-customer-with-a-payment" target="_blank"> associate a customer with the payment</a>'

var countryCodeHyperlink = '<a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3" target="_blank"> ISO 3166-1 alpha-3</a>'

// Strings
var fielddescr = {

  credorax: {

    order__id: openBold + "Notes specific to Credorax" + closeBold + linebreak + "The maximum length is 32 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    // billing_address__first_name: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Maximum length in combination with " + openCode + "billing_address.last_name" + closeCode +": 50 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    // billing_address__last_name: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Maximum length in combination with " + openCode + "billing_address.first_name" + closeCode +": 50 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__city: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Minimum length 3 characters,  maximum length 30 characters. Only the following characters are allowed: [a-zA-Z\ \-]. " + openBold + "Important note:" + closeBold + " This field is required when initiating a 3D Secure transaction." + linebreak + "For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__country: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when initiating a 3D Secure transaction. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__line1: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when initiating a 3D Secure transaction. Only the following characters are allowed:  [a-zA-Z0-9\ \-]. Both " + openCode + "billing_address.line1" + closeCode + "and " + openCode + "billing_address.line2" + closeCode + " are used to populate the billing address street name and number. If the length of " +"billing_address.line1" + closeCode + " does not suffice, you can use " + openCode +  "billing_address.line2" + closeCode + " to extend the address information. The minimum length is 4 characters. The maximum length combined with " + openCode + "billing_address.line2" + closeCode + "must not exceed 50 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__line2: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when initiating a 3D Secure transaction. Only the following characters are allowed:  [a-zA-Z0-9\ \-]. Both " + openCode + "billing_address.line1" + closeCode + "and " + openCode + "billing_address.line2" + closeCode + " are used to populate the billing address street name and number. If the length of " + openCode + "billing_address.line1" + closeCode + " does not suffice, you can use " + openCode +  "billing_address.line2" + closeCode + " to extend the address information. The maximum length combined with " + openCode + "billing_address.line1" + closeCode + "must not exceed 50 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__zip_code: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when initiating a 3D Secure transaction. For a general description of this field," + paymentsRESTAPIHyperlink,

    shipping_address: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when initiating a 3D Secure transaction. For a general description of this field," + paymentsRESTAPIHyperlink,

    shipping_address__country: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the " + openCode + "three_d_secure_attributes.internal.address_match" + closeCode + " field has a value of " + openCode + "false" + closeCode + ". For a general description of this field," + paymentsRESTAPIHyperlink,

    shipping_address__line1:openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the " + openCode + "three_d_secure_attributes.internal.address_match" + closeCode + " field has a value of " + openCode + "false" + closeCode + ". For a general description of this field," + paymentsRESTAPIHyperlink,

    shipping_address__line2: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the " + openCode + "three_d_secure_attributes.internal.address_match" + closeCode + " field has a value of " + openCode + "false" + closeCode + ". For a general description of this field," + paymentsRESTAPIHyperlink,

    shipping_address__state: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the " + openCode + "three_d_secure_attributes.internal.address_match" + closeCode + " field has a value of " + openCode + "false" + closeCode + ". For a general description of this field," + paymentsRESTAPIHyperlink,

    shipping_address__zip_code: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the " + openCode + "three_d_secure_attributes.internal.address_match" + closeCode + " field has a value of " + openCode + "false" + closeCode + ". For a general description of this field," + paymentsRESTAPIHyperlink,

    shipping_address__city: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the " + openCode + "three_d_secure_attributes.internal.address_match" + closeCode + " field has a value of " + openCode + "false" + closeCode + ". For a general description of this field," + paymentsRESTAPIHyperlink,

    // statement_soft_descriptor: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Maximum length: 13 characters. Must not include asterisks. For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  cybersource: {

    billing_address__state: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if the billing country is U.S.A. or Canada. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__zip_code: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if the billing country is U.S.A. or Canada. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if shipping to U.S.A. or Canada and a shipping address field is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__country: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if shipping to U.S.A. or Canada and a shipping address field is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__city: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if shipping to U.S.A. or Canada and a shipping address field is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__line1: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if shipping to U.S.A. or Canada and a shipping address field is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__state: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if shipping to U.S.A. or Canada and a shipping address field is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__zip_code: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "This field is only required if shipping to U.S.A. or Canada and a shipping address field is included. For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  stripe: {

    statement_soft_descriptor: openBold + "Notes specific to Stripe" + closeBold + linebreak + openul + openli + "Must contain at least one letter" + closeli + openli + "Up to 22 characters" + closeli + openli + "May not include <>“' characters" + closeli + openli + "Non-ASCII characters are deleted" + closeul + "For a general description of this field,   " + paymentsRESTAPIHyperlink

  },

  payucitrusindia: {

    shipping_address: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "This field is only required if email or phone is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__phone: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "This field is required unless this was changed to non-mandatory in your PayU Citrus account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__email: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "This field is required unless this was changed to non-mandatory in your PayU Citrus account. For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  payuindia: {

    billing_address__first_name: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Maximum length: 60 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__last_name: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Maximum length: 20 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,
  },

  shva: {

    billing_address__city: openBold + "Notes specific to Shva" + closeBold + linebreak + "The maximum length is 20 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    statement_soft_descriptor: openBold + "Notes specific to Shva" + closeBold + linebreak + "The transaction description that will appear in the customer's credit card statement (if supported by the card companies you work with). Under the hood, we will pass the information you provide in this field in the " + openCode + "addendum1settl" + closeCode + " field of an authorization request. If you added information to the" + openCode + "addendum1settl" + closeCode + " field yourself, then we will simply append the data from the" + openCode + "statement_soft_descriptor" + closeCode + "field to it. For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  worldpayeu: {

    billing_address: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is only required for AVS. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__first_name: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "Maximum length in combination with " + openCode + "billing_address.last_name" + closeCode +": 255 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__last_name: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "Maximum length in combination with " + openCode + "billing_address.first_name" + closeCode +": 255 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__country: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is only required if the billing address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__state: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is only required if the billing address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__city: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is only required if the billing address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__line1: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is only required if the billing address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__zip_code: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is only required if the billing address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__country: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is required if the shipping address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__state: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is required if the shipping address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__city: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is required if the shipping address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__line1: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is required if the shipping address is included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__zip_code: openBold + "Notes specific to Worldpay EU" + closeBold + linebreak + "This field is required if the shipping address is included. For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  payurussia: {

    amount: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "If you pass " + openCode + "line_items" + closeCode + " in the " + openCode + "order" + closeCode + " object, then the sum of line items (quantity * unit_price) must equal the" + openCode + "payment.amount" + closeCode + " and the amount used to authorize the requests is the sum of the line item amounts. To override this behavior and use only the " + openCode + "payment.amount" + closeCode + " (ignoring the unit_price passed per line item), pass a " + openCode + " provider_specific_data.payu_russia.additional_details.ignore_line_items" + closeCode + " field with a value of " + openCode + "true" + closeCode + " in the Create Authorization request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__line_items___tax_percentage: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "Only the following values are allowed: " + openBold + "0, 10, 20" + closeBold +". Any other value will generate an error. For a general description of this field, " + paymentsRESTAPIHyperlink,  
  },

  payuromania: {

    amount: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "If you pass " + openCode + "line_items" + closeCode + " in the " + openCode + "order" + closeCode + " object, then the sum of line items (quantity * unit_price) must equal the" + openCode + "payment.amount" + closeCode + " and the amount used to authorize the requests is the sum of the line item amounts. To override this behavior and use only the " + openCode + "payment.amount" + closeCode + " (ignoring the unit_price passed per line item), pass a " + openCode + " provider_specific_data.payu_romania.additional_details.ignore_line_items" + closeCode + " field with a value of " + openCode + "true" + closeCode + " in the Create Authorization request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__line_items___tax_percentage: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Only the following values are allowed: " + openBold + "0, 19" + closeBold +". Any other value will generate an error. For a general description of this field, " + paymentsRESTAPIHyperlink,
  },

  payuturkey: {

    amount: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "If you pass " + openCode + "line_items" + closeCode + " in the " + openCode + "order" + closeCode + " object, then the sum of line items (quantity * unit_price) must equal the" + openCode + "payment.amount" + closeCode + " and the amount used to authorize the requests is the sum of the line item amounts. To override this behavior and use only the " + openCode + "payment.amount" + closeCode + " (ignoring the unit_price passed per line item), pass a " + openCode + " provider_specific_data.payu_turkey.additional_details.ignore_line_items" + closeCode + " field with a value of " + openCode + "true" + closeCode + " in the Create Authorization request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__line_items___tax_percentage: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Only the following values are allowed: " + openBold + "0, 8, 18, 24" + closeBold +". Any other value will generate an error. For a general description of this field, " + paymentsRESTAPIHyperlink,
  },

  payulatam: {

    order: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Only required if the " + openCode + "tax_amount" + closeCode + " for the payment is higher than 0. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__first_name: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Maximum length: 50 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__last_name: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Maximum length: 50 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    currency: {

      ccards: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "If you implemented a two-step payment flow (Authorize-Capture), you will only be able to accept payments in the local currency. USD is not supported. For a general description of this field, " + paymentsRESTAPIHyperlink,

    },

  },

  payuargentina: {

  },

  payuchile: {

    amount: {

      cash: openBold + "Notes specific to PayU Chile" + closeBold + linebreak + "The" + openCode + "payment.amount" + closeCode + "must be a round number, in CLP. For a general description of this field, " + paymentsRESTAPIHyperlink

    }

  },

  wirecard: {

    statement_soft_descriptor: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Maximum length: 64 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__city: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Maximum length: 32 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__first_name: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Maximum length: 32 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__last_name: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Maximum length: 50 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,


  },

  payucolombia: {

    amount: {

      banktransfer: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "If USD is sent, then the amount will be converted into COP. For a general description of this field, " + paymentsRESTAPIHyperlink

    }
  },

  payuperu: {

    shipping_address__email: {

      cash: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "Either " + openCode + "email" + closeCode + " or " + openCode + "phone" + closeCode + " is required. For a general description of this field, " + paymentsRESTAPIHyperlink
    },

    shipping_address__phone: {

      cash: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "Either " + openCode + "email" + closeCode + " or " + openCode + "phone" + closeCode + " is required. For a general description of this field, " + paymentsRESTAPIHyperlink
    },

    billing_address: {

      cash: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "Required when using PAGOEFECTIVO. For a general description of this field, " + paymentsRESTAPIHyperlink
    },

    billing_address__first_name: {

      cash: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "When using PAGOEFECTIVO, either " + openCode + "first_name" + closeCode + " or " + openCode + "last_name" + closeCode + " is required. For a general description of this field, " + paymentsRESTAPIHyperlink
    },

    billing_address__last_name: {

      cash: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "When using PAGOEFECTIVO, either " + openCode + "first_name" + closeCode + " or " + openCode + "last_name" + closeCode + " is required. For a general description of this field, " + paymentsRESTAPIHyperlink
    },

  },

  payubrazil: {

    shipping_address__state: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format 'XX', example for Sao Paulo: 'SP'. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__zip_code: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format: XXXXX-XXX or XXXXXXXX. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__phone: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format: ddd(2)+number(7-9), example: (XX)XXXXXXX. For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  braintree: {

    amount: openBold + "Notes specific to Braintree" + closeBold + linebreak + "The sum of line items (quantity * unit_price) in the order must equal the " + openCode + "payment.amount" + closeCode + ". For a general description of this field,   " + paymentsRESTAPIHyperlink,

    currency: openBold + "Notes specific to Braintree" + closeBold + linebreak + "The currency must match the currency of the payment provider configuration." + openBold + " Creating a payment with a currency that is different to the currency specified in that Braintree account, will cause the request to fail." + closeBold + " For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  safecharge: {

    billing_address__country: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "You can request SafeCharge to make this field optional. For a general description of this field,   " + paymentsRESTAPIHyperlink,

    billing_address__first_name: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Maximum length: 30 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__last_name: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Maximum length: 40 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__state: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Two-letter ISO state code. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__email: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "You can request SafeCharge to make this field optional. For a general description of this field, " + paymentsRESTAPIHyperlink,

    statement_soft_descriptor: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "The maximum length is 25 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    amount: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "The payment amount must be equal to the total order value of all line items. For a general description of this field, " + paymentsRESTAPIHyperlink,


  },

  vantiv: {

    billing_address__line1: openBold + "Notes specific to Vantiv" + closeBold + linebreak + "Maximum length: 35 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__line2: openBold + "Notes specific to Vantiv" + closeBold + linebreak + "Maximum length: 35 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__id: openBold + "Notes specific to Vantiv" + closeBold + linebreak + "The maximum length is 25 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    statement_soft_descriptor: openBold + "Notes specific to Vantiv" + closeBold + linebreak + "If you want to pass this field, you must also configure your website URL in your Vantiv configuration settings in the PaymentsOS Control Center. For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  payusingleplatform: {

    amount: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Amount must be greater than 0. The sum of line items (quantity * unit_price) in the order must equal the" + openCode + "payment.amount" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__email:  openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "PayU Single Platform recommends including the customer's email, but it is not mandatory. For a general description of this field, " + paymentsRESTAPIHyperlink,
  },

  paypal: {

    statement_soft_descriptor: openBold + "Notes specific to PayPal" + closeBold + linebreak + "The soft descriptor to use to charge this funding source. Maximum length: 22 characters. If greater than the maximum allowed length, the API truncates the string. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address: openBold + "Notes specific to PayPal" + closeBold + linebreak + "If you send a shipping address, " + openCode + "shipping_address.country" + closeCode + " and " + openCode + "shipping_address.line1" + closeCode + "are " + openBold + "required" + closeBold +". For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__country: openBold + "Notes specific to PayPal" + closeBold + linebreak + "A " + countryCodeHyperlink + " country code. This field is required if you send a shipping address. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__line1: openBold + "Notes specific to PayPal" + closeBold + linebreak + "This field is required if you send a shipping address. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address: openBold + "Notes specific to PayPal" + closeBold + linebreak + "If you send a billing address, " + openCode + "billing_address.country" + closeCode + " and " + openCode + "billing_address.line1" + closeCode + "are " + openBold + "required" + closeBold +". For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__country: openBold + "Notes specific to PayPal" + closeBold + linebreak + "A " + countryCodeHyperlink + " country code. This field is required if you send a billing address. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__line1: openBold + "Notes specific to PayPal" + closeBold + linebreak + "This field is required if you send a billing address. For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__id: openBold + "Notes specific to PayPal" + closeBold + linebreak + "This is the invoice number. This field is optional, unless you are using PayPal fraud (if your using PayPal fraud, contact your PayPal account representative for more information about how to use this field). For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__tax_amount: openBold + "Notes specific to PayPal" + closeBold + linebreak + "If you pass a tax amount, then you must pass a " + openCode + "provider_specific_data.paypal.subtotal" + closeCode+ " in the subsequent authorization or charge request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__line_items: openBold + "Notes specific to PayPal" + closeBold + linebreak + "To pass a list of items to PayPal, the following conditions must both be met :" + openul + openli + "You must pass at least one line item with quantity and price." + closeli + openli + "You must pass a " + openCode + "provider_specific_data.paypal.subtotal" + closeCode+ " in the subsequent authorization or charge request." + closeli + closeul + openBold + "Beware that currently discounts and fees are not supported."  + closeBold + " For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__line_items___quantity:  openBold + "Notes specific to PayPal" + closeBold + linebreak + "This field is required if you send " + openCode + "line_items" + closeCode +". For a general description of this field, " + paymentsRESTAPIHyperlink,

    order__line_items___unit_price:  openBold + "Notes specific to PayPal" + closeBold + linebreak + "This field is required if you send " + openCode + "line_items" + closeCode +". For a general description of this field, " + paymentsRESTAPIHyperlink,
  },

  dalenys: {

    customer_id: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Subsequent Authorization or Charge requests require that you pass a " + openCode + "CLIENTIDENT" + closeCode + " and " + openCode + "CLIENTEMAIL" + closeCode + " field. Rather than passing those fields, you can choose to pass a " + openCode + "customer_id" + closeCode + " instead. If you pass this field, then PaymentsOS will try to fetch the " + openCode + "CLIENTIDENT" + closeCode + " and " + openCode + "CLIENTEMAIL" + closeCode + " from a related customer object instead. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__first_name: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Maximum length: 15 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__last_name: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Maximum length: 15 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,
  },

  chasepaymentech: {

    billing_address:  openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "In your Chase Paymentech account, you can enable AVS verification (full AVS or zip-code only AVS) and determine whether a failed verification should cause the request to fail. Maximum length: 10 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__zip_code: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Required if you enabled AVS verification. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__line1:  openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Required if you enabled AVS verification. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__city: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Required if you enabled AVS verification. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__phone: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Maximum length: 14 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__state: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Two-letter ISO state code. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__first_name:  openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Maximum length: 30 characters. If combined with " + openCode + "billing_address.last_name" + closeCode + " ,then the length of both fields combined should not exceed 29 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__last_name:  openBold + "Notes specific to Chase Paymentech"+closeBold+linebreak + "Maximum length: 30 characters. If combined with " + openCode + "billing_address.first_name" + closeCode + " ,then the length of both fields combined should not exceed 29 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    statement_soft_descriptor: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "This field is passed as the merchant name to Chase Paymentech. Maximum length: 12 characters (additional characters are truncated). You can pass additional information pertaining to the statement soft descriptor in the " + openCode + "provider_specific_data" + closeCode + "object of a Create Authorize, Create Charge or Create Credit request. For a general description of this field, " + paymentsRESTAPIHyperlink
  },

  alipay: {
    currency:openBold + "Notes specific to Alipay" + closeBold + linebreak + "If you price your products in CNY, then you can pass CNY in the requests In this case, PaymentsOS will pass the settlement currency (instead of CNY) to Alipay. PaymentsOS does not convert the amount to the settlement currency (the original amount is passed 'as is'). For a general description of this field, " + paymentsRESTAPIHyperlink,
    
  },

  payeezy: {
    statement_soft_descriptor: openBold + "Notes specific to Payeezy" + closeBold + linebreak + "This is the DBA (business) name. For a general description of this field, " + paymentsRESTAPIHyperlink,

    billing_address__city:  openBold + "Notes specific to Payeezy" + closeBold + linebreak + "The maximum length is 20 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,
  },

  worldpayeu: {
    statement_soft_descriptor: openBold + "Notes specific to WorldPay" + closeBold + linebreak + " The descriptor is from 4 to 25 characters.  If you include a prefix, it must be either 3, 7 or 12 characters in length. You must use an asterisk (*) after the prefix as a separator, in one of the following positions: 4th, 8th, or 13th. Do not use an asterisk in more than one position. These characters are valid: numbers, letters and these special characters:" + openBold + "&, *, , , -, ., #" + closeBold +". For a general description of this field, " + paymentsRESTAPIHyperlink
  }

}
