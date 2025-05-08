$(document).ready(function () {
    // Hide all "Generate again" buttons initially
    $('[id^="signature_generate_again"]').hide();

    function generar(formId) {
        console.log("Generating signature for form: " + formId);

        let algorithm, apikey, merchantId, referenceCode, amount, currency, hmacKey = '', signatureString = '', statePol = '';
        const suffix = formId.replace("signature_form_", "");

        switch (formId) {
            case "signature_form":
                algorithm = $('#signature_algorithm').val();
                apikey = $('#signature_apikey').val();
                merchantId = $('#signature_merchantId').val();
                referenceCode = $('#signature_referenceCode').val();
                amount = $('#signature_amount').val();
                currency = $('#signature_currency').val();
                hmacKey = $('#signature_hmac_key').val() || '';
                signatureString = `${apikey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
                break;

            case "signature_form_response_page":
                algorithm = $('#signature_algorithm_response_page').val();
                apikey = $('#signature_apikey_response_page').val();
                merchantId = $('#signature_merchantId_response_page').val();
                referenceCode = $('#signature_referenceCode_response_page').val();
                amount = $('#signature_amount_response_page').val();
                currency = $('#signature_currency_response_page').val();
                statePol = $('#signature_state_pol_response_page').val();
                hmacKey = $('#signature_hmac_key_response_page').val() || '';
                signatureString = `${apikey}~${merchantId}~${referenceCode}~${amount}~${currency}~${statePol}`;
                break;

            case "signature_form_confirmation_page":
                algorithm = $('#signature_algorithm_confirmation_page').val();
                apikey = $('#signature_apikey_confirmation_page').val();
                merchantId = $('#signature_merchantId_confirmation_page').val();
                referenceCode = $('#signature_referenceCode_confirmation_page').val();
                amount = $('#signature_amount_confirmation_page').val();
                currency = $('#signature_currency_confirmation_page').val();
                statePol = $('#signature_state_pol_confirmation_page').val();
                hmacKey = $('#signature_hmac_key_confirmation_page').val() || '';

                if (algorithm === "hmac-sha256" && navigator.userAgent.includes("Chrome")) {
                    setTimeout(() => {
                        const delayedString = `${apikey}~${merchantId}~${referenceCode}~${amount}~${currency}~${statePol}`;
                        generateSignature(algorithm, delayedString, hmacKey, "confirmation_page");
                    }, 50);
                    return;
                } else {
                    signatureString = `${apikey}~${merchantId}~${referenceCode}~${amount}~${currency}~${statePol}`;
                }
                break;

            default:
                console.error("Unknown form ID: " + formId);
                return;
        }

        generateSignature(algorithm, signatureString, hmacKey, suffix);
    }

    function generateSignature(algorithm, signatureString, key, suffix) {
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
                const defaultKey = $(`#signature_apikey${suffix ? "_" + suffix : ''}`).val();
                signature = CryptoJS.HmacSHA256(signatureString, key || defaultKey).toString();
                break;
            default:
                console.error("Unknown algorithm: " + algorithm);
                return;
        }

        const outputField = suffix ? `#signature_generated_${suffix}` : '#signature_generated';
        const generateBtn = suffix ? `#signature_generate_${suffix}` : '#signature_generate';
        const generateAgainBtn = suffix ? `#signature_generate_again_${suffix}` : '#signature_generate_again';

        $(outputField).val(signature);
        $(generateBtn).hide();
        $(generateAgainBtn).show();

        console.log(`Algorithm: ${algorithm}`);
        console.log(`Signature: ${signature}`);
    }

    // Form validation rules
    $('#signature_form').validate({
        rules: {
            signature_apikey: { required: true },
            signature_merchantId: { required: true },
            signature_referenceCode: { required: true },
            signature_amount: { required: true, number: true },
            signature_currency: { required: true }
        }
    });

    $('#signature_form_response_page').validate({
        rules: {
            signature_apikey_response_page: { required: true },
            signature_merchantId_response_page: { required: true },
            signature_referenceCode_response_page: { required: true },
            signature_amount_response_page: { required: true, number: true },
            signature_currency_response_page: { required: true },
            signature_state_pol_response_page: { required: true }
        }
    });

    $('#signature_form_confirmation_page').validate({
        rules: {
            signature_apikey_confirmation_page: { required: true },
            signature_merchantId_confirmation_page: { required: true },
            signature_referenceCode_confirmation_page: { required: true },
            signature_amount_confirmation_page: { required: true, number: true },
            signature_currency_confirmation_page: { required: true },
            signature_state_pol_confirmation_page: { required: true }
        }
    });

    // Event handlers
    $('#signature_generate').click(() => {
        if ($('#signature_form').valid()) generar("signature_form");
    });

    $('#signature_generate_again').click(() => {
        if ($('#signature_form').valid()) generar("signature_form");
    });

    $('#signature_generate_response_page').click(() => {
        if ($('#signature_form_response_page').valid()) generar("signature_form_response_page");
    });

    $('#signature_generate_again_response_page').click(() => {
        if ($('#signature_form_response_page').valid()) generar("signature_form_response_page");
    });

    $('#signature_generate_confirmation_page').click(() => {
        if ($('#signature_form_confirmation_page').valid()) generar("signature_form_confirmation_page");
    });

    $('#signature_generate_again_confirmation_page').click(() => {
        if ($('#signature_form_confirmation_page').valid()) generar("signature_form_confirmation_page");
    });
});
