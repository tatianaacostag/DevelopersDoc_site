function buildFieldsTable(includeOptionals, requestType) {

    var columnHeading;
    var l1space = "&nbsp;" + "&nbsp;"
    var l2psace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;"
    var l3psace = "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;"
    var fieldsArray = [];
    var fieldStatusArray = [];
    var fielddescriptions = [];
    var paragraph = "<p>"
    var fieldsTypeArray = [];

    if (includeOptionals) {
        fieldsArray = bodyBuilder.requiredFields.concat(bodyBuilder.optionalFields).concat(bodyBuilder.condRequiredFields).sort()

    } else if (!includeOptionals) {

        fieldsArray = bodyBuilder.requiredFields.concat(bodyBuilder.condRequiredFields).sort()

    }

    orderFieldsinTable(fieldsArray)

    var requiredsDiv = $('<div></div>');
    $(requiredsDiv).addClass("fieldTables table-striped table-bordered");

    var optionalsDiv = $('<div></div>');
    $(optionalsDiv).addClass("fieldTables table-striped table-bordered");

    for (var field of fieldsArray) {

      fieldsTypeArray.push(bodyBuilder.datadict[field].type)

        var hasParent = field.includes("__");
        var hasParentL2 = field.includes("___");
        var hasParentL3 = field.includes("____");
        var hasParentL4 = field.includes("_____");


        if (field.indexOf("__") == -1) {
            bodyBuilder.fieldStagingTable.push("" + field)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        } else if (hasParent & (field.indexOf("___") == -1)) {


            var parentField = field.substr(0, field.indexOf('__'));
            var childFieldLevel1;

            childFieldLevel1 = "⇒ " + field.split('__')[1]

            bodyBuilder.fieldStagingTable.push("" + childFieldLevel1)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))


        } else if (hasParentL2 & (field.indexOf("____") == -1)) {
            var childFieldLevel2 = "⇒⇒ " + field.split('___')[1];

            bodyBuilder.fieldStagingTable.push("" + childFieldLevel2)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        } else if (hasParentL3  & field.indexOf("_____") == -1) {

            var childFieldLevel3 = "⇒⇒⇒ " + field.split('____')[1];
            bodyBuilder.fieldStagingTable.push("" + childFieldLevel3)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        }

        else if (hasParentL4) {

            var childFieldLevel4 = "⇒⇒⇒⇒ " + field.split('_____')[1];
            bodyBuilder.fieldStagingTable.push("" + childFieldLevel4)

            //check if optional or required
            fieldStatusArray.push(addStatus(field))

        }


    }

    createTableArray(bodyBuilder.fieldStagingTable.length)
    for (var i in bodyBuilder.fieldStagingTable) {

        // Cell one
        bodyBuilder.fieldTable[i][0] = bodyBuilder.fieldStagingTable[i]+paragraph+fieldsTypeArray[i];


        // Cell two. Lookup if field has documentation.
        // Check per provider
        for (var property of bodyBuilder.providers) {
            
            // For PayU Latam countries, check if there are descriptions common to all.
            if (property == "payuargentina" || property == "payuchile" || property == "payumexico" || property == "payubrazil" || property == "payucolombia" || property == "payuperu" || property == "payupanama") {

                if (typeof fielddescr.payulatam !== 'undefined' && typeof fielddescr.payulatam[fieldsArray[i]] !== 'undefined') {

                    if (typeof fielddescr.payulatam[fieldsArray[i]] == 'object') {
      
                        if (typeof fielddescr.payulatam[fieldsArray[i]][bodyBuilder.transactionType] !== 'undefined'){
                          fielddescriptions.push(fielddescr.payulatam[fieldsArray[i]][bodyBuilder.transactionType]+paragraph)
                      }
                    }
      
                    else {
      
                      fielddescriptions.push(fielddescr.payulatam[fieldsArray[i]]+paragraph) }
      
      
                  }      
                    
            }

            if (typeof fielddescr[property] !== 'undefined' && typeof fielddescr[property][fieldsArray[i]] !== 'undefined') {

              // Check if there are descriptions per transaction type 
              if (typeof fielddescr[property][fieldsArray[i]] == 'object') {

                  if ((typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] !== 'undefined') && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] !== 'object')) {
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType]+paragraph) 
                }

                // For bank transfers, check if there are descriptions per bank transfer payment method
                else if ((bodyBuilder.transactionType == "banktransfer") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.bankTransferPaymentMethod]+paragraph)

                }

                else if ((bodyBuilder.transactionType == "loyalty") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.loyaltyPaymentMethod]+paragraph)

                }
                else if ((bodyBuilder.transactionType == "ewallet") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.eWalletPaymentMethod]+paragraph)

                }

                else if ((bodyBuilder.transactionType == "cash") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.cashPaymentMethod]+paragraph)

                }

                else if ((bodyBuilder.transactionType == "paymentpage") && (typeof fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType] == 'object')) {
                        
                    fielddescriptions.push(fielddescr[property][fieldsArray[i]][bodyBuilder.transactionType][bodyBuilder.cashPaymentMethod]+paragraph)

                }
              }

              else {
                fielddescriptions.push(fielddescr[property][fieldsArray[i]]+paragraph) }
            }

        }

        if (fielddescriptions.length == 0){

            if (requestType == "Payment") {
                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-payment" target="_blank">See the API Reference</a>'+paragraph)

            }

            if (requestType == "Authorize") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-an-authorization" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Capture") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-capture" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Charge") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-charge" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Credit") {

                fielddescriptions.push('<a href=https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-credit" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Void") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-void" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Refund") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-refund" target="_blank">See the API Reference</a>')
            }

            if (requestType == "Token") {

                fielddescriptions.push('<a href="https://developers.paymentsos.com/docs/apis/payments/1.3.0/#operation/create-a-token" target="_blank">See the API Reference</a>')
            }


        }


        // Add the provider-specific documentation
        var uniqueArray = fielddescriptions.filter(function(elem, pos,arr) {
          return arr.indexOf(elem) == pos;
        });

        bodyBuilder.fieldTable[i][1] = uniqueArray;

        // Add the status (Required/Optional)
        if (includeOptionals || bodyBuilder.condRequiredFields.length >=1) {

            bodyBuilder.fieldTable[i][2] = fieldStatusArray[i];
        }
        fielddescriptions = [];
        uniqueArray = [];

    }

    // Add the header fields to the array
    if (includeOptionals || bodyBuilder.condRequiredFields.length >= 1) {
        bodyBuilder.fieldTable.splice(0, 0, ["Field", "Description", "Required/Optional"])
    } else {
        bodyBuilder.fieldTable.splice(0, 0, ["Field", "Description"])
    }
    if (bodyBuilder.requiredFields.length > 0 || bodyBuilder.optionalFields.length > 0) {
        // Build the HTML table
        //Create an HTML Table element.
        var table = $("<table />");
        table[0].border = "0";

        //Get the count of columns.
        var columnCount = bodyBuilder.fieldTable[0].length;

        //Add the header row.
        var row = $(table[0].insertRow(-1));
        for (var i = 0; i < columnCount; i++) {
            var headerCell = $("<th />");
            headerCell.html(bodyBuilder.fieldTable[0][i]);
            row.append(headerCell);
        }


        //Add the data rows.
        for (var i = 1; i < bodyBuilder.fieldTable.length; i++) {
            row = $(table[0].insertRow(-1));
            for (var j = 0; j < columnCount; j++) {
                var cell = $("<td />");
                cell.html(bodyBuilder.fieldTable[i][j]);
                row.append(cell);
            }
        }

        $(".fieldTables").empty();
        // Dislay the table
        // var ref = document.getElementById("ciResponseText")
        var ref = $(headerFieldsDiv)
        $(requiredsDiv).insertAfter(ref);
        $(requiredsDiv).append("<h3 class='fields-overview-header'>Fields Overview</h3>");
        if (!includeOptionals && !bodyBuilder.condRequiredFields.length >=1) {

            $(requiredsDiv).append("<p>All fields are required.<p>");

        }
        $(requiredsDiv).append(table);

    }


    bodyBuilder.fieldStagingTable = [];
    bodyBuilder.fieldTable = [];



}

function createTableArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];

    }

    return bodyBuilder.fieldTable = arr;

}

function addStatus(fieldName) {
    if (bodyBuilder.requiredFields.indexOf(fieldName) != -1) {

        return "required"
      
    } 
    else if (bodyBuilder.condRequiredFields.indexOf(fieldName) != -1) {
       return "conditionally required"
    } 
    else return "optional"

    
}
