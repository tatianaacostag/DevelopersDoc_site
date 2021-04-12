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

var paymentsRESTAPIHyperlink;
var requestname;

setRequestName();
setRESTAPIHyperlink();


var payulatamdocurl = '<a href="http://developers.payulatam.com/en/api/considerations.html" target="_blank">in the PayU Developers Documentation</a>' + "."

var payulatamapiintegrationdocurl = '<a href="http://developers.payulatam.com/en/api/payments.html" target="_blank">PayU Latam API integration - payments</a>'

var countryCodesWIKIUrl = '<a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3" target="_blank">ISO 3166-1 alpha-3</a>'

var languageCodesWIKIUrl = '<a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank">ISO_639-1</a>'

var payuCitrusIndiaNetbankingCodes = '<p class="collapsible">Click to view Netbanking Bank Codes </p> <div class="content"><ul>  <li>CID001: ICICI Bank</li>   <li>CID002: AXIS Bank</li>  <li>CID004: YES Bank</li>  <li>CID007: Union Bank</li>  <li>CID011: IDBI Bank</li> <li>CID009: Federal Bank</li>  <li>CID010: HDFC Bank</li>  <li>CID005: SBI Bank.</li>  <li>CID008: Indian Bank</li> <li>CID016: Andhra Bank</li>  <li>CID019: Bank of India</li>  <li>CID020: Bank of Baroda Retail Accounts</li>  <li>CID021: Bank of Maharashtra</li>  <li>CID045: Catholic Syrian Bank</li>  <li>CID023: Central Bank of India</li>  <li>CID024: City Union Bank</li>  <li>CID026: DCB Bank (Development Credit Bank)</li>  <li>CID027: Indian Overseas Bank</li>  <li>CID030: Jammu & Kashmir Bank</li>  <li>CID031: Karnataka Bank</li>  <li>CID032: Karur Vysya Bank</li>  <li>CID033: Kotak Mahindra Bank</li>  <li>CID035: Oriental Bank of Commerce</li>  <li>CID037: South Indian Bank</li>  <li>CID040: Tamilnad Mercantile Bank</li>  <li>CID041: United Bank of India</li>  <li>CID044: PNB Retail</li>  <li>CID046: Bank of Baroda</li>  <li>CID062: Punjab and Sind Bank</li>  <li>CID070: UCO Bank</li>  <li>CID080: Axis Corporate</li>  </ul></div> <script src= "./requestbuilder/expandcollapse.js"></script>'

// Links to documentation pages
var payuindiarecurringflow = '<a href="/docs/providers/payu-india.html#implementing-a-recurring-transaction-flow" target="_blank">Implementing a Recurring Transaction Flow</a>'
var payuindianonrecurringflow = '<a href="/docs/providers/payu-india.html#implementing-a-non-recurring-transaction-flow" target="_blank">Implementing a Non-recurring Transaction Flow</a>'
var payueasecupnonrecurringflow = '<a href="/docs/providers/payease.html#sms-flow" target="_blank">Implementing an SMS Phone-based Authentication Flow (Non-recurring Shopper Flow)</a>'
var IsoLanguageCodesURL = '<a href=https://www.loc.gov/standards/iso639-2/php/code_list.php" target="_blank">ISO 639-1 Code</a>'
var payuSinglePlatformLanguages = '<a http://developers.payu.com/en/overview.html#languages" target="_blank">PayU Single Platform supported languages.</a>'
var payPalLocaleCodesURL = '<a href= https://developer.paypal.com/docs/integration/direct/rest/locale-codes/#" target="_blank">PayPal Locale Codes.</a>'
var payLatamArgentinaPromotionAPI = '<a href= http://developers.payulatam.com/en/api/promotions.html target="_blank">API Promotions - Argentina.</a>'
var wireCardIntegrationProcedures = '<a href= "/docs/providers/wirecard.html#integration-procedures">Wirecard Integration Procedures.</a>'
var payBrazilNationalIdentifyCodeSampleJS =  '<a href= "https://www.geradorcpf.com/javascript-validar-cpf.htm" target="_blank">Javascript</a>'
var payBrazilNationalIdentifyCodeSamplePhp =  '<a href= "https://www.geradorcpf.com/script-validar-cpf-php.htm" target="_blank">PHP</a>'
var payuRomaniaPaymentMethods = '<a href="/docs/providers/payu-romania.html#payment-methods" target="_blank">PayU Romania Payment Methods</a>'
var payuTurkeyPaymentMethods = '<a href="/docs/providers/payu-turkey.html#payment-methods" target="_blank">PayU Turkey Payment Methods</a>'
var payuRussiaPaymentMethods = '<a href="/docs/providers/payu-russia.html#payment-methods" target="_blank">PayU Russia Payment Methods</a>'

// Strings
var fielddescr = {

  alipay: {

    merchant_site_url: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Maximum number of characters: 200. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__source_type:  openBold + "Notes specific to Alipay" + closeBold + linebreak + "Possible value:" + openCode + "ewallet" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__vendor: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Possible value:" + openCode + "alipay" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__type: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Possible value:" + openCode + "untokenized" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    reconciliation_id: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Maximum number of characters: 64. Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__alipay:  openBold + "Notes specific to Alipay" + closeBold + linebreak + "Parameters specific to Alipay.",

    provider_specific_data__alipay___additional_details: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Parameters specific to Alipay.",

    provider_specific_data__alipay___additional_details____app_pay: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Used to identify whether the transaction activates the Alipay wallet app to process the payment. If the Alipay wallet app is not installed, then the payment will be redirected to the Wap page. "+ openBold + "Important note: " + closeBold + "Allowed value:" + openCode  +"Y" + closeCode +". Only specify if the service type is " + openCode + "create_forex_trade_wap" + closeCode + ".",

    provider_specific_data__alipay___additional_details____service: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Indicates the type of Alipay site to which the customer will be redirect. Can be one of the following values:" + openCode + "create_forex_trade" + closeCode + "or" + openCode + "create_forex_trade_wap" + closeCode + ". Default: "+ openCode + "create_forex_trade" + closeCode +".",

    provider_specific_data__alipay___additional_details____settlement_currency:  openBold + "Notes specific to Alipay" + closeBold + linebreak + "The settlement currency code. Pass this value if you want to override the settlement currency configured in your PaymentsOS provider configuration settings. This currency code must be one of the currency codes configured in your Alipay account.",

    provider_specific_data__alipay___additional_details____business_type: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The type of business. Can be one of the following values: " + openul + openli + "1: Hotel" + closeli + openli + "2: AIR" + closeli + openli + "3: Overseas study consulting" + closeli + openli + "4: Sales of goods" + closeli + openli + "5: Others, including all the other business types that do not fall into the above 4 categories. For example, mobile data service recharge, airport pick up service, etc." + closeli + closeul + "If you want to pass more than one type, separate type values with a pipe symbol (|)." ,

    provider_specific_data__alipay___additional_details____hotel_name: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The hotel name. Can contain numbers, letters, spaces, and special characters including ,.<>()[]/\-,. If you need to pass more than one hotel name, separate the values with a pipe symbol (|). " + openBold + "Important note: " + closeBold +"This field is required if the " + openCode + "business_type" + closeCode +  "is " + openCode + "1" + closeCode + " (Hotel).",

    provider_specific_data__alipay___additional_details____check_in_time: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The hotel check-in time. Format: yyyy-MM-dd. Timezone: GMT +8. " + openBold + "Important note: " + closeBold +"This field is required if if the " + openCode + "business_type" + closeCode +  "is " + openCode + "1" + closeCode + " (Hotel).",

    provider_specific_data__alipay___additional_details____check_out_time: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The hotel check-out time. Format: yyyy-MM-dd. Timezone: GMT +8. " + openBold + "Important note: " + closeBold +"This field is required if the " + openCode + "business_type" + closeCode +  "is " + openCode + "1" + closeCode + " (Hotel).",

    provider_specific_data__alipay___additional_details____flight_number: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Flight number. If flight transfer exists, separate the flight numbers with a pipe symbol (|). " + openBold + "Important note: " + closeBold +"This field is required if the " + openCode + "business_type" + closeCode +  "is " + openCode + "2" + closeCode + " (Air).",

    provider_specific_data__alipay___additional_details____departure_time: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The flight departure time. Format: yyyy-MM-dd HH:mm. If flight transfer exists, separate the flight numbers with a pipe symbol (|). " + openBold + "Important note: " + closeBold +"This field is required if the " + openCode + "business_type" + closeCode +  "is " + openCode + "2" + closeCode + " (Air).",

    provider_specific_data__alipay___additional_details____admission_notice_url: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The URL of the overseas study admission notice. " + openBold + "Important note: " + closeBold +"This field is required if the " + openCode + "business_type" + closeCode +  "is " + openCode + "3" + closeCode + " (Overseas study consulting).",

    provider_specific_data__alipay___additional_details____goods_info: openBold + "Notes specific to Alipay" + closeBold + linebreak + "Goods information that includes SKU names and corresponding quantities. Format: SKU_name^quantity. To pass multiple goods, separate the values with a pipe symbol (|). " + openBold + "Important note: " + closeBold +"This field is required if the " + openCode + "business_type" + closeCode +  "is " + openCode + "4" + closeCode + " (Sales of goods).",

    provider_specific_data__alipay___additional_details____total_quantity: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The total quantity of all goods in one order. " + openBold + "Important note: " + closeBold +"This field is required if the " + openCode + "business_type" + closeCode +  "is " + openCode + "4" + closeCode + " (Sales of goods).",

    provider_specific_data__alipay___additional_details____other_business_type: openBold + "Notes specific to Alipay" + closeBold + linebreak + "The type of business if the " + openCode + "business_type" + closeCode +  "is " + openCode + "5" + closeCode + " (Others).",

    provider_specific_data__alipay___additional_details____subject:  openBold + "Notes specific to Alipay" + closeBold + linebreak + "Brief description of the transaction. Special characters are not supported. The value of this field will be displayed to your customers.",


  },
  alfabank: {

    reconciliation_id: openBold + "Notes specific to Alfa-Bank" + closeBold + linebreak + "This field has the following format requirements: " + openul + openli + "Up to 99 characters" + closeli + openli + "Characters that are not allowed: %, +, \\r, \\n" + closeli + closeul + " For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__credit_card_cvv: openBold + "Notes specific to Alfa-Bank" + closeBold + linebreak + "This field is required, unless configured otherwise in your Alfa-Bank account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__alfabank: openBold + "Notes specific to Alfa-Bank" + closeBold + linebreak + "Parameters specific to Alfa-Bank.",

    provider_specific_data__alfabank___additional_details: openBold + "Notes specific to Alfa-Bank" + closeBold + linebreak + "Parameters specific to Alfa-Bank.",

    provider_specific_data__alfabank___additional_details____payment_timeout_secs: openBold + "Notes specific to Alfa-Bank" + closeBold + linebreak + "This field denotes the time period in seconds within which you can perform a capture after a successful " + requestname + " request. Format: Only digits, maximum 9 digits."

  },

  braintree: {

    reconciliation_id: openBold + "Notes specific to Braintree" + closeBold + linebreak + "If the" + openCode + "reconciliation_id" + closeCode + "is not provided, then we will populate it with the value of the" + openCode + "payment_id" + closeCode + ",and send it the request. This will populate the Braintree" + openCode + "orderId" + closeCode + "field. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__credit_card_cvv: openBold + "Notes specific to Braintree" + closeBold + linebreak + "This field is required, unless configured otherwise in your Braintree account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__braintree: openBold + "Notes specific to Braintree" + closeBold + linebreak + "Parameters specific to Braintree.",

    provider_specific_data__braintree___additional_details: openBold + "Notes specific to Braintree" + closeBold + linebreak + "Parameters specific to Braintree.",

    provider_specific_data__braintree___additional_details____skip_avs: openBold + "Notes specific to Braintree" + closeBold + linebreak + "The possible values are" + openCode + "false" + closeCode + "or" + openCode + "true" + closeCode + ". If" + openCode + "true" + closeCode + ", then we will pass" + openCode + "true" + closeCode + "to the" + openCode + "skipAvs" + closeCode + "Braintree field, which will cause the 'gateway avs checks' to be skipped in Braintree. For a general description of this field, see " + '<a href="https://developers.braintreepayments.com/reference/request/transaction/sale/node#options.skip_avs" target="_blank">skip_avs</a>' + ".",

    provider_specific_data__braintree___additional_details____skip_cvv: openBold + "Notes specific to Braintree" + closeBold + linebreak + "The possible values are" + openCode + "false" + closeCode + "or" + openCode + "true" + closeCode + ". If" + openCode + "true" + closeCode + ", then we will pass" + openCode + "true" + closeCode + "to the" + openCode + "skipCvv" + closeCode + "Braintree field, which will cause the 'gateway cvv checks' to be skipped in Braintree. For a general description of this field, see" + '<a href="https://developers.braintreepayments.com/reference/request/transaction/sale/node#options.skip_cvv" target="_blank">skip_cvv</a>' + "."

  },

  credorax: {

    channel_type: openBold + "Notes specific to Credorax" + closeBold + linebreak + "If no value is passed for this field, then the transaction will be considered to be an online transaction. For a general description of this field, " + paymentsRESTAPIHyperlink,

    merchant_site_url:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required if you pass " + openCode + "provider_specific_data.credorax.additional_details. three_d_secure_initiate" + closeCode + " with a value of "+ openCode + "01" + closeCode + " or " + openCode + "03" +closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    cof_transaction_indicators__cof_consent_transaction_id: openBold + "Notes specific to Credorax" + closeBold + linebreak + " When initiating a consent transaction, you will receive a " + openCode + "network_transaction_id" + closeCode + " in the " + openCode + "provider_data" + closeCode + " object. This ID identifies the initial consent transaction. You should pass this ID in the " + openCode + "cof_consent_transaction_id" + closeCode + " field in all subsequent transaction requests, if the " + openCode + "cof_transaction_indicators.card_entry_mode" + closeCode +  " field has a value of " + openCode + "cof_merchant_initiated_transaction" + closeCode +" (beware that passing this field if " + openCode + "cof_transaction_indicators.card_entry_mode" + closeCode +  "has another value may cause the transaction to fail)." + linebreak + openBold + "Important note" + closeBold + ": For recurring transactions where the first transaction occurred before 14 September 2019, Credorax recommends that you pass a static value of" + openCode + "9999999999999999" + closeCode + "in the " + openCode + "cof_consent_transaction_id" + closeCode + " field . This ensures the transaction will be processed without an additional request for SCA." + linebreak + "For a general description of this field, " + paymentsRESTAPIHyperlink,
    

    // three_d_secure_attributes__internal___device_channel:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "In the request header, " + openCode + "x-client-user-agent" + closeCode + " and " + openCode + "x-client-ip-address" + closeCode + " are required if the value you pass in this field is " + openCode + "02" + closeCode +".)",

    three_d_secure_attributes__external___cavv:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "If the 3DS data returned from an external MPI does not include a CAVV code, then pass a value of" + openCode + "none" + closeCode + openBold + ". Important note:" + closeBold + " The value is case sensitive.  For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___ds_xid: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Mandatory in an external 3DS 2 flow. Expected format is UUID(36), canonical format as defined in IETF RFC 4122. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___xid: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Mandatory in an external 3DS 1 flow. For a general description of this field, " + paymentsRESTAPIHyperlink,

    reconciliation_id: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Only the following characters are allowed: " + openBold + "[\-0-9A-Za-z]+" + closeBold + ". Maximum length: 32 characters. Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__credorax: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Parameters specific to Credorax.",

    provider_specific_data__credorax___additional_details: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Parameters specific to Credorax.",

    provider_specific_data__credorax___additional_details____three_d_secure_exemption_action:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Indicates how to handle exemptions from a 3DS 2flow Possible values: " + openul + openli + openCode + "01" + closeCode + ": Do not request an exemption." + closeli + openli + openCode + "02" + closeCode + ": Request an exemption as part of the payment request." + closeli + openli + openCode + "03" + closeCode + ": Request an exemption as part of the 3D Secure request." + closeli + closeul + "If no value is provided, Credorax may request an exemption (if applicable) as part of the 3D secure process.",

    provider_specific_data__credorax___additional_details____three_d_secure_exemption_reason: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Indicates the reason for granting an exemption: Only relevant if the value of " + openCode + "  provider_specific_data.credorax.additional_details.three_d_secure_exemption_action" + closeCode + " is " + openCode + "02" + closeCode  + "or" + openCode + "03" + closeCode + ". Possible values:" + openul + openli + openCode + "01" + closeCode + ": Low risk transaction (based on transaction score)." + closeli + openli + openCode + "02" + closeCode + ": Low value transaction (up to EUR 30)." + closeli + closeul,

    // provider_specific_data__credorax___additional_details____three_d_secure_tra_score: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Indicates the transaction score value calculated by a third party provider. Only relevant if the value of " + openCode + "  provider_specific_data.credorax.additional_details.three_d_secure_exemption_reason" + closeCode + " is " + openCode + "01" + closeCode + ".",

    provider_specific_data__credorax___additional_details____three_d_secure_initiate: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Pass this field to initiate a 3DS flow. If not passed (or passed with an empty value), a 3DS flow will not be initiated. Possible values: " + openul + openli + openCode + "01" + closeCode + ": Initiates a 3DS flow (the 3D Secure service must be enabled in your Credorax account)" + closeli + openli + openCode + "02" + closeCode + ": Does not initiate a 3DS flow." + closeli + openli + openCode + "03" + closeCode + ": Initiates a 3DS flow using the SMART 3DS fraud service (the SMART 3DS fraud service must be enabled in your Credorax account)" + closeli + closeul + openBold + "Important note:" + closeBold + " Do not send this field if the value of " + openCode + "cof_transaction_indicators.card_entry_mode" + closeCode + " is " + openCode + "recurring_subsequent_transaction" + closeCode + " or " + openCode + "cof_merchant_initiated_transaction" + closeCode + ".",

    provider_specific_data__credorax___additional_details____three_d_secure_msg_extension_id:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "A unique identifier for the extension. Payment System Registered Application Provider Identifier (RID) is required as prefix of the ID. The maximum length is 64 characters.",

    provider_specific_data__credorax___additional_details____three_d_secure_msg_extension_name: openBold + "Notes specific to Credorax" + closeBold + linebreak + "The name of the extension data set as defined by the extension owner. The maximum length is 64 characters.",

    provider_specific_data__credorax___additional_details____three_d_secure_msg_extension_data: openBold + "Notes specific to Credorax" + closeBold +  linebreak + "The name of the extension data set as defined by the extension owner. The maximum length is 64 characters.",

    provider_specific_data__credorax___additional_details____smart_three_d_secure_risk_threshold_override:  openBold + "Notes specific to Credorax" + closeBold +  linebreak + "Assigns an ad-hoc risk score threshold that extends the regular fraud threshold, for authorised 3D secure transactions only. If you pass both this field and " + openCode + "smart_guard_plus_threshold_override" + closeCode + ", then the value of this field must be smaller than the value passed in" + openCode + "smart_guard_plus_threshold" + closeCode +". If you pass this field without passing " + openCode + "smart_guard_plus_threshold_override" + closeCode + ", then the value of this field must be lower than the fraud threshold value configured in your Credorax account." + linebreak + "Note that passing this field is only relevant if the value of " + openCode + "  provider_specific_data.credorax.additional_details.three_d_secure_initiate" + closeCode + " is " + openCode + "03" + "." + closeCode + openBold + "Beware: " + closeBold + "Before sending this field, make to sure to verify with Credorax that all required configuration settings have been applied to your account.",

    provider_specific_data__credorax___additional_details____smart_guard_plus_threshold_override: openBold + "Notes specific to Credorax" + closeBold +  linebreak + "Sets an ad-hoc threshold for the specific transaction. The threshold must be a value between 0 and 1000. Should only be passed if you are using the Smart Guard Plus fraud protection service. If you pass this field but do not pass " + openCode + "smart_three_d_secure_risk_threshold_override" + closeCode + ", then the value of this field must be lower than the fraud threshold value configured in your Credorax account.",

    provider_specific_data__credorax___additional_details____three_d_secure_smart_plan: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Options specific to the SMART 3DS fraud service. Only relevant if the value of " + openCode + "  provider_specific_data.credorax.additional_details.three_d_secure_initiate" + closeCode + " is " + openCode + "03" + closeCode + ". Possible values: " + openul + openli + openCode + "00" + closeCode + ": Disable 3DS Adviser for the specific transaction" + closeli + openli + openCode + "01" + closeCode + ": Apply only PSD2 checks." + closeli + openli + openCode + "02" + closeCode + ": Apply only conversion rate impact checks" + closeli +  openli + openCode + "03" + closeCode + ": Apply only risk checks (you must be enrolled in the SmartGuard anti-fraud service to use this option" + closeli  + openli + openCode + "04" + closeCode + ": Apply PSD2 and conversion rate impact checks" + closeli  + openli + openCode + "05" + closeCode + ": Apply PSD2 and risk checks (you must be enrolled in the SmartGuard anti-fraud service to use this option)" + closeli + openli + openCode + "06" + closeCode + ": Apply conversion rate impact and risk checks" + closeli + openli + openCode + "07" + closeCode + ": Apply all checks: PSD2, conversion rate impact, and risk checks" + closeli + closeul + openBold + "Beware: " + closeBold + "Before sending this field, make to sure to verify with Credorax that all required configuration settings have been applied to your account.",

    provider_specific_data__credorax___additional_details____bypass_smart_guard_check: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Indicates whether the Credorax fraud protection service check should be bypassed. Should only be passed if you are using the Credorax Smart Guard fraud protection service. Possible values: " + openul + openli + openCode + "0" + closeCode + ": Send for a fraud check." + closeli + openli + openCode + "1" + closeCode + "Do not send for a fraud check." + closeul + "If this field is not passed, then the fraud check will be initiated if you are subscribed to the Credorax Smart Guard protection service.",



    // provider_specific_data__credorax___additional_details____three_d_secure_smart_plan: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Assigns an ad-hoc threshold that extends the regular fraud threshold. Only relevant if the value of " + openCode + "  provider_specific_data.credorax.additional_details.three_d_secure_initiate" + closeCode + " is " + openCode + "03" + closeCode + ".",

    provider_specific_data__credorax___additional_details____multi_capture: openBold + "Notes specific to Credorax" + closeBold + linebreak + "If you intend to send multiple capture requests for this authorization, then you must pass in " + openCode + "true" + closeCode + ". Default: " + openCode + "false" + closeCode + ".",

    provider_specific_data__credorax___additional_details____credit_type: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Determines the type of credit transaction. Possible values: " + openul + openli +  openCode + "independent_credit" + closeCode + " (default): Causes a refund to be sent in the next clearing file." + closeli + openli + openCode + "independent_cft" + closeCode + ": Must be sent by specific MCCs. You must enable Independent CFT (operation code 35) in your Credorax account before this value can be sent. Note that MCC 6211 is not supported by PaymentsOS for this operation code." + closeli + closeul,

    provider_specific_data__credorax___additional_details____funds_recipient_first_name: openBold + "Notes specific to Credorax" + closeBold + linebreak + "The first name of the recipient of the funds. Required if you pass a " + openCode + "credit_type" + closeCode + " of" + openCode  +  "independent_cft" + closeCode + " (do not pass for other" + openCode + "credit_type" + closeCode + " values). Format: [-''\A-Za-z] 1,30",

    provider_specific_data__credorax___additional_details____funds_recipient_last_name: openBold + "Notes specific to Credorax" + closeBold + linebreak + "The last name of the recipient of the funds. Required if you pass a " + openCode + "credit_type" + closeCode + " of" + openCode  +  "independent_cft" + closeCode + " (do not pass for other" + openCode + "credit_type" + closeCode + " values) Format: [A-Za-z] 1,30.",

    three_d_secure_attributes__internal___purchase_date_time: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when initiating a 3D Secure transaction. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___recurring_end_date: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.challenge_indicator" + closeCode + " field is " + openCode + "02" + closeCode + " or "  + openCode + "03" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___recurring_frequency: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.challenge_indicator" + closeCode + " field is " + openCode + "02" + closeCode + " or "  + openCode + "03" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___challenge_window_size:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,


    three_d_secure_attributes__internal___browser_color_depth:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,


    three_d_secure_attributes__internal___browser_header:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,


    three_d_secure_attributes__internal___browser_java_enabled:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_language:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,


    three_d_secure_attributes__internal___browser_screen_height:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_screen_width:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_time_zone:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "Required when the value of the " + openCode + "three_d_secure_attributes.internal.device_channel" + closeCode + " field is " + openCode + "02" + closeCode +  ". For a general description of this field, " + paymentsRESTAPIHyperlink,


    three_d_secure_attributes__internal___product_code: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Mandatory in an internal 3DS flow. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__sca_exemptions: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Do not pass this object if you pass" + openCode + "provider_specific_data.credorax.additional_details.three_d_secure_initiate" + closeCode + ". For a general description of this field, "  + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__sca_exemptions___exemption_action: openBold + "Notes specific to Credorax" + closeBold + linebreak + "Do not pass this field if " + openCode + "  provider_specific_data.credorax.additional_details.three_d_secure_initiate" + closeCode +" has a value of " + openCode + "01" + closeCode + ". If no value is provided (or if the field is not passed), then the following applies:" + linebreak + openul + openli + "If you are using the 3DS Advisor module, then the Credorax Payment Gateway will request an exemption (if applicable) as part of the 3D secure process." + closeli + openli + "If you are not using the 3DS Advisor module, then no exemption will be applied." + closeli + closeul +  "If you do pass a value,  then it will override the exemption decision made by the Credorax 3DS Advisor module (if used)." + linebreak + "For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__sca_exemptions___request_exemption_stage:  openBold + "Notes specific to Credorax" + closeBold + linebreak + "This field is required if you pass the" + openCode +"exemption_action" + closeCode + "field with a value of" + openCode + "true" + closeCode + "." + linebreak + linebreak +"If you pass this field with a value of " + openCode + "three_d_secure_authentication" + closeCode + " or " + openCode + "provider_logic" + closeCode + " , then you must pass all relevant 3DS 2 Internal fields as well. Note that if you pass all relevant 3DS 2 Internal fields, then you can optionally pass"  + openCode + "  provider_specific_data.credorax.additional_details.three_d_secure_initiate" + closeCode + " (beware not to pass it with a value of 01; other values are allowed). To generate a sample request with 3DS 2 Internal fields, check the 'Show 3DS 2 Internal Fields' checkbox. " + linebreak + linebreak + "For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__sca_exemptions___exemption_reason: openBold + "Notes specific to Credorax" + closeBold + linebreak + "If you pass a " + openCode + "cof_transaction_indicators.card_entry_mode" + closeCode +  "field with the following values, then we will automatically populate the " + openCode + "exemption_reason" + closeCode + "field as listed below and override any other value (if passed in):" + openul + openli + "If you pass a value of " + openCode + "recurring_subsequent_transaction" + closeCode +", then we will automatically set the value of " + openCode + "exemption_reason" + closeCode + " to " + openCode + "MIT – Recurring same amount" + closeCode + "." + closeli + openli + "If you pass a value of " + openCode + "cof_merchant_initiated_transaction" + closeCode +", then we will automatically set the value of " + openCode + "exemption_reason" + closeCode + " to " + openCode + "MIT – other" + closeCode + "." + closeli + closeul +  "For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  rsb: {

    payment_method__credit_card_cvv: openBold + "Notes specific to Russian Standard Bank (RSB)" + closeBold + linebreak + "This field is required, unless configured otherwise in your RSB account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__rsb: openBold + "Notes specific to Russian Standard Bank (RSB)" + closeBold + linebreak + "Parameters specific to Russian Standard Bank (RSB)."

  },

  chasepaymentech: {

    payment_method__credit_card_cvv: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "This field is required, unless configured otherwise in your Chase Paymentech account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    reconciliation_id: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "This field has the following requirements." + linebreak + "Field length:" + openul + openli + " Maximum of 22 characters." + closeli + openli + "For BIN 000002 (TANDEM) merchants, only the first 16 bytes are passed to the Host Processing System." + closeli + closeul + "Format: The first 8 characters should be unique for each transaction." + linebreak + "Valid characters:" + openul + openli + " abcdefghijklmnopqrstuvwxyz" + closeli + openli + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + closeli + openli + "0123456789" + closeli + openli + "- , $ @ &" + closeli + openli + "The space character (but not as the leading character)." + closeli + openli + "No special characters allowed." + closeli + closeul + "For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____SDProductDescription: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Sending a " + openCode + "statement_soft_descriptor" + closeCode + " (in a Create Payment request) is required if you send this field. Maximum length: 18 characters. " + openBold + "Beware" + closeBold + ": The actual length of this field is conditionally tied to the size of the " + openCode + "statement_soft_descriptor" + closeCode + " field. The " + openCode + "statement_soft_descriptor" + closeCode + " has three maximum length categories: 3, 7 and 12 characters. The length of the descriptor that you specify always takes the maximum length of its category. For instance, a length of 8 characters is automatically assigned a length of 12 characters. The assigned length of the" + openCode + "statement_soft_descriptor" + closeCode + "  combined with the " + openCode + "SDProductDescription" + closeCode + " must not exceed 21 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____SDMerchantCity: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Sending a " + openCode + "statement_soft_descriptor" + closeCode + " (in a Create Payment request) is required if you send this field. Maximum length: 13 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____SDMerchantPhone: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Format: NNN-AAAAAAA. Sending a " + openCode + "statement_soft_descriptor" + closeCode + " (in a Create Payment request) is required if you send this field. If you send this field you cannot send " + openCode + "SDMerchantURL" + closeCode + " and " + openCode + "SDMerchantEmail" + closeCode + ". Maximum length: 12 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____SDMerchantURL: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Sending a " + openCode + "statement_soft_descriptor" + closeCode + " (in a Create Payment request) is required if you send this field. Maximum length: 13 characters. If you send this field you cannot send " + openCode + "SDMerchantPhone" + closeCode + " and " + openCode + "SDMerchantEmail" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__chasepaymentech___additional_details____SDMerchantEmail: openBold + "Notes specific to Chase Paymentech" + closeBold + linebreak + "Sending a " + openCode + "statement_soft_descriptor" + closeCode + " (in a Create Payment request) is required if you send this field. Maximum length: 13 characters. If you send this field you cannot send " + openCode + "SDMerchantPhone" + closeCode + " and " + openCode + "SDMerchantURL" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  cybersource: {

    reconciliation_id: openBold + "Notes specific to CyberSource" + closeBold + linebreak + "A unique ID generated by you, used for transaction reconciliation. If the provider supports the" + openCode + "reconciliation_id" + closeCode + "then it will be used for the CyberSource Merchant Reference Number and Transaction Reference Number." + linebreak + "Notes:" + openul + openli + "Not all providers support the" + openCode + "reconciliation_id" + closeCode + "field." + closeli + openli + "For some providers the maximum field length is 22 alphanumeric characters (the UUID field type is too long)" + closeli + closeul + "For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  payulatam: {

    reconciliation_id: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Alphanumeric characters only. Maximum length: 255 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    // payment_method__vendor: {

    //   cash: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The name of the local card vendor. Vendor names are case-sensitive."

    // },

    payment_method__additional_details___cash_payment_method_vendor: {

      cash: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The name of the local card vendor. Vendor names are case-sensitive."

    },

    payment_method__additional_details___payment_country: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Country code in " + countryCodesWIKIUrl + " format.",

    payment_method__additional_details___bank_transfer_payment_method_vendor: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Set the value to " + openCode + "PSE" + closeCode + "This identifies the transaction as a PSE Bank-Transfer. The value is case-sensitive.",

    payment_method__additional_details___user_type: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Whether the payer is a 'natural person' (N) or a 'legal person (J). Possible values: " + openCode + "N" + closeCode + " or " + openCode + "J" + closeCode + ".",


    payment_method__additional_details___payment_method: {

      cash: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The alternative payment method that the customer selects to pay with. Possible value:" + openCode + "PSE" + closeCode + "."
    },

    payment_method__additional_details___customer_cnpj_identify_number: {

      ccards: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The customer's national identification number. Only required if a customer is associated with the payment.",

      cash: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The customer's national identification number.",

    },

    payment_method__additional_details___order_language: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Order_language of emails for the buyer and seller, as a two character language code in " + languageCodesWIKIUrl + " Code format. Possible values:" + openCode + "ES" + closeCode + "," + openCode + "PT" + closeCode + "or" + openCode + "EN" + closeCode + ".If a language is not supplied, then" + openCode + "EN" + closeCode + "will be sent.",

    installments__number_of_installments: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Only required for installments. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__payu_latam: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Parameters specific to the PayU Latam provider you are transacting against.",

    provider_specific_data__payu_latam___device_fingerprint: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Object holding device-specific information.",

    provider_specific_data__payu_latam___device_fingerprint____provider: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Provider of the fingerprint information. The value should always be 'PayULatam'.",

    provider_specific_data__payu_latam___device_fingerprint____fingerprint: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The session identifier that you generate, of the device on which the transaction was performed. For details on how to generate this, see the Devicesessionid variable section " + payulatamdocurl,

    provider_specific_data__payu_latam___additional_details: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Parameters specific to to the providers you are transacting against.",

    provider_specific_data__payu_latam___additional_details____cookie: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Send the session cookie stored on the device where the transaction was performed from.",

    provider_specific_data__payu_latam___additional_details____order_language: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Order_language of emails for the buyer and seller, as a two character language code in " + languageCodesWIKIUrl + " Code format. Possible values:" + openCode + "ES" + closeCode + "," + openCode + "PT" + closeCode + "or" + openCode + "EN" + closeCode + ".If a language is not supplied, then" + openCode + "EN" + closeCode + "will be sent.",

    provider_specific_data__payu_latam___additional_details____month_without_interest_months: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The number of months without interest, for the purchase.",

    provider_specific_data__payu_latam___additional_details____accept_terms_and_conditions: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The terms and conditions of the PayU service, which the payer must accept",

    provider_specific_data__payu_latam___additional_details____customer_cnpj_identify_number: {

      ccards: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The customer's national identification number. Only required if a customer is associated with the payment.",

      cash: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The customer's national identification number.",
    },

    provider_specific_data__payu_latam___additional_details____payer_birthday: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "Date of birth of the payer.",

    provider_specific_data__payu_latam___additional_details____merchant_payer_id: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "ID of the payer in your system.",

    provider_specific_data__payu_latam___additional_details____payer_email: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The email address of the payer.",

    provider_specific_data__payu_latam___additional_details____customer_national_identify_number: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The customer's national identification number. Only required if a customer is associated with the payment.",

    payment_method__additional_details___national_identify_number: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The customer's national identification number. Only required if a customer is associated with the payment.",

    payment_method__additional_details___national_identify_type: openBold + "Notes specific to all PayU Latam providers" + closeBold + linebreak + "The customer's identification number type.",


  },

  payuargentina: {

    provider_specific_data__payu_latam___additional_details____promotion_id: openBold + "Notes specific to PayU Argentina" + closeBold + linebreak + "The ID of a promotion that you can pass for better transaction fees. You need to fetch the promotion ID using the PayU Latam API. For more information, see " + payLatamArgentinaPromotionAPI,

    payment_method__vendor: {

      cash: {

        cobroexpress: openBold + "Notes specific to PayU Argentina" + closeBold + linebreak + "Possible value:" + openCode + "COBRO_EXPRESS" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        pagofacil: openBold + "Notes specific to PayU Argentina" + closeBold + linebreak + "Possible value:" + openCode + "PAGOFACIL" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        rapipago: openBold + "Notes specific to PayU Argentina" + closeBold + linebreak + "Possible value:" + openCode + "RAPIPAGO" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,
      }

    }



  },


  payumexico: {

    payment_method__vendor: {

      cash: {

        bankreferencedmexico: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + "Possible value:" + openCode + "BANK_REFERENCED" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        otherscashmx: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + "Possible value:" + openCode + "OTHERS_CASH_MX" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        oxxo: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + "Possible value:" + openCode + "OXXO" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        seveneleven: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + "Possible value:" + openCode + "SEVEN_ELEVEN" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

      },
    },

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + "Only required if " + openCode + "process_without_cvv2" + closeCode + " is" + openCode + "false" + closeCode + ", or " + openCode + "process_without_cvv2" + closeCode + " is not included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__payu_latam___additional_details____month_without_interest_months: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + " Available options: 3, 6, 9 or 12.",

    provider_specific_data__payu_latam___additional_details____month_without_interest_bank: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + "The name of the bank (of the credit card) which offers months without interest, for the purchase.",

    provider_specific_data__payu_latam___additional_details____process_without_cvv2: openBold + "Notes specific to PayU Mexico" + closeBold + linebreak + "Allows you to process credit card transactions excluding security code cvv2. Requires prior activation by PayU to use this feature.",

  },

  payucolombia: {

    payment_method__vendor: {

      cash: {

        baloto: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Possible value:" + openCode + "BALOTO" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        bankreferenced: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Possible value:" + openCode + "BANK_REFERENCED" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        efecty: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Possible value:" + openCode + "EFECTY" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        otherscash: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Possible value:" + openCode + "OTHERS_CASH" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink

      },

      banktransfer: {
        psebanktransfers: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Possible value:" + openCode + "PSE" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink
      }
    },

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Only required if " + openCode + "process_without_cvv2" + closeCode + " is" + openCode + "false" + closeCode + ", or " + openCode + "process_without_cvv2" + closeCode + " is not included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments__number_of_installments: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Valid number of installments: from 1 to 36. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__payu_latam___additional_details____process_without_cvv2: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "Allows you to process credit card transactions excluding security code cvv2. Requires prior activation by PayU to use this feature.",

    payment_method__additional_details___bank_transfer_financial_institution_code: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "The bank code of the bank for the PSE transaction. For possible values, retrieve the list of PSE Banks using the query as shown in the " + payulatamapiintegrationdocurl + " (search for the 'Bank transfer' section, in the Colombia tab, step 1.). Note that the list of PSE Banks should be retrieved at least once a day.",

    payment_method__additional_details___bank_transfer_financial_institution_name: openBold + "Notes specific to PayU Colombia" + closeBold + linebreak + "The name of the bank for the PSE transaction. For possible values, retrieve the list of PSE Banks using the query as shown in the " + payulatamapiintegrationdocurl + " (search for the 'Bank transfer' section, in the Colombia tab, step 1.). Note that the list of PSE Banks should be retrieved at least once a day.",

  },

  payuchile: {

    payment_method__vendor: {

      cash: {

        multicaja: openBold + "Notes specific to PayU Chile" + closeBold + linebreak + "Possible value:" + openCode + "MULTICAJA" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink

      }
    },

  },

  payubrazil: {

    payment_method__vendor: {

      cash: {

        boletobancario: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Possible value:" + openCode + "BOLETO_BANCARIO" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink

      }
    },

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Only required if " + openCode + "process_without_cvv2" + closeCode + " is" + openCode + "false" + closeCode + ", or " + openCode + "process_without_cvv2" + closeCode + " is not included. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__payu_latam___additional_details____accept_terms_and_conditions: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Only required if your PayU bank account in Brazil is linked to a bank account in another country.",

    provider_specific_data__payu_latam___additional_details____customer_national_identify_number: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format: XXX.XXX.XXX-XX. You must validate the field input in the browser. See code samples in " + payBrazilNationalIdentifyCodeSampleJS + " and " + payBrazilNationalIdentifyCodeSamplePhp + ".",

    provider_specific_data__payu_latam___additional_details____customer_cnpj_identify_number: {

      cash: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format: XXXXXXXXXXXXXX",

      ccards: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Only required if a customer is associated with the payment. Format: XXXXXXXXXXXXXX",
    },

    payment_method__additional_details___national_identify_number: {

      cash: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format: XXX.XXX.XXX-XX",
    },

    payment_method__additional_details___customer_cnpj_identify_number: openBold + "Notes specific to PayU Brazil" + closeBold + linebreak + "Format: XXXXXXXXXXXXXX",

  },

  payuindia: {

    provider_specific_data__payu_india: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Parameters specific to PayU India.",

    provider_specific_data__payu_india___additional_details: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Parameters specific to PayU India.",

    reconciliation_id: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Maximum length: 25 characters.  Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU India" + closeBold + linebreak + "This field is not required for recurring transaction flows. For more information about recurring payment flows, see " + payuindiarecurringflow + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__payu_india___additional_details____si: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Pass with a value of " + openCode + "1" + closeCode + " to indicate that you are setting-up a recurring transaction flow. You only need to pass this attribute in the initial charge request (also known as a Consent Transaction).  For more information about recurring payment flows, see " + payuindiarecurringflow + ".",

    provider_specific_data__payu_india___additional_details____recurring: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Pass with a value of " + openCode + "1" + closeCode + " to indicate that the transaction is a recurring transaction. Only pass this attribute in transactions following a Consent Transaction. Note that the transaction will fail if you pass this attribute without having executed a Consent Transaction first. For more information about recurring payment flows, see " + payuindiarecurringflow + ".",

    provider_specific_data__payu_india___additional_details____zeroRedirect: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Pass with a value of " + openCode + "1" + closeCode + " to implement an SMS-based (zero-redirect) authentication flow. For more information, see " + payuindiarecurringflow + " or " + payuindianonrecurringflow + ".",

    payment_method__additional_details___vpa: {

      banktransfer: {

        upiindia: openBold + "Notes specific to PayU India" + closeBold + linebreak + "A unique ID you need to create in order to send and accept money via UPI."
      },

    },

    payment_method__additional_details___bank_code: {

      banktransfer: {

        netbankingindia: openBold + "Notes specific to PayU India" + closeBold + linebreak + "The relevant bank code. For example, AXIB for Axis Netbanking."
      },

    },

    payment_method__source_type: {

      ewallet: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "ewallet" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      loyalty: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "loyalty" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,
    },

    payment_method__vendor: {

      loyalty: {

        citibankrewardpoints: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Citibank Reward Points" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,
      },

      ewallet: {

        itzcash: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "ItzCash" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        airtelmoney: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Airtel Money" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        ypaycash: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "YPay Cash" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        cashcard: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Cash Card" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        icashcard: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "ICash Card" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        paycashcard: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "PAYCASH CARD" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        zipcashcard: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "ZIPcash card" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        freecharge: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "FreeCharge" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        jiomoney: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "JioMoney" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        amazonpay: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Amazon pay" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        payzapp: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Pay Zapp" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        olamoney: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Ola Money" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        phonepe: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Phonepe" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        paytm: openBold + "Notes specific to PayU India" + closeBold + linebreak + "Possible value:" + openCode + "Paytm" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink
      }
    },

  },


  payucitrusindia: {

    payment_method__source_type: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "Possible value:" + openCode + "bank_transfer" + closeCode + ".",

    // payment_method__additional_details___payment_mode_type: {

    //   banktransfer: {

    //     netbanking: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "The payment mode for bank transfer payment methods. Possible value:" + openCode + "netbanking",

    //     upi: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "The payment mode for bank transfer payment methods. Possible value:" + openCode + "UPI" + closeCode
    //   },

    // },

    payment_method__vendor: {

      banktransfer: {

        netbanking: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "Possible value:" + openCode + "netbanking" + closeCode + ". For a general description of this field," + paymentsRESTAPIHyperlink,

        upi: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "Possible value:" + openCode + "UPI" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,
      }

    },

    payment_method__additional_details___bank_code: openBold + "Notes specific to PayU Citrus (India)" + closeBold + linebreak + "Only required for the netbanking bank transfer payment method. " + payuCitrusIndiaNetbankingCodes

  },

  payuromania: {

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "This field is required, unless configured otherwise in your PayU Romania account. For a general description of this field," + paymentsRESTAPIHyperlink,

    installments__number_of_installments: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Only required for installments. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments__additional_details: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Only required for installments. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments__additional_details___payment_method: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Only required for installments. The payment method that the customer selects, which supports installments. Possible values: BRDF, CARD_AVANTAJ, STAR_BT, RAIFFEISEN, GARANTI_RO, BCR_INSTALLMENTS, ALPHABANK_INSTALLMENTS, OPTIMO, and BRD_INSTALLMENTS." + linebreak + "Note: The payment_method must be the same as the card used in the post token request." + linebreak + "For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__payu_romania:  openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Parameters specific to PayU Romania.",

    provider_specific_data__payu_romania___additional_details: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Parameters specific to PayU Romania.",

    provider_specific_data__payu_romania___additional_details____ignore_line_items: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "If set to " + openCode + "true" + closeCode + ", this will instruct PaymentsOS to authorize the transaction using the amount passed in the " + openCode + "amount" + closeCode + " field of the Create Payment request (the amounts passed separately per line item in the " + openCode + "order" + closeCode + " object of the Create Payment request will be ignored).",

    provider_specific_data__payu_romania___additional_details____payment_method: openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "See "+payuRomaniaPaymentMethods + " for a list of supported payment methods.",

    three_d_secure_attributes__external___xid:  openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Mandatory in an external 3DS 1 flow. For a general description of this field, "  + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___ds_xid:  openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Mandatory in an external 3DS 2 flow. For a general description of this field, "  + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___three_d_secure_version:  openBold + "Notes specific to PayU Romania" + closeBold + linebreak + "Mandatory in an external 3DS 2 flow. For a general description of this field, "  + paymentsRESTAPIHyperlink,

  },

  payurussia: {

    provider_specific_data__payu_russia:  openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "Parameters specific to PayU Russia.",

    provider_specific_data__payu_russia___additional_details: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "Parameters specific to PayU Russia.",

    provider_specific_data__payu_russia___additional_details____ignore_line_items: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "If set to " + openCode + "true" + closeCode + ", this will instruct PaymentsOS to authorize the transaction using the amount passed in the " + openCode + "amount" + closeCode + " field of the Create Payment request (the amounts passed separately per line item in the " + openCode + "order" + closeCode + " object of the Create Payment request will be ignored).",

    provider_specific_data__payu_russia___additional_details____payment_method:openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "See "+payuRussiaPaymentMethods + " for a list of supported payment methods.",

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "This field is required, unless configured otherwise in your PayU Russia account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__source_type: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "Possible value:" + openCode + "bank_transfer" + closeCode + ".",

    payment_method__vendor: {

      banktransfer: {

        qiwi: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "Possible value:" + openCode + "QIWI" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink
      }
    },

    // payment_method__additional_details___payment_method: {

    //   banktransfer: {

    //     qiwi: openBold + "Notes specific to PayU Russia" + closeBold + linebreak + "The alternative payment method that the customer selects to pay with. Possible value:" + openCode + "QIWI" + closeCode,

    //   },
    // },
  },

  payuturkey: {

    provider_specific_data__payu_turkey:  openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Parameters specific to PayU Turkey.",

    provider_specific_data__payu_turkey___additional_details: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Parameters specific to PayU Turkey.",

    provider_specific_data__payu_turkey___additional_details____ignore_line_items: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "If set to " + openCode + "true" + closeCode + ", this will instruct PaymentsOS to authorize the transaction using the amount passed in the " + openCode + "amount" + closeCode + " field of the Create Payment request (the amounts passed separately per line item in the " + openCode + "order" + closeCode + " object of the Create Payment request will be ignored).",

    provider_specific_data__payu_turkey___additional_details____payment_method:openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "See "+payuTurkeyPaymentMethods + " for a list of supported payment methods.",

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "This field is required, unless configured otherwise in your PayU Turkey account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments__number_of_installments: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Only required for installments. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__vendor: {

      banktransfer: {

        bkm: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Possible value:" + openCode + "BKM" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        compay: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Possible value:" + openCode + "COMPAY" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        upt: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Possible value:" + openCode + "UPT" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        wire: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Possible value:" + openCode + "WIRE" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink

      }
    },

    payment_method__additional_details___bill_cinumber: {

      banktransfer: {

        upt: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Customer’s ID number. Only required for the UPT payment method.",
      }

    },

    payment_method__additional_details___bill_citype: {

      banktransfer: {

        upt: openBold + "Notes specific to PayU Turkey" + closeBold + linebreak + "Customer’s ID type. Possible values:" + openCode + "PERSONALID" + closeCode + " (for identity card) " + openCode + "PASSPORT" + closeCode + " (for passport) " + openCode + "DRVLICENSE" + closeCode + " (for driving license). Only required for the UPT payment method.",
      }

    },

  },

  sberbank: {

    merchant_site_url: openBold + "Notes specific to Sberbank" + closeBold + linebreak + "Required if 3DS is used. For a general description of this field,   " + paymentsRESTAPIHyperlink,

    reconciliation_id: openBold + "Notes specific to Sberbank" + closeBold + linebreak + "This field has the following format requirements: " + openul + openli + "Up to 99 characters" + closeli + openli + "Characters that are not allowed: %, +, \\r, \\n" + closeli + closeul + " For a general description of this field,   " + paymentsRESTAPIHyperlink,

    payment_method__credit_card_cvv: openBold + "Notes specific to Sberbank" + closeBold + linebreak + "This field is required, unless configured otherwise in your Sberbank account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__sberbank: openBold + "Notes specific to Sberbank" + closeBold + linebreak + "Parameters specific to Sberbank.",

    provider_specific_data__sberbank___additional_details: openBold + "Notes specific to Sberbank" + closeBold + linebreak + "Parameters specific to Sberbank.",

    provider_specific_data__sberbank___additional_details____payment_timeout_secs: openBold + "Notes specific to Sberbank" + closeBold + linebreak + "This field denotes the time period in seconds within which you can perform a capture after a successful authorization request. Format: Only digits, maximum 9 digits.",

    provider_specific_data__sberbank___additional_details____is3ds: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "If your Sberbank account has been configured to use 3DS, then passing a value of " + openCode + "true" + closeCode +  " will specifically request to run a 3DS check, while passing a value of " + openCode +"false" + closeCode +" will prevent a 3DS check from being run. " + openBold + "Important note" + closeBold + ": Do not pass this field unless your Sberbank account has been configured to support 3DS (3DS must enabled with either Force_SSL and/or Force_TDS). If you do not pass this field, then a 3DS check is performed in accordance with your Sberbank account configuration and the issuer's support for 3DS.",

  },

  shva: {

    channel_type: openBold + "Notes specific to Shva" + closeBold + linebreak + "If no value is passed for this field, then the transaction will be considered to be an online transaction. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments: openBold + "Notes specific to Shva" + closeBold + linebreak + "You cannot use installments in combination with automatic payments. Doing so will cause the transaction to fail. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments__number_of_installments: openBold + "Notes specific to Shva" + closeBold + linebreak + "Only required for installments. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments__first_payment_amount: openBold + "Notes specific to Shva" + closeBold + linebreak + "This field is paired with " + openCode + "remaining_payments_amount" + closeCode + ". That is, if you include one, you must include the other as well. Alternatively omit both fields, in which case PaymentsOS will calculate the values of both fields for you. For a general description of this field, " + paymentsRESTAPIHyperlink,

    installments__remaining_payments_amount: openBold + "Notes specific to Shva" + closeBold + linebreak + "This is the amount for each remaining payment (it is" + openBold + " not " + closeBold + "the total remaining amount). This field is paired with " + openCode + "first_payment_amount" + closeCode + ". That is, if you include one, you must include the other as well. Alternatively omit both fields, in which case PaymentsOS will calculate the values of both fields for you. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__credit_card_cvv: openBold + "Notes specific to Shva" + closeBold + linebreak + "Required only if required by the terminal. For a general description of this field, " + paymentsRESTAPIHyperlink,

    reconciliation_id: openBold + "Notes specific to Shva" + closeBold + linebreak + "A unique ID generated by you, used for transaction reconciliation. Format: Numbers only, not more than eight digits. Note - If more than eight digits are sent, then only the last eight digits will be used.",

    three_d_secure_attributes: openBold + "Notes specific to Shva" + closeBold + linebreak + "The result of a 3D Secure authentication, if you performed this check on your side. Note: If you send" + openCode + "three_d_secure_attributes" + closeCode + ", then do not send the " + openCode + "channel_type" + closeCode + " field. If you send " + openCode + "additional_details.card_entry_channel" + closeCode + " (legacy field), then its value must be 'Ecommerce' (this is the default value).",

    three_d_secure_attributes__external___encoding: openBold + "Notes specific to Shva" + closeBold + linebreak + "Encoding of the authentication - 'HEX' or 'BASE64'.",

    three_d_secure_attributes__external___xid: openBold + "Notes specific to Shva" + closeBold + linebreak + "The unique identifier for the transaction.",

    three_d_secure_attributes__external___cavv: openBold + "Notes specific to Shva" + closeBold + linebreak + "The unique Cardholder Authentication Verification Value (CAVV) associated with the transaction, provided by the card issuer.",

    three_d_secure_attributes__external___eci_flag: openBold + "Notes specific to Shva" + closeBold + linebreak + "The Electronic Commerce Indicator (ECI) associated with the transaction.",

    provider_specific_data__shva: openBold + "Notes specific to Shva" + closeBold + linebreak + "Parameters specific to Shva.",

    provider_specific_data__shva___additional_details: openBold + "Notes specific to Shva" + closeBold + linebreak + "These are optional fields that you can use to pass data to the acquirer. For example, you and the acquirer could agree that 'addendum1' will contain a 'Frequent flyer number'.",

    provider_specific_data__shva___additional_details____card_entry_channel: openBold + "Notes specific to Shva" + closeBold + linebreak + "This field is used for legacy purposes. Send " + openCode + "channel_type" + closeCode + "instead. " +  linebreak +  linebreak + "If you send " + openCode + "card_entry_channel" + closeCode + ", then it indicates the origin of the card details. Possible values:" + openul + openli + "'Ecommerce'- (Internet / Web) (default value)" + closeli + openli + "'Moto' - (Mail / Telephone initiated)" + closeli + closeul + "Note: The value  'Ecommerce' must be used when" + openCode + "three_d_secure_attributes" + closeCode + "are sent." + linebreak + linebreak + "If you send " + openCode + "channel_type" + closeCode + " as well, its value will override the value passed in " + openCode + "card_entry_channel" + closeCode + ".",

    provider_specific_data__shva___additional_details____addendum1: openBold + "Notes specific to Shva" + closeBold + linebreak + "Use this field for passing in additional data required by the card issuing companies. Maximum number of characters: 98. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum2: openBold + "Notes specific to Shva" + closeBold + linebreak + "Use this field for passing in additional data required by the card issuing companies. Maximum number of characters: 98. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum1settl: openBold + "Notes specific to Shva" + closeBold + linebreak + "Use this field for passing in additional data required by the card issuing companies. Maximum number of characters: 298. Note:If you provided a" + openCode + "statement_soft_descript or" + closeCode + " in the create payment request, then we will pass this in this field as well (adding it to any data you added yourself). Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum2settl: openBold + "Notes specific to Shva" + closeBold + linebreak + "Use this field for passing in additional data required by the card issuing companies. Maximum number of characters: 298. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum3settl: openBold + "Notes specific to Shva" + closeBold + linebreak + "Use this field for passing in additional data required by the card issuing companies. Maximum number of characters: 298. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum4settl: openBold + "Notes specific to Shva" + closeBold + linebreak + "Use this field for passing in additional data required by the card issuing companies. Maximum number of characters: 298. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____addendum5settl: openBold + "Notes specific to Shva" + closeBold + linebreak + "Use this field for passing in additional data required by the card issuing companies. Contact the card issuing companies for help in understanding the format of the data you can pass in.",

    provider_specific_data__shva___additional_details____preauthorization_hold: openBold + "Notes specific to Shva" + closeBold + linebreak +  "Your business may require that you authorize a transaction without knowing the transaction amount in advance. In this case, add" + openCode + "preauthorization_hold" + closeCode + "with a value of" + openCode + "true" + closeCode + "to the" + openCode + "provider_specific_data" + closeCode + ". This will invoke a request for approval pending the final transaction amount. Using this option requires approval of the card issuing companies you work with." + linebreak + openBold + "Important note" + closeBold + ": Do not pass this field if passing a " + openCode + "transaction_type" + closeCode + " field with a value of " + openCode + "automatic_payment_init" + closeCode + ". Doing so will cause the transaction to fail.",

    provider_specific_data__shva___additional_details____automatic_init_payment_id: openBold + "Notes specific to Shva" + closeBold + linebreak +  "In an automatic payment flow, use this field to pass the identifier of the Create Payment request that you invoked when initializing the automatic payment flow. Pass this identifier in each automatic payment transaction following the initialization request.",

    provider_specific_data__shva___additional_details____transaction_type: openBold + "Notes specific to Shva" + closeBold + linebreak +  "Used for automatic payments to indicate the type of transaction. To initialize the automatic payment flow, pass a value of " + openCode + "automatic_payment_init" + closeCode + ". For all subsequent automatic payments that belong to the same initial transaction, pass a a value of " + openCode + "automatic_payment" + closeCode + ".",

    provider_specific_data__shva___additional_details____stnd_order_frequency: openBold + "Notes specific to Shva" + closeBold + linebreak +  "In an automatic payment flow, use this field to pass the frequency (in weeks) at which each payment should be executed. Can be any value between 1 and 52. This field is required if passing a " + openCode + "transaction_type" + closeCode + " field with a value of " + openCode + "automatic_payment_init" + closeCode + ".",

    provider_specific_data__shva___additional_details____stnd_order_number: openBold + "Notes specific to Shva" + closeBold + linebreak +  "In an automatic payment flow, use this field to pass the total number of payments done so far (including the current payment but excluding the initialization request).",

    provider_specific_data__shva___additional_details____stnd_order_total_number: openBold + "Notes specific to Shva" + closeBold + linebreak +  "In an automatic payment flow, use this field to pass the total number of automatic payments that will be executed (if you do not know the total number of automatic payments that will be executed, then you can pass a value of " + openCode + "999" + closeCode + "). If you do not pass this field, then you must pass the " + openCode + "stnd_order_total_sum" + closeCode + " field to indicate the total value of all automatic payments combined." + openBold + " Note: " + closeBold + "You can pass either the " + openCode + "tsnd_order_total_number" + closeCode + "field or the " + openCode + "stnd_order_total_sum" + closeCode + " field, but not both.",

    provider_specific_data__shva___additional_details____stnd_order_total_sum: openBold + "Notes specific to Shva" + closeBold + linebreak +  "In an automatic payment flow, use this field to pass the total value of all automatic payments combined. This field is required if you do not pass the " + openCode + "stnd_order_total_number" + closeCode + " field." + openBold + " Note: " + closeBold + "You can pass either the " + openCode + "stnd_order_total_sum" + closeCode + "field or the " + openCode + "stnd_order_total_number" + closeCode + " field, but not both.",

    provider_specific_data__shva___additional_details____installments_type:  openBold + "Notes specific to Shva" + closeBold + linebreak +  "Indicates the type of installments. Can be one of the following values: " + openCode + "regular" + closeCode + " or " + openCode + "credit" + closeCode + ". Default value if you do not pass this field is " + openCode  + "regular"  + closeCode + "." + linebreak + openBold + " Important note: " + closeBold + "Only pass this field if you pass " + openCode + "number_of_installments" + closeCode + " as well (that is, the transaction is a transaction in which the shopper pays in installments). Passing this field without passing "  + openCode + "number_of_installments" + closeCode + " will result in an error." + linebreak + "If you pass a type of " + openCode + "credit" + closeCode + ", then the following requirements apply:" + openul + openli + "The " + openCode + "number_of_installments" + closeCode + " must be equal to, or higher than, 3" + closeli + openli + "You cannot pass the " + openCode + "first_payment_amount" + closeCode + " field (doing so will result in an error)." + closeli + openli + "You cannot pass the " + openCode + "remaining_payments_amount" + closeCode + " field (doing so will result in an error)." + closeli  + closeul,

  },

  payusouthafrica: {

    reconciliation_id: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__magellan: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Parameters specific to PayU South Africa.",

    provider_specific_data__magellan___additional_details: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Parameters specific to PayU South Africa.",

    provider_specific_data__magellan___additional_details____is3ds: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Pass this field if configured 3DS to be optional in your PayU South Africa account and you want the user to complete a 3DS authentication step.",

    provider_specific_data__magellan___additional_details____order_description: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Default: PayU HUB Transaction",

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "This field is required, unless configured otherwise in your PayU South Africa account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__magellan___recurring: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "This field is required if you disabled the credit card cvv check.",

    payment_method__vendor: {

      loyalty: {

        DISCOVERYMILES: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "DISCOVERYMILES" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        EBUCKS: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "EBUCKS" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      },

      ewallet: {

        MASTERPASS: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "MASTERPASS" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        MOBICRED: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "MOBICRED" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        VISA_CHECKOUT: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "VISA_CHECKOUT" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      },

      banktransfer: {

        EFT_PRO: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "EFT_PRO " + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      }

    },

    payment_method__source_type: {

      loyalty: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "loyalty" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      ewallet: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "ewallet" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      banktransfer: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "bank_transfer" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      paymentpage: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Possible value:" + openCode + "payment_page" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    },

    payment_method__additional_details___supported_payment_methods: {
      paymentpage: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "A comma separated list of payment methods that should be displayed on the payment page (users are redirected to this page and can then select their payment method of choice). " + openBold + "Important note: " + closeBold + "Do not incude spaces between each entry. The payment methods you pass must be enabled in your PayU South Africa account."

    }



  },

  payukenya: {

    reconciliation_id: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__magellan: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Parameters specific to PayU Kenya.",

    provider_specific_data__magellan___additional_details: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Parameters specific to PayU Kenya.",

    provider_specific_data__magellan___additional_details____is3ds: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Pass this field if you enabled 3DS.",

    provider_specific_data__magellan___additional_details____demo_mode:  openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "This field is only used in the sandbox environment and is only applied in a 3DS flow. Default: " + openCode + "true" + closeCode + ".",

    provider_specific_data__magellan___additional_details____order_description: openBold + "Notes specific to PayU South Africa" + closeBold + linebreak + "Default: PayU HUB Transaction",

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "This field is required, unless configured otherwise in your PayU Kenya account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__magellan___recurring: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "This field is required if you disabled the credit card cvv check.",

    payment_method__vendor: {


      ewallet: {

        MPESA: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Possible value:" + openCode + "MPESA" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        EQUITEL: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Possible value:" + openCode + "EQUITEL" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

        AIRTEL_MONEY: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Possible value:" + openCode + "AIRTEL_MONEY" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      },

      banktransfer: {

        MOBILE_BANKING: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Possible value:" + openCode + "MOBILE_BANKING" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      }
    },

    payment_method__source_type: {

      ewallet: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Possible value:" + openCode + "ewallet" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      banktransfer: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Possible value:" + openCode + "bank_transfer" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      paymentpage: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "Possible value:" + openCode + "payment_page" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink

    },

    payment_method__additional_details___supported_payment_methods: {
      paymentpage: openBold + "Notes specific to PayU Kenya" + closeBold + linebreak + "A comma separated list of payment methods that should be displayed on the payment page (users are redirected to this page and can then select their payment method of choice). " + openBold + "Important note: " + closeBold + "Do not incude spaces between each entry. The payment methods you pass must be enabled in your PayU Kenya account."

    }


  },

  payunigeria: {

    reconciliation_id: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__magellan: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Parameters specific to PayU Nigeria.",

    provider_specific_data__magellan___additional_details: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Parameters specific to PayU Nigeria.",

    provider_specific_data__magellan___additional_details____is3ds: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Pass this field if you enabled 3DS.",

    provider_specific_data__magellan___additional_details____demo_mode:  openBold + "Notes specific to Nigeria" + closeBold + linebreak + "This field is only used in the sandbox environment and is only applied in a 3DS flow. Default: " + openCode + "true" + closeCode + ".",

    provider_specific_data__magellan___additional_details____order_description: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Default: PayU HUB Transaction",

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "This field is required, unless configured otherwise in your PayU Nigeria account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__magellan___recurring: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "This field is required if you disabled the credit card cvv check.",

    payment_method__vendor: {


      banktransfer: {

        EFT_BANK_TRANSFER: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Possible value:" + openCode + "EFT_BANK_TRANSFER " + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      }
    },

    payment_method__source_type: {

      banktransfer: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Possible value:" + openCode + "bank_transfer" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

      paymentpage: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "Possible value:" + openCode + "payment_page" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    },

    payment_method__additional_details___supported_payment_methods: {
      paymentpage: openBold + "Notes specific to PayU Nigeria" + closeBold + linebreak + "A comma separated list of payment methods that should be displayed on the payment page (users are redirected to this page and can then select their payment method of choice). " + openBold + "Important note: " + closeBold + "Do not incude spaces between each entry. The payment methods you pass must be enabled in your PayU Nigeria account."

    }

  },

  payeasecup: {

    reconciliation_id: openBold + "Notes specific to Payease CUP" + closeBold + linebreak + "If you need to retry the charge request, then you must provide a new" + openCode + "reconciliation_id" + closeCode + ". For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__credit_card_cvv: openBold + "Notes specific to Payease CUP" + closeBold + linebreak + "When using the same card, this field is not required for the second and subsequent transactions. For a general description of this field, " + paymentsRESTAPIHyperlink,

    "provider_specific_data__payease-cup": openBold + "Notes specific to Payease CUP" + closeBold + linebreak + "Parameters specific to Payease CUP.",

    "provider_specific_data__payease-cup___sms_validation_required": openBold + "Notes specific to Payease CUP" + closeBold + openul + openli + "For the" + openBold + " Recurring shopper flow " + closeBold + "the value must be" + openCode + "false" + closeCode + "." + closeli + openli + "For the" + openBold + " Non-recurring shopper flow" + closeBold + ", the value must be" + openCode + "true" + closeCode + "(or simply don't send the" + openCode + "provider_specific_data" + closeCode + "object, because the default value of the" + openCode + " sms_validation_required" + closeCode + "attribute is" + openCode + "true" + closeCode + "). For more information, see " + payueasecupnonrecurringflow + "."

  },

  wirecard: {

    payment_method__credit_card_cvv: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Only required if CVV is mandatory in your Wirecard account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    reconciliation_id: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Alphanumeric characters only. Maximum length: 150 characters. Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___ds_xid: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Required if " + openCode + "three_d_secure_attributes.external.three_d_secure_version" + closeCode + " is 2.x.x. Expected format is UUID(36), canonical format as defined in IETF RFC 4122. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___xid: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Required if " + openCode + "three_d_secure_attributes.external.three_d_secure_version" + closeCode + " is 1.x.x. For a general description of this field, " + paymentsRESTAPIHyperlink,

    // cof_transaction_indicators__cof_consent_transaction_id: openBold + "Notes specific to Wirecard" + closeBold + linebreak + " When initiating a consent transaction, you will receive a " + openCode + "transaction_id" + closeCode + " in the " + openCode + "provider_data" + closeCode + " object. This ID identifies the initial consent transaction. Pass this ID in the " + openCode + " cof_consent_transaction_id" + closeCode + " field in all subsequent transaction requests. For a general description of this field, " + paymentsRESTAPIHyperlink,

    provider_specific_data__wirecard: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Parameters specific to Wirecard.",

    provider_specific_data__wirecard___additional_details: openBold + "Notes specific to Wirecard" + closeBold + linebreak + "Parameters specific to Wirecard.",

    provider_specific_data__wirecard___additional_details____cof_consent_transaction_id: openBold + "Notes specific to Wirecard" + closeBold + linebreak + " When initiating a consent transaction, you will receive a " + openCode + "transaction_id" + closeCode + " in the " + openCode + "provider_data" + closeCode + " object. This ID identifies the initial consent transaction. Pass the ID in this field in all subsequent transaction requests. " + openBold + "Important note" + closeBold +": Do not pass this ID in the" + openCode +  "cof_transaction_indicators.cof_consent_transaction_id" + closeCode + " field as well, since doing so may impact your acceptance rates if transacting against other providers. For more information, refer to the " + wireCardIntegrationProcedures

  },

  safecharge: {

    provider_specific_data__safecharge: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Parameters specific to SafeCharge.",

    provider_specific_data__safecharge___additional_details: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Parameters specific to SafeCharge.",

    provider_specific_data__safecharge___additional_details____is3ds: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Pass this field if you enabled 3DS.",

    payment_method__credit_card_cvv: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Only required if CVV is mandatory in your SafeCharge account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    reconciliation_id: openBold + "Notes specific to SafeCharge" + closeBold + linebreak + "Maximum length: 45 characters. Must be unique per request. For a general description of this field, " + paymentsRESTAPIHyperlink
  },

  stripe: {

    reconciliation_id: openBold + "Notes specific to Stripe" + closeBold + linebreak + "If you provide a " + openCode + "reconciliation_id" + closeCode + " in the " + requestname + " request , then you will be able to view the transaction directly in your " + '<a href="https://dashboard.stripe.com/test/dashboard" target="_blank">Stripe dashboard</a>' + ", by pasting the " + openCode + "reconciliation_id" + closeCode + " into the search box. For a general description of this field, " + paymentsRESTAPIHyperlink
  },

  vantiv: {

    cof_transaction_indicators__cof_consent_transaction_id: openBold + "Notes specific to Vantiv" + closeBold + linebreak + " When initiating a consent transaction, you will receive a " + openCode + "network_transaction_id" + closeCode + " in the " + openCode + "provider_data" + closeCode + " object. This ID identifies the initial consent transaction. Pass this ID in the " + openCode + "cof_consent_transaction_id" + closeCode + " field in all subsequent transaction requests. For a general description of this field, " + paymentsRESTAPIHyperlink
  },

  payusingleplatform: {

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "This field is required, unless configured otherwise in your PayU Single Platform account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__additional_details___additionalDescription: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Free text describing the transaction. You can use this text for searching transactions using the PayU Single Platform search functionality.",

    payment_method__additional_details___bank_name: {

      banktransfer: {

        payment_wall: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Possible value:" + openCode + "payment_wall" + closeCode,

        pbl: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Possible value: only the bank names according to your contract with PayU Single Platform.",

      }

    },

    payment_method__additional_details___language: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "The preferred language of the customer, as a two character language code, in " + IsoLanguageCodesURL + " format. See the list of " + payuSinglePlatformLanguages + ".",

    provider_specific_data__payu_poland: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Parameters specific to PayU Single Platform.",

    provider_specific_data__payu_poland___additional_details____language: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "The preferred language of the customer, as a two character language code, in " + IsoLanguageCodesURL + " format. See the list of " + payuSinglePlatformLanguages + ".",

    provider_specific_data__payu_poland___additional_details____additionalDescription: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Free text describing the transaction. You can use this text for searching transactions using the PayU Single Platform search functionality.",

    three_d_secure_attributes__internal___browser_color_depth: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "If you pass one of the browser-related fields, then you must pass all other browser-related fields as well. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_header: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "If you pass one of the browser-related fields, then you must pass all other browser-related fields as well. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_java_enabled: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "If you pass one of the browser-related fields, then you must pass all other browser-related fields as well. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_language: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "If you pass one of the browser-related fields, then you must pass all other browser-related fields as well. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_screen_height: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "If you pass one of the browser-related fields, then you must pass all other browser-related fields as well. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_screen_width: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "If you pass one of the browser-related fields, then you must pass all other browser-related fields as well. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___browser_time_zone: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "If you pass one of the browser-related fields, then you must pass all other browser-related fields as well. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__internal___product_code: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Mandatory in an internal 3DS 2 flow. A value of " + openCode + "03" + closeCode + " is not supported. For a general description of this field, " + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___three_d_secure_authentication_status: openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Mandatory in an external 3DS 2 flow. Can be one of the following values:" + openul + openli + openCode + "Y" + closeCode + ": Indicates a successful 3DS2.x authentication" + closeli + openli + openCode + "A" + closeCode + ": Indicates a 3DS2.x authentication attempt." + closeli + closeul + "Passing any other value will cause the authorization to be declined." + linebreak + "This field will be ignored if passed with 3DS 1 transactions. For a general description of this field, "  + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___ds_xid:  openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Mandatory in an external 3DS 2 flow. For a general description of this field, "  + paymentsRESTAPIHyperlink,

    three_d_secure_attributes__external___xid:  openBold + "Notes specific to PayU Single Platform" + closeBold + linebreak + "Mandatory in an external 3DS 1 flow. For a general description of this field, "  + paymentsRESTAPIHyperlink,
    

  },

  paypal: {

    provider_specific_data__paypal: openBold + "Notes specific to PayPal" + closeBold + linebreak + "Parameters specific to PayPal.",

    provider_specific_data__paypal___additional_details: openBold + "Notes specific to PayPal" + closeBold + linebreak + "Parameters specific to PayPal.",

    provider_specific_data__paypal___additional_details____allowed_payment_method: openBold + "Notes specific to PayPal" + closeBold + linebreak + "Parameters specific to PayPal.",

    provider_specific_data__paypal___additional_details____brand_name: openBold + "Notes specific to PayPal" + closeBold + linebreak + "A label that overrides the business name in the merchant's PayPal account on the PayPal checkout pages. Maximum length: 127 characters.",

    provider_specific_data__paypal___additional_details____landing_page: openBold + "Notes specific to PayPal" + closeBold + linebreak + "The type of landing page to show on the PayPal site for customer checkout. To use the non-PayPal account landing page, set to " + openCode + "Billing" + closeCode + ". To use the PayPal account log in landing page, set to " + openCode + "Login" + closeCode + ". Default: " + openCode + "Login" + closeCode + ".",

    provider_specific_data__paypal___additional_details____locale: openBold + "Notes specific to PayPal" + closeBold + linebreak + "The locale of pages that the PayPal payment experience displays. It is either a two-letter country code or five-character locale code supported by PayPal. For supported values, see " + payPalLocaleCodesURL + linebreak + "If not passed, PayPal uses the following default locales in the order listed:" + openul + openli + "en_US" + closeli + openli + "fr_XC" + closeli + openli + "es_XC" + closeli + openli + "zh_XC" + closeli + closeul,

    provider_specific_data__paypal___additional_details____note_to_payer: openBold + "Notes specific to PayPal" + closeBold + linebreak + "A free-form field that clients can use to send a note to the payer. Maximum length: 165 characters.",

    provider_specific_data__paypal___additional_details____shipping_preference: openBold + "Notes specific to PayPal" + closeBold + linebreak + "The shipping preference. The possible values are:" + openul + openli + openCode + "NO_SHIPPING" + closeCode + ": Redacts the shipping address from the PayPal pages. Recommended for digital goods." + closeli + openli + openCode + "GET_FROM_FILE" + closeCode + ": Uses the customer-selected shipping address on PayPal pages. " + openBold + "Beware: " + closeBold + " The shipping address will be returned to you in the " + openCode + "provider_data.raw_response object" + closeCode + openBold + "only after a completed authorize or charge request." + closeBold + closeli + openli + openCode + "SET_PROVIDED_ADDRESS" + closeCode + ": If available, uses the merchant-provided shipping address, which the customer cannot change on the PayPal pages. If the merchant does not provide an address, the customer can enter the address on PayPal pages." + closeli + closeul + "Default: " + openCode + "NO_SHIPPING" + closeCode + ".",

    provider_specific_data__paypal___additional_details____subtotal: openBold + "Notes specific to PayPal" + closeBold + linebreak + "The subtotal amount for the items, passed in major units (" + openBold + "do not pass the amount in minor units" + closeBold + "). This is the sum of all the items listed without taxes. The amount passed in the POST payment request must be the sum of the subtotal + taxes. If the POST payment request includes line items or a tax amount, this property is " + openBold + "required" + closeBold + " . Maximum length is 10 characters, which includes:" + openul + openli + "Seven digits before the decimal point." + closeli + openli + "The decimal point." + closeli + openli + "Two digits after the decimal point." + closeli + closeul,

    provider_specific_data__paypal___additional_details____allowed_payment_method: openBold + "Notes specific to PayPal" + closeBold + linebreak + "The payment method for this transaction. This field does not apply to the credit card payment method. The possible values are:" + openul + openli + openCode + "UNRESTRICTED" + closeCode + ". Merchant does not have a preference on how they want the customer to pay." + closeli + openli + openCode + "INSTANT_FUNDING_SOURCE" + closeCode + ". Merchant requires that the customer pays with an instant funding source, such as a credit card or PayPal balance. All payments are processed instantly. However, payments that require a manual review are marked as pending. Merchants must handle the pending state as if the payment is not yet complete." + closeli + openli + openCode + "IMMEDIATE_PAY" + closeCode + ". Processes all payments immediately. Any payment that requires a manual review is marked failed." + closeli + closeul + "Default: " + openCode + "UNRESTRICTED" + closeCode + ".",

    provider_specific_data__paypal___additional_details____custom_invoice_data: openBold + "Notes specific to PayPal" + closeBold + linebreak + "Custom data that will appear in PayPal's invoice.",

    payment_method__source_type: openBold + "Notes specific to PayPal" + closeBold + linebreak + "Possible value:" + openCode + "ewallet" + closeCode + ".",

    payment_method__vendor: openBold + "Notes specific to PayPal" + closeBold + linebreak + "Possible value:" + openCode + "paypal" + closeCode + "."

  },

  dalenys: {

    reconciliation_id: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Maximum length: 40 characters. For a general description of this field, " + paymentsRESTAPIHyperlink,

    merchant_site_url: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "This field is required if your using 3DS. For a general description of this field, " + paymentsRESTAPIHyperlink,

    payment_method__credit_card_cvv: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "This field is required, unless configured otherwise in your Dalenys account. For a general description of this field, " + paymentsRESTAPIHyperlink,

    // three_d_secure_attributes__external___three_d_secure_authentication_status: 

    three_d_secure_attributes__external___ds_xid:  openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Mandatory in an external 3DS 2 flow.",

    provider_specific_data__dalenys: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Parameters specific to Dalenys.",

    provider_specific_data__dalenys___additional_details: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Parameters specific to Dalenys.",

    provider_specific_data__dalenys___additional_details____CLIENTIDENT: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Unique identifier of the user in your application (such as a login or a primary key). If you do not pass this field, PaymentsOS will try to get the identifier from the " + openCode + "customer_reference" + closeCode + " field stored in a related customer object using the " + openCode + "customer_id" + closeCode + " you passed in a POST Payment request. If PaymentsOS cannot get the " + openCode + "customer_reference" + closeCode + " from the customer object, the request will fail.",

    provider_specific_data__dalenys___additional_details____CLIENTEMAIL: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "The user’s email. If you do not pass this field, PaymentsOS will try to get the email address from a related customer object using the " + openCode + "customer_id" + closeCode + " you passed in a POST Payment request. If PaymentsOS cannot get the email address from the customer object, the request will fail.",

    provider_specific_data__dalenys___additional_details____CLIENTREFERRER: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "The user’s HTTP referrer URL. If you do no pass a vallue for this field, PaymentsOS will pass www.zooz.com",

    provider_specific_data__dalenys___additional_details____DESCRIPTION: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "A short description of the operation, can be used to trigger fraud actions. Contact your Payment Manager for some advice on this topic.",

    provider_specific_data__dalenys___additional_details____selected_brand: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Indicates the card brand that the customer selected for the payment.  This field is optional on technical accounts set for international traffic and required on technical accounts set for French traffic. If you do not pass this field, DalenYs will send a default value set in the account configuration by the payment manager. Allowed values: " + openCode + "cb" + closeCode  + ", " + openCode + "visa" + closeCode + ", " + openCode + "vpay" + closeCode + ", " + openCode + "electron" + closeCode + "," + openCode + "mastercard" + closeCode + ", " + openCode + "maestro" + closeCode  + ".",

    provider_specific_data__dalenys___additional_details____three_d_secure_cavv_algorithm: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "3-D Secure “Cardholder Authentication Verification Value” algorithm (0-9). Mandatory in an external 3DS 1 and External 3DS 2 flow",

    provider_specific_data__dalenys___additional_details____three_d_secure_result:  openBold + "Notes specific to Dalenys" + closeBold + linebreak + "6 character value composed of " + openCode + "three_d_secure_authentication_status" + "converted to hexadecimal concatenated with the result VRes converted to hexadecimal.",

    provider_specific_data__dalenys___additional_details____three_d_secure_card_enrolled:  openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Card’s enrollment status. Mandatory for and external 3DS 1 flow, optional for an external 3DS 2 flow. Allowed values: " + openul + openli + openCode + "u" + closeCode  + ": unknown" + closeli
    + openli + openCode + "n" + closeCode  + ": no" + closeli + openli + openCode + "y" + closeCode  + ": yes",

    provider_specific_data__dalenys___additional_details____three_d_secure_mode: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Applied authentication mode: Mandatory in an external 3DS 2 flow. Allowed values: " + openul + openli + openCode + "sca" + closeCode  + ": Strong authentication" + closeli
    + openli + openCode + "frictionless" + closeCode  + ": Frictionless authentication" + closeli,

    provider_specific_data__dalenys___additional_details____three_d_secure_transaction_status_reason: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Transaction status reason. Mandatory for Carte Bancaire when used in an external 3DS 2 flow. Allowed values: " + openul 
    + openli + openCode + "01" + closeCode  + ": Card authentication failed" + closeli
    + openli + openCode + "02" + closeCode  + ": Unknown Device" + closeli
    + openli + openCode + "03" + closeCode  + ": Unsupported Device" + closeli
    + openli + openCode + "04" + closeCode  + ": Exceeds authentication frequency limit" + closeli
    + openli + openCode + "05" + closeCode  + ": Expired card" + closeli
    + openli + openCode + "06" + closeCode  + ": Invalid card number" + closeli
    + openli + openCode + "07" + closeCode  + ": Invalid transaction" + closeli
    + openli + openCode + "08" + closeCode  + ": No Card record" + closeli
    + openli + openCode + "09" + closeCode  + ": Security failure" + closeli
    + openli + openCode + "10" + closeCode  + ": Stolen card" + closeli
    + openli + openCode + "11" + closeCode  + ": Suspected fraud" + closeli
    + openli + openCode + "12" + closeCode  + ": Transaction not permitted to cardholder" + closeli
    + openli + openCode + "13" + closeCode  + ": Cardholder not enrolled in service" + closeli
    + openli + openCode + "14" + closeCode  + ": Transaction timed out at the ACS" + closeli
    + openli + openCode + "15" + closeCode  + ": Low confidence" + closeli
    + openli + openCode + "16" + closeCode  + ": Medium confidence" + closeli
    + openli + openCode + "17" + closeCode  + ": High confidence" + closeli
    + openli + openCode + "18" + closeCode  + ": Very High confidence" + closeli
    + openli + openCode + "19" + closeCode  + ": Exceeds ACS maximum challenges" + closeli
    + openli + openCode + "20" + closeCode  + ": Non-Payment transaction not supported" + closeli
    + openli + openCode + "21" + closeCode  + ": 3RI transaction not supported" + closeli,

    provider_specific_data__dalenys___additional_details____three_d_secure_challenge_cancellation: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Transaction status reason. Mandatory for Carte Bancaire when used in an external 3DS 2 flow. Allowed values: " + openul 
    + openli + openCode + "01" + closeCode  + ": Cardholder selected `Cancel`" + closeli
    + openli + openCode + "02" + closeCode  + ": 3DS Requestor cancelled Authentication" + closeli
    + openli + openCode + "03" + closeCode  + ": Transaction Abandoned" + closeli
    + openli + openCode + "04" + closeCode  + ": Transaction Timed Out at ACS—other timeouts" + closeli
    + openli + openCode + "05" + closeCode  + ": Transaction Timed Out at ACS—First CReq not received by ACS" + closeli
    + openli + openCode + "06" + closeCode  + ": Transaction Error" + closeli
    + openli + openCode + "07" + closeCode  + ": Unknown" + closeli,

    provider_specific_data__dalenys___additional_details____three_d_secure_challenge_score:  openBold + "Notes specific to Dalenys" + closeBold + linebreak + "The global score calculated by the Carte Bancaire scoring platform. Mandatory for Carte Bancaire when used in an external 3DS 2 flow.",

    provider_specific_data__dalenys___additional_details____three_d_secure_preference: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Transaction status reason. Mandatory for Carte Bancaire when used in an external 3DS 2 flow. Allowed values: " + openul 
    + openli + openCode + "sca" + closeCode  + ": ask for a strong authentication" + closeli
    + openli + openCode + "frictionless" + closeCode  + ": ask for a frictionless authentication" + closeli
    + openli + openCode + "Nopref" + closeCode  + ": or absent, the decision will be made by Dalenys" + closeli
    + openli + openCode + "scamandate" + closeCode  + ": strong authentication required by regulation" + closeli,

    provider_specific_data__dalenys___additional_details____three_d_secure_out_of_scope_reason: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Used if the transaction type is out of scope of Strong Customer Authentication (SCA). The following transaction types are out of scope of SCA: " + openul 
    + openli + openCode + "mit" + closeCode + closeli
    + openli + openCode + "moto" + closeCode  + closeli
    + openli + openCode + "one_leg_out" + closeCode  + closeli
    + openli + openCode + "anonymous_prepaid_card" + closeCode  + closeli + closeul + openBold + "Note: " + closeBold + "When sending any of the values above, there is no need to pass any additional 3DS 2 fields.",

    three_d_secure_attributes__external___xid: openBold + "Notes specific to Dalenys" + closeBold + linebreak + "Mandatory in an external 3DS 1 flow. For a general description of this field, " + paymentsRESTAPIHyperlink,

  },

  payuperu: {

    payment_method__vendor: {

      cash: {

        bcp: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "Possible value:" + openCode + "BCP" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

        pagoefectivo: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "Possible value:" + openCode + "PAGOEFECTIVO" + closeCode + ". The vendor name is case-sensitive. For a general description of this field, " + paymentsRESTAPIHyperlink,

      },
    },

    payment_method__credit_card_cvv: openBold + "Notes specific to PayU Peru" + closeBold + linebreak + "Only required if CVV is mandatory in your PayU account. For a general description of this field, " + paymentsRESTAPIHyperlink

  },

  payeezy: {

    cof_transaction_indicators__cof_consent_transaction_id: openBold + "Notes specific to Payeezy" + closeBold + linebreak + " When initiating a consent transaction, you will receive a " + openCode + "network_transaction_id" + closeCode + " in the " + openCode + "provider_data" + closeCode + " object. This ID identifies the initial consent transaction. Pass this ID in the " + openCode + "cof_consent_transaction_id" + closeCode + " field in all subsequent transaction requests. For a general description of this field, " + paymentsRESTAPIHyperlink
  },


  worldpayeu: {

    cof_transaction_indicators__cof_consent_transaction_id: openBold + "Notes specific to Worldpay" + closeBold + linebreak + " When initiating a consent transaction, you will receive a " + openCode + "network_transaction_id" + closeCode + " in the " + openCode + "provider_data" + closeCode + " object. This ID identifies the initial consent transaction. Pass this ID in the " + openCode + "cof_consent_transaction_id" + closeCode + " field in all subsequent transaction requests. For a general description of this field, " + paymentsRESTAPIHyperlink
  },

  payuasiapacific: {

    provider_specific_data:  openBold + "Notes specific to PayU Asia Pacific" + closeBold + linebreak + "Required if you pass the " + openCode + "accountId" + closeCode + " fied (see the explanation below).",

    provider_specific_data__payuasiapacific:  openBold + "Notes specific to PayU Asia Pacific" + closeBold + linebreak + "Required if you pass the " + openCode + "accountId" + closeCode + " fied (see the explanation below).",

    provider_specific_data__payuasiapacific___additional_details:  openBold + "Notes specific to PayU Asia Pacific" + closeBold + linebreak + "Required if you pass the " + openCode + "accountId" + closeCode + " fied (see the explanation below).",

    provider_specific_data__payuasiapacific___additional_details____accountId: openBold + "Notes specific to PayU Asia Pacific" + closeBold + linebreak + "An identifier representing the provider credentials configured in your PayU Asia Pacific account. The transaction will be routed to the relevant provider based on this identifier." + openBold + " Important note: " + closeBold + " For non-card payments, passing this field is required if you did not configure the " + openCode + "accountId" + closeCode + " in your PaymentsOS Control Center configuration settings.",

  },

}

function setRequestName() {

  switch (bodyBuilder.requesttype) {
    case "Authorize":
      requestname = "Authorize"
      break;
    case "Charge":
      requestname = "Charge"
      break;
    case "Credit":
      requestname = "Credit"
      break;
    default:
      console.log("no request type")
  }
}

function setRESTAPIHyperlink() {

  switch (bodyBuilder.requesttype) {
    case "Authorize":
      paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-an-authorization" target="_blank">see the API Reference</a>' + "."
      break;
    case "Charge":
      paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-charge" target="_blank">see the API Reference</a>' + "."
      break;
    case "Credit":
      paymentsRESTAPIHyperlink = '<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-credit" target="_blank">see the API Reference</a>' + "."
      break;
    default:
      console.log("no request type")
  }

}

