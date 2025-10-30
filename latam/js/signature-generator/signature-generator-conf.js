$(document).ready(function () {
    function generateSignature(algorithm, signatureString, key) {
      let signature;
  
      switch (algorithm) {
        case "md5":
          signature = CryptoJS.MD5(signatureString).toString();
          break;
        case "sha1":
          signature = CryptoJS.SHA1(signatureString).toString();
          break;
        case "sha256":
          signature = CryptoJS.SHA256(signatureString).toString();
          break;
        case "hmac-sha256":
          signature = CryptoJS.HmacSHA256(signatureString, key).toString();
          break;
        default:
          console.error("Unsupported algorithm: " + algorithm);
          return;
      }

      $('#signature_generated_confirmation_page').val(signature);
      $('#signature_generate_confirmation_page').hide();
      $('#signature_generate_again_confirmation_page').css('visibility', 'visible');

      console.log(`Algorithm: ${algorithm}`);
      console.log(`Signature: ${signature}`);
    }
    
    function buildSignatureString() {
        const apikey = $('#signature_apikey_confirmation_page').val();
        const merchantId = $('#signature_merchantId_confirmation_page').val();
        const referenceCode = $('#signature_referenceCode_confirmation_page').val();
        const amount = $('#signature_amount_confirmation_page').val();
        const currency = $('#signature_currency_confirmation_page').val();
        const statePol = $('#signature_state_pol_confirmation_page').val();

        return `${apikey}~${merchantId}~${referenceCode}~${amount}~${currency}~${statePol}`;
    }

    function handleGenerateConfirmationClick() {
        if (!$('#signature_form_confirmation_page').valid()) return;
    
        const algorithm = $('#signature_algorithm_confirmation_page').val();
        const hmacKey = $('#signature_hmac_key_confirmation_page').length ? $('#signature_hmac_key_confirmation_page').val() : '';
        const signatureString = buildSignatureString();
    
        generateSignature(algorithm, signatureString, hmacKey);
      }

    // Form validation
    $('#signature_form_confirmation_page').validate({
        rules: {
            signature_apikey_confirmation_page: { required: true },
            signature_merchantId_confirmation_page: { required: true },
            signature_referenceCode_confirmation_page: { required: true },
            signature_amount_confirmation_page: { required: true, number: true },
            signature_currency_confirmation_page: { required: true },
            signature_state_pol_confirmation_page: { required: true },
        }
    });

    // Button event handlers
    $('#signature_generate_confirmation_page').click(handleGenerateConfirmationClick);
    $('#signature_generate_again_confirmation_page').click(handleGenerateConfirmationClick);
});