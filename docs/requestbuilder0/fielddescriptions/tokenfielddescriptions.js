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
var paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-token" target="_blank">see the API Reference</a>' + "."
var payULatamIdentityDocs = '<p class="collapsible">Click to view available document types</p> <div class="content"><ul>  <li>CC: Citizenship card</li>   <li>CE: Foreign citizenship card</li>  <li>NIT: For a company</li>  <li>TI: Identity Card</li>  <li>PP: Passport</li> <li>IDC: Client´s unique identifier, in the case of unique customer / utility consumer ID</li>  <li>CEL: When identified by the mobile line</li>  <li>RC: Birth certificate.</li>  <li>DE: Foreign identification document.</li></ul></div> <script src= "./requestbuilder/expandcollapse.js"></script>'

loadExpandCollapseJs();

// Strings
var fielddescr = {

  payulatam: {

    identity_document__type: openBold + "Notes specific to all PayU Latam Providers" + closeBold + linebreak + payULatamIdentityDocs + "For a general description of this field, " + paymentsRESTAPIHyperlink
  },


  payuromania: {

    card_number: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "For installments, the payment method (the credit card vendor) must be the same as the" + openCode + " installments.additional_details.payment_method" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  shva: {

    identity_document: openBold + "Notes specific to Shva" + closeBold + linebreak + "Customer's national identity document. Required only if required by the terminal. For a general description of this field, " + paymentsRESTAPIHyperlink,

    identity_document__number: openBold + "Notes specific to Shva" + closeBold + linebreak + "Required only if required by the terminal. For a general description of this field, " + paymentsRESTAPIHyperlink,

    holder_name:  openBold + "Notes specific to Shva" + closeBold + linebreak  + "The " + openCode + "holder_name" + closeCode +" is not sent to Shva, therefore sending any non-empty value is valid. For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  payuargentina: {

    additional_details__card_vendor_name: openBold + "Notes specific to PayU Argentina" + closeBold + linebreak + "Only required for local credit cards. Do not use this for global credit cards."

  },

  payubrazil: {

    billing_address__state: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format: 'XX', example for Sao Paulo: 'SP'. For a general description of this field, " + paymentsRESTAPIHyperlink,

    additional_details__card_vendor_name: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Only required for local credit cards. Do not use this for global credit cards."

  },

  safecharge: {

    credit_card_cvv: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "This field is required if configured as such in your SafeCharge account."

  },

  dalenys: {

    credit_card_cvv: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "This field is required if configured as such in your Dalenys account."

  },

  paypal: {

    shipping_address__country: openBold + "Notes specific to PayPal" + closeBold + linebreak + "This fiels is required if you included shipping address. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__line1: openBold + "Notes specific to PayPal" + closeBold + linebreak + "This fiels is required if you included shipping address. For a general description of this field, " + paymentsRESTAPIHyperlink,

    shipping_address__city: openBold + "Notes specific to PayPal" + closeBold + linebreak + "This fiels is required if you included shipping address. For a general description of this field, " + paymentsRESTAPIHyperlink,

    vendor: openBold + "Notes specific to PayPal" + closeBold + linebreak + "Possible value: " + openCode + "PayPal" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    configuration_id:  openBold + "Notes specific to PayPal" + closeBold + linebreak + "The identifier of the provider configuration. You can fetch this identifier from your provider configuration settings in the PaymentsOS Control Center.",

    provider_specific_data__skip_shipping_address:  openBold + "Notes specific to PayPal" + closeBold + linebreak + "Indicates whether to skip the collection of the shipping address from the customer.",

    provider_specific_data__immutable_shipping_address:  openBold + "Notes specific to PayPal" + closeBold + linebreak + "Indicates whether to show the shipping address but prevent the customer from editing it.",

    provider_specific_data__merchant_custom_data: openBold + "Notes specific to PayPal" + closeBold + linebreak + "The merchant-specific agreement data. The service does not interpret this data. Maximum length: 256.",

  },

  credorax: {

    holder_name: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Minimum length: 5 characters. Maximum length: 50 characters. Permitted characters: " + openBold + "[\ a-zA-Z]" + closeBold+". If the cardholder provides a name which is shorter than five characters, you must either add additional non-space characters to the name (e.g. Mr Lu) or not send the field"

  },

  wirecard: {

    holder_name: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Maximum length: 32 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  payeezy: {

    holder_name: openBold + "Notes specific to Payeezy" + closeBold + linebreak + "ASCII characters only. Capped at 30 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

  }

}

function loadExpandCollapseJs() {

  $.getScript("../requestbuilder/expandcollapse.js")
    .done(function (script, textStatus) {
      console.log("Loaded Expand Collapse JS: " + textStatus);
    })
}
