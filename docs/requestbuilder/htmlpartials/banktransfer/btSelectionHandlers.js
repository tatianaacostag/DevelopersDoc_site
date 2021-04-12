// Clear any selected payment methods
$(".radiobuttons-providers-container input:radio").on("click", function () {
  clearPaymentMethodsOnProviderChange();
});

// Load the input files for the selected request type
// and store the selected request type.
$("#btrequestypebullets input:radio").on("click", function () {
  loadInputFiles($("input:checked", '#banktransfer').val())
  bodyBuilder.requesttype = $("input:checked", '#banktransfer').val()

  // Clear all selections and check which providers to disable
  clearSelectionOnRequestChange();
  disableProviders();
});

// Store the providers that were selected
 var $radiobuttons = $("#banktransferproviders :radio");
 $radiobuttons.on("change", function () {
  $('.disablepaymentmethods').empty();
   bodyBuilder.providers = new Array();

   $("#banktransferproviders :checked").each(function (i) {
     bodyBuilder.providers[i] = $(this).val();
     bodyBuilder.checkBoxNames.push($(this).attr('class'))

     // Show additional options for the selected providers
     extendPaymentMethods(bodyBuilder.providers[i]);

   });
 });

// Store the selected bank transfer payment method
var $radiobuttonsbanktrpaymentmethods = $(".banktransferpaymentmethods :radio");
$radiobuttonsbanktrpaymentmethods.on("change", function () {
   $(".banktransferpaymentmethods :checked").each(function (i) {
       bodyBuilder.bankTransferPaymentMethod = $(this).val();
   });
});
