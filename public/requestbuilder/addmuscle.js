var options = process.argv.slice(2);

const cheerio = require('cheerio')
var fs = require('fs');
const striptags = require('striptags');
const removeEmptyLines = require("remove-blank-lines");
const del = require('del');
const _ = require('lodash');
const util = require('util');
const sortKeys = require('sort-keys');


var bbRequestTypes = require('./anabolicsteroids/requesttypes.js') // Payment, Authorize, Charge etc.

// var bbProviders = require('./anabolicsteroids/providers.js') Provider lists (id, display name) and the transaction types (cards, bank transfer etc. )each provider supports.

const inputFiles = ["requestbuilder/querybuilder.html", "requestbuilder/configlookups/bodybuilderdefs.js"]

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

async function getStuff(fileName) {
    return await readFile(fileName);
}

const providersRawdata = fs.readFileSync('./anabolicsteroids/_providers.json');
// for running from script, change to ./anabolicsteroids/_providers.json'
// for running from VS Code, change to requestbuilder//anabolicsteroids/_providers.json' 
var bbProviders = JSON.parse(providersRawdata);
bbProviders = sortKeys(bbProviders)

const apmsRawdata = fs.readFileSync('./anabolicsteroids/_apms.json');
// for running from script, change to ./anabolicsteroids/_apms.json'
// for running from VS Code, change to requestbuilder//anabolicsteroids/_apms.json' 
var bbApms = JSON.parse(apmsRawdata);
bbApms = sortKeys(bbApms)

// for running from script, remove /requestbuilder'
const filesToModify = [
    'querybuilder.html',
    'htmlpartials/banktransfer/bankTransfers.html',
    'htmlpartials/dredirect/dRedirect.html',
    'htmlpartials/cash/cash.html',
    'htmlpartials/ewallet/eWallet.html',
    'htmlpartials/loyalty/loyalty.html',
    'htmlpartials/paymentpage/paymentpage.html',
]

filesToModify.forEach(function (file) {

    // console.log(file)
    getStuff(file).then(data => {
        createDOMElements(data, file)
    })

});



function createDOMElements(contents, fileToUpdate) {

    const $ = cheerio.load(contents, { decodeEntities: false })

    switch (options[0]) {

        case "requests":

            generateRequestTypes();

            break;

        case "providers":

            generateProviders();

            break;



        default:
            generateRequestTypes();
            generateProviders();
            generateAPMs();

    }


    function generateProviders() {

        // Empty provider lists
        $('#cardproviders').empty()
        $('#dredirectproviders').empty()
        $('#cashproviders').empty()
        $('#banktransferproviders').empty()
        $('#ewalletproviders').empty()
        $('#loyaltyproviders').empty()
        $('#paymentpageproviders').empty()

        // Create provider selection checkboxes/bullets
        Object.entries(bbProviders).forEach(([id, providerInfo]) => {

            if (_.includes(providerInfo.transactionTypes, "ccards")) {

                var inputElementCheckbox = generateCheckBoxes(id + "cc", id, providerInfo)
                $('#cardproviders').append(inputElementCheckbox)
            }
            if (_.includes(providerInfo.transactionTypes, "dredirect")) {

                var inputElementRadio = generateRadioButtons(id + "dr", id, providerInfo)
                $('#dredirectproviders').append(inputElementRadio)
            }

            if (_.includes(providerInfo.transactionTypes, "cash")) {
                var inputElementRadio = generateRadioButtons(id + "cash", id, providerInfo)
                $('#cashproviders').append(inputElementRadio)
            }
            if (_.includes(providerInfo.transactionTypes, "banktransfer")) {
                var inputElementRadio = generateRadioButtons(id + "bt", id, providerInfo)
                $('#banktransferproviders').append(inputElementRadio)
            }

            if (_.includes(providerInfo.transactionTypes, "ewallet")) {
                var inputElementRadio = generateRadioButtons(id + "ew", id, providerInfo)
                $('#ewalletproviders').append(inputElementRadio)
            }

            if (_.includes(providerInfo.transactionTypes, "loyalty")) {
                var inputElementRadio = generateRadioButtons(id + "loy", id, providerInfo)
                $('#loyaltyproviders').append(inputElementRadio)
            }

            if (_.includes(providerInfo.transactionTypes, "paymentpage")) {
                var inputElementRadio = generateRadioButtons(id + "pp", id, providerInfo)
                $('#paymentpageproviders').append(inputElementRadio)
            }


        });

        console.log("Generated providers for BB")
    }


    function generateRequestTypes(contents) {

        // Empty request types
        $('#cardsrequestypebullets').empty()
        $('#dredirectrequestypebullets').empty()
        $('#cashrequestypebullets').empty()
        $('#btrequestypebullets').empty()
        $('#ewalletrequestypebullets').empty()
        $('#loyaltyrequestypebullets').empty()
        $('#paymentpagerequestypebullets').empty()

        // Create card request types (Payment, Authorize, Charge etc.)
        Object.entries(bbRequestTypes().ccards).forEach(([id, requestType]) => {
            if (requestType == "Payment") {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" checked="checked"' + '>' + ' ' + requestType + '</label>';
                $('#cardsrequestypebullets').append(inputElement)
            }

            else {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" ' + '>' + ' ' + requestType + '</label>';

                $('#cardsrequestypebullets').append(inputElement)
            }

        });

        console.log("Generated Card Requests for BB")

        // Create debit redirect request types (Payment, Authorize, Charge etc.)
        Object.entries(bbRequestTypes().dredirect).forEach(([id, requestType]) => {
            if (requestType == "Payment") {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" checked="checked"' + '>' + ' ' + requestType + '</label>';
                $('#dredirectrequestypebullets').append(inputElement)
            }

            else {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" ' + '>' + ' ' + requestType + '</label>';

                $('#dredirectrequestypebullets').append(inputElement)
            }

        });

        console.log("Generated Debit Requests Requests for BB")

        // Create cash request types (Payment, Authorize, Charge etc.)
        Object.entries(bbRequestTypes().cash).forEach(([id, requestType]) => {
            if (requestType == "Payment") {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" checked="checked"' + '>' + ' ' + requestType + '</label>';
                $('#cashrequestypebullets').append(inputElement)
            }

            else {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" ' + '>' + ' ' + requestType + '</label>';

                $('#cashrequestypebullets').append(inputElement)
            }

        });

        // Create ewallet request types (Payment, Authorize, Charge etc.)
        Object.entries(bbRequestTypes().ewallet).forEach(([id, requestType]) => {
            if (requestType == "Payment") {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" checked="checked"' + '>' + ' ' + requestType + '</label>';
                $('#ewalletrequestypebullets').append(inputElement)
            }

            else {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" ' + '>' + ' ' + requestType + '</label>';

                $('#ewalletrequestypebullets').append(inputElement)
            }

        });

        console.log("Generated eWallet Requests Requests for BB")

        // Create bank transfer request types (Payment, Authorize, Charge etc.)
        Object.entries(bbRequestTypes().banktransfer).forEach(([id, requestType]) => {
            if (requestType == "Payment") {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" checked="checked"' + '>' + ' ' + requestType + '</label>';
                $('#btrequestypebullets').append(inputElement)
            }

            else {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" ' + '>' + ' ' + requestType + '</label>';

                $('#btrequestypebullets').append(inputElement)
            }

        });

        console.log("Generated Bank Transfer Requests Requests for BB")

        // Create loyalty request types (Payment, Authorize, Charge etc.)
        Object.entries(bbRequestTypes().loyalty).forEach(([id, requestType]) => {
            if (requestType == "Payment") {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" checked="checked"' + '>' + ' ' + requestType + '</label>';
                $('#loyaltyrequestypebullets').append(inputElement)
            }

            else {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" ' + '>' + ' ' + requestType + '</label>';

                $('#loyaltyrequestypebullets').append(inputElement)
            }

        });

        console.log("Generated Loyalty Requests Requests for BB")


         // Create paymentpage request types (Payment, Authorize)
         Object.entries(bbRequestTypes().paymentpage).forEach(([id, requestType]) => {
            if (requestType == "Payment") {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" checked="checked"' + '>' + ' ' + requestType + '</label>';
                $('#paymentpagerequestypebullets').append(inputElement)
            }

            else {
                var inputElement = '<label for="' + id + '"><input type="radio" name="requesttype"  value="' + requestType + '" id="' + id + '" ' + '>' + ' ' + requestType + '</label>';

                $('#paymentpagerequestypebullets').append(inputElement)
            }

        });

        console.log("Generated PaymentPage Requests Requests for BB")



    }

    function generateAPMs() {

        var appendToDiv;
        var radioButtonName;


        // Create provider selection checkboxes/bullets
       
        for (var requestType of Object.keys(bbRequestTypes())) {
           
            // Empty provider lists
            switch (requestType) {
                case "banktransfer":
                    $('.banktransferpaymentmethods').empty()
                    appendToDiv = ".banktransferpaymentmethods"
                    radioButtonName = "banktrpaymentmethod"
                    break;
                case "ewallet":
                    $('.ewalletpaymentmethods').empty()
                    appendToDiv = ".ewalletpaymentmethods"
                    radioButtonName = "ewalletpaymentmethod"
                    break;
                case "loyalty":
                    $('.loyaltypaymentmethods').empty()
                    appendToDiv = ".loyaltypaymentmethods"
                    radioButtonName = "loyaltypaymentmethod"
                    break;  
                case "cash":
                    $('.cashpaymentmethods').empty()
                    appendToDiv = ".cashpaymentmethods"
                    radioButtonName = "cashpaymentmethods"
                    break; 
                case "dredirect":
                    $('.dredirectpaymentmethods').empty()
                    appendToDiv = ".dredirectpaymentmethods"
                    radioButtonName = "dredirectpaymentmethods"
                    break;
                case "paymentpage":
                    $('.paymentpagepaymentmethods').empty()
                    appendToDiv = ".paymentpagepaymentmethods"
                    radioButtonName = "paymentpagepaymentmethods"
                    break;                                                           
                default:
                    break;
            }


            if (_.includes(Object.keys(bbApms), requestType)) {

                var paymentMethodSelectMessage = '<p class="selectpaymentmethods"><b>Select payment method</b></p>'

                $(appendToDiv).append(paymentMethodSelectMessage)

                if (typeof bbApms[requestType] != "undefined") {


                    // store the keys in an array

                    var bbApmDomElements = Object.keys(bbApms[requestType])

                    for (var domElement of bbApmDomElements) {

                        // Create a div for the domElement and append to .banktransferpaymentmethods
                        var providerApmDiv = '<div id= "' + domElement + '" class=" ' + "providercolumns" + '" style="display:none">';

                        $(appendToDiv).append(providerApmDiv)

                        Object.entries(bbApms[requestType][domElement]).forEach(function ([id, displayName]) {

                            var inputElementRadio = generateApmsRadioButtons(id, id, displayName, radioButtonName)
                            $('#' + domElement).append(inputElementRadio)
                        });

                    }

                }

            }

        }

    }

    function generateCheckBoxes(providerId, value, providerInfo) {

        return '<label for="' + providerId + '"><input type="checkbox" id= "' + providerId + '" class=" ' + providerInfo.displayName + '" name="' + providerId + '" value="' + value + '" ' + '>' + ' ' + providerInfo.displayName + '</label>' + '<br>';

    }

    function generateRadioButtons(providerId, value, providerInfo) {


        var providerInfo = providerInfo.displayName


        return '<label for="' + providerId + '"><input type="radio" id= "' + providerId + '" class=" ' + providerInfo + '" name="provider" value="' + value + '" ' + '>' + ' ' + providerInfo + '</label>' + '<br>';

    }

    function generateApmsRadioButtons(providerId, value, providerInfo, name) {


        return '<label for="' + providerId + '"><input type="radio" id= "' + providerId + '" class=" ' + providerInfo + '" name=" ' + name + '" + value="' + value + '" ' + '>' + ' ' + providerInfo + '</label>' + '<br>';

    }



    createBBFile($.html(), fileToUpdate)


}

function createBBFile(bbHTML, fileName) {


    fs.writeFile(fileName, bbHTML, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('Saved file: ' + fileName);
    });
}
