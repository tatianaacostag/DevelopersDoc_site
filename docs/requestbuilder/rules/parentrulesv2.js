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
