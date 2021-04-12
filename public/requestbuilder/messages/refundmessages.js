function checkRefundMessages() {

  // // Generic messages that are not provider-specific
  // bodyBuilder.messagesToShow.push(messages.amountrequiredinsubsequentrefunds)

  for (var property of bodyBuilder.providers) {

    if (property == "alfabank") {

      bodyBuilder.messagesToShow.push ("Alfa-Bank"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "braintree") {

      bodyBuilder.messagesToShow.push ("Braintree"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "cybersource") {

      bodyBuilder.messagesToShow.push ("CyberSource"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "sberbank") {

      bodyBuilder.messagesToShow.push ("Sberbank"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "payucitrusindia") {

      bodyBuilder.messagesToShow.push ("PayU Citrus (India)"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "payuindia") {

      bodyBuilder.messagesToShow.push ("PayU India"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "payuromania") {

      bodyBuilder.messagesToShow.push ("PayU Romania"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "payurussia") {

      bodyBuilder.messagesToShow.push ("PayU Russia"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "payuturkey") {

      bodyBuilder.messagesToShow.push ("PayU Turkey"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "chasepaymentech") {

      bodyBuilder.messagesToShow.push ("Chase Paymentech:"+messages.chasepreventrefundhigherthancapture)

    }

    else if (property == "rsb") {

      bodyBuilder.messagesToShow.push ("Russian Standard Bank (RSB)"+messages.nofieldsrequiredinrefund)

    }


    else if (property == "worldpayeu") {

      bodyBuilder.messagesToShow.push ("Worldpay EU"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "shva") {

      bodyBuilder.messagesToShow.push ("Shva"+messages.nofieldsrequiredinrefund)
      bodyBuilder.messagesToShow.push (messages.shvarefundconsiderations)

    }

    else if (property == "wirecard") {

      bodyBuilder.messagesToShow.push ("Wirecard"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "vantiv") {

      bodyBuilder.messagesToShow.push("Vantiv" + messages.nofieldsrequiredinrefund)

    }

    else if (property == "stripe") {

      bodyBuilder.messagesToShow.push ("Stripe"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "safecharge") {

      bodyBuilder.messagesToShow.push ("SafeCharge"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "payusingleplatform") {

      bodyBuilder.messagesToShow.push ("PayU Single Platform"+messages.nofieldsrequiredinrefund)

    }

    else if (property == "paypal" && bodyBuilder.keepOptionals == false) {

      bodyBuilder.messagesToShow.push ("PayPal"+messages.nofieldsrequiredinrefund)
      bodyBuilder.messagesToShow.push (messages.captureidmultiplecaptures)
      bodyBuilder.messagesToShow.push (messages.amountfromcaptureid)
     
    }

    else if (property == "payeezy" && bodyBuilder.keepOptionals == false) {

      bodyBuilder.messagesToShow.push ("Payeezy"+messages.nofieldsrequiredinrefund)
      bodyBuilder.messagesToShow.push (messages.captureidmultiplecaptures)
      bodyBuilder.messagesToShow.push (messages.amountfromcaptureid)
     
    }

    else if (property == "dalenys") {

      bodyBuilder.messagesToShow.push ("Dalenys"+messages.nofieldsrequiredinrefund)

    }

  }


}
