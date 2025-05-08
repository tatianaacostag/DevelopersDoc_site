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
  
      $('#signature_generated').val(signature);
      $('#signature_generate').hide();
      $('#signature_generate_again').css('visibility', 'visible');
  
      console.log(`Algorithm: ${algorithm}`);
      console.log(`Signature: ${signature}`);
    }
  
    function buildSignatureString() {
      const apikey = $('#signature_apikey').val();
      const merchantId = $('#signature_merchantId').val();
      const referenceCode = $('#signature_referenceCode').val();
      const amount = $('#signature_amount').val();
      const currency = $('#signature_currency').val();
  
      return `${apikey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
    }
  
    function handleGenerateClick() {
      if (!$('#signature_form').valid()) return;
  
      const algorithm = $('#signature_algorithm').val();
      const hmacKey = $('#signature_hmac_key').length ? $('#signature_hmac_key').val() : '';
      const signatureString = buildSignatureString();
  
      generateSignature(algorithm, signatureString, hmacKey);
    }
  
    // Validation
    $('#signature_form').validate({
      rules: {
        signature_apikey: { required: true },
        signature_merchantId: { required: true },
        signature_referenceCode: { required: true },
        signature_amount: { required: true, number: true },
        signature_currency: { required: true }
      }
    });
  
    // Button handlers
    $('#signature_generate').click(handleGenerateClick);
    $('#signature_generate_again').click(handleGenerateClick);
  });
  