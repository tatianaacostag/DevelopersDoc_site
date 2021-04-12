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
