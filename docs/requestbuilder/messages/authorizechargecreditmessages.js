function checkAuthorizeChargeMessages() {

  for (var property of bodyBuilder.providers) {

    if (property == "braintree") {

      bodyBuilder.messagesToShow.push("Braintree: " + messages.installmentsnotsupported)
      bodyBuilder.messagesToShow.push("Braintree: " + messages.braintreesubmittedsettlementstatus)

    }

    else if (property == "payucitrusindia") {

      bodyBuilder.messagesToShow.push(messages.payucitrusindiaredirectaftercharge)
    }

    else if (property == "stripe") {

      bodyBuilder.messagesToShow.push("Stripe: " + messages.installmentsnotsupported)


    }
    else if (property == "credorax" && bodyBuilder.keepThreeDs) {
      bodyBuilder.messagesToShow.push("Credorax: " + messages.continueAuthFlow)

    }

    else if (property == "payusingleplatform" && bodyBuilder.keepThreeDs) {
      bodyBuilder.messagesToShow.push("PayU Single Platform: " + messages.threeDsShowInIframe)

    }

    else if (property == "payuchile" && bodyBuilder.requesttype == "Charge" && bodyBuilder.transactionType == "cash") {

      bodyBuilder.messagesToShow.push(messages.payuchilehandlechargeresponse)

    }

    else if (property == "payuargentina" && bodyBuilder.requesttype == "Charge" && bodyBuilder.transactionType == "cash") {

      bodyBuilder.messagesToShow.push(messages.payuargentinahandlechargeresponse)

    }

    else if (property == "payubrazil" && bodyBuilder.requesttype == "Charge" && bodyBuilder.transactionType == "cash") {

      bodyBuilder.messagesToShow.push(messages.payubrazilhandlechargeresponse)

    }

    else if (property == "payucolombia" && bodyBuilder.requesttype == "Charge" && bodyBuilder.transactionType == "cash") {

      bodyBuilder.messagesToShow.push(messages.payucolombiahandlechargeresponse)

    }

    else if (property == "payumexico" && bodyBuilder.requesttype == "Charge" && bodyBuilder.transactionType == "cash") {

      bodyBuilder.messagesToShow.push(messages.payumexicohandlechargeresponse)

    }

    else if (property == "payuperu" && bodyBuilder.requesttype == "Charge" && bodyBuilder.transactionType == "cash") {

      bodyBuilder.messagesToShow.push(messages.payuperuhandlechargeresponse)

    }

    else if (property == "payusouthafrica" && bodyBuilder.transactionType == "ccards") {

      if (!bodyBuilder.keepOptionals) {
        bodyBuilder.messagesToShow.push(messages.payusadisablecvvoptionals)
      }

      else {

        bodyBuilder.messagesToShow.push(messages.payusadisablecvv)

      }


    }

    else if (property == "payukenya" && bodyBuilder.transactionType == "ccards") {

      if (!bodyBuilder.keepOptionals) {
        bodyBuilder.messagesToShow.push(messages.payukenyadisablecvvoptionals)
      }

      else {

        bodyBuilder.messagesToShow.push(messages.payukenyadisablecvv)

      }


    }

    else if (property == "payunigeria" && bodyBuilder.transactionType == "ccards") {

      if (!bodyBuilder.keepOptionals) {
        bodyBuilder.messagesToShow.push(messages.payunigeriadisablecvvoptionals)
      }

      else {

        bodyBuilder.messagesToShow.push(messages.payunigeriadisablecvv)

      }


    }

    else if (property == "shva" && bodyBuilder.requesttype == "Charge") {

      bodyBuilder.messagesToShow.push(messages.shvachargeconsiderations)

    }




  }


}
