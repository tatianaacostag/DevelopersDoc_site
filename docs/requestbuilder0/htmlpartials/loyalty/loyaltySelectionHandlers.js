// Clear any selected payment methods
$(".radiobuttons-providers-container input:radio").on("click", function () {
  clearPaymentMethodsOnProviderChange();
});

// Load the input files for the selected request type
// and store the selected request type.
$("#loyaltyrequestypebullets input:radio").on("click", function () {
  loadInputFiles($("input:checked", '#loyalty').val())
  bodyBuilder.requesttype = $("input:checked", '#loyalty').val()
  clearSelectionOnRequestChange();
  disableProviders();
});

// Store the providers that were selected
 var $radiobuttons = $("#loyaltyproviders :radio");
 $radiobuttons.on("change", function () {
  $('.disablepaymentmethods').empty();
   bodyBuilder.providers = new Array();

   $("#loyaltyproviders :checked").each(function (i) {
     bodyBuilder.providers[i] = $(this).val();
     bodyBuilder.checkBoxNames.push($(this).attr('class'))

     /// Show additional options for the selected providers
     extendPaymentMethods(bodyBuilder.providers[i]);
    

   });
 });

// Store the selected loyalty payment method
var $radiobuttonsloyaltypaymentmethods = $(".loyaltypaymentmethods :radio");
$radiobuttonsloyaltypaymentmethods.on("change", function () {
   $(".loyaltypaymentmethods :checked").each(function (i) {
       bodyBuilder.loyaltyPaymentMethod = $(this).val();
   });
});