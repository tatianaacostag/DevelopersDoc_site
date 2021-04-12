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
