
// Clear any selected payment methods
$(".radiobuttons-providers-container input:radio").on("click", function () {
  clearPaymentMethodsOnProviderChange();
});

// Load the input files for the selected request type
// and store the selected request type.
$("#dredirectrequestypebullets input:radio").on("click", function () {
  loadInputFiles($("input:checked", '#dredirect').val())
  bodyBuilder.requesttype = $("input:checked", '#dredirect').val()
  clearSelectionOnRequestChange();
  disableProviders();
});

// Store the providers that were selected
 var $radiobuttons = $("#dredirectproviders :radio");
 $radiobuttons.on("change", function () {
  $('.disablepaymentmethods').empty();
   bodyBuilder.providers = new Array();

   $("#dredirectproviders :checked").each(function (i) {
     bodyBuilder.providers[i] = $(this).val();
     bodyBuilder.checkBoxNames.push($(this).attr('class'))

     // Show additional options for the selected providers
      extendPaymentMethods(bodyBuilder.providers[i]);
    

   });
 });

// Store the selected Debit Redirect payment method
var $radiobuttonsdredirectpaymentmethods = $(".dredirectpaymentmethods :radio");
$radiobuttonsdredirectpaymentmethods.on("change", function () {
   $(".dredirectpaymentmethods :checked").each(function (i) {
       bodyBuilder.dredirectPaymentMethod = $(this).val();
   });
});
