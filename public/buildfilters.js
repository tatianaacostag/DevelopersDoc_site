var firstTimeLoaded;
var noResultsMsg = "No results in this category. Clear the search box to show all options again."

var deviceType = {
    device: null
}

var filterDataOptions = {
    selectedPmType: "ccards", // cards are selected by default
    features: null,
    paymentMethods: null,
    requests: null
}

var allProviderLists = {
    allProviders: null,
    cardProviders: null,
    ewalletProviders: null,
    cashProviders: null,
    loyaltyProviders: null,
    banktransferProviders: null,
}

// Store the options (checkbox values)
var filterData = {
    features: null,
    paymentMethods: null,
    requests: null
}

var filterDomElements = [{
    dataFile: "/searchbuilder/features.json",
    optionsDivId: "#featureslistfilteroptions",
    optionsTxtSpanId: "#forpmtype",
    storeInFilterData: "features"
},
{
    dataFile: "/searchbuilder/paymentmethods.json",
    optionsDivId: "#paymentmethodslistfilteroptions",
    optionsTxtSpanId: "#forpaymentmethod",
    storeInFilterData: "paymentMethods"
},
{
    dataFile: "/searchbuilder/requests.json",
    optionsDivId: "#requestlistfilteroptions",
    multpartDivId: "#multpartlistfilteroptions",
    optionsTxtSpanId: "#forrequesttype",
    storeInFilterData: "requests"
},
]

var supportedProviders = new Map();
var featuresToDisplay = new Map();
var requestsToDisplay = new Map();
var paymentMethodsToDisplay = new Map();


var selectionToDisplay = []
var resultArrays = []
var filterText = document.getElementById('appliedfilters')

var multPartDisplayValues = {
    Authorize: "Authorize",
    Capture: "Capture",
    Charge: "Charge",
    Credit: "Credit",
    Refund: "Refund",
    Void: "Void",
    Authorize_partial: "Partial Authorize ",
    Capture_multiple: "Multiple Capture",
    Capture_partial: "Partial Capture",
    Refund_partial: "Partial Refund ",
    Refund_multiple: "Multiple Refund",
    Charge_multiple: "Multiple Charge",
    Charge_partial: "Partial Charge"
}

var pmTypeDisplayValues = {
    ccards: "Cards",
    ewallet: "eWallet",
    loyalty: "Loyalty",
    cash: "Cash",
    banktransfer: "Bank Transfer"
}


$(function () {
    console.log("doc ready")
    launchMe()

});


function launchMe(){
 
    document.getElementsByTagName("BODY")[0].setAttribute("id", "filterpage");
    rePositionFilterPane();
    $("#toggle-filter-pane").click(function () {
        $("#filterpane").toggle();
        if ($(this).text() == "Show Additional Filters") {
            $(this).text("Hide Additional Filters");
            $(this).html('<i class="fas fa-eye-slash"></i>Hide Additional Filters');
        } else {
            $(this).text("Show Additional Filters");
            $(this).html('<i class="fas fa-eye"></i>Show Additional Filters');
        };
    });


    $(window).resize(function () {
        rePositionFilterPane();

    });
    $.when(
        $.getJSON('/searchbuilder/allproviders.json'),
        $.getJSON('/searchbuilder/cardonlyproviders.json'),
        $.getJSON('/searchbuilder/ewalletonlyproviders.json'),
        $.getJSON('/searchbuilder/cashonlyproviders.json'),
        $.getJSON('/searchbuilder/loyaltytonlyproviders.json'),
        $.getJSON('/searchbuilder/banktransferonlyproviders.json'),

    ).done((allProviders, cardOnly, eWalletOnly, cashOnly, loyaltyOnly, bankTransferOnly) => {

        allProviderLists.allProviders = allProviders[0];
        allProviderLists.cardProviders = cardOnly[0];
        allProviderLists.ewalletProviders = eWalletOnly[0];
        allProviderLists.cashProviders = cashOnly[0];
        allProviderLists.loyaltyProviders = loyaltyOnly[0];
        allProviderLists.banktransferProviders = bankTransferOnly[0];

        $('#filterpane').on('change', 'input:checkbox', function (value) {

            $('.multpart input[type=checkbox]').change(function () {


                if (!$(this).prop("checked")) {
                    supportedProviders.delete(this.id)
                    storeDisplayValues("requests", this.id, false)

                }


            });


            if (!$(this).is(':checked')) {

                Object.keys(filterData).forEach((filterelement) => {

                    if (filterData[filterelement] != null) {

                        if (typeof filterData[filterelement][filterDataOptions.selectedPmType][this.id] != "undefined") {

                            supportedProviders.delete(this.id)
                            storeDisplayValues(filterelement, this.id, false)

                        }
                    }

                });


            } else if ($(this).is(':checked')) {


                Object.keys(filterData).forEach((filterelement) => {

                    if (filterData[filterelement] != null) {
                        if (filterelement == "requests") {

                            if ((this.id.indexOf("multiple") != -1) || (this.id.indexOf("partial") != -1)) {
                                var mainRequestype = this.id.substring(0, this.id.indexOf("_"))
                                var childRequestType = this.id.substring(this.id.indexOf("_") + 1)
                                supportedProviders.set(this.id, filterData[filterelement][filterDataOptions.selectedPmType][mainRequestype][childRequestType])
                                storeDisplayValues("requests", this.id, true)
                            }

                            else if (typeof filterData[filterelement][filterDataOptions.selectedPmType][this.id] != "undefined") {


                                supportedProviders.set(this.id, filterData[filterelement][filterDataOptions.selectedPmType][this.id].all)

                                storeDisplayValues("requests", this.id, true)
                            }

                        }

                        else if (typeof filterData[filterelement][filterDataOptions.selectedPmType][this.id] != "undefined") {


                            supportedProviders.set(this.id, filterData[filterelement][filterDataOptions.selectedPmType][this.id])
                            storeDisplayValues(filterelement, this.id, true)


                        }

                    }



                });


            }
            showResult();
        });


    })

    console.log($('#pmtypeselectoptions').length)

    $("#pmtypeselectoptions").on("selectmenuchange", function (event, ui) {

        if (typeof $('#accordion').data("ui-accordion") == "undefined") {
            $.when(
                $.getScript("/jquery-ui.js", function () {
                    var icons = {
                        header: "ui-icon-triangle-1-s",
                        activeHeader: "ui-icon-triangle-1-s"
                    
                      };
                    $("#accordion").accordion({
                        header: "h6",
                        heightStyle: "content",
                        icons: icons,
                        collapsible: true, active: false, disabled: true,
                        classes: {
                            "ui-accordion-header-icon": "custom-header-icon"
                        }
                    });

                })
            ).done(() => {
                $("#accordion").accordion("option", "disabled", false);
                $("#accordion").accordion("option", "active", 0);
            });

        }

        else {
            $("#accordion").accordion("option", "disabled", false);
            $("#accordion").accordion("option", "active", 0);
        }


        $(":text").prop("disabled", false);
        $("#textfiltersearch")
        filterDataOptions.selectedPmType = $(this).children(":selected").attr("id")
        resetSelectionOnTypeSelect($(this).children(":selected").attr("id"))
        if (filterDataOptions.selectedPmType != "default") {
            $('#filter-display-chips').show()
            switch (deviceType.device) {
                case "mobile":
                    $("#toggle-filter-pane").show()
                    break;
                case "nonmobile":
                    $("#filterpane").fadeIn(500)
                    break;
                default:
                    break;
            }

            displaySelectedPmType(filterDataOptions.selectedPmType)
            populateFilters(filterDataOptions.selectedPmType, $(this).val()).then(function (value) {
                if (value == "filtersloaded");
                $("#filteroptions").children().fadeIn(500);
            });

        } else {
            showProvidersByPmType(filterDataOptions.selectedPmType)
            displaySelectedPmType(filterDataOptions.selectedPmType);
            $('#addtnl-filter-text-requesttype').empty()
            $('#filter-display-chips').hide()
            $("#toggle-filter-pane").hide()
            switch (deviceType.device) {
                case "mobile":
                    $("#filterpane").hide()
                    $('#toggle-filter-pane').text("Show Additional Filters");
                    $('#toggle-filter-pane').html('<i class="fas fa-eye"></i>Show Additional Filters');
                    break;
                case "nonmobile":
                    $("#filterpane").fadeOut(500)
                    break;
                default:
                    break;
            }
            $(":text").prop("disabled", true).val("");
            $("#textfiltersearch").css("opacity", ".35");
            $("#filteroptions").children().fadeIn(500);
            $(".pm-type-display").remove()
            $("#accordion").accordion("option", "collapsible", true);
            $("#accordion").accordion("option", "active", false);
            $("#accordion").accordion("option", "disabled", true);
            $(".ui-accordion-content").hide();


        }

    });



    $("#resetfilters").attr("disabled", true)
    $("#results-btn-mobile").attr("disabled", true)
}

function populateFilters(pmType, pmName) {

    return new Promise((resolve, reject) => {

        showProvidersByPmType(pmType);

        filterDomElements.forEach(element => {

            $.getJSON(element.dataFile, function (data) {

                if (typeof data != "undefined") {
                    $(element.optionsDivId).empty();

                    if (pmType == "ccards") {
                        $("#featureslistfilter h4").show();
                    } else $("#featureslistfilter h4").hide();

                    if (!isEmpty(data[pmType])) {

                        // Store the keys; these are the checkboxes
                        filterDataOptions[element.storeInFilterData] = Object.keys(data[pmType]).sort()
                        // Store the json data
                        if (filterData[element.storeInFilterData] == null) {

                            filterData[element.storeInFilterData] = data;

                        }

                        var options = $(element.optionsDivId);
                        $.each(filterDataOptions[element.storeInFilterData], function (feature, name) {



                            if (element.optionsDivId != "#requestlistfilteroptions") {
                                var checkBox = '<label for="' + name + '"><input type="checkbox" id= "' + name + '" name="' + name + '" value="' + pmType + name + '" ' + '>' + ' ' + name + '</label>';
                                options.append(checkBox)
                            } else if (element.optionsDivId == "#requestlistfilteroptions") {

                                if (name != "Token" && filterData.requests[filterDataOptions.selectedPmType][name].all.length >= 1) {
                                    var checkBox = '<label for="' + name + '"><input type="checkbox" id= "' + name + '" name="parent-' + name + '" value="' + pmType + name + '" ' + '>' + ' ' + name + '</label>';
                                    options.append(checkBox)

                                    if (filterData.requests[filterDataOptions.selectedPmType][name].multiple.length >= 1) {

                                        var multipleCheckbox = '<div class="multpart"><label for= ' + name + "_multiple" + '"><input type="checkbox"  id= "' + name + "_multiple" + '" name="Multiple" value="multiple">' + ' ' + "Multiple" + ' ' + [name] + '</label>'

                                        options.append(multipleCheckbox)
                                    }

                                    if (filterData.requests[filterDataOptions.selectedPmType][name].partial.length >= 1) {

                                        var partialCheckbox = '<div class="multpart"><label for= ' + name + "_partial" + '"><input type="checkbox"  id= "' + name + "_partial" + '" name="Partial" value="partial">' + ' ' + "Partial" + ' ' + [name] + '</label>'

                                        options.append(partialCheckbox)
                                    }
                                }


                            }

                        }

                        )
                    };
                }

            });

        });

        resolve("filtersloaded")
    });
}

function showProvidersByPmType(pmType) {

    if (filterDataOptions.selectedPmType == "default") {

        $("#providerlist li").each(function (index) {
            var providerId = $(this).attr('id');
            $("#" + providerId).fadeIn(500)
        });

    }

    else if (filterDataOptions.selectedPmType != 'default') {

        $("#providerlist li").each(function (index) {
            var providerId = $(this).attr('id');
            $("#" + providerId).show()
        });

        switch (pmType) {
            case "ccards":

                var nonCardProvidersOnly = _.difference(allProviderLists.allProviders.providers, allProviderLists.cardProviders.providers)

                for (var cardprovider of nonCardProvidersOnly) {

                    $("#" + cardprovider).hide()
                }

                break;

            case "ewallet":

                var nonEwalletProvidersOnly = _.difference(allProviderLists.allProviders.providers, allProviderLists.ewalletProviders.providers)
                for (var ewalletProvider of nonEwalletProvidersOnly) {
                    $("#" + ewalletProvider).hide()
                }


                break;

            case "banktransfer":

                var nonBankTransferProvidersOnly = _.difference(allProviderLists.allProviders.providers, allProviderLists.banktransferProviders.providers)
                for (var bankTransferProvider of nonBankTransferProvidersOnly) {
                    $("#" + bankTransferProvider).hide()
                }

                break;

            case "loyalty":

                var nonLoyaltyProvidersOnly = _.difference(allProviderLists.allProviders.providers, allProviderLists.loyaltyProviders.providers)
                for (var loyaltyProvider of nonLoyaltyProvidersOnly) {
                    $("#" + loyaltyProvider).hide()
                }

                break;

            case "cash":

                var nonCashProvidersOnly = _.difference(allProviderLists.allProviders.providers, allProviderLists.cashProviders.providers)
                for (var cashProvider of nonCashProvidersOnly) {
                    $("#" + cashProvider).hide()
                }

                break;
            default:
                break;
        }

    }

};


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function validateRequestChecked(domId, pmType) {

    if ($('#' + domId).prop('checked')) {

        $("#" + pmType + domId + "_multiple").prop("disabled", false);
        $("#" + pmType + domId + "_partial").prop("disabled", false);

    } else if (!$('#' + domId).prop('checked')) {
        $("#" + pmType + domId + "_multiple").prop("disabled", true).prop('checked', false);
        $("#" + pmType + domId + "_partial").prop("disabled", true).prop('checked', false);

        // Remove multiple/partial from the map if the parent is unchecked
        supportedProviders.delete(pmType + domId + "_multiple")
        supportedProviders.delete(pmType + domId + "_partial")
        storeDisplayValues("requests", pmType + domId + "_multiple", false)
        storeDisplayValues("requests", pmType + domId + "_partial", false)

    }

}

function showResult() {

    resultArrays.length = 0;

    if (supportedProviders.size == 0) {
        showProvidersByPmType(filterDataOptions.selectedPmType)
        showDisplayValues()

    } else {

        for (let [key, value] of supportedProviders) {
            resultArrays.push(value)

        }

        var results = _.intersectionBy(...Object.values(resultArrays));


        $('#providerlist').children().each(function () {
            if (results.length != 0) {

                if (_.includes(results, this.id)) {
                    $('#' + this.id).fadeIn(500)
                } else if (!_.includes(results, this.id)) $('#' + this.id).hide()
            } else {
                $('#providerlist').children().each(function () {
                    $('#' + this.id).hide()
                });
            }

        });
        showDisplayValues(results.length);
    }



}

function storeDisplayValues(category, value, addRemove) {
    switch (category) {
        case "features":
            if (addRemove) {
                featuresToDisplay.set(value, value)
            }
            else {
                featuresToDisplay.delete(value, value)
            }
            break;
        case "paymentMethods":
            if (addRemove) {
                paymentMethodsToDisplay.set(value, value)
            }
            else {
                paymentMethodsToDisplay.delete(value, value)
            }
            break;
        case "requests":
            if (addRemove) {
                requestsToDisplay.set(value, value)
            }
            else {
                requestsToDisplay.delete(value, value)
            }
            break;
        default:
            break;
    }
}

function showDisplayValues(length) {
    $("#resetfilters").attr("disabled", false);
    $("#results-btn-mobile").attr("disabled", false)
    $("#nomatch").remove()

    if (length == 0) {
        $("#container-inpagetoc").append("<p id='nomatch'>There are no results matching your filter criteria.</p>")
    }
    else if (featuresToDisplay.size >= 1 || paymentMethodsToDisplay.size >= 1 || requestsToDisplay.size >= 1) {
        $("#nomatch").remove()
        $("#appliedfiltersintro").html("Applied the following additional filter criteria: " + '<br>')

    }

    else {
        $("#appliedfiltersintro").empty()
        $("#nomatch").remove()
        $("#resetfilters").attr("disabled", true)
        $("#results-btn-mobile").attr("disabled", true)
    }

    displaySelectedPaymentMethods()
    displaySelectedRequests()
    displaySelectedFeatures();

}

function displaySelectedPmType(pmType) {
    if (filterDataOptions.selectedPmType != 'default') {
        $(".pm-type-display").remove()

        $("#filter-display-chips").append('<span class="pm-type-display">' + pmTypeDisplayValues[pmType] + '</span>');

    }

    else {
        $(".pm-type-display").remove()
    }

}

function displaySelectedPaymentMethods() {

    displayCountSelectedItems("paymentmethods", paymentMethodsToDisplay.size)

    if (paymentMethodsToDisplay.size >= 1) {
        $('.payment-methods-chip').remove()
        for (let [key, value] of paymentMethodsToDisplay) {

            $("#filter-display-chips").append('<span class="payment-methods-chip">' + value + '</span>').fadeIn(200);

        }
    }
    else {
        $(".payment-methods-chip").remove()
    }
}

function displaySelectedRequests() {

    displayCountSelectedItems("requests", requestsToDisplay.size)


    if (requestsToDisplay.size >= 1) {
        $('.requests-chip').remove()

        for (let [key, value] of requestsToDisplay) {

            value = multPartDisplayValues[value]
            $("#filter-display-chips").append('<span class="requests-chip">' + value + '</span>');
        }

    }

    else {
        $(".requests-chip").remove()
    }
}

function displaySelectedFeatures() {

    displayCountSelectedItems("features", featuresToDisplay.size)


    if (featuresToDisplay.size >= 1) {
        $('.features-chip').remove()
        for (let [key, value] of featuresToDisplay) {

            $("#filter-display-chips").append('<span class="features-chip">' + value + '</span>');

        }

    }
    else {
        $('.features-chip').remove()
    }

}

function displayCountSelectedItems(dropDownCateg, numSelected) {

    switch (dropDownCateg) {
        case "paymentmethods":
            if (numSelected === 0) $(".cclPaymentMethods").empty().append('')
            else {
                $(".cclPaymentMethods").empty().append(numSelected);
            }
            break;

        case "requests":
            if (numSelected === 0) $(".cclRequests").empty().append('')
            else {
                $(".cclRequests").empty().append(numSelected);
            }
            break;
        case "features":
            if (numSelected === 0) $(".cclFeatures").empty().append('')
            else {
                $(".cclFeatures").empty().append(numSelected);
            }
            break;

        default:
            break;
    }




}

function resetCountSelected() {
    $(".cclPaymentMethods").empty().append('')
    $(".cclRequests").empty().append('')
    $(".cclFeatures").empty().append('')
}

function resetSelectionOnTypeSelect(pmType) {
    resetCountSelected()
    supportedProviders.clear()
    featuresToDisplay.clear()
    requestsToDisplay.clear()
    paymentMethodsToDisplay.clear()
    $('#addtnl-filter-text-requesttype').empty().text(pmTypeDisplayValues[filterDataOptions.selectedPmType])
    $("#nomatch").remove()
    $("#selectedpms").empty()
    $('.features-chip').remove()
    $(".payment-methods-chip").remove()
    $(".requests-chip").remove()
    $("#selectedrequests").empty()
    $("#appliedfiltersintro").empty()
    $("#resetfilters").attr("disabled", true)
    $("#results-btn-mobile").attr("disabled", true)
    if (pmType == "ccards" || pmType == "default") {
        $('#featureslistfilter').show()
    }
    else $('#featureslistfilter').hide()

}

function resetFilters() {
    resetCountSelected()
    resetSelectionOnTypeSelect(filterDataOptions.selectedPmType);
    showProvidersByPmType(filterDataOptions.selectedPmType)
    $("#resetfilters").attr("disabled", true)

    $("input:checked").each(function () {
        $(this).prop('checked', false);

    });

}

function searchFilterOptions() {
    var input, filter, labelElem, countries, paymentMethods, a, i;
    input = document.getElementById('textfiltersearch');
    filter = input.value.toLowerCase();
    labelElem = $("#paymentmethodslistfilteroptions label, #requestlistfilteroptions label, #featureslistfilteroptions label")

    for (i = 0; i < labelElem.length; i++) {

        if (labelElem[i].textContent.toLowerCase().indexOf(filter.toLowerCase()) != -1) {

            $(".ui-accordion-content").show();

            labelElem[i].style.display = "";


        } else {
            $("#accordion").accordion('option', 'active', 0);
            labelElem[i].style.display = "none";


        }
    }

    checkSearchResults()


}


function checkSearchResults() {

    $("#nopmresults").remove()
    $("#nofeatureresults").remove()
    $("#norequestresults").remove()

    if($('#paymentmethodslistfilteroptions').not('#nopmresults').children(':visible').length == 0) {
       
        $( "#paymentmethodslistfilteroptions").append( "<p id='nopmresults' class='search-result-msg'>"+noResultsMsg+"</p>" );
     }

    
     if($('#featureslistfilteroptions').not('#nofeatureresults').children(':visible').length == 0) {

        $( "#featureslistfilteroptions").append( "<p id='nofeatureresults' class='search-result-msg'>"+noResultsMsg+"</p>" );
       
     }

     if(($('#requestlistfilteroptions').children(':visible').not('.multpart').length == 0) && ($('#requestlistfilteroptions .multpart').children(':visible').length == 0))  {
        $( "#requestlistfilteroptions").append( "<p id='norequestresults' class='search-result-msg'>"+noResultsMsg+"</p>" );
       
     }


}

function scrollToResults() {

    var providerList = document.getElementById("container-inpagetoc")
    providerList.scrollIntoView({ behavior: "smooth" });
}

function rePositionFilterPane() {

    if (window.innerWidth <= 768) {
        deviceType.device = "mobile"
        $("#filterpane").insertAfter($("#container-inpagetoc"));
        $("#filterpane").hide()
        $("#results-btn-mobile").show()
        $('#apply-filter-title').hide()
    }

    else {
        deviceType.device = "nonmobile"
        $("#filterpane").appendTo(".td-toc");
        if ($("#pmtypeselectoptions").val() != "default") {
            $("#filterpane").show()
        }
        else $("#filterpane").hide()
        $("#toggle-filter-pane").hide()
        $("#results-btn-mobile").hide()
        $('#apply-filter-title').show()
    }
}

