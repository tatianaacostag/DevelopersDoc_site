function checkCaptureMessages() {
//   // Generic messages that are not provider-specific
// bodyBuilder.messagesToShow.push(messages.amountrequiredinsubsequentcaptures)

    for (var property of bodyBuilder.providers) {

        if (property == "rsb") {

            bodyBuilder.messagesToShow.push("Russian Standard Bank (RSB)" + messages.nofieldsrequiredincapture)

        }

        else if (property == "alfabank") {

            bodyBuilder.messagesToShow.push("Alfa-Bank" + messages.nofieldsrequiredincapture)
        }

        else if (property == "braintree") {

            bodyBuilder.messagesToShow.push("Braintree" + messages.nofieldsrequiredincapture)

        }

        else if (property == "cybersource") {

            bodyBuilder.messagesToShow.push("CyberSource" + messages.nofieldsrequiredincapture)

        }


        else if (property == "shva") {

            bodyBuilder.messagesToShow.push("Shva" + messages.nofieldsrequiredincapture)
            bodyBuilder.messagesToShow.push(messages.shvacpatureconsiderations)

        }


        // Sberbank
        else if (property == "sberbank") {

            bodyBuilder.messagesToShow.push("Sberbank" + messages.nofieldsrequiredincapture)

        }

        // Sberbank
        else if (property == "worldpayeu") {

            bodyBuilder.messagesToShow.push("Worldpay" + messages.nofieldsrequiredincapture)

        }

        // PayU Russia
        else if (property == "payurussia") {

            bodyBuilder.messagesToShow.push("PayU Russia" + messages.nofieldsrequiredincapture)

        }

        // PayU Romania
        else if (property == "payuromania") {

            bodyBuilder.messagesToShow.push("PayU Romania" + messages.nofieldsrequiredincapture)

        }

        // PayU Turkey
        else if (property == "payuturkey") {

            bodyBuilder.messagesToShow.push("PayU Turkey" + messages.nofieldsrequiredincapture)


        }

        // Stripe
        else if (property == "stripe") {

            bodyBuilder.messagesToShow.push("Stripe" + messages.nofieldsrequiredincapture)
            bodyBuilder.messagesToShow.push("Stripe" + messages.capturereconciliationidnotsupported)

        }

        else if (property == "payuargentina") {

            bodyBuilder.messagesToShow.push("PayU Argentina" + messages.nofieldsrequiredincapture)

        }

        else if (property == "wirecard") {

            bodyBuilder.messagesToShow.push("Wirecard" + messages.nofieldsrequiredincapture)

        }

        else if (property == "payumexico") {

            bodyBuilder.messagesToShow.push("PayU Mexico" + messages.nofieldsrequiredincapture)

        }
    
        else if (property == "payubrazil") {

            bodyBuilder.messagesToShow.push("PayU Brazil" + messages.nofieldsrequiredincapture)

        }

        else if (property == "payuperu") {

            bodyBuilder.messagesToShow.push("PayU Peru" + messages.nofieldsrequiredincapture)

        }
        
        else if (property == "vantiv") {

            bodyBuilder.messagesToShow.push("Vantiv" + messages.nofieldsrequiredincapture)

        }

        else if (property == "safecharge") {

            bodyBuilder.messagesToShow.push("SafeCharge" + messages.nofieldsrequiredincapture)

        }

        else if (property == "payusingleplatform") {

            bodyBuilder.messagesToShow.push("PayU Single Platform" + messages.nofieldsrequiredincapture)

        }

        else if (property == "paypal") {

            bodyBuilder.messagesToShow.push("PayPal" + messages.nofieldsrequiredincapture)

        }

        else if (property == "dalenys") {

            bodyBuilder.messagesToShow.push("Dalenys" + messages.nofieldsrequiredincapture)

        }
        else if (property == "chasepaymentech") {

            if (!bodyBuilder.keepOptionals) {

                bodyBuilder.messagesToShow.push("Chase Paymentech Level 2 and 3 Fields: " + messages.showlevel23fields)

            }

            else bodyBuilder.messagesToShow.push("Chase Paymentech  " + messages.requiredLevel23Fields)

        }

        else if (property == "payeezy") {

            bodyBuilder.messagesToShow.push("Payeezy" + messages.nofieldsrequiredincapture)

        }

    }


}
