function checkVoidMessages() {

  for (var property of bodyBuilder.providers) {

    if (property == "alfabank") {

      bodyBuilder.messagesToShow.push ("Alfa-Bank"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "braintree") {

      bodyBuilder.messagesToShow.push ("Braintree"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "cybersource") {

      bodyBuilder.messagesToShow.push ("CyberSource"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payuromania") {

      bodyBuilder.messagesToShow.push ("PayU Romania"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payurussia") {

      bodyBuilder.messagesToShow.push ("PayU Russia"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payusouthafrica") {

      bodyBuilder.messagesToShow.push ("PayU South Africa"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payukenya") {

      bodyBuilder.messagesToShow.push ("PayU Kenya"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payunigeria") {

      bodyBuilder.messagesToShow.push ("PayU Nigeria"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payuturkey") {

      bodyBuilder.messagesToShow.push ("PayU Turkey"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "rsb") {

      bodyBuilder.messagesToShow.push ("Russian Standard Bank (RSB)"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "stripe") {

      bodyBuilder.messagesToShow.push ("Stripe"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "worldpayeu") {

      bodyBuilder.messagesToShow.push ("Worldpay EU"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "sberbank") {

      bodyBuilder.messagesToShow.push ("Sberbank"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "chasepaymentech") {

      bodyBuilder.messagesToShow.push ("Chase Paymentech"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "shva") {

      bodyBuilder.messagesToShow.push ("Shva"+messages.nofieldsrequiredinvoid)
      bodyBuilder.messagesToShow.push (messages.shvavoidconsiderations)

    }

    else if (property == "wirecard") {

      bodyBuilder.messagesToShow.push ("Wirecard"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payuargentina") {

      bodyBuilder.messagesToShow.push ("PayU Argentina"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payubrazil") {

      bodyBuilder.messagesToShow.push ("PayU Brazil"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "payuperu") {

      bodyBuilder.messagesToShow.push ("PayU Peru"+messages.nofieldsrequiredinvoid)

    }

    else if (property == "safecharge") {

      bodyBuilder.messagesToShow.push ("SafeCharge"+messages.nofieldsrequiredinvoid)

    }
  
    else if (property == "vantiv") {

      bodyBuilder.messagesToShow.push("Vantiv" + messages.nofieldsrequiredinvoid)

    }

    else if (property == "payusingleplatform") {

      bodyBuilder.messagesToShow.push("PayU Single Platform" + messages.nofieldsrequiredinvoid)

    }
    else if (property == "paypal") {

      bodyBuilder.messagesToShow.push("PayPal" + messages.nofieldsrequiredinvoid)

    }

    else if (property == "payeezy") {

      bodyBuilder.messagesToShow.push("Payeezy" + messages.nofieldsrequiredinvoid)

    }

    else if (property == "payuasiapacific") {

      bodyBuilder.messagesToShow.push ("PayU Asia Pacific"+messages.nofieldsrequiredinvoid)

    }
  }
}
