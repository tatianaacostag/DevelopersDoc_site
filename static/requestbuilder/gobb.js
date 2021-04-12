function modifyAuthChargeRequestJson(jsonToModify) {

  if (bodyBuilder.transactionType == "ccards") {

    const paymentmethod = {
      payment_method: {
        "credit_card_cvv": "123",
        "token": "f78cbf5b-0e23-44e0-be11-2081791d9501",
        "type": "tokenized",
      }
    };

    $.extend(jsonToModify, paymentmethod);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "dredirect") {

    const paymentmethod = {
      payment_method: {
        "source_type": "debit_redirection",
        "type": "untokenized",
        "vendor": "see notes in table"
      }
    };

    // set values per provider
    for (var prop of bodyBuilder.providers) {
      if (prop == "payuchile") {

        paymentmethod.payment_method.vendor = "redcompra";

      }
    }

    $.extend(jsonToModify, paymentmethod);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "cash") {

    var paymentmethod = {
      "payment_method": {
        "source_type": "cash",
        "type": "untokenized",
        "vendor": "see notes in table",
        "additional_details": {
          "order_language": "en",
          "cash_payment_method_vendor": "see notes in table",
          "customer_cnpj_identify_number": "32593371000110",
          "customer_national_identify_number": "811.807.405-64",
          "payment_method": "PSE",
          "payment_country": "see notes in table"
        }
      }
    };

    // set values per provider
    for (var prop of bodyBuilder.providers) {
      if (prop == "payuchile") {

        paymentmethod.payment_method.vendor = "MULTICAJA";
        paymentmethod.payment_method.additional_details.payment_country = "CHL";

        }

        else if (prop == "payuargentina"){

          if (bodyBuilder.cashPaymentMethod == "cobroexpress") {
            paymentmethod.payment_method.vendor = "COBRO_EXPRESS";
          }

          else if (bodyBuilder.cashPaymentMethod == "pagofacil"){

            paymentmethod.payment_method.vendor = "PAGOFACIL";
          }

          else if (bodyBuilder.cashPaymentMethod == "rapipago"){

            paymentmethod.payment_method.vendor = "RAPIPAGO";
          }

        }

        else if (prop == "payubrazil"){

          if (bodyBuilder.cashPaymentMethod == "boletobancario") {
            paymentmethod.payment_method.vendor = "BOLETO_BANCARIO";
          }

        }

        else if (prop == "payuchile"){

          if (bodyBuilder.cashPaymentMethod == "multicaja") {
            paymentmethod.payment_method.vendor = "MULTICAJA";
          }

        }

        else if (prop == "payucolombia"){

          if (bodyBuilder.cashPaymentMethod == "baloto") {
            paymentmethod.payment_method.vendor = "BALOTO";
          }
          else if (bodyBuilder.cashPaymentMethod == "bankreferenced") {
            paymentmethod.payment_method.vendor = "BANK_REFERENCED";
          }

          else if (bodyBuilder.cashPaymentMethod == "efecty") {
            paymentmethod.payment_method.vendor = "EFECTY";
          }

          else if (bodyBuilder.cashPaymentMethod == "otherscash") {
            paymentmethod.payment_method.vendor = "OTHERS_CASH";
          }

        }

        else if (prop == "payumexico"){

          if (bodyBuilder.cashPaymentMethod == "bankreferencedmexico") {
            paymentmethod.payment_method.vendor = "BANK_REFERENCED";
          }
          else if (bodyBuilder.cashPaymentMethod == "otherscashmx") {
            paymentmethod.payment_method.vendor = "OTHERS_CASH_MX";
          }

          else if (bodyBuilder.cashPaymentMethod == "oxxo") {
            paymentmethod.payment_method.vendor = "OXXO";
          }

          else if (bodyBuilder.cashPaymentMethod == "seveneleven") {
            paymentmethod.payment_method.vendor = "SEVEN_ELEVEN";
          }

        }

        else if (prop == "payuperu"){

          if (bodyBuilder.cashPaymentMethod == "bcp") {
            paymentmethod.payment_method.vendor = "BCP";
          }
          else if (bodyBuilder.cashPaymentMethod == "pagoefectivo") {
            paymentmethod.payment_method.vendor = "PAGOEFECTIVO";
          }

        }

       
      }
    

    $.extend(jsonToModify, paymentmethod);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "banktransfer") {

    var paymentmethod = {
      "payment_method": {
        "source_type": "bank_transfer",
        "type": "untokenized",
        "vendor": "PSE",
        "additional_details": {
          "additionalDescription": "My description",
          "bank_code": "CID001",
          "bank_name": "payment_wall",
          "bank_transfer_financial_institution_code": "1022",
          "bank_transfer_financial_institution_name": "BANCO UNION COLOMBIANO",
          "bank_transfer_payment_method_vendor": "PSE",
          "bill_cinumber": "12345678901",
          "bill_citype": "PERSONALID",
          "language": "pl",
          "national_identify_type": "CC",
          "national_identify_number": "123456789",
          "order_language": "en",
          "payment_country": "see notes in table",
          "payment_method": "BKM",
          "payment_mode_type": "netbanking",
          "user_type": "N",
          "vpa": "abc@icici"
        }
      }
    };

    // set values per provider
    for (var prop of bodyBuilder.providers) {
      if (prop == "payucitrusindia") {
        if (bodyBuilder.bankTransferPaymentMethod == "netbanking") {
          paymentmethod.payment_method.vendor = "netbanking";
          paymentmethod.payment_method.additional_details.payment_mode_type = "netbanking"
        }

        else if (bodyBuilder.bankTransferPaymentMethod == "upi") {
          paymentmethod.payment_method.vendor = "UPI";
          paymentmethod.payment_method.additional_details.payment_mode_type = "UPI"
        }
      }
      else if (prop == "payuindia") {
        if (bodyBuilder.bankTransferPaymentMethod == "netbankingindia") {
          paymentmethod.payment_method.vendor = "netbanking";
          paymentmethod.payment_method.additional_details.payment_mode_type = "netbanking"
          paymentmethod.payment_method.additional_details.bank_code = "AXIB"
        }

        else if (bodyBuilder.bankTransferPaymentMethod == "upiindia") {
          paymentmethod.payment_method.vendor = "UPI";
          paymentmethod.payment_method.additional_details.payment_mode_type = "UPI"
        }
      }
      else if (prop == "payuturkey") {
        if (bodyBuilder.bankTransferPaymentMethod == "bkm") {
          paymentmethod.payment_method.vendor = "BKM";
          paymentmethod.payment_method.additional_details.payment_method = "BKM";
        }
        else if (bodyBuilder.bankTransferPaymentMethod == "upt") {
          paymentmethod.payment_method.vendor = "UPT";
          paymentmethod.payment_method.additional_details.payment_method = "UPT"
        }
        else if (bodyBuilder.bankTransferPaymentMethod == "compay") {
          paymentmethod.payment_method.vendor = "COMPAY";
          paymentmethod.payment_method.additional_details.payment_method = "COMPAY"
        }
        else if (bodyBuilder.bankTransferPaymentMethod == "wire") {
          paymentmethod.payment_method.vendor = "WIRE";
          paymentmethod.payment_method.additional_details.payment_method = "WIRE"
        }
      }
      else if (prop == "payurussia") {
        if (bodyBuilder.bankTransferPaymentMethod == "qiwi") {
          paymentmethod.payment_method.vendor = "QIWI";
          paymentmethod.payment_method.additional_details.payment_method = "QIWI";
        }
      }
      else if (prop == "payusingleplatform") {
        if (bodyBuilder.bankTransferPaymentMethod == "pbl") {
          paymentmethod.payment_method.vendor = "PBL";
          paymentmethod.payment_method.additional_details.bank_name = "The name of the bank";
        }
        else if (bodyBuilder.bankTransferPaymentMethod == "payment_wall") {
          paymentmethod.payment_method.vendor = "payment_wall";
          paymentmethod.payment_method.additional_details.bank_name = "payment_wall"
        }
      }
      else if (prop == "payusouthafrica") {
        if (bodyBuilder.bankTransferPaymentMethod == "EFT_PRO") {
          paymentmethod.payment_method.vendor = "EFT_PRO";
        }
      }
      else if (prop == "payukenya") {
        if (bodyBuilder.bankTransferPaymentMethod == "MOBILE_BANKING") {
          paymentmethod.payment_method.vendor = "MOBILE_BANKING";
        }
      }
      else if (prop == "payunigeria") {
        if (bodyBuilder.bankTransferPaymentMethod == "EFT_BANK_TRANSFER") {
          paymentmethod.payment_method.vendor = "EFT_BANK_TRANSFER";
        }
      }


    }

    $.extend(jsonToModify, paymentmethod);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "ewallet") {

    var paymentmethod;

    if (bodyBuilder.eWalletPaymentMethod == "paypalbillingagreement") {

      paymentmethod = {
        payment_method: {
          "token": "f78cbf5b-0e23-44e0-be11-2081791d9501",
          "type": "tokenized"
        }
      };
    }

    else {

      paymentmethod = {
        payment_method: {
          "source_type": "ewallet",
          "type": "untokenized",
          "vendor": "see notes in table"
        }
      };
    }

    // set values per provider
    for (var prop of bodyBuilder.providers) {
      if (prop == "paypal") {

        paymentmethod.payment_method.vendor = "paypal";

      }

      else if (prop == "payusouthafrica") {

        if (bodyBuilder.eWalletPaymentMethod == "MASTERPASS") {

          paymentmethod.payment_method.vendor = "MASTERPASS";
        }

        else if (bodyBuilder.eWalletPaymentMethod == "MOBICRED") {

          paymentmethod.payment_method.vendor = "MOBICRED";

        }
        else if (bodyBuilder.eWalletPaymentMethod == "VISA_CHECKOUT") {

          paymentmethod.payment_method.vendor = "VISA_CHECKOUT";

        }

      }

      else if (prop == "payukenya") {

        if (bodyBuilder.eWalletPaymentMethod == "MPESA") {

          paymentmethod.payment_method.vendor = "MPESA";
        }

        else if (bodyBuilder.eWalletPaymentMethod == "EQUITEL") {

          paymentmethod.payment_method.vendor = "EQUITEL";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "AIRTEL_MONEY") {

          paymentmethod.payment_method.vendor = "AIRTEL_MONEY";

        }

      }
      else if (prop == "payuindia") {

        if (bodyBuilder.eWalletPaymentMethod == "itzcash") {

          paymentmethod.payment_method.vendor = "ItzCash";
        }

        else if (bodyBuilder.eWalletPaymentMethod == "airtelmoney") {

          paymentmethod.payment_method.vendor = "Airtel Money";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "ypaycash") {

          paymentmethod.payment_method.vendor = "YPay Cash";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "cashcard") {

          paymentmethod.payment_method.vendor = "Cash Card";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "icashcard") {

          paymentmethod.payment_method.vendor = "ICash Card";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "paycashcard") {

          paymentmethod.payment_method.vendor = "PAYCASH CARD";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "zipcashcard") {

          paymentmethod.payment_method.vendor = "ZIPcash card";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "freecharge") {

          paymentmethod.payment_method.vendor = "FreeCharge";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "jiomoney") {

          paymentmethod.payment_method.vendor = "JioMoney";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "amazonpay") {

          paymentmethod.payment_method.vendor = "Amazon pay";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "payzapp") {

          paymentmethod.payment_method.vendor = "Pay Zapp";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "olamoney") { 

          paymentmethod.payment_method.vendor = "Ola Money"; 

        }

        else if (bodyBuilder.eWalletPaymentMethod == "phonepe") {

          paymentmethod.payment_method.vendor = "Phonepe";

        }

        else if (bodyBuilder.eWalletPaymentMethod == "paytm") {

          paymentmethod.payment_method.vendor = "Paytm";

        }

      }

      else if (prop == "alipay") {

        if (bodyBuilder.eWalletPaymentMethod == "forextrade") {

          paymentmethod.payment_method.vendor = "alipay";
        }

      }
    }

    $.extend(jsonToModify, paymentmethod);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "loyalty") {

    const paymentmethod = {
      payment_method: {
        "source_type": "loyalty",
        "type": "untokenized",
        "vendor": "see notes in table"
      }
    };

    // set values per provider
    for (var prop of bodyBuilder.providers) {

      if (prop == "payusouthafrica") {

        if (bodyBuilder.loyaltyPaymentMethod == "DISCOVERYMILES") {

          paymentmethod.payment_method.vendor = "DISCOVERYMILES";
        }

        else if (bodyBuilder.loyaltyPaymentMethod == "EBUCKS") {

          paymentmethod.payment_method.vendor = "EBUCKS";

        }

      }

      else if (prop == "payuindia") {

        if (bodyBuilder.loyaltyPaymentMethod == "citibankrewardpoints") {

          paymentmethod.payment_method.vendor = "Citibank Reward Points";
        }

      }
    }

    $.extend(jsonToModify, paymentmethod);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "paymentpage") {

    const paymentmethod = {
      payment_method: {
        "source_type": "payment_page",
        "type": "untokenized",
        "additional_details": {
          "supported_payment_methods": "CREDITCARD,CREDITCARD_VCO,MOBICRED,MASTERPASS"
        }
      }
    };


    $.extend(jsonToModify, paymentmethod);

    return jsonToModify

  }
}

function sortObject(o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function modifyTokenRequestJson(jsonToModify) {

  if (bodyBuilder.transactionType == "ccards") {

        const token = {
            "token_type": "credit_card"
          };

    $.extend(jsonToModify, token);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "ewallet") {

    const token = {
          "token_type": "billing_agreement",
          "vendor": "PayPal"
      };

      $.extend(jsonToModify, token);

      return jsonToModify

  }

}

function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function IterateCompleteRequestBody (requestjson) {

    var requestJsonToParse;
    var newJson;

  if (bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Charge" || bodyBuilder.requesttype == "Credit") {

    newJson = sortObject(modifyAuthChargeRequestJson(JSON.parse(requestjson)))

    bodyBuilder.completerequestjson = JSON.stringify(newJson)

    requestJsonToParse = JSON.stringify(newJson)


  }

  else if (bodyBuilder.requesttype == "Token") {

    newJson = sortObject(modifyTokenRequestJson(JSON.parse(requestjson)))

    bodyBuilder.completerequestjson = JSON.stringify(newJson)

    requestJsonToParse = JSON.stringify(newJson)

  }

  else requestJsonToParse = requestjson

  $.each(JSON.parse(requestJsonToParse), function(k, v) {

    bodyBuilder.requestbodykey = k;
    bodyBuilder.requestbodyvalue = v;

    checkstatusperkey()

    // Loop over level 1 if it exists
    if (typeof v == 'object') {

      var parentKey = k;

      $.each(v, function(i, j){

        bodyBuilder.requestbodykey = parentKey+"__"+i;
        bodyBuilder.requestbodyvalue = j;

        // Construct the property so you can match it against the meta file.
        var parentKeyL1 = parentKey+"__"+i

        checkstatusperkey()

        // Loop over level2 ARRAY if it exists
        if (Array.isArray(bodyBuilder.requestbodyvalue)) {

            bodyBuilder.requestbodyvalue.forEach(function(key, index, value) {
                var objectInArray = bodyBuilder.requestbodyvalue[index];
                  for (var key in objectInArray) {
                    if (objectInArray.hasOwnProperty(key)) {

                      bodyBuilder.requestbodykey = parentKeyL1+"___"+key;
                      bodyBuilder.requestbodyvalue = objectInArray[key];

                      checkstatusperkey()
                    }
                  }
                });

      }
      // Loop over level2 OBJECT if it exists
      if (typeof bodyBuilder.requestbodyvalue == 'object') {

        $.each(bodyBuilder.requestbodyvalue, function(k, l) {

        // Construct the property so you can match it against the meta file.
        bodyBuilder.requestbodykey = parentKeyL1+"___"+k;

        bodyBuilder.requestbodyvalue = l;
        var parentKeyL2 = parentKeyL1+"___"+k


        checkstatusperkey()

          // Loop over level3 if it exists
          if (typeof bodyBuilder.requestbodyvalue == 'object') {

              $.each(bodyBuilder.requestbodyvalue, function(m, n){

                if (typeof n !== 'object') {
                   // Construct the property so you can match it against the meta file.
                  bodyBuilder.requestbodykey = parentKeyL2+"____"+m;
                  bodyBuilder.requestbodyvalue = n;

                  checkstatusperkey()

                }

                //Loop over level4 if it exists
                else {

                  var parentKeyL3 = parentKeyL2+"____"+m
                  $.each(n, function(m, n){

                    bodyBuilder.requestbodykey = parentKeyL3+"_____"+m;
                    // console.log(bodyBuilder.requestbodykey)
                    checkstatusperkey()
                  });  

                }

              });

             

          }

        });
      }
      
      });
    }
  });

  }





function checkstatusperkey() {
  bodyBuilder.valuesToDecide = new Array();
  var keyStatus;

  // Check the status of each key for the selected provider.
  for (var property of bodyBuilder.providers) {

    var requestBodyKey = bodyBuilder.requestbodykey

    var metaKey = bodyBuilder.datadict[requestBodyKey];

    tempKeyStatus = metaKey[property];

    if (typeof tempKeyStatus == 'object') {
      if (typeof tempKeyStatus[bodyBuilder.transactionType] != 'undefined') {
        keyStatus = tempKeyStatus[bodyBuilder.transactionType]

        if ((bodyBuilder.transactionType == "banktransfer") && (typeof tempKeyStatus[bodyBuilder.transactionType] == 'object')) {
          keyStatus = tempKeyStatus[bodyBuilder.transactionType][bodyBuilder.bankTransferPaymentMethod]
        }
        else if ((bodyBuilder.transactionType == "ewallet") && (typeof tempKeyStatus[bodyBuilder.transactionType] == 'object')) {
          keyStatus = tempKeyStatus[bodyBuilder.transactionType][bodyBuilder.eWalletPaymentMethod]
        }
        else if ((bodyBuilder.transactionType == "loyalty") && (typeof tempKeyStatus[bodyBuilder.transactionType] == 'object')) {
          keyStatus = tempKeyStatus[bodyBuilder.transactionType][bodyBuilder.loyaltyPaymentMethod]
        }

        else if ((bodyBuilder.transactionType == "paymentpage") && (typeof tempKeyStatus[bodyBuilder.transactionType] == 'object')) {
          keyStatus = tempKeyStatus[bodyBuilder.transactionType][bodyBuilder.paymentPagePaymentMethod]
        }
      }
    } else {

      keyStatus = metaKey[property];

    }

    // check if it' a rule field
    if (keyStatus == "rule") {

      bodyBuilder.ruleFields.push(requestBodyKey);
    }

    // Store the values to decide what to do with them
    bodyBuilder.valuesToDecide.push(keyStatus);
  }
  checkWhatToDo(bodyBuilder.valuesToDecide)
}

// 1. Check if one is required. Then keep
// 2. Check if one is optional. Then add to optional list
// 3. Default: remove.
function checkWhatToDo(values) {

  if (values.indexOf("required") == -1) { // There's no required field
    if (values.indexOf("required_threed_s_internal") != -1 && bodyBuilder.keepThreeDs) {
      bodyBuilder.requiredFields.push(bodyBuilder.requestbodykey);
    }
    else if (values.indexOf("condrequired") != -1 || (values.indexOf("condrequired_threed_s_internal") != -1 && bodyBuilder.keepThreeDs)) {
      bodyBuilder.condRequiredFields.push(bodyBuilder.requestbodykey)
    }
    // add to optional array UNLESS ALL fields or notsupported
    else if (values.indexOf("optional") != -1 || (values.indexOf("optional_threed_s_internal") != -1 && bodyBuilder.keepThreeDs)) {
      bodyBuilder.optionalFields.push(bodyBuilder.requestbodykey)
    } else {
      bodyBuilder.toremove.push(bodyBuilder.requestbodykey)
    }

  }
  // The field is required
  else bodyBuilder.requiredFields.push(bodyBuilder.requestbodykey);


}
function removefields () {

  // console.log(bodyBuilder.toremove)

  for (var property of bodyBuilder.toremove.sort().reverse()) {

    var hasParent = property.includes("__");
    var hasParentL2 = property.includes("___");
    var hasParentL3 = property.includes("____");
    var hasParentL4 = property.includes("_____");

    if (!hasParent){
      delete bodyBuilder.completeRequestJSONObject[property]}

      // Check if there's a level1 parent and make sure it's not a level2
      else if (hasParent & (property.indexOf("___")==-1)) {

        var parent = property.substr(0, property.indexOf('__'));
        var prop = property.split('__')[1];

          delete bodyBuilder.completeRequestJSONObject[parent][prop]
      }

      // Check if there's a level2 parent and make sure it's not a level3
      else if (hasParentL2 & (property.indexOf("____")==-1)) {

        var parentL2 = property.substr(0, property.indexOf('___'));

        // Decompose the property and construct the path
        var prop = property.split('___')[1];
        var parent = parentL2.split('__')[1];
        var source = parentL2.substr(0, property.indexOf('__'));

        // Delete the property.
        delete bodyBuilder.completeRequestJSONObject[source][parent][prop]

        // The parent may be an array!
        if (Array.isArray(bodyBuilder.completeRequestJSONObject[source][parent])) {

          bodyBuilder.completeRequestJSONObject[source][parent].forEach(function(key, index, value) {

          for (var key in bodyBuilder.completeRequestJSONObject[source][parent]) {
            if (bodyBuilder.completeRequestJSONObject[source][parent].hasOwnProperty(key)) {

                delete bodyBuilder.completeRequestJSONObject[source][parent][key][prop]
              }

                }
              });

          }

        }




        else if (hasParentL3 & property.indexOf("_____")==-1) {

          var parentL3 = property.substr(0, property.indexOf('____'));

          var prop = property.split('____')[1];
          var parentL1 = parentL3.split('___')[1];
          var parentL2 = property.split('__')[1];
          var source = parentL3.substr(0, property.indexOf('__'));
            delete bodyBuilder.completeRequestJSONObject[source][parentL2][parentL1][prop]
          }

        else if (hasParentL4) {

            var parentL4 = property.substr(0, property.indexOf('_____'));
            var prop = property.split('_____')[1];
            var parentL1 = parentL4.split('____')[1];
            var parentL2 = property.split('___')[1];
            var parentL3 = property.split('__')[1];
            var source = parentL4.substr(0, property.indexOf('__'));
            delete bodyBuilder.completeRequestJSONObject[source][parentL3][parentL2][parentL1][prop]
            }
      
          

    }

}

// Show output
function showoutput (callback) {
  var linebrake = "<br>"
  var boldopen = "<b>"
  var boldclose = "</b>"
  var outputsummarymessage = document.getElementById('outputsummarymessage');
  var ciResponseText = document.getElementById('ciResponseText');


  checkCustomMessages(function(requestNotSupported, message) {

    if (requestNotSupported.length >= 1) {

      for (var property of message) {

        ciResponseText.insertAdjacentHTML("afterbegin",property+linebreak)

        message = [];

      }

    }
    else {

      if (message.length != 0) {
           var node = document.createElement("p");
           node.id = 'messagenotes';
           var textnode = document.createTextNode("");
           node.appendChild(textnode);
           node.innerHTML = "Notes:";
          document.getElementById("custommessage").appendChild(node);


      }

        for (var property of message) {

        var node = document.createElement("li");
        node.id = "notelistitem"
        var textnode = document.createTextNode(property);
        node.appendChild(textnode);
        node.innerHTML = property;
        document.getElementById("custommessage").appendChild(node);

        }


      }



      window.bodyBuilder.messagesToShow = [];

    });

    if (requestNotSupported.length == 0)
      {
        outputsummarymessage.innerHTML = "Example request header and body for request type "+boldopen+bodyBuilder.requesttype+boldclose+ " and providers " +boldopen+ bodyBuilder.checkBoxNames+boldclose+"."

        ciResponseText.innerHTML = JSON.stringify(bodyBuilder.completeRequestJSONObject, undefined, 2);

        if (bodyBuilder.keepOptionals && bodyBuilder.optionalFields.length > 0) {

          buildHeaderTable();
          buildFieldsTable(true, bodyBuilder.requesttype);

        }

        else {

            if (bodyBuilder.requiredFields.length >= 0) {
              buildHeaderTable();
              if (bodyBuilder.requiredFields.length > 0) {
                buildFieldsTable(false, bodyBuilder.requesttype);
              }
            }
        }
      }
  
  bodyBuilder.toremove = [];
  bodyBuilder.messagesToShow = [];
  window.requestNotSupported = [];
  bodyBuilder.ruleFields = [];
  bodyBuilder.requiredFields = [];
  bodyBuilder.condRequiredFields = [];
  bodyBuilder.optionalFields = [];
  bodyBuilder.optionalFieldstagingTable = [];
  bodyBuilder.optionalFieldTable = [];
  bodyBuilder.requiredFieldstagingTable = [];
  window.requiredFieldTable = [];
  window.allHeaderFields = [];
  window.uniqueHeaderFields = [];

  callback()

}

bodyBuilder.messagesToShow = [];
var requestNotSupported = [];


function checkCustomMessages(callback) {

  // checkRequestSupported()

  if (requestNotSupported.length == 0) {


    switch (bodyBuilder.requesttype) {
      case "Authorize":
        checkAuthorizeChargeMessages();
        break;
      case "Charge":
        checkAuthorizeChargeMessages();
        break;
      case "Capture":
        checkCaptureMessages();
        break;
      case "Payment":
        checkPaymentMessages();
        break;
      case "Void":
        checkVoidMessages();
        break;
      case "Refund":
        checkRefundMessages();
        break;
      case "Token":
        checkTokenMessages();
        break;
      default:

    }

  }
  callback(requestNotSupported, bodyBuilder.messagesToShow)

}

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

function checkRules() {

  executeParentRules();
  executeLevelOneRules();

}



function makeFieldRequiredBasedOnField(fieldToMakeRequired) {
    if (bodyBuilder.ruleFields.indexOf(fieldToMakeRequired) != -1) {

        if (bodyBuilder.toremove.indexOf(fieldToMakeRequired) != -1) {
            var index = bodyBuilder.toremove.indexOf(fieldToMakeRequired);
            if (index >= 0) {
                bodyBuilder.toremove.splice(index, 1);
                bodyBuilder.requiredFields.push(fieldToMakeRequired)
            }
        }

        if (bodyBuilder.optionalFields.indexOf(fieldToMakeRequired) != -1) {
            var index = bodyBuilder.optionalFields.indexOf(fieldToMakeRequired);
            if (index >= 0) {
                bodyBuilder.optionalFields.splice(index, 1);
                bodyBuilder.requiredFields.push(fieldToMakeRequired)
            }
        }

    }

}

function makeFieldConditionallyRequiredBasedOnField(fieldToMakeConditionallyRequired) {
    if (bodyBuilder.ruleFields.indexOf(fieldToMakeConditionallyRequired) != -1) {

        if (bodyBuilder.toremove.indexOf(fieldToMakeConditionallyRequired) != -1) {
            var index = bodyBuilder.toremove.indexOf(fieldToMakeConditionallyRequired);
            if (index >= 0) {
                bodyBuilder.toremove.splice(index, 1);
                bodyBuilder.condRequiredFields.push(fieldToMakeConditionallyRequired)
            }
        }

        if (bodyBuilder.optionalFields.indexOf(fieldToMakeConditionallyRequired) != -1) {
            var index = bodyBuilder.optionalFields.indexOf(fieldToMakeConditionallyRequired);
            if (index >= 0) {
                bodyBuilder.optionalFields.splice(index, 1);
                bodyBuilder.condRequiredFields.push(fieldToMakeConditionallyRequired)
            }
        }

    }

}

// Rule field is either in toremove or already in the optionals array.
// So only check if the field is in toremove.
function makeFieldOptionalBasedOnField(fieldToMakeOptional) {
    if (bodyBuilder.ruleFields.indexOf(fieldToMakeOptional) != -1) {

        if (bodyBuilder.toremove.indexOf(fieldToMakeOptional) != -1) {
            var index = bodyBuilder.toremove.indexOf(fieldToMakeOptional);
            if (index >= 0) {
                bodyBuilder.toremove.splice(index, 1);
                bodyBuilder.optionalFields.push(fieldToMakeOptional)
            }
        }

    }

}
// basedOnParentRuleOnly: the children aren't rule fields.
function makeFieldsUnsupported(fieldToMakeUnsupported, basedOnParentRuleOnly) {

   
        if (basedOnParentRuleOnly) {
            checkInArrays(fieldToMakeUnsupported);

        }

        else if (!basedOnParentRuleOnly) {
            if (bodyBuilder.toremove.indexOf(fieldToMakeUnsupported) != -1) { 
                if (bodyBuilder.ruleFields.indexOf(fieldToMakeUnsupported) != -1) {
                    checkInArrays(fieldToMakeUnsupported);
                }
            }   
           
        }

        bodyBuilder.toremove.push (fieldToMakeUnsupported)

    
}


function checkInArrays(fieldToMakeUnsupported) {

    if (bodyBuilder.requiredFields.indexOf(fieldToMakeUnsupported)!=-1 ) {
        
        var index = bodyBuilder.requiredFields.indexOf(fieldToMakeUnsupported);
        bodyBuilder.requiredFields.splice(index, 1)

      }

      if (bodyBuilder.optionalFields.indexOf(fieldToMakeUnsupported)!=-1 ) {

        var index = bodyBuilder.optionalFields.indexOf(fieldToMakeUnsupported);
        bodyBuilder.optionalFields.splice(index, 1)

      }

      if (bodyBuilder.condRequiredFields.indexOf(fieldToMakeUnsupported)!=-1 ) {

        var index = bodyBuilder.condRequiredFields.indexOf(fieldToMakeUnsupported);
        bodyBuilder.condRequiredFields.splice(index, 1)

      }

}

function executeParentRules() {

  if (bodyBuilder.transactionType === "ccards" && (bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Charge" || bodyBuilder.requesttype == "Credit") ) {
    executeRuleThree_d_secure_attributes();
  }
  
  
 

  if (bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Charge") {

    if (bodyBuilder.providers.indexOf("braintree") != -1 | bodyBuilder.providers.indexOf("stripe") != -1) {


      // makeInstallmentsUnsupported()
      makeFieldsUnsupported("installments")


    }

    else {

      // makeInstallmentsOptional();
      const fieldsToMakeOptional = ["installments","cof_transaction_indicators" ]
      for (var field of fieldsToMakeOptional) {
        makeFieldOptionalBasedOnField(field)
      }

    }

    if (bodyBuilder.providers.indexOf("credorax") != -1) {

      makeFieldConditionallyRequiredBasedOnField("merchant_site_url")
    }

    else {
      makeFieldOptionalBasedOnField(field)
    }
    


  }

  else if (bodyBuilder.requesttype == "Credit") {

    const fieldsToMakeUnsupported = ["installments", "cof_transaction_indicators"]
    const fieldsToMakeOptional = ["provider_specific_data__credorax___additional_details____credit_type"]
    const fieldsToMakeCondtionallyRequiredIfIncludesOptionalFields = 
    ["three_d_secure_attributes__sca_exemptions___request_exemption_stage","provider_specific_data__credorax___additional_details____funds_recipient_first_name",
    "provider_specific_data__credorax___additional_details____funds_recipient_last_name"]; 

    for (var field of fieldsToMakeUnsupported) {

      makeFieldsUnsupported(field)

    }

    for (var field of fieldsToMakeOptional) {

      makeFieldOptionalBasedOnField(field)

    }

    for (value of fieldsToMakeCondtionallyRequiredIfIncludesOptionalFields) {

      if (bodyBuilder.keepOptionals) {
          makeFieldConditionallyRequiredBasedOnField(value)
      }

      
  }
   
    
  }

}

function executeRuleThree_d_secure_attributes() {
  if (bodyBuilder.keepOptionals) {
    makeFieldOptionalBasedOnField("three_d_secure_attributes")

  }

  else {
    // If three_d_secure_attributes is not in the optional fields, remove the children below
    const threeDsfieldsToRemove = [
      "three_d_secure_attributes__external",
      "three_d_secure_attributes__external___encoding",
      "three_d_secure_attributes__external___cavv", 
      "three_d_secure_attributes__external___eci_flag",
      "three_d_secure_attributes__external___ds_xid",
      "three_d_secure_attributes__external___three_d_secure_version",
      "three_d_secure_attributes__external___three_d_secure_authentication_status",
      "three_d_secure_attributes__external___xid" ]

      for (var fieldToMakeUnsupported of threeDsfieldsToRemove) {

        makeFieldsUnsupported(fieldToMakeUnsupported, true)

        
      }
  }
}

function executeLevelOneRules() {

  if (bodyBuilder.requesttype == "Payment" || bodyBuilder.requesttype == "Token") {


      if (bodyBuilder.requiredFields.indexOf("billing_address") != -1 || (bodyBuilder.optionalFields.indexOf("billing_address") != -1 && bodyBuilder.keepOptionals == true)) {
          executeRuleBillingAddress();
      }

      if (bodyBuilder.optionalFields.indexOf("shipping_address") != -1 && bodyBuilder.keepOptionals == true) {

          executeRuleShippingAddress();

      }

      if (bodyBuilder.optionalFields.indexOf("order__line_items") != -1 && bodyBuilder.keepOptionals == true) {

        executeRuleOrderLineItems();

    }
  }

  else if (bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Charge" || bodyBuilder.requesttype == "Credit"  | bodyBuilder.requesttype == "Capture") {

        executeRuleAdditionalDetails();
        executeRuleMerchantSiteUrl();
        
        // if (bodyBuilder.optionalFields.indexOf("three_d_secure_attributes") != -1) {

        //     executeRuleThreeDSecureAttributes();
            
  
        // }
        

      if (bodyBuilder.optionalFields.indexOf("installments") != -1 && bodyBuilder.keepOptionals == true) {

          executeRuleInstallments();
          

      }

      if (bodyBuilder.optionalFields.indexOf("level_2_3") != -1 && bodyBuilder.keepOptionals == true) {

        executeRuleLevel23Data();
        

    }

        if (bodyBuilder.optionalFields.indexOf("cof_transaction_indicators") != -1 && bodyBuilder.keepOptionals == true) {

            executeRuleCofIndicators();
            

        }
  }

}


function executeRuleBillingAddress() {

    var fieldsBasedOnRequiredBillingAddress = ["billing_address__country", "billing_address__state", "billing_address__city",
        "billing_address__line1", "billing_address__zip_code"
    ];
    
    var fieldsBasedOnOptionalBillingAddress = ["billing_address__country", 
    "billing_address__line1"];

    // Rules if billing_address is required
    if (bodyBuilder.requiredFields.indexOf("billing_address") != -1) {

        for (value of fieldsBasedOnRequiredBillingAddress) {

            makeFieldRequiredBasedOnField(value)

        }

    } 
    // Rules if billing_address is optional and some of its subfields are required
    else if (bodyBuilder.optionalFields.indexOf("billing_address") != -1) {

        for (value of fieldsBasedOnOptionalBillingAddress) {

            makeFieldRequiredBasedOnField(value)

        }
        
    }   
    
    else {

        // Rule should not be applied, so make fields optional
        for (value of fieldsBasedOnRequiredBillingAddress) {

            bodyBuilder.optionalFields.push(value)

        }

        // Rule should not be applied, so make fields optional
        for (value of fieldsBasedOnOptionalBillingAddress) {

            bodyBuilder.optionalFields.push(value)

        }

    }

}

function executeRuleShippingAddress() {

    var fieldsBasedOnShippingAddress = ["shipping_address__country","shipping_address__city","shipping_address__line1","shipping_address__state","shipping_address__zip_code","shipping_address__first_name","shipping_address__last_name","shipping_address__phone","shipping_address__email"];
    // Rules if shipping_address is optional
    if (bodyBuilder.optionalFields.indexOf("shipping_address") != -1) {

        for (value of fieldsBasedOnShippingAddress) {

            makeFieldRequiredBasedOnField(value)

        }

    } 
   
    else {

        // Rule should not be applied, so make fields optional
        for (value of fieldsBasedOnShippingAddress) {

            bodyBuilder.optionalFields.push(value)

        }

    }

}

function executeRuleInstallments() {

    var requiredFieldsBasedOnInstallments = ["installments__additional_details", "installments__number_of_installments", "installments__additional_details___payment_method"];

    var optionalFieldsBasedOnInstallments = ["installments__first_payment_amount", "installments__remaining_payments_amount"]

    var condtionallyRequiredFieldsBasedOnInstallments = 
    ["provider_specific_data__payu_romania___additional_details____payment_method"];


    // Rules if installments is optional
    if (bodyBuilder.optionalFields.indexOf("installments") != -1) {

        for (value of requiredFieldsBasedOnInstallments) {

            makeFieldRequiredBasedOnField(value)

        }

        for (value of optionalFieldsBasedOnInstallments) {

            makeFieldOptionalBasedOnField(value)

        }


        for (value of condtionallyRequiredFieldsBasedOnInstallments) {

            makeFieldConditionallyRequiredBasedOnField(value)

        }


    } else {

        console.log ("installment rules not executed")

    }

}

function executeRuleAdditionalDetails() {

    var fieldsToProcess = [
    "provider_specific_data__shva___additional_details____automatic_init_payment_id",
    "provider_specific_data__shva___additional_details____preauthorization_hold",
    "provider_specific_data__shva___additional_details____transaction_type",
    "provider_specific_data__shva___additional_details____stnd_order_total_number",
    "provider_specific_data__shva___additional_details____stnd_order_number",
    "provider_specific_data__shva___additional_details____stnd_order_total_sum",
    "provider_specific_data__dalenys___additional_details____is3ds",
    "provider_specific_data__shva___additional_details____installments_type"
    ]

    var condtionallyRequiredIfIncludesOptionalFields = 
    ["provider_specific_data__shva___additional_details____stnd_order_frequency"]; 

    if (bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Charge") {

        for (value of fieldsToProcess) {

            makeFieldOptionalBasedOnField(value)
        }

        for (value of condtionallyRequiredIfIncludesOptionalFields) {

            if (bodyBuilder.keepOptionals) {
                makeFieldConditionallyRequiredBasedOnField(value)
            }

            
        }

    }

    if (bodyBuilder.requesttype == "Credit") {

        for (value of fieldsToProcess) {

            makeFieldsUnsupported(value)
        }

    }

}

function executeRuleMerchantSiteUrl() {

    var fieldToProcess = "merchant_site_url"

    var requiredIfIncludesOptionalFields = 
        ["provider_specific_data__magellan___additional_details____is3ds",
        "provider_specific_data__dalenys___additional_details____is3ds",
        "provider_specific_data__safecharge___additional_details____is3ds"];

    var condtionallyRequiredIfIncludesOptionalFields = 
        ["provider_specific_data__credorax___additional_details____3ds_initiate"];  
    

    if ((bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Charge") && bodyBuilder.keepOptionals == true) {



        for (var optionalField of requiredIfIncludesOptionalFields) {
            if (bodyBuilder.optionalFields.indexOf(optionalField) != -1){

                makeFieldRequiredBasedOnField(fieldToProcess)


            }

            else {
                
    
                makeFieldOptionalBasedOnField(fieldToProcess)
                
            }
        }

        for (var optionalField of condtionallyRequiredIfIncludesOptionalFields) {
            if (bodyBuilder.optionalFields.indexOf(optionalField) != -1){

                makeFieldConditionallyRequiredBasedOnField(fieldToProcess)


            }

            else {
                
    
                makeFieldOptionalBasedOnField(fieldToProcess)
                
            }
        }
        

    }

    if (bodyBuilder.requesttype == "Credit") {


            makeFieldsUnsupported(fieldToProcess)
        

    }

}


function executeRuleOrderLineItems() {

    var fieldsBasedOnOptionalOrderLineItems = ["order__line_items___quantity","order__line_items___unit_price"];
    // Rules if order__line_items is optional
    if (bodyBuilder.optionalFields.indexOf("order__line_items") != -1) {

        for (value of fieldsBasedOnOptionalOrderLineItems) {

            makeFieldRequiredBasedOnField(value)

        }

    } 
   
    else {

        // Rule should not be applied, so make fields optional
        for (value of fieldsBasedOnOptionalOrderLineItems) {

            bodyBuilder.optionalFields.push(value)

        }

    }

}



function executeRuleLevel23Data() {
    
    var fieldsBasedOnOptionalLevel23Data = ["level_2_3__shipping_address","level_2_3__tax_mode","level_2_3__line_items___commodity_code","level_2_3__line_items___discount_amount","level_2_3__line_items___tax_amount","level_2_3__line_items___tax_percentage","level_2_3__line_items___unit_of_measure","level_2_3__shipping_address___city","level_2_3__shipping_address___country","level_2_3__shipping_address___first_name","level_2_3__shipping_address___last_name","level_2_3__shipping_address___zip_code","level_2_3__shipping_address___line1","level_2_3__shipping_address___line2","level_2_3__shipping_address___state","level_2_3__tax_amount","level_2_3__line_items___sub_total","level_2_3__line_items___name","level_2_3__order_id","level_2_3__line_items___id","level_2_3__line_items___unit_price",
    "provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn1",
    "provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn2",
    "provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn3",
    "provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn4"
    ];

    // Rules if level_2_3 is optional and some of its subfields are required
    if (bodyBuilder.optionalFields.indexOf("level_2_3") != -1) {

        for (value of fieldsBasedOnOptionalLevel23Data) {

            makeFieldRequiredBasedOnField(value)

        }
        
    }   
    
    else {

        // Rule should not be applied, so make fields optional
        for (value of fieldsBasedOnOptionalLevel23Data) {

            bodyBuilder.optionalFields.push(value)

        }


    }

}

function executeRuleCofIndicators() {

    var optionalFieldsBasedOnCofIndicator = ["cof_transaction_indicators__card_entry_mode", "cof_transaction_indicators__cof_consent_transaction_id"]


    // Rules if installments is optional
    if (bodyBuilder.optionalFields.indexOf("cof_transaction_indicators") != -1) {

        for (value of optionalFieldsBasedOnCofIndicator) {

            makeFieldOptionalBasedOnField(value)

        }

    } else {

        console.log ("cof rules not executed")

    }

}


function orderFieldsinTable(fieldsArray) {

  if ((fieldsArray.indexOf("installments__first_payment_amount") != -1) && (fieldsArray.indexOf("installments__number_of_installments") != -1)) {

    oldIndex = fieldsArray.indexOf("installments__number_of_installments");
    newIndex = oldIndex - 1;
    fieldsArray.splice(oldIndex, 1);
    fieldsArray.splice(newIndex, 0, "installments__number_of_installments")


    return fieldsArray;
  }

  if (fieldsArray.indexOf("provider_specific_data__alipay___additional_details____business_type") != -1) {

    oldIndexBT = fieldsArray.indexOf("provider_specific_data__alipay___additional_details____business_type");
    newIndexBT = oldIndexBT - 2;
    fieldsArray.splice(oldIndexBT, 1);
    fieldsArray.splice(newIndexBT, 0, "provider_specific_data__alipay___additional_details____business_type")

    if (fieldsArray.indexOf("provider_specific_data__alipay___additional_details____app_pay") != -1) {
      oldIndexAppPay = fieldsArray.indexOf("provider_specific_data__alipay___additional_details____app_pay");
      newIndexAppPay = oldIndexAppPay - 2;
      fieldsArray.splice(oldIndexAppPay, 1);
      fieldsArray.splice(newIndexAppPay, 0, "provider_specific_data__alipay___additional_details____app_pay")

      return fieldsArray;
    }

  }

}

var allHeaderFields = [];
var uniqueHeaderFields = [];
var providerSpecificDescrMap = new Map();
var providerSpecificExamples = {

  ipaddress: false,
  useragent: false
}

var linebreak = "<br>"

var headerFieldsDiv = $('<div></div>');
$(headerFieldsDiv).addClass("headerTables table-striped table-bordered");

function buildHeaderTable() {

  providerSpecificExamples.ipaddress = false;
  providerSpecificExamples.useragent = false;
  $("#headerExample").empty();
  $("#headerExample").append("x-payments-os-env: test<br>api-version: 1.3.0")

  //Create header fields array
  allHeaderFields = ["api-version", "x-payments-os-env","idempotency-key"]
  checkHeadersPerProvider();


  if (bodyBuilder.requesttype == "Token") {

    allHeaderFields.push("public-key")

    $("#headerExample").append("<br>public-key: 99346d84-5186-4221-9c16-dc51a8de27fb")
  }

  else {
      allHeaderFields.push("private-key", "app-id")
      $("#headerExample").append("<br>private-key: bede7ee5-eaaq-4c9a-bc1f-617ba28256ae<br>app-id: com.zooz.docapp<br>idempotency-key: AGJ8FJLkGHIpHUTK")

    }

    // Remove duplicates
    uniqueHeaderFields = allHeaderFields.filter(function (elem, pos, arr) {
      return arr.indexOf(elem) == pos;
    });

    uniqueHeaderFields.sort()

    createHeaderTableArray(uniqueHeaderFields.length)
    for (var i in uniqueHeaderFields) {

      // Cell one
      bodyBuilder.headerTable[i][0] = uniqueHeaderFields[i]
      var field = uniqueHeaderFields[i]

      // cell two
      if (typeof headerfielddescr[field] !== 'undefined') {
        bodyBuilder.headerTable[i][1] = headerfielddescr[field]


      }


    }

    // Create the table
    bodyBuilder.headerTable.splice(0, 0, ["Key", "Description"])
    // Build the HTML table
    //Create an HTML Table element.
    var table = $("<table />");
    table[0].border = "0";

    //Get the count of columns.
    var columnCount = bodyBuilder.headerTable[0].length;

    //Add the header row.
    var row = $(table[0].insertRow(-1));
    for (var i = 0; i < columnCount; i++) {
      var headerCell = $("<th />");
      headerCell.html(bodyBuilder.headerTable[0][i]);
      row.append(headerCell);
    }


    //Add the data rows.
    for (var i = 1; i < bodyBuilder.headerTable.length; i++) {
      row = $(table[0].insertRow(-1));
      for (var j = 0; j < columnCount; j++) {
        var cell = $("<td />");
        cell.html(bodyBuilder.headerTable[i][j]);
        row.append(cell);
      }
    }

    $(".headerTables").empty();

    var ref = document.getElementById("ciResponseText")

    // Display the example
    $($("#headerExample")).insertBefore(ref);

    // Display the table

    $(headerFieldsDiv).insertAfter(ref);
    $(headerFieldsDiv).append("<h3>Request Header Keys</h3><p>All keys are required, with the exception of <code>idempotency-key</code>.</p>");

    // Check if there are generic descriptions per provider.
    if (typeof providerSpecificDescrMap.get("braintree") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("braintree"));

    }

    else if (typeof providerSpecificDescrMap.get("paypal") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("paypal"));

    }

    else if (typeof providerSpecificDescrMap.get("safecharge") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("safecharge"));

    }

    else if (typeof providerSpecificDescrMap.get("credorax") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("credorax"));

    }

    else if (typeof providerSpecificDescrMap.get("payusingleplatform") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("payusingleplatform"));

    }

    $(headerFieldsDiv).append(table);

    bodyBuilder.headerTable = [];
    providerSpecificDescrMap.clear();

  function checkHeadersPerProvider() {

    for (var provider of bodyBuilder.providers) {

      if (typeof ipaddressheader.requests[bodyBuilder.requesttype] != "undefined") {

        if (!providerSpecificExamples.ipaddress && (ipaddressheader.requests[bodyBuilder.requesttype].indexOf(provider) != -1)) {

          addxClientIpAddress();
        }

      }

      if (typeof useragent.requests[bodyBuilder.requesttype] != "undefined") {

        if (!providerSpecificExamples.useragent && (useragent.requests[bodyBuilder.requesttype].indexOf(provider) != -1)) {
          addxClientUserAgent();
        }

      }

      // Add generic description of the provider is Braintree
      if (provider == "braintree") {

        providerSpecificDescrMap.set("braintree", providerheaderdescr["braintree"]);

      }
      // Add generic description of the provider is PayPal
      else if (provider == "paypal") {

        providerSpecificDescrMap.set("paypal", providerheaderdescr["paypal"]);

      }

      // Add generic description of the provider is SafeCharge
      else if (provider == "safecharge") {

        providerSpecificDescrMap.set("safecharge", providerheaderdescr["safecharge"]);

      }

      // Add generic description of the provider is Credorax
      else if (provider == "credorax") {

        providerSpecificDescrMap.set("credorax", providerheaderdescr["credorax"]);

      }

      // Add generic description of the provider is Credorax
      else if (provider == "payusingleplatform") {

        providerSpecificDescrMap.set("payusingleplatform", providerheaderdescr["payusingleplatform"]);

      }
    }
  }

  function addxClientIpAddress() {

    $("#headerExample").append("<br>x-client-ip-address: 216.3.128.12")
    allHeaderFields.push("x-client-ip-address");
    providerSpecificExamples.ipaddress = true;

  }

  function addxClientUserAgent() {

    $("#headerExample").append("<br>x-client-user-agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1")
    allHeaderFields.push("x-client-user-agent");
    providerSpecificExamples.useragent = true;

  }

  function createHeaderTableArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
      arr[i] = [];

    }

    return bodyBuilder.headerTable = arr;

  }

}

function buildFieldsTable(includeOptionals, requestType) {

    var columnHeading;
    var l1space = "&nbsp;" + "&nbsp;"
    var l2psace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;"
    var l3psace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;"
    var fieldsArray = [];
    var fieldStatusArray = [];
    var fielddescriptions = [];
    var paragraph = "<p>"
    var fieldsTypeArray = [];

    if (includeOptionals) {
        fieldsArray = bodyBuilder.requiredFields.concat(bodyBuilder.optionalFields).concat(bodyBuilder.condRequiredFields).sort()

    } else if (!includeOptionals) {

        fieldsArray = bodyBuilder.requiredFields.concat(bodyBuilder.condRequiredFields).sort()

    }

    orderFieldsinTable(fieldsArray)

    var requiredsDiv = $('<div></div>');
    $(requiredsDiv).addClass("fieldTables table-striped table-bordered");

    var optionalsDiv = $('<div></div>');
    $(optionalsDiv).addClass("fieldTables table-striped table-bordered");

    for (var field of fieldsArray) {

      fieldsTypeArray.push(bodyBuilder.datadict[field].type)

        var hasParent = field.includes("__");
        var hasParentL2 = field.includes("___");
        var hasParentL3 = field.includes("____");
        var hasParentL4 = field.includes("_____");


        if (field.indexOf("__") == -1) {
            bodyBuilder.fieldStagingTable.push("" + field)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        } else if (hasParent & (field.indexOf("___") == -1)) {


            var parentField = field.substr(0, field.indexOf('__'));
            var childFieldLevel1;

            childFieldLevel1 = "⇒ " + field.split('__')[1]

            bodyBuilder.fieldStagingTable.push("" + childFieldLevel1)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))


        } else if (hasParentL2 & (field.indexOf("____") == -1)) {
            var childFieldLevel2 = "⇒⇒ " + field.split('___')[1];

            bodyBuilder.fieldStagingTable.push("" + childFieldLevel2)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        } else if (hasParentL3  & field.indexOf("_____") == -1) {

            var childFieldLevel3 = "⇒⇒⇒ " + field.split('____')[1];
            bodyBuilder.fieldStagingTable.push("" + childFieldLevel3)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        }

        else if (hasParentL4) {

            var childFieldLevel4 = "⇒⇒⇒⇒ " + field.split('_____')[1];
            bodyBuilder.fieldStagingTable.push("" + childFieldLevel4)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        }


    }

    createTableArray(bodyBuilder.fieldStagingTable.length)
    for (var i in bodyBuilder.fieldStagingTable) {

        // Cell one
        bodyBuilder.fieldTable[i][0] = bodyBuilder.fieldStagingTable[i]+paragraph+fieldsTypeArray[i];


        // Cell two. Lookup if field has documentation.
        // Check per provider
        for (var property of bodyBuilder.providers) {
            
            // For PayU Latam countries, check if there are descriptions common to all.
            if (property == "payuargentina" || property == "payuchile" || property == "payumexico" || property == "payubrazil" || property == "payucolombia" || property == "payuperu" || property == "payupanama") {

                if (typeof fielddescr.payulatam !== 'undefined' && typeof fielddescr.payulatam[fieldsArray[i]] !== 'undefined') {

                    if (typeof fielddescr.payulatam[fieldsArray[i]] == 'object') {
      
                        if (typeof fielddescr.payulatam[fieldsArray[i]][bodyBuilder.transactionType] !== 'undefined'){
                          fielddescriptions.push(fielddescr.payulatam[fieldsArray[i]][bodyBuilder.transactionType]+paragraph)
                      }
                    }
      
                    else {
      
                      fielddescriptions.push(fielddescr.payulatam[fieldsArray[i]]+paragraph) }
      
      
                  }      
                    
            }

            if (typeof fielddescr[property] !== 'undefined' && typeof fielddescr[property][fieldsArray[i]] !== 'undefined') {

              // Check if there are descriptions per transaction type 
              if (typeof fielddescr[property][fieldsArray[i]] == 'object') {

                  if ((typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] !== 'undefined') && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] !== 'object')) {
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType]+paragraph) 
                }

                // For bank transfers, check if there are descriptions per bank transfer payment method
                else if ((bodyBuilder.transactionType == "banktransfer") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.bankTransferPaymentMethod]+paragraph)

                }

                else if ((bodyBuilder.transactionType == "loyalty") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.loyaltyPaymentMethod]+paragraph)

                }
                else if ((bodyBuilder.transactionType == "ewallet") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.eWalletPaymentMethod]+paragraph)

                }

                else if ((bodyBuilder.transactionType == "cash") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.cashPaymentMethod]+paragraph)

                }

                else if ((bodyBuilder.transactionType == "paymentpage") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.cashPaymentMethod]+paragraph)

                }
              }

              else {
                fielddescriptions.push(fielddescr[property][fieldsArray[i]]+paragraph) }
            }

        }

        if (fielddescriptions.length == 0){

            if (requestType == "Payment") {
                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-payment" target="_blank">See the API Reference</a>'+paragraph)

            }

            if (requestType == "Authorize") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-an-authorization" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Capture") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-capture" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Charge") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-charge" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Credit") {

                fielddescriptions.push('<a href=https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-credit" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Void") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-void" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Refund") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-refund" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Token") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-token" target="_blank">See the API Reference</a>')
            }


        }


        // Add the provider-specific documentation
        var uniqueArray = fielddescriptions.filter(function(elem, pos,arr) {
          return arr.indexOf(elem) == pos;
        });

        bodyBuilder.fieldTable[i][1] = uniqueArray;

        // Add the status (Required/Optional)
        if (includeOptionals || bodyBuilder.condRequiredFields.length >=1) {

            bodyBuilder.fieldTable[i][2] = fieldStatusArray[i];
        }
        fielddescriptions = [];
        uniqueArray = [];

    }

    // Add the header fields to the array
    if (includeOptionals || bodyBuilder.condRequiredFields.length >= 1) {
        bodyBuilder.fieldTable.splice(0, 0, ["Field", "Description", "Required/Optional"])
    } else {
        bodyBuilder.fieldTable.splice(0, 0, ["Field", "Description"])
    }
    if (bodyBuilder.requiredFields.length > 0 || bodyBuilder.optionalFields.length > 0) {
        // Build the HTML table
        //Create an HTML Table element.
        var table = $("<table />");
        table[0].border = "0";

        //Get the count of columns.
        var columnCount = bodyBuilder.fieldTable[0].length;

        //Add the header row.
        var row = $(table[0].insertRow(-1));
        for (var i = 0; i < columnCount; i++) {
            var headerCell = $("<th />");
            headerCell.html(bodyBuilder.fieldTable[0][i]);
            row.append(headerCell);
        }


        //Add the data rows.
        for (var i = 1; i < bodyBuilder.fieldTable.length; i++) {
            row = $(table[0].insertRow(-1));
            for (var j = 0; j < columnCount; j++) {
                var cell = $("<td />");
                cell.html(bodyBuilder.fieldTable[i][j]);
                row.append(cell);
            }
        }

        $(".fieldTables").empty();
        // Dislay the table
        // var ref = document.getElementById("ciResponseText")
        var ref = $(headerFieldsDiv)
        $(requiredsDiv).insertAfter(ref);
        $(requiredsDiv).append("<h3 class='fields-overview-header'>Fields Overview</h3>");
        if (!includeOptionals && !bodyBuilder.condRequiredFields.length >=1) {

            $(requiredsDiv).append("<p>All fields are required.<p>");

        }
        $(requiredsDiv).append(table);

    }


    bodyBuilder.fieldStagingTable = [];
    bodyBuilder.fieldTable = [];



}

function createTableArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];

    }

    return bodyBuilder.fieldTable = arr;

}

function addStatus(fieldName) {
    if (bodyBuilder.requiredFields.indexOf(fieldName) != -1) {

        return "required"
      
    } 
    else if (bodyBuilder.condRequiredFields.indexOf(fieldName) != -1) {
       return "conditionally required"
    } 
    else return "optional"

    
}

var unsupportedpaymentmethods = {

    ccards: {

    },
    banktransfer: {
        
    },

    dredirect: {
        
    },

    cash: {

    },
    loyalty: {
        payusouthafrica: {
            Authorize: [
                "EBUCKS",
            ],
            Capture: [
                "EBUCKS",
            ]
        }
    },
   ewallet: {
       payusouthafrica: {
            Authorize: [
                "MASTERPASS",
                "MOBICRED"
            ],
            Capture: [
                "MASTERPASS",
                "MOBICRED"
            ],
            Void: [
                "MASTERPASS",
                "MOBICRED",
                "VISA_CHECKOUT"
            ],
            Refund: [
                "MASTERPASS",
                "MOBICRED",
                "VISA_CHECKOUT"
            ],
       },

       paypal: {

        Token: [
            "paypalexpress"
        ]
       }
    
   } 
}
var ipaddressheader = {

    requests: {

        Authorize: ["rsb", "credorax", "payusingleplatform","dalenys", "safecharge"],

        Charge: ["rsb", "credorax", "payeasecup","dalenys","safecharge"],

        Credit: ["credorax","dalenys", "safecharge"]
    }
    
}

var useragent = {

    requests: {

        Authorize: ["dalenys","credorax", "payusingleplatform"],

        Charge: ["dalenys","credorax", "payusingleplatform"],

        Credit: ["dalenys"]
    }
}
$.getJSON("/requestbuilder/configlookups/_unsupportedrequests.json", function(json) {
    bodyBuilder.unsupportedRequests = json;
});

$.getJSON("/requestbuilder/configlookups/supportedThreedDSProviders.json", function(json) {
    bodyBuilder.supportedTreeDsProviders = json;
});
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

function extendPaymentMethods(providerName) {

  if (bodyBuilder.transactionType == "banktransfer") {
    if (typeof shownPaymentMethods != 'undefined') shownPaymentMethods.hide();
    switch (providerName) {
      case "payucitrusindia":
        if (bodyBuilder.requesttype == "Charge") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayucitrusindia')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
        break;
      case "payuindia":
        if (bodyBuilder.requesttype == "Charge") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayuindia')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
        break;
      case "payuturkey":
        if (bodyBuilder.requesttype == "Authorize") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayuturkey')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
        break;
      case "payurussia":
        if (bodyBuilder.requesttype == "Authorize") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayurussia')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
        break;

      case 'payucolombia': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayucolombia')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
      }
        break;

        break;

      case "payusingleplatform":
        if (bodyBuilder.requesttype == "Authorize") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayusingleplatform')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
        break;

      case "payusouthafrica": {
        if (bodyBuilder.requesttype == "Charge") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayusouthafrica')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
      }
        break;
      case "payukenya": {
        if (bodyBuilder.requesttype == "Charge") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayukenya')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
      }
        break;
      case "payunigeria": {
        if (bodyBuilder.requesttype == "Charge") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#banktrpayunigeria')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
      }
      case "payuasiapacific": {
        if (bodyBuilder.requesttype == "Authorize") {
          $('.banktransferpaymentmethods').show();
          shownPaymentMethods = $('#btpayuasiapacific')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.banktransferpaymentmethods').hide();
        }
      }
        break;
      default:
        $('.banktransferpaymentmethods').hide();
        break;
    }
  }

  else if (bodyBuilder.transactionType == "ewallet") {

    if (typeof shownPaymentMethods != 'undefined') shownPaymentMethods.hide();
    switch (providerName) {
      case "payusouthafrica":
        if (bodyBuilder.requesttype == "Charge" || bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Capture") {
          $('.ewalletpaymentmethods').show();
          shownPaymentMethods = $('#ewalletpayusouthafrica')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.ewalletpaymentmethods').hide();
        }
        break;
      case "payukenya":
        if (bodyBuilder.requesttype == "Charge") {
          $('.ewalletpaymentmethods').show();
          shownPaymentMethods = $('#ewalletpayukenya')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.ewalletpaymentmethods').hide();
        }
        break;
      case "paypal":
        if (bodyBuilder.requesttype == "Charge" || bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Capture" || bodyBuilder.requesttype == "Token") {
          $('.ewalletpaymentmethods').show();
          shownPaymentMethods = $('#ewalletpaypal')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.ewalletpaymentmethods').hide();
        }
        break;

      case 'payuindia': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.ewalletpaymentmethods').show();
          shownPaymentMethods = $('#ewalletpayuindia')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.ewalletpaymentmethods').hide();
        }
      }
        break;

      case 'alipay': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.ewalletpaymentmethods').show();
          shownPaymentMethods = $('#ewalletalipay')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.ewalletpaymentmethods').hide();
        }

        break;

      }

      case 'payuasiapacific': {
        if (bodyBuilder.requesttype == 'Authorize'  || bodyBuilder.requesttype == "Capture" ) {
          $('.ewalletpaymentmethods').show();
          shownPaymentMethods = $('#ewalletpayuasiapacific')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.ewalletpaymentmethods').hide();
        }
      };

      default:
        break;
    }


  }

  else if (bodyBuilder.transactionType == "loyalty") {
    if (typeof shownPaymentMethods != 'undefined') shownPaymentMethods.hide();
    switch (providerName) {
      case "payusouthafrica":
        if (bodyBuilder.requesttype == "Charge" || bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Capture") {
          $('.loyaltypaymentmethods').show();
          shownPaymentMethods = $('#loyaltypayusouthafrica')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.loyaltypaymentmethods').hide();
        }

      case "payuindia": {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.loyaltypaymentmethods').show();
          shownPaymentMethods = $('#loyaltypayuindia')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.loyaltypaymentmethods').hide();
        }
      }
        break;
        break;

      default:
        break;
    }
  }

  else if (bodyBuilder.transactionType == "cash") {
    if (typeof shownPaymentMethods != 'undefined') shownPaymentMethods.hide();
    switch (providerName) {
      case "payuargentina":
        if (bodyBuilder.requesttype == "Charge") {
          $('.cashpaymentmethods').show();
          shownPaymentMethods = $('#cashpayuargentina')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.cashpaymentmethods').hide();
        }
        break;

      case 'payubrazil': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.cashpaymentmethods').show();
          shownPaymentMethods = $('#cashpayubrazil')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.cashpaymentmethods').hide();
        }
      }
        break;

      case 'payuchile': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.cashpaymentmethods').show();
          shownPaymentMethods = $('#cashpayuchile')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.cashpaymentmethods').hide();
        }
      }
        break;

      case 'payucolombia': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.cashpaymentmethods').show();
          shownPaymentMethods = $('#cashpayucolombia')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.cashpaymentmethods').hide();
        }
      }
        break;

      case 'payumexico': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.cashpaymentmethods').show();
          shownPaymentMethods = $('#cashpayumexico')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.cashpaymentmethods').hide();
        }
      }
        break;

      case 'payuperu': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.cashpaymentmethods').show();
          shownPaymentMethods = $('#cashpayuperu')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.cashpaymentmethods').hide();
        }
      }
      case 'payuasiapacific': {
        if (bodyBuilder.requesttype == 'Charge') {
          $('.cashpaymentmethods').show();
          shownPaymentMethods = $('#cashpayuasiapacific')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.cashpaymentmethods').hide();
        }
      }
        break;

      default:
        break;
    }
  }

  else if (bodyBuilder.transactionType == "dredirect") {
    if (typeof shownPaymentMethods != 'undefined') shownPaymentMethods.hide();
    switch (providerName) {
      case "payuchile":
        if (bodyBuilder.requesttype == "Charge") {
          $('.dredirectpaymentmethods').show();
          shownPaymentMethods = $('#dredirectpayuchile')
          shownPaymentMethods.show();
          disablePaymentMethods();
        }
        else {
          $('.dredirectpaymentmethods').hide();
        }
        break;

      default:
        break;
    }
  }
}