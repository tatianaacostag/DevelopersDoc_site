var bodyBuilder = {
  completerequestbody: null,
  completeRequestJSONObject: null,
  completerequestjson: null,
  requestbodykey: null,
  requestbodyvalue: null,
  transactionType: null,
  requesttype: null,
  keepOptionals: null,
  keepThreeDs: null,
  bankTransferPaymentMethod: null,
  eWalletPaymentMethod: null,
  loyaltyPaymentMethod: null,
  cashPaymentMethod: null,
  paymentPagePaymentMethod: null,
  dredirectPaymentMethod: null,
  unsupportedRequests: null,
  supportedTreeDsProviders: [],
  datadict: null,

  valuesToDecide: [],
  providers: [],
  toremove: [],
  ruleFields: [],
  requiredFields: [],
  condRequiredFields: [],
  messagesToShow: [],
  checkBoxNames: [],
  optionalFields: [],
  threeDsFields: [],
  optionalFieldStagingTable: [],
  optionalFieldTable: [],
  fieldStagingTable: [],
  fieldTable: [],
  headerTable: [],

  reset: function (transType, reqType) {

    if (transType && reqType) {

      this.transactionType = null;
      this.requesttype = null;

    }
    this.completerequestbody = null;
    this.completeRequestJSONObject = null;
    this.completerequestjson = null;
    this.requestbodykey = null;
    this.requestbodyvalue = null;
    this.bankTransferPaymentMethod = null;
    this.cashPaymentMethod = null;
    this.eWalletPaymentMethod = null;
    this.loyaltyPaymentMethod = null;
    this.dredirectPaymentMethod = null;
    this.paymentPagePaymentMethod = null;
    this.keepOptionals = false;
    this.keepThreeDs = false;
    this.valuesToDecide = [];
    this.providers = [];
    this.toremove = [];
    this.ruleFields = [];
    this.requiredFields = [];
    this.condRequiredFields = [],
    this.messagesToShow = [];
    this.checkBoxNames = [];
    this.optionalFields = [];
    this.threeDsFields = [];
    this.optionalFieldStagingTable = [];
    this.optionalFieldTable = [];
    this.fieldStagingTable = [];
    this.fieldTable = [];
    this.headerTable = [];
  }
}

const paymentMethodTypesDomElements = [
  ".banktransferpaymentmethods",
  ".loyaltypaymentmethods",
  ".ewalletpaymentmethods",
  ".dredirectpaymentmethods",
  ".cashpaymentmethods",
  ".paymentpagepaymentmethods"
]
var shownPaymentMethods;

var noProviderSelectedMessage = "No providers selected. Select at least one provider."

var noPaymentMethodSelectedMessage = "No payment method selected. Select a payment method."

function openRequestType(evt, transType) {

  switch (transType) {
    case "banktransfer":

      addSpinner('banktransfer')

      $( "#banktransfer" ).load( "/requestbuilder/htmlpartials/banktransfer/bankTransfers.html", function() {
          removeSpinner('banktransfer')
        });
      
      break;

    case "dredirect":
      addSpinner('dredirect')

      $( "#dredirect" ).load( "/requestbuilder/htmlpartials/dredirect/dRedirect.html", function() {
          removeSpinner('dredirect')
        });
      break;
      
    case "cash":
        
      addSpinner('cash')
      
      $( "#cash" ).load( "/requestbuilder/htmlpartials/cash/cash.html", function() {
          removeSpinner('cash')
        });
      break;

    case "ewallet":
        
      addSpinner('ewallet')
      
      $( "#ewallet" ).load( "/requestbuilder/htmlpartials/ewallet/eWallet.html", function() {

        removeSpinner('ewallet')
      });
      break;
      
    case "loyalty":
        
      addSpinner('loyalty')
      
      $( "#loyalty" ).load( "/requestbuilder/htmlpartials/loyalty/loyalty.html", function() {

        removeSpinner('loyalty')
      });
      break;     

    case "paymentpage":
        
      addSpinner('paymentpage')
        
      $( "#paymentpage" ).load( "/requestbuilder/htmlpartials/paymentpage/paymentpage.html", function() {
  
          removeSpinner('paymentpage')
      });
      break;  
    
    default:
      break;
  }


  // If there's already an output shown, clear it
  clearSelectionsOnTabChange()
  // Load and check payment by default.
  loadAndCheckPayments();

  bodyBuilder.transactionType = transType;

  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(transType).style.display = "block";
  console.log(evt.currentTarget.className)
  let el = evt.currentTarget.querySelector('.tablinks');
  if (el) {
    el.classList.add('active');
  }
}

function clearSelectionsOnTabChange() {
  // If there's already an output shown, clear it
  clearSharedSelections(true, true); // also reset transaction type and request type
  showHideThreeDsTwoCheckbox();
  $('input[type=radio]').each(function () {
    this.checked = false;
  });
}

function clearSelectionOnRequestChange() {
  bodyBuilder.providers = [];
  
  for (var pmTypeDomElement of paymentMethodTypesDomElements) {
    $("input:radio:checked",pmTypeDomElement).prop("checked", false);
  }
  $("input").prop("disabled", false);
  $("input:radio:checked", ".radiobuttons-providers-container").prop("checked", false);
  $("label").removeClass("disabledInputElement");
  showHideThreeDsTwoCheckbox();
  clearSharedSelections(false, false); // do not reset transaction type and request type

}

function clearPaymentMethodsOnProviderChange() {

  bodyBuilder.bankTransferPaymentMethod = null;
  bodyBuilder.eWalletPaymentMethod = null;
  bodyBuilder.loyaltyPaymentMethod = null;
  bodyBuilder.dredirectPaymentMethod = null;
  bodyBuilder.cashPaymentMethod = null;
  bodyBuilder.paymentPagePaymentMethod = null;

  for (var pmTypeDomElement of paymentMethodTypesDomElements) {
    $("input:radio:checked", pmTypeDomElement).prop("checked", false);
  }

}

function clearSharedSelections(transType, reqType) {

  if (!transType && !reqType) {

    bodyBuilder.reset(false, false);
  }

  else {

    bodyBuilder.reset(true, true);
  }

  $('.disableproviders').empty();

  $('input[type=checkbox]').each(function () {
    this.checked = false;
  });


  for (var pmTypeDomElement of paymentMethodTypesDomElements) {
    $(pmTypeDomElement).hide();
  }

  $('#outputsummarymessage').empty();
  $('#custommessage').empty();
  $('#headerExample').empty();
  $('#ciResponseText').empty();
  $(".fieldTables").empty();
  $(".headerTables").empty();
  $("#ciResponseText").html("Sample body will be displayed here");
  $("#headerExample").html("Sample header will be displayed here");
}

function loadAndCheckPayments() {
  clearSelectionOnRequestChange();
  // $('#paymentapm').prop('checked', true);
  $('#paymentcc').prop('checked', true);
  // $('#paymentcash').prop('checked', true);
  // $('#paymentbanktransfer').prop('checked', true);
  // $('#paymentewallet').prop('checked', true);
  // $('#paymentloyalty').prop('checked', true);
  bodyBuilder.requesttype = "Payment"
  loadPayments();

}

function disableProviders() {

  var unsupportedrequests = bodyBuilder.unsupportedRequests

  if (typeof unsupportedrequests[bodyBuilder.transactionType][bodyBuilder.requesttype] != "undefined" && unsupportedrequests[bodyBuilder.transactionType][bodyBuilder.requesttype].length >= 1) {

    $("<p class='disableproviders'>Providers that do not support the request type are disabled.</p>").insertAfter(".selectproviders");

    unsupportedrequests[bodyBuilder.transactionType][bodyBuilder.requesttype].forEach(element => {

      // disableElement(element)

      if (bodyBuilder.transactionType == "ccards") {

        $("input[value="+element+"]").prop("disabled", true).parent().addClass("disabledInputElement");;
      }

      else if (bodyBuilder.transactionType == "banktransfer") {

        $("input[value="+element+"]", "#banktransfer").prop("disabled", true).parent().addClass("disabledInputElement");

      }

      else if (bodyBuilder.transactionType == "ewallet") {

        $("input[value="+element+"]", "#ewallet").prop("disabled", true).parent().addClass("disabledInputElement");

      }

      else if (bodyBuilder.transactionType == "loyalty") {

        $("input[value="+element+"]", "#loyalty").prop("disabled", true).parent().addClass("disabledInputElement");

      }

      else if (bodyBuilder.transactionType == "dredirect") {

        $("input[value="+element+"]", "#dredirect").prop("disabled", true).parent().addClass("disabledInputElement");

      }

      else if (bodyBuilder.transactionType == "cash") {

        $("input[value="+element+"]", "#cash").prop("disabled", true).parent().addClass("disabledInputElement");

      }

      else if (bodyBuilder.transactionType == "paymentpage") {

        $("input[value="+element+"]", "#paymentpage").prop("disabled", true).parent().addClass("disabledInputElement");

      }


    });

  }


}
function disablePaymentMethods() {

  bodyBuilder.providers.forEach(function(provider){


    if (typeof unsupportedpaymentmethods[bodyBuilder.transactionType][provider] != "undefined" && typeof unsupportedpaymentmethods[bodyBuilder.transactionType][provider][bodyBuilder.requesttype]!= "undefined") {

      $("<p class='disablepaymentmethods'>Payment methods that do not support the request type are disabled.</p>").insertAfter(".selectpaymentmethods");
  
      unsupportedpaymentmethods[bodyBuilder.transactionType][provider][bodyBuilder.requesttype].forEach(element => {
  
        // disableElement(element)
  
  
        if (bodyBuilder.transactionType == "ccards") {
  
          $("#" + [element]).prop("disabled", true).parent().addClass("disabledInputElement");
        }
  
        else if (bodyBuilder.transactionType == "banktransfer") {
  
          $("#" + [element], "#banktransfer").prop("disabled", true).parent().addClass("disabledInputElement");
  
        }
  
        else if (bodyBuilder.transactionType == "ewallet") {
  
          $("#" + [element], "#ewallet").prop("disabled", true).parent().addClass("disabledInputElement");
  
        }
  
        else if (bodyBuilder.transactionType == "loyalty") {
  
          $("#" + [element], "#loyalty").prop("disabled", true).parent().addClass("disabledInputElement");
  
        }
  
  
      });
  
    }


  })



}

function addSpinner(domElement){

  $('#'+domElement).addClass('spinner');
}

function removeSpinner(domElement){

  $('#'+domElement).removeClass('spinner');

}

function disableElement(element, selectionDomElement){

   $("#" + [element]).prop("disabled", true).parent().addClass("disabledInputElement");

}

function showHideThreeDsTwoCheckbox() {

  if (typeof bodyBuilder.supportedTreeDsProviders.threeDSTwoProviders != "undefined") {
    if (bodyBuilder.transactionType == "ccards" && bodyBuilder.supportedTreeDsProviders.threeDSTwoProviders.some(r=> bodyBuilder.providers.indexOf(r) >= 0) && bodyBuilder.keepOptionals && (bodyBuilder.requesttype === "Authorize" || bodyBuilder.requesttype === "Charge")){
      $( "#three_ds_checkbox").show();
    }
  
    else {
      $( "#three_ds_checkbox").hide();
      $('#three_ds_input').prop( "checked", false)
      bodyBuilder.keepThreeDs = false

    }
  }
}

