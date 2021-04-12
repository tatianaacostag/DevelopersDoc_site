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