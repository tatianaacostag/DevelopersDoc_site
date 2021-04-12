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

