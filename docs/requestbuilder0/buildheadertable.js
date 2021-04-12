var allHeaderFields = [];
var uniqueHeaderFields = [];
var providerSpecificDescrMap = new Map();
var providerSpecificExamples = {

  ipaddress: false,
  useragent: false
}

var linebreak = "<br>"

var headerFieldsDiv = $('<div></div>');
$(headerFieldsDiv).addClass("headerTables table-striped table-bordered");

function buildHeaderTable() {

  providerSpecificExamples.ipaddress = false;
  providerSpecificExamples.useragent = false;
  $("#headerExample").empty();
  $("#headerExample").append("x-payments-os-env: test<br>api-version: 1.3.0")

  //Create header fields array
  allHeaderFields = ["api-version", "x-payments-os-env","idempotency-key"]
  checkHeadersPerProvider();


  if (bodyBuilder.requesttype == "Token") {

    allHeaderFields.push("public-key")

    $("#headerExample").append("<br>public-key: 99346d84-5186-4221-9c16-dc51a8de27fb")
  }

  else {
      allHeaderFields.push("private-key", "app-id")
      $("#headerExample").append("<br>private-key: bede7ee5-eaaq-4c9a-bc1f-617ba28256ae<br>app-id: com.zooz.docapp<br>idempotency-key: AGJ8FJLkGHIpHUTK")

    }

    // Remove duplicates
    uniqueHeaderFields = allHeaderFields.filter(function (elem, pos, arr) {
      return arr.indexOf(elem) == pos;
    });

    uniqueHeaderFields.sort()

    createHeaderTableArray(uniqueHeaderFields.length)
    for (var i in uniqueHeaderFields) {

      // Cell one
      bodyBuilder.headerTable[i][0] = uniqueHeaderFields[i]
      var field = uniqueHeaderFields[i]

      // cell two
      if (typeof headerfielddescr[field] !== 'undefined') {
        bodyBuilder.headerTable[i][1] = headerfielddescr[field]


      }


    }

    // Create the table
    bodyBuilder.headerTable.splice(0, 0, ["Key", "Description"])
    // Build the HTML table
    //Create an HTML Table element.
    var table = $("<table />");
    table[0].border = "0";

    //Get the count of columns.
    var columnCount = bodyBuilder.headerTable[0].length;

    //Add the header row.
    var row = $(table[0].insertRow(-1));
    for (var i = 0; i < columnCount; i++) {
      var headerCell = $("<th />");
      headerCell.html(bodyBuilder.headerTable[0][i]);
      row.append(headerCell);
    }


    //Add the data rows.
    for (var i = 1; i < bodyBuilder.headerTable.length; i++) {
      row = $(table[0].insertRow(-1));
      for (var j = 0; j < columnCount; j++) {
        var cell = $("<td />");
        cell.html(bodyBuilder.headerTable[i][j]);
        row.append(cell);
      }
    }

    $(".headerTables").empty();

    var ref = document.getElementById("ciResponseText")

    // Display the example
    $($("#headerExample")).insertBefore(ref);

    // Display the table

    $(headerFieldsDiv).insertAfter(ref);
    $(headerFieldsDiv).append("<h3>Request Header Keys</h3><p>All keys are required, with the exception of <code>idempotency-key</code>.</p>");

    // Check if there are generic descriptions per provider.
    if (typeof providerSpecificDescrMap.get("braintree") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("braintree"));

    }

    else if (typeof providerSpecificDescrMap.get("paypal") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("paypal"));

    }

    else if (typeof providerSpecificDescrMap.get("safecharge") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("safecharge"));

    }

    else if (typeof providerSpecificDescrMap.get("credorax") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("credorax"));

    }

    else if (typeof providerSpecificDescrMap.get("payusingleplatform") != "undefined") {

      $(headerFieldsDiv).append(providerSpecificDescrMap.get("payusingleplatform"));

    }

    $(headerFieldsDiv).append(table);

    bodyBuilder.headerTable = [];
    providerSpecificDescrMap.clear();

  function checkHeadersPerProvider() {

    for (var provider of bodyBuilder.providers) {

      if (typeof ipaddressheader.requests[bodyBuilder.requesttype] != "undefined") {

        if (!providerSpecificExamples.ipaddress && (ipaddressheader.requests[bodyBuilder.requesttype].indexOf(provider) != -1)) {

          addxClientIpAddress();
        }

      }

      if (typeof useragent.requests[bodyBuilder.requesttype] != "undefined") {

        if (!providerSpecificExamples.useragent && (useragent.requests[bodyBuilder.requesttype].indexOf(provider) != -1)) {
          addxClientUserAgent();
        }

      }

      // Add generic description of the provider is Braintree
      if (provider == "braintree") {

        providerSpecificDescrMap.set("braintree", providerheaderdescr["braintree"]);

      }
      // Add generic description of the provider is PayPal
      else if (provider == "paypal") {

        providerSpecificDescrMap.set("paypal", providerheaderdescr["paypal"]);

      }

      // Add generic description of the provider is SafeCharge
      else if (provider == "safecharge") {

        providerSpecificDescrMap.set("safecharge", providerheaderdescr["safecharge"]);

      }

      // Add generic description of the provider is Credorax
      else if (provider == "credorax") {

        providerSpecificDescrMap.set("credorax", providerheaderdescr["credorax"]);

      }

      // Add generic description of the provider is Credorax
      else if (provider == "payusingleplatform") {

        providerSpecificDescrMap.set("payusingleplatform", providerheaderdescr["payusingleplatform"]);

      }
    }
  }

  function addxClientIpAddress() {

    $("#headerExample").append("<br>x-client-ip-address: 216.3.128.12")
    allHeaderFields.push("x-client-ip-address");
    providerSpecificExamples.ipaddress = true;

  }

  function addxClientUserAgent() {

    $("#headerExample").append("<br>x-client-user-agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1")
    allHeaderFields.push("x-client-user-agent");
    providerSpecificExamples.useragent = true;

  }

  function createHeaderTableArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
      arr[i] = [];

    }

    return bodyBuilder.headerTable = arr;

  }

}
