$(document).ready(function () {
  // Generate the signature based on the selected algorithm
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

    // Display the generated signature in the designated field
    $('#signature_generated_response_page').val(signature);

    // Show/hide the appropriate buttons
    $('#signature_generate_response_page').hide();
    $('#signature_generate_again_response_page').css('visibility', 'visible');

    // Log the signature and algorithm for debugging purposes
    console.log(`Algorithm: ${algorithm}`);
    console.log(`Signature: ${signature}`);
  }

  // Build the signature string using form values
  function buildSignatureString() {
    const apikey = $('#signature_apikey_response_page').val();
    const merchantId = $('#signature_merchantId_response_page').val();
    const referenceCode = $('#signature_referenceCode_response_page').val();
    const amount = $('#signature_amount_response_page').val();
    const currency = $('#signature_currency_response_page').val();
    const statePol = $('#signature_state_pol_response_page').val();

    // Build the signature string with the required parameters
    return `${apikey}~${merchantId}~${referenceCode}~${amount}~${currency}~${statePol}`;
  }

  // Handle the button click to generate the signature
  function handleGenerateClick() {
    // Ensure the form is valid before proceeding
    if (!$('#signature_form_response_page').valid()) return;
  
    // Get the selected algorithm and the HMAC key
    const algorithm = $('#signature_algorithm_response_page').val();
    const hmacKey = $('#signature_hmac_key_response_page').val(); // Always get the value
  
    // Build the signature string and call the generateSignature function
    const signatureString = buildSignatureString();
    generateSignature(algorithm, signatureString, hmacKey);
  }

  // Validation rules for the form
  $('#signature_form_response_page').validate({
    rules: {
      signature_apikey_response_page: { required: true },
      signature_merchantId_response_page: { required: true },
      signature_referenceCode_response_page: { required: true },
      signature_amount_response_page: { required: true, number: true },
      signature_currency_response_page: { required: true },
      signature_state_pol_response_page: { required: true },
      signature_hmac_key_response_page: {
        required: function () {
          return $('#signature_algorithm_response_page').val() === 'hmac-sha256';
        }
      }
    }
  });

  // Button handlers
  $('#signature_generate_response_page').click(handleGenerateClick);
  $('#signature_generate_again_response_page').click(handleGenerateClick);
});
