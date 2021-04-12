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