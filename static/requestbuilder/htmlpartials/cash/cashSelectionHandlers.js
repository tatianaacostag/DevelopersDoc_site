// Clear any selected payment methods
$(".radiobuttons-providers-container input:radio").on("click", function () {
  clearPaymentMethodsOnProviderChange();
});

// Load the input files for the selected request type
// and store the selected request type.
$("#cashrequestypebullets input:radio").on("click", function () {
  loadInputFiles($("input:checked", '#cash').val())
  bodyBuilder.requesttype = $("input:checked", '#cash').val()
  clearSelectionOnRequestChange();
  disableProviders();
});

// Store the providers that were selected
 var $radiobuttons = $("#cashproviders :radio");
 $radiobuttons.on("change", function () {
  $('.disablepaymentmethods').empty();
   bodyBuilder.providers = new Array();

   $("#cashproviders :checked").each(function (i) {
     bodyBuilder.providers[i] = $(this).val();
     bodyBuilder.checkBoxNames.push($(this).attr('class'))

     // Show additional options for the selected providers
     extendPaymentMethods(bodyBuilder.providers[i]);
    

   });
 });

// Store the selected cash payment method
var $radiobuttonscashpaymentmethods = $(".cashpaymentmethods :radio");
$radiobuttonscashpaymentmethods.on("change", function () {
   $(".cashpaymentmethods :checked").each(function (i) {
       bodyBuilder.cashPaymentMethod = $(this).val();
   });
});
