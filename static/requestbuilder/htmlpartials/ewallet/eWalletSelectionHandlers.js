
// Clear any selected payment methods
$(".radiobuttons-providers-container input:radio").on("click", function () {
  clearPaymentMethodsOnProviderChange();
});

// Load the input files for the selected request type
// and store the selected request type.
$("#ewalletrequestypebullets input:radio").on("click", function () {
  loadInputFiles($("input:checked", '#ewallet').val())
  bodyBuilder.requesttype = $("input:checked", '#ewallet').val()
  clearSelectionOnRequestChange();
  disableProviders();
});

// Store the providers that were selected
 var $radiobuttons = $("#ewalletproviders :radio"); 
 $radiobuttons.on("change", function () {
  $('.disablepaymentmethods').empty();
   bodyBuilder.providers = new Array();

   $("#ewalletproviders :checked").each(function (i) {
     bodyBuilder.providers[i] = $(this).val();
     bodyBuilder.checkBoxNames.push($(this).attr('class'))

     /// Show additional options for the selected providers
     extendPaymentMethods(bodyBuilder.providers[i]);
    

   });
 });

// Store the selected eWallet payment method
var $radiobuttonsewalletpaymentmethods = $(".ewalletpaymentmethods :radio");
$radiobuttonsewalletpaymentmethods.on("change", function () {
   $(".ewalletpaymentmethods :checked").each(function (i) {
       bodyBuilder.eWalletPaymentMethod = $(this).val();
   });
});