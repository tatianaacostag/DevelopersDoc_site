// Clear any selected payment methods
$(".radiobuttons-providers-container input:radio").on("click", function () {
  clearPaymentMethodsOnProviderChange();
});

// Load the input files for the selected request type
// and store the selected request type.
$("#paymentpagerequestypebullets input:radio").on("click", function () {
  loadInputFiles($("input:checked", '#paymentpage').val())
  bodyBuilder.requesttype = $("input:checked", '#paymentpage').val()
  clearSelectionOnRequestChange();
  disableProviders();
});

// Store the providers that were selected
 var $radiobuttons = $("#paymentpageproviders :radio");
 $radiobuttons.on("change", function () {
  $('.disablepaymentmethods').empty();
   bodyBuilder.providers = new Array();

   $("#paymentpageproviders :checked").each(function (i) {
     bodyBuilder.providers[i] = $(this).val();
     bodyBuilder.checkBoxNames.push($(this).attr('class'))

     /// Show additional options for the selected providers
     extendPaymentMethods(bodyBuilder.providers[i]);
    

   });
 });

// Store the selected payment page payment method
var $radiobuttonspaymentpagepaymentmethods = $(".paymentpagepaymentmethods :radio");
$radiobuttonspaymentpagepaymentmethods.on("change", function () {
   $(".paymentpagepaymentmethods :checked").each(function (i) {
       bodyBuilder.paymentPagePaymentMethod = $(this).val();
   });
});