var stringsGenerator = require('./strings.js')

// var controlCenterURL = "<a href='https://control.paymentsos.com/login'>PaymentsOS Control Center</a>"

// HTML in text
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

module.exports = (providerNameInText, controlCenterURL) => {
  const strings = stringsGenerator(providerNameInText, controlCenterURL);

  return {
    authentication: {

      alipay: {
        toconfigure: strings.authentication + openul +
          openli + "partner_id: The merchant UID/PID." + closeli +
          openli + "md5_key: The MD5 private key. This is a 32-byte string, composed of letters and numbers." + closeli + openli + "settlement_currency: Default settlement currency code. This must be one of the currency codes configured in your Alipay account. Format: a three character ISO-4217 currency code. See <a href='/providers/alipay.html#currencies'>Currencies</a> for a list of supported currencies." + closeli + closeul,
        requiredoptional: strings.required

      },

      safecharge: {
        toconfigure: strings.authentication + openul +
          openli + "merchantId: The merchant ID provided by SafeCharge." + closeli +
          openli + "merchantSiteId: The merchant Site ID provided by SafeCharge." + closeli + openli + "merchantSecretKey: The secret key provided by SafeCharge." + closeli + closeul,
        requiredoptional: strings.required

      },

      credorax: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_id: The merchant id as defined in your Credorax account." + closeli +
          openli + "signature_key: The SHA256 signature key you received from Credorax " + closeli+ closeul,

        requiredoptional: strings.required

      },

      payuasiapacific: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "clientId: The client ID provided by PayU Asia Pacific." + closeli +
          openli + "clientSecret: The client secret provided by PayU Asia Pacific." + closeli +
          openli + "merchantId: The merchant ID provided by PayU Asia Pacific." + closeli +
          openli + "accountId: The ID represents the identifier of your account with PayU Asia Pacific. If you do not configure this field for non-card payment methods, then you must pass the accountId in the Create Authorize request. " + openBold + "Note" + closeBold + ": For card payment, if you do not configure this field or pass the accountId in the Create Authorize request, then PayU Asia Pacific will use the BIN number to route the payment to the most optimal payment provider." + closeli + closeul,

        requiredoptional: strings.required

      },

      payuchile: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "apiLogin: " + strings.username + closeli +
          openli + "apiKey: " + strings.password + closeli +
          openli + "accountId: " + strings.payuLatamAccountID + closeli +
          openli + "paymentCountry: CHL" + closeli +
          openli + "merchantId: " + strings.payuLatamMerchantID + closeli + closeul +
          strings.payuLatamSelectLatamInControlCenter,

        requiredoptional: strings.required

      },

      payumexico: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "apiLogin: " + strings.username + closeli +
          openli + "apiKey: " + strings.password + closeli +
          openli + "accountId: " + strings.payuLatamAccountID + closeli +
          openli + "paymentCountry: MEX" + closeli +
          openli + "merchantId: " + strings.payuLatamMerchantID + closeli + closeul +
          strings.payuLatamSelectLatamInControlCenter,

        requiredoptional: strings.required

      },

      payuargentina: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "apiLogin: " + strings.username + closeli +
          openli + "apiKey: " + strings.password + closeli +
          openli + "accountId: " + strings.payuLatamAccountID + closeli +
          openli + "paymentCountry: ARG" + closeli +
          openli + "merchantId: " + strings.payuLatamMerchantID + closeli + closeul +
          strings.payuLatamSelectLatamInControlCenter,

        requiredoptional: strings.required

      },

      payucolombia: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "apiLogin: " + strings.username + closeli +
          openli + "apiKey: " + strings.password + closeli +
          openli + "accountId: " + strings.payuLatamAccountID + closeli +
          openli + "paymentCountry: COL" + closeli +
          openli + "merchantId: " + strings.payuLatamMerchantID + closeli + closeul +
          strings.payuLatamSelectLatamInControlCenter,

        requiredoptional: strings.required

      },

      payupanama: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "apiLogin: " + strings.username + closeli +
          openli + "apiKey: " + strings.assword + closeli +
          openli + "accountId: " + strings.payuLatamAccountID + closeli +
          openli + "paymentCountry: PAN" + closeli +
          openli + "merchantId: " + strings.payuLatamMerchantID + closeli + closeul +
          strings.payuLatamSelectLatamInControlCenter,

        requiredoptional: strings.required

      },

      payuperu: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "apiLogin: " + strings.username + closeli +
          openli + "apiKey: " + strings.password + closeli +
          openli + "accountId: " + strings.payuLatamAccountID + closeli +
          openli + "paymentCountry: PER" + closeli +
          openli + "merchantId: " + strings.payuLatamMerchantID + closeli + closeul +
          strings.payuLatamSelectLatamInControlCenter,

        requiredoptional: strings.required

      },

      payubrazil: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "apiLogin: " + strings.username + closeli +
          openli + "apiKey: " + strings.password + closeli +
          openli + "accountId: " + strings.payuLatamAccountID + closeli +
          openli + "paymentCountry: BRA" + closeli +
          openli + "merchantId: " + strings.payuLatamMerchantID + closeli + closeul +
          strings.payuLatamSelectLatamInControlCenter,

        requiredoptional: strings.required

      },

      alfabank: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "userName: " + strings.username + closeli +
          openli + "password: " + strings.password + closeli + closeul,

        requiredoptional: strings.required

      },

      sberbank: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "userName: " + strings.username + closeli +
          openli + "password: " + strings.password + closeli + closeul,

        requiredoptional: strings.required

      },

      braintree: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_id: The Merchant id as defined in Braintree." + closeli +
          openli + "public-key: Public key as defined in Braintree." + closeli +
          openli + "private-key: Private key as defined in Braintree." + closeli +
          openli + "merchant_account_id (optional): The Merchant account id as defined in Braintree. It represents a specific currency in your Braintree account." + closeli +
          openli + "currency: Currency as defined in Braintree." + closeli + closeul +
          "Notes:" + openul +
          openli + "You should have received a set of test credentials for each Braintree merchant account (one account per currency). Use these credentials to create separate provider configurations in the PaymentsOS test environment." + closeli +
          openli + "For your test credentials, login to your " + "<a href='https://sandbox.braintreegateway.com/login' target='_blank'>Braintree test account</a>" + " and click Account > My User > View Authorizations. For your live credentials, login to your " + "<a href='https://www.braintreegateway.com/login' target='_blank'>Braintree live account</a>" + "." + closeli +
          openli + "To see your Braintree Merchant accounts click Settings > Processing." + closeli + closeul,

        requiredoptional: strings.required

      },

      chasepaymentech: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_id: The Gateway merchant account number, assigned by ChasePaymentech." + openBold + " Note: " + closeBold + "Only one currency can be associated with one merchant_id." + closeli +
          openli + "terminal_id (configuring this is optional): The Terminal ID assigned by Chase Paymentech. Valid range of values: a number from 000 to 999. Default if not configured is 001." + closeli +
          openli + "bin: The transaction routing definition, assigned by Chase Paymentech. Possible values:" + openCode + "STRATUS" + closeCode + " or " + openCode + "TANDEM" + closeCode + "." + closeli + closeul +
          "You should have received a set of test credentials for each currency that you intend to use, when you created your Chase Paymentech account. Use these credentials to create one provider configuration per currency, in the PaymentsOS test environment.",

        requiredoptional: strings.required

      },

      cybersource: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchantID: The merchant ID or username provided by CyberSource. " + closeli +
          openli + "transactionSecurityKey: The transaction security key provided by CyberSource." + closeli +
          openli + "reportingUserName: User name of the CyberSource Business Center user with a 'Report download' role." + closeli +
          openli + "reportingUserPassword: Password of the CyberSource Business Center user with a 'Report download' role." + closeli + closeul +
          "To see your CyberSource credentials, login to either the CyberSource " + "<a href='https://ebctest.cybersource.com/ebctest/Home.do' target='_blank'>test</a>" + " or " + "<a href='https://ebc.cybersource.com/ebc/Home.do' target='_blank'>live</a>" + " environment and choose Account Management.",

        requiredoptional: strings.required

      },

      payucitrusindia: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchantAccessKey: API Key used for API requests." + closeli +
          openli + "merchantSecretKey: Key for encrypting signatures." + closeli + closeul,

        requiredoptional: strings.required

      },

      payeasecup: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "mid: The merchant id defined in Payease." + closeli +
          openli + "sha2_key: The secret key provided by Payease." + closeli +
          openli + "refund_operation_id: The Operator Number assigned by Payease for refunds." + closeli + openli + "private-key: This is an RSA private key created by you (this is not the same as the PaymentsOS private key)" + closeli + closeul,

        requiredoptional: strings.required

      },

      payuindia: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "Live credentials: " + strings.inYourProviderAccount + ", enter the <code>merchant_key</code> and <code>merchant_secret</code>(salt) keys you received from PayU India. You can also login to your PayU India <a href='https://txncdn.payubiz.in/login'>merchant dashboard</a> and grab the credentials from My Account -> System Settings." + closeli +
          openli + "Test credentials: For <code>merchant_key</code> use " + openBold + "DGy1hY" + closeBold + ", for <code>merchant_secret</code>(salt) use "  + openBold + "uhd8H9Bh" + closeBold + closeli +
          closeul,

        requiredoptional: strings.required

      },

      payuturkey: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_code: The merchant id in PayU Turkey." + closeli +
          openli + "secret_key: Secret key provided by PayU Turkey." + closeli +
          closeul +
          "To see your PayU Turkey credentials, open your " + "<a href='https://secure.payu.com.tr/cpanel/account_settings.php' target='_blank'>PayU administration page </a>" + " and choose Account Management > Account settings.",

        requiredoptional: strings.required

      },

      payuromania: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_code: The merchant id in PayU Romania." + closeli +
          openli + "secret_key: Secret key provided by PayU Romania." + closeli +
          closeul +
          "To see your PayU Romania credentials, open your " + "<a href='https://secure.payu.ro/cpanel/account_settings.php' target='_blank'>PayU administration page </a>" + " and choose Account Management > Account settings." + linebreak + linebreak +
          "For testing in the sandbox environment, contact your PayU Romania account representative to request a dedicated testing account. Alternatively, use the following credentials to test in a shared environment:" + openul + 
          openli + "cPanel URL: " + "<a href='https://sandbox.payu.ro/cpanel/' target='_blank'>https://sandbox.payu.ro/cpanel/</a>" + closeli + 
          openli + "User: support@zooz.com" + closeli +
          openli + "Password: Zooz@2018" + closeli +
          openli + "Merchant ID: DEMOROSB" + closeli +
          openli + "Secret Key: 1231234567890123" + closeli + closeul,

        requiredoptional: strings.required

      },

      payusouthafrica: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "Username: Web service username provided by PayU South Africa." + closeli +
          openli + "Password: Web service password provided by PayU South Africa." + closeli +
          openli + "Safekey: PayU Merchant Identifier provided by PayU South Africa." + closeli +
          closeul +
          "To obtain test credentials, click " + "<a href='https://payusahelp.atlassian.net/wiki/spaces/developers/pages/425997/Test+Credentials'>here</a>. To obtain live credentials, <a href='https://merchantportal.payu.co.za/stores'>login to the merchant portal.</a'",

        requiredoptional: strings.required

      },

      payukenya: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "Username: Web service username provided by PayU Kenya." + closeli +
          openli + "Password: Web service password provided by PayU Kenya" + closeli +
          openli + "Safekey: PayU Merchant Identifier provided by PayU Kenya." + closeli +
          closeul +
          "To obtain test credentials, click " + "<a href='https://help.payu.co.za/display/developers/Test+Credentials'>here</a>. To obtain live credentials, <a href='https://merchantportal.payu.co.za/stores'>login to the merchant portal.</a'",

        requiredoptional: strings.required

      },

      payunigeria: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "Username: Web service username provided by PayU Nigeria." + closeli +
          openli + "Password: Web service password provided by PayU Nigeria." + closeli +
          openli + "Safekey: PayU Merchant Identifier provided by PayU Nigeria." + closeli +
          closeul +
          "To obtain test credentials, click " + "<a href='https://payusahelp.atlassian.net/wiki/spaces/developers/pages/425997/Test+Credentials'>here</a>. To obtain live credentials, <a href='https://merchantportal.payu.co.za/stores'>login to the merchant portal.</a'",

        requiredoptional: strings.required

      },

      rsb: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "certificate" + ". Copy the certificate string from the <b>.pem</b> file. For help in creating a certificate, review the instructions in the " +
          "<a href='/assets/RSB FAQ openssl Windows and macOS_1.2.pdf' download target='_blank'>RSB documentation</a> " + "(will download as a PDF file)." + closeli +
          openli + "private-key" + closeli + closeul,

        requiredoptional: strings.required

      },

      payurussia: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_code: The merchant id in PayU Russia." + closeli +
          openli + "secret_key: Secret key provided by PayU Russia." + closeli +
          closeul +
          "To see your PayU Russia credentials, open your " + "<a href='https://secure.payu.ru/cpanel/account_settings.php' target='_blank'>PayU administration page </a>" + " and choose Account Management > Account settings.",

        requiredoptional: strings.required

      },

      stripe: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "api_key: The api_key provided by Stripe." + closeli + closeul +
          "To see your Stripe account, open your " + "<a href='https://dashboard.stripe.com/account/apikeys' target='_blank'>Stripe dashboard</a>" + " and click API. Use the 'View Test Data' button to switch between your test and live Stripe Dashboards.",

        requiredoptional: strings.required

      },

      worldpayeu: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_code: The Merchant Code in your Worldpay profile. " + closeli +
          openli + "api_username: The New Username in your Worldpay profile." + closeli +
          openli + "xml_password: The XML Password in your Worldpay profile." + closeli + closeul +
          "Create separate configuratons for each provider. To see your Worldpay credentials, view your profile in your Worldpay " + "<a href='https://secure-test.worldpay.com/merchant/merchantAdmin/externalRetrieveMerchantDetail.html?jlbz=04dMUgvxqZ2grdRhzds0LzE4okc3ZmAvMDwaek022s&languageCode=en&countryCode=US' target='_blank'>test</a>" + " or " + "<a href='https://secure.worldpay.com/merchant/merchantAdmin/externalRetrieveMerchantDetail.html?jlbz=04dMUgvxqZ2grdRhzds0LzE4okc3ZmAvMDwaek022s&languageCode=en&countryCode=US' target='_blank'>live</a>" + " accounts.",

        requiredoptional: strings.required

      },

      shva: {

        toconfigure: "In the " + strings.controlCenterURL + " create a provider configuration. We will create the necessary Shva terminals for you and connect them to your PaymentsOS account, so that Shva can process your payment requests. We'll need some input from your side. See <a href='/providers/shva.html#creating-a-provider-configuration'>Creating a Provider Configuration</a> below. ",

        requiredoptional: strings.required
      },

      wirecard: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "username" + closeli +
          openli + "password" + closeli +
          openli + "Merchant ID (MAID)" + closeli + closeul,

        requiredoptional: strings.required

      },

      vantiv: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "merchant_id: The Vantiv merchant ID. This is the ID from your Vantiv production environment. Configure this ID in both the PaymentsOS test and live environment. " +  "<br>" + openBold +  "Note" + closeBold +": The PaymentsOS test environment connects to the Vantiv post-live environment, which is why the production ID is required in the PaymentsOS test environment as well." + closeli +
          openli + "currency: The currency registered for the merchant_id in the Vantiv system." + closeli + 
          openli + "url: Your website URL. This is required when sending a " + openCode +"statement soft descriptor" + closeCode + " in an Authorize or Charge request. Maximum length is 13 characters." + closeli + closeul,

        requiredoptional: strings.required

      },

      payusingleplatform: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "pos_id: The merchant's pos_id in the PayU Single Platform account. " + closeli +
          openli + "second_key: The second_key obtained from PayU." + closeli + 
          openli + "client_secret: used to validate notifications provided by PayU." + closeli +    
          closeul + "For your test credentials, login to your " + "<a href='https://secure.snd.payu.com/user/login?lang=en' target='_blank'>PayU Sandbox account</a>." + linebreak + "For your live credentials, login to your " + "<a href='https://secure.payu.com/user/login?lang=en' target='_blank'>PayU Account</a>." + " In the <b>PayU Biz Panel</b>, in the <b>Online payments</b> tab, click > <b>My Shops</b> > click <b>POS</b> of the relevant shop > click the name under <b>POS</b> > <b>CONFIGURATION KEYS</b>.",

        requiredoptional: strings.required

      },

      paypal: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "Merchant ID. This ID is listed in your PayPal account." + closeli + closeul + "For your test credentials, login to your " + "<a href='https://www.sandbox.paypal.com/signin' target='_blank'>sandbox account</a>" + ". For your live credentials, login to your " + "<a href='https://www.paypal.com/us/signin' target='_blank'>business account</a>" + "." ,

        requiredoptional: strings.required

      },

      dalenys: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "identifier: Daleny's processing account technical identifier." + closeli + 
          openli + "apiKey: The account key associated with the account's technical identifier" + closeli +
          openli + "accountCurrency: The currency configured in your Daleny's account." + closeli + closeul,

        requiredoptional: strings.required

      },

      payeezy: {

        toconfigure:
          strings.authenticationrequired + openul +
          openli + "Merchant token" + closeli + 
          openli + "API Key" + closeli +
          openli + "API Secret" + closeli + closeul +
          "To obtain your credentials, complete the " + "<a href='https://developer.payeezy.com/faqs/what-are-steps-required-integrate-payeezy-start-finish' target='_blank'>setup procedures with Payeezy</a>" + ".",

        requiredoptional: strings.required

      },


  
    },

    cvvprocessing: {

      credorax: {

        toconfigure: strings.disableCVVInYourAccount + " " + strings.contactProviderSupport,

        requiredoptional: strings.optional
      },

      payumexico: {

        toconfigure: strings.inYourProviderAccount + "enable the 'Process without a cvv2 security code' feature if you intend to use it.",

        requiredoptional: strings.optional
      },

      payuargentina: {

        toconfigure: strings.inYourProviderAccount + "enable processing with CVV, if desired." + strings.contactProviderSupport,

        requiredoptional: strings.optional
      },

      payucolombia: {

        toconfigure: strings.inYourProviderAccount + "enable the 'Process without a cvv2 security code' feature if you intend to use it.",

        requiredoptional: strings.optional
      },

      payubrazil: {

        toconfigure: strings.inYourProviderAccount + "enable the 'Process without a cvv2 security code' feature if you intend to use it.",

        requiredoptional: strings.optional
      },

      payukenya: {

        toconfigure: strings.inYourProviderAccount + " disable the cvv check if you do not require customers to enter their cvv code when initiating a payment. " + strings.contactProviderSupport,

        requiredoptional: strings.optional
      },

      payusouthafrica: {

          toconfigure: strings.inYourProviderAccount + " disable the cvv check if you do not require customers to enter their cvv code when initiating a payment. " + strings.contactProviderSupport,

          requiredoptional: strings.optional
      },

      alfabank: {

        toconfigure: strings.inYourProviderAccount + "set Payment without CVC to enable if you want to allow post authorization and post charge requests to be processed without a cvv number.",

        requiredoptional: strings.optional

      },

      sberbank: {

        toconfigure: strings.inYourProviderAccount + "set Payment without CVC to enable if you want to allow post authorization and post charge requests to be processed without a cvv number.",

        requiredoptional: strings.optional

      },

      chasepaymentech: {

        toconfigure: strings.inYourProviderAccount + "set " + openBold + "Card Verification Data (CVD)" + closeBold + " as optional or mandatory (this is also known as as CVV2, CVC2, or CID). In addition, enable CVV verification and determine whether a failed verification should cause the request to fail as well. Note that if you enabled CVV verification, you will receive the status of the verification in the" + openCode + "additional_details" + closeCode + "object in the request response data.",

        requiredoptional: strings.optional

      },

      rsb: {

        toconfigure: strings.inYourProviderAccount + " disable CVV if required." + strings.contactProviderSupport,

        requiredoptional: strings.optional

      },

      dalenys: {

        toconfigure: strings.inYourProviderAccount +"enable processing transactions without CVV if desired. " + strings.contactProviderSupport,

        requiredoptional: strings.optional

      },

      payurussia: {

        toconfigure: "Disable the cvv check if you do not require customers to enter their cvv code when initiating a payment. " + strings.canOnlyBeDoneByProviderSupport + " " + strings.contactProviderSupport,

        requiredoptional: strings.optional

      },


    },

    dynamicdescriptor: {

      credorax: {

        toconfigure: strings.inYourProviderAccount + "enable a Dynamic Billing Descriptor. This requires approval from Credorax.",

        requiredoptional: strings.optional

      }

    },

    webhooks: {

      payuchile: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Some API requests in the payment flow may remain in a pending status for some time. ",

        requiredoptional: strings.required
      },

      payumexico: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Some API requests in the payment flow may remain in a pending status for some time. ",

        requiredoptional: strings.required
      },

      payuargentina: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Some API requests in the payment flow may remain in a pending status for some time. ",

        requiredoptional: strings.required
      },

      payucolombia: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Some API requests in the payment flow may remain in a pending status for some time. ",

        requiredoptional: strings.required
      },

      payubrazil: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Some API requests in the payment flow may remain in a pending status for some time. ",

        requiredoptional: strings.required
      },

      payupanama: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Some API requests in the payment flow may remain in a pending status for some time. ",

        requiredoptional: strings.required
      },

      payuperu: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Some API requests in the payment flow may remain in a pending status for some time. ",

        requiredoptional: strings.required
      },

      braintree: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note: Charge, Capture, and Refund are usually pending.",

        requiredoptional: strings.optional
      },

      payucitrusindia: {

        toconfigure: strings.configureWebhooks,

        requiredoptional: strings.required
      },

      payeasecup: {

        toconfigure: strings.configureWebhooks,

        requiredoptional: strings.required
      },

      payuturkey: {

        toconfigure: strings.configureWebhooks,

        requiredoptional: strings.required
      },

      payurussia: {

        toconfigure: strings.configureWebhooks,

        requiredoptional: strings.required
      },

      worldpayeu: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note:  Capture, Refund and Void are asynchronous requests, which return responses with the <code>pending</code> status. Webhooks are not applicable to authorization requests.",

        requiredoptional: strings.required
      },

      shva: {

        toconfigure: strings.configureWebhooks + linebreak + linebreak + "Note:  Many of your API requests will remain in a <code>pending</code> status until the nightly batch, and some may remain in that status for some time after that.",

        requiredoptional: strings.required
      },

      vantiv: {

        toconfigure: strings.configureWebhooks,

        requiredoptional: strings.required
      },

      payusingleplatform: {

        toconfigure: strings.configureWebhooks + " The payment flows for PayU Single Platform are asynchronous, which return responses with the "+ openCode+"pending" + closeCode + "status.",

        requiredoptional: strings.required
      },

      paypal: {

        toconfigure: strings.configureWebhooks + "The payment flows for PayPal are asynchronous, which return responses with the "+ openCode+"pending" + closeCode + "status.",

        requiredoptional: strings.required
      },

      safecharge: {

        toconfigure: strings.configureWebhooks + " " + strings.recommended3ds,

        requiredoptional: strings.optional
      },

    },

    custom: {

      safecharge: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "create separate merchant accounts if you want to use both Charge and Authorize requests. This requires that you create separate provider configurations in the " + strings.controlCenterURL + "  as well. Note: With SafeCharge you can use either Charge or Authorize, but not both. If you require both, create a separate merchant account for each request type.",

          requiredoptional: strings.optional

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "enable the transaction request types you would like to use:" + openul +
            openli + "Capture. This is known as Settle in your SafeCharge account. Enabling Capture requests is required if you use Authorize requests." + closeli +
            openli + "Void" + closeli +
            openli + "Credit. This is known as Payout in your SafeCharge account." + closeli,

          requiredoptional: strings.optional

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + " you can configure your risk settings so that the following fields are optional:" + openul +
            openli + "Billing Country" + closeli +
            openli + "Email Address" + closeli +
            openli + "CVV" + closeli + closeul,

          requiredoptional: strings.optional

        },

        custom4: {

          toconfigure: strings.inYourProviderAccount + "enable passing of a soft descriptor in your payment requests. Note: This is known as a Dynamic Descriptor in your SafeCharge account.",

          requiredoptional: strings.optional

        },

        custom5: {

          toconfigure: strings.inYourProviderAccount + "make sure to set the HTTP method for IPN notifications to POST.",

          requiredoptional: strings.required

        },

      },

      credorax: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "configure SHA256 hashing (used for authentication purposes).",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "enable the currencies you require in your transactions. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + " enable the transaction request types you would like to use. Note that Operation code 101 (Past Transaction Retrieval) is required. The other request types are optional." + openul + 
          openli + "Operation code 101 (Past Transaction Retrieval). This is required for PaymentOS to remain in sync with the transaction status." + closeli +
          openli + "Operation code 92. This is required for 3DS internal transaction flows." + closeli + 
          openli + "Charge. This is operation code 1 in your Credorax account." + closeli +
          openli + "Authorization. This is operation code 2 in your Credorax account." + closeli +
          openli + "Capture. This is operation code 3 in your Credorax account." + closeli +
          openli + "Authorization Void. This is operation code 4 in your Credorax account." + closeli +
          openli + "Refund. This is operation code 5 in your Credorax account." + closeli +
          openli + "Credit. This is operation code 6 in your Credorax account." + closeli +
          openli + "Charge Void. This is operation code 7 in your Credorax account." + closeli +
          openli + "Capture Void. This is operation code 9 in your Credorax account." + closeli + closeul,
          
          requiredoptional: strings.required

        },

        custom4: {

          toconfigure: "If you would like to start using 3DS with Credorax, do the following:" + openul + 
          openli + "For using external or internal 3DS, contact Credorax for registering with the card schemes. " + closeli +
          openli + "To use the internal (Source's) 3D Secure service, you must be registered to the service and have it activated on your account. Contact your Credorax account manager for more information. " + openBold + "Note: " + closeBold + "Source’s 3D Secure service supports both versions of the 3D Secure protocol: 3D Secure 1.0 and 3D Secure 2.0." + closeli + 
          openli + "If you want to use the SMART 3DS fraud service, enable SMART 3DS in your Credorax account." + closeli + 
          openli + "If you want to use 3DS Advisor, enable 3DS Advisor in your Credorax account." + closeli + closeul + 
          openBold + "Beware:" + closeBold + openul + 
          openli + "PaymentsOS does not support a flow with Credorax in which a 3D Secure authentication process is executed without actually processing the transaction." + closeli + 
          openli + "If you did not enable the internal (Source's) 3D Secure service in your Credorax account, the transaction will fail if you pass 3DS data in your transaction requests when sent as part of an internal 3DS flow." + closeli + 
          openli + "You cannot use an external 3DS service in combination with the internal (Source's) 3D Secure service. This means that if the transaction contains both the " + openCode + "provider_specific_data.credorax.additional_details.three_d_secure_initiate" + closeCode + " field and the " + openCode + "three_d_secure_attributes.external" + closeCode + " fields, the transaction will be declined." + closeli + closeul, 
          
          requiredoptional: strings.optional

        }

      },

      payuchile: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the " + strings.payLatamValidateUniqueURL + ". This will validate that each payment reference sent to the PayU Latam system is unique.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.payuLatamGetListOfMinPaymentAmounts,

          requiredoptional: strings.optional

        }

      },

      payumexico: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the " + strings.payLatamValidateUniqueURL + ". This will validate that each payment reference sent to the PayU Latam system is unique.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "enable the 'Months without interest' feature if you intend to use it.",

          requiredoptional: strings.optional

        },

        custom3: {

          toconfigure: strings.payuLatamGetListOfMinPaymentAmounts,

          requiredoptional: strings.optional

        }

      },

      payuargentina: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the " + strings.payLatamValidateUniqueURL + ". This will validate that each payment reference sent to the PayU Latam system is unique.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.payuLatamGetListOfMinPaymentAmounts,

          requiredoptional: strings.optional

        }

      },

      payucolombia: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the " + strings.payLatamValidateUniqueURL + ". This will validate that each payment reference sent to the PayU Latam system is unique.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.payuLatamGetListOfMinPaymentAmounts,

          requiredoptional: strings.optional

        }

      },

      payubrazil: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the " + strings.payLatamValidateUniqueURL + ". This will validate that each payment reference sent to the PayU Latam system is unique.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.payuLatamGetListOfMinPaymentAmounts,

          requiredoptional: strings.optional

        }

      },

      payupanama: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the " + strings.payLatamValidateUniqueURL + ". This will validate that each payment reference sent to the PayU Latam system is unique.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.payuLatamGetListOfMinPaymentAmounts,

          requiredoptional: strings.optional

        }

      },

      payuperu: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the " + strings.payLatamValidateUniqueURL + ". This will validate that each payment reference sent to the PayU Latam system is unique.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.payuLatamGetListOfMinPaymentAmounts,

          requiredoptional: strings.optional

        }

      },

      alfabank: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "3DSecure" + closeBold + " to " + openBold + "disable" + closeBold + ". This is required since PaymentsOS does not yet support 3DSecure authentication for Alfa-Bank.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "SSL payment" + closeBold + " to " + openBold + "enable" + closeBold + ". This is required since PaymentsOS does not yet support 3DSecure authentication for Alfa-Bank (3DSecure authentication is needed if you disable SSL payment).",

          requiredoptional: strings.required

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "Payment from merchant side" + closeBold + " to " + openBold + "enable" + closeBold + ". This is required for implementing payments via an API.",

          requiredoptional: strings.required

        },

        custom4: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "Number of payment attempts" + closeBold + " to " + openBold + "1" + closeBold + " to prevent duplicate charges.",

          requiredoptional: strings.required

        },

        custom5: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "2-phase payment" + closeBold + " to " + openBold + "enable" + closeBold + " if you want to implement a 2-step payment flow. For more information about payment flows, see " + strings.flowsOperationsOverviewDocsURL + ".",

          requiredoptional: strings.optional

        },

        custom6: {

          toconfigure: strings.inYourProviderAccount + "set the " + openBold + "payment expiration time" + closeBold + " if you want to apply this setting at the account level. This is the time period in seconds within which you can perform a capture after a successful authorization request. The default is 20 minutes. Format: Only digits, maximum 9 digits." + linebreak + "Note:  The payment expiration time can also be passed at the transaction level, in the " + openCode + "provider_specific_data" + closeCode + " object.",

          requiredoptional: strings.optional

        },

      },

      sberbank: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "3DSecure" + closeBold + " to " + openBold + "disable" + closeBold + ". This is required since PaymentsOS does not yet support 3DSecure authentication for Sberbank.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "SSL payment" + closeBold + " to " + openBold + "enable" + closeBold + ". This is required since PaymentsOS does not yet support 3DSecure authentication for Sberbank (3DSecure authentication is needed if you disable SSL payment).",

          requiredoptional: strings.required

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "Payment from merchant side" + closeBold + " to " + openBold + "enable" + closeBold + ". This is required for implementing payments via an API.",

          requiredoptional: strings.required

        },

        custom4: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "Number of payment attempts" + closeBold + " to " + openBold + "1" + closeBold + " to prevent duplicate charges.",

          requiredoptional: strings.required

        },

        custom5: {

          toconfigure: strings.inYourProviderAccount + "set " + openBold + "2-phase payment" + closeBold + " to " + openBold + "enable" + closeBold + " if you want to implement a 2-step payment flow. For more information about payment flows, see " + strings.flowsOperationsOverviewDocsURL + ".",

          requiredoptional: strings.optional

        },

        custom6: {

          toconfigure: strings.inYourProviderAccount + "set the " + openBold + "payment expiration time" + closeBold + " if you want to apply this setting at the account level. This is the time period in seconds within which you can perform a capture after a successful authorization request. The default is 20 minutes. Format: Only digits, maximum 9 digits." + linebreak + "Note:  The payment expiration time can also be passed at the transaction level, in the " + openCode + "provider_specific_data" + closeCode + " object.",

          requiredoptional: strings.optional

        },

        custom7: {

          toconfigure: strings.inYourProviderAccount + "enable 3DS if you want to execute a 3DS authentication flow per transaction. If you choose to enable 3DS, you can optionally enable the following options as well: " + openul + openli + "Force_SSL: specifically requests to perform 3DS authentication." + closeli + openli + "Force_TDS: specifically requests not to perform 3DS authentication." + closeli + closeul,

          requiredoptional: strings.optional

        },        

      },

      braintree: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "turn on the " + openBold + "Duplicate transaction checking " + closeBold + " feature. Set the " + openBold + "Duplicate transaction checking interval" + closeBold + " to at least 1 hour. For details, see " + "<a href='https://articles.braintreepayments.com/control-panel/transactions/duplicate-checking#configure-duplicate-transaction-checking' target='_blank'>Configuring duplicate transaction checking</a>" + ".",

          requiredoptional: strings.optional

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "make sure the following unsupported features are disabled:" + openul +
            openli + "Hosted Fields" + closeli +
            openli + "Fraud Tools" + closeli +
            openli + "Alternative Payment Methods" + closeli,

          requiredoptional: strings.required

        },
      },

      chasepaymentech: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "configure the " + openBold + "Auto Settle time" + closeBold + " and " + openBold + "timezone" + closeBold + " fields. This must be configured to prevent transactions from remaining un-settled ('Open Batch').",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "connect the Zooz submitter ID to your account. The submitter ID is 258071."+ strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + "enable AVS verification (full AVS or zip-code only AVS) and determine whether a failed verification should cause the request to fail. Note that if you enabled AVS verification, you will receive the status of the verification in the " + openCode + "additional_details" + closeCode + "object in the request response data.",

          requiredoptional: strings.optional

        },
        custom4: {

          toconfigure: strings.inYourProviderAccount + "confgure your account to support a statement soft descriptor sent in a transaction request. Use the " + strings.bodyBuilderDocsURL + " to generate a sample Create Payment request that includes a statement soft descriptor.",

          requiredoptional: strings.optional

        },
        custom4: {

          toconfigure: strings.inYourProviderAccount + "configure the 'Attempt Authorization Reversal when Voiding' setting. This setting triggers the automatic attempt of an Authorization Reversal when a void is processed. " + openBold + "Important note" + closeBold + ": If you do not configure this setting, then you must pass the " + openCode +  "provider_specific_data.chasepaymentech.additional_details.onlineReversalIndicator" + closeCode + " field in the Create Void request.",

          requiredoptional: strings.optional

        }

      },

      cybersource: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "make sure that the CyberSource " + openBold + " Relaxed Requirement mode" + closeBold + " setting is set to " + openBold + "false" + closeBold + " (the default). This means that address data and expiration date fields are mandatory in requests. " + strings.contactProviderSupport + linebreak + linebreak + " Note: Information in this guide is presented on the assumption that the " + openBold + "Relaxed Requirement mode" + closeBold + " setting is set to " + openBold + "false" + closeBold + " (if you need to operate with the " + openBold + "Relaxed Requirement mode" + closeBold + " setting set to " + openBold + "true" + closeBold + ", then contact " + "<a href='https://zoozsupport.zendesk.com/hc/en-us' target='_blank'>PaymentsOS Support</a>" + ").",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "enable Partial Authorization if desired. " + strings.contactProviderSupport + " Note: If Partial Authorization is enabled, then the " + openCode + "authorization.amount" + closeCode + " can be different to the " + openCode + "payment.amount" + closeCode + ".",

          requiredoptional: strings.optional

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + "add specific external providers. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },
      },

      payucitrusindia: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "enable the Netbanking bank transfer payment method and load the Netbanking banks into your account, according to your contract with PayU Citrus. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "enable the UPI bank transfer payment method. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + "set the " + openCode + "payment.shipping_address.email" + closeCode + " and " + openCode + "payment.shipping_address.phone" + closeCode + " fields to non-mandatory if desired (by default those fields are mandatory). " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },
      },

      payeasecup: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + " set your configuration to either the " + openBold + "non-recurring shopper flow" + closeBold + " (requires the customer to enter an SMS validation code for each purchase) or the " + openBold + "recurring shopper flow" + closeBold + " (does not require an SMS validation code). " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },
      },

      payuindia: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + " enable the " + openBold + "Standing Instructions" + closeBold + " payment method. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " enable payment methods. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },
        custom3: {

          toconfigure: strings.inTheOPaymentsOSControlCenter + "enter a value of " + openCode + "true" + closeCode + " in the " + openBold + "no_legal_entity_in_india" + closeBold + " field if you do" + openBold + " not" + closeBold + " have a legal entity registered in India.",

          requiredoptional: strings.optional

        },
        custom4: {

          toconfigure: "Enable idempotency for all transaction types. Contact your PayU India account representative and request that idempotency is enabled for all transaction types.",

          requiredoptional: strings.required

        },

      },

      payukenya: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + " verify whether 3DS is configured to be optional or required and handle the 3DS flow accordingly. For more information, see <a href='/providers/payu-south-africa.html#enabling-3ds'>Enabling 3DS</a> below. "  + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " enable the payment methods you want to display in the payment page. For more information, see <a href='/providers/payu-kenya.html#implementing-a-payment-page-flow'>Implementing a Payment Page Flow</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        }

      },

      payuturkey: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + strings.configureTheCurrenciesToUse + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " enable IPNs (Instant Payment Notifications). This will ensure that PaymentsOS is kept in sync with PayU systems. See <a href='/providers/payu-turkey.html#configuring-ipn-settings'>Configuring IPN Settings</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

      },

      payuromania: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + strings.configureTheCurrenciesToUse + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " enable IPNs (Instant Payment Notifications). This will ensure that PaymentsOS is kept in sync with PayU systems. See <a href='/providers/payu-romania.html#configuring-ipn-settings'>Configuring IPN Settings</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },
        custom3: {

          toconfigure: `If you intend to use an external 3DS flow, make sure to verify the following: ` + openul + openli + `Your ${providerNameInText} account must be configured to support 3DS from an external MPI. ` + closeli + openli + `The acquirer to which  ${providerNameInText} routes the transaction must support 3DS from an external MPI.` + closeli + openli + `If you configured multiple providers in your PaymentsOS account, then you should define a route rule to direct transactions to a provider that can process data received from an external 3DS service. For more information, see <a href='/optimizing-payments.html#routing-transactions-to-a-provider-supporting-external-3ds'>Routing Transactions to a Provider Supporting External 3DS</a>.` + closeli + closeul + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

      },

      payusouthafrica: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + " verify whether 3DS is configured to be optional or required and handle the 3DS flow accordingly. For more information, see <a href='/providers/payu-south-africa.html#enabling-3ds'>Enabling 3DS</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " enable the payment methods you want to display in the payment page. For more information, see <a href='/providers/payu-south-africa.html#implementing-a-payment-page-flow'>Implementing a Payment Page Flow</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        }

      },

      payunigeria: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + " verify whether 3DS is configured to be optional or required and handle the 3DS flow accordingly. For more information, see <a href='/providers/payu-south-africa.html#enabling-3ds'>Enabling 3DS</a> below. "  + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " disable the cvv check if you do not require customers to enter their cvv code when initiating a payment. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + " enable the payment methods you want to display in the payment page. For more information, see <a href='/providers/payu-nigeria.html#implementing-a-payment-page-flow'>Implementing a Payment Page Flow</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        }

      },

      rsb: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + " configure COB (Close of Business Day) to ensure funds are automatically settled at the end of each business day. Login to your RSB account and configure your business day closing schedule in " + openBold + "user > settings" + closeBold + ".",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " enable 3DS. For help, see " + "<a href='/providers/rsb.html#enabling-3ds'>Enabling 3DS.</a>",

          requiredoptional: strings.optional

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + " configure partial/multiple capture. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

      },

      stripe: {

        custom1: {

          toconfigure: "Allow Stripe to safely accept tokens from PaymentsOS. For help, see <a href='/providers/stripe.html#allowing-stripe-to-safely-accept-tokens-from-paymentsos'>Allowing Stripe to Safely Accept Tokens from PaymentsOS</a> below.",

          requiredoptional: strings.required

        }
      },

      payurussia: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + strings.configureTheCurrenciesToUse + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + " enable IPNs (Instant Payment Notifications). This will ensure that PaymentsOS is kept in sync with PayU systems. See <a href='/providers/payu-russia.html#configuring-ipn-settings'>Configuring IPN Settings</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom3: {

          toconfigure: "Enable partial captures if desired. " + strings.canOnlyBeDoneByProviderSupport + " " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

        custom4: {

          toconfigure: "Enable partial captures if desired. " + strings.canOnlyBeDoneByProviderSupport + " " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        }

      },

      worldpayeu: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + " configure which IPN (Instant Payment Notifications) messages will be sent. See <a href='/providers/worldpayeu.html#configuring-which-ipn-messages-will-be-sent'>Configuring which IPN messages will be Sent</a> below. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },
      },

      shva: {

        custom1: {

          toconfigure: "In the " + strings.controlCenterURL + " create a business unit (in the live environment). Use the provider configuration that we created for you as the default provider.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: "Enable automatic payments if desired. Your account needs to be activated by Shva to support ‘Horaat Keva’	and must be activated to support J5 with TranType= 11",

          requiredoptional: strings.optional

        },

      },

      vantiv: {

        custom1: {

          toconfigure: "Contact your Vantiv account representative and request that Zooz is configured as your presenter using API version 12. The Zooz presenter ID is <b>ZOOZ12</b>.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: "Ensure you do not work with Vantiv's 'Recycling engine' (working with Vantiv's 'Recycling engine' is not recommended, because it causes the PaymentsOS system to be out-of-sync with the Vantiv systems).",

          requiredoptional: strings.required

        },

      },

      payusingleplatform: {

        custom1: {

          toconfigure: strings.inYourProviderAccount + "disable the <b>Automatic collection</b> option in your PayU Single Platform account for the relevant PayU Single Platform payment methods. This will enable the correct processing of authorization requests, and keep PaymentsOS in sync with the PayU system.",

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: strings.inYourProviderAccount + "configure the currencies you want to use in transactions (only applicable to the credit card and payment_wall payment methods).",

          requiredoptional: strings.required

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount + "enable Tokenization for credit card payment methods." + " " +strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom4: {

          toconfigure: strings.disableCVVInYourAccount + " " +strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

      },

      paypal: {

        custom1: {

          toconfigure: "Authenticate PaymentsOS with PayPal. For help, see <a href='/providers/paypal.html#authenticating-paymentsos-with-paypal'>Authenticating PaymentsOS with PayPal</a> below.",

          requiredoptional: strings.required

        },

      },

      dalenys: {

        custom1: {

          toconfigure: "Enable direct link on your account in order for PaymentsOS be able to make server to server requests on your behalf. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom2: {

          toconfigure: "In your directlink account, allow incoming requests from all IP addresses. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom3: {

          toconfigure: strings.inYourProviderAccount +"configure the currency that will be used in transactions initiated on your site. " + strings.contactProviderSupport,

          requiredoptional: strings.required

        },

        custom4: {

          toconfigure: strings.inYourProviderAccount +"enable Credit requests if you want to initiate Credit transactions. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

        custom5: {

          toconfigure: strings.inYourProviderAccount + " configure 3DS Internal 1 if desired. For help, see " + "<a href='/providers/dalenys.html#enabling-3ds-1-internal'>Enabling 3DS 1 Internal.</a>" + " "+strings.configureWebhooks,

          requiredoptional: strings.optional

        },

        custom6: {

          toconfigure: "If you want to use an external MPI, then you must enable this in your Dalenys account. Beware that using 3DS 2 in external 3DS flow may require additional configuration in your Dalenys account. " + strings.contactProviderSupport + openBold + " Note: " + closeBold + "PaymentOS currently does not support using accounts that have been configured to use internal 3DS 2 flows. Using those accounts may cause transactions to fail.",

          requiredoptional: strings.optional

        }

      },
      alipay: {
        custom1: {

          toconfigure: strings.inTheOPaymentsOSControlCenter + "configure a timeout_rule value. This is the timeout period from the moment the customer logs into the Alipay site (for completing the transaction) to completing the payment. Possible values: 5m 10m 15m 30m 1h 2h 3h 5h 10h 12h. Default: 12h." + openBold +  " Important note: " + closeBold + "To pass a timeout value, you must contact Alipay support to specify the timeout value in your Alipay account as well",

          requiredoptional: strings.optional

        },

      },
      wirecard: {
        custom1: {

          toconfigure: "For MOTO transactions, configure a separate account with Wirecard through which the transactions will pass. " + strings.contactProviderSupport,

          requiredoptional: strings.optional

        },

      },
    }

  }
}