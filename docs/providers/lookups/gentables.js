var configurationsGenerator = require("./configurations.js");
var specificationsGenerator = require("./specifications.js");
var metaData = require("./providermeta.js");
var apiVersionPerFeature = require("./apiversionperfeature.js");
var allRequestTypes = require("../../requestbuilder/anabolicsteroids/requesttypes.js");
var strings = require("./strings.js");
var fs = require("fs");
var tableify = require("tableify");
const cheerio = require("cheerio");
const sortKeys = require("sort-keys");
var tablesOutputFolder = "../../../layouts/shortcodes/providers/en//"; // for running from VS Code, set path to ./providers/tables/

// for running from Script, set path to ../../providers/tables/
const util = require("util");
const striptags = require("striptags");
var _ = require("lodash");
var stringsGenerator = strings();

const apiVersionString = "<p>Minimum API version: </p>";
var paymentMethodTypeCount = 0;
var strippedHTML;
var requestTabs;
var paymentMethodTypeDisplayName;
var trueFalseDisplayName;

var configColumnTitle = "Configuration";
var requiredOptionalColumnTitle = "Required/Optional";

var specsColumnTitle = "Specifications";
var specDetailsColumnTitle = "Details";

// Request Table Column Titles
const requestNameColumnTitle = "Request";
const requestPartialMultipleTitle = "Partial/Multiple";
const requestModeColumnTitle = "Mode";
const requestNotesColumnTitle = "Notes";

// Payment Methods Table Column Titles
const paymentMethodNameColumnTitle = "Payment Method";
const paymentMethodReachColumnTitle = "Reach";
const paymentMethodRequestsColumnTitle = "Only for Requests";
const paymentMethodPaymentPageColumnTitle = "Available through Flow Type";
const paymentMethodTypeColumnTitle = "Payment Method Type";
const paymentMethodNotesColumnTitle = "Notes";

// Features Table Column Titles
const featureNameColumnTitle = "Feature";
const featureSupportedColumnTitle = "Supported";
const featurePaymentMethodTypeColumnTitle = "Payment Method Type";
const featureNotesColumnTitle = "Notes";

var supportedThreeDsTwoProviders = [];
// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

async function getStuff(fileName) {
  return await readFile(fileName);
}

const requestTabDomElement = [
  "ccards_requests",
  "dredirect_requests",
  "cash_requests",
  "banktransfer_requests",
  "ewallet_requests",
  "loyalty_requests",
  "paymentpage_requests"
];

var tooltipDecision = {
  isNoCVVSupported: null,
  reset: function() {
    this.isNoCVVSupported = null;
  }
};

var providerNames = {};
var overviewTableTypes = [];

function createConfigurationTable() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const configurations = configurationsGenerator(providerDisplayName);

    var configRowsToCreate = [];

    var configurationArray = [];

    var authenticationObject = new Object();

    if (typeof configurations.authentication[provider] != "undefined") {
      authenticationObject[configColumnTitle] =
        configurations.authentication[provider].toconfigure;
      authenticationObject[requiredOptionalColumnTitle] =
        configurations.authentication[provider].requiredoptional;

      configRowsToCreate.push(authenticationObject);
    }

    if (typeof configurations.cvvprocessing[provider] != "undefined") {
      var cvvObject = new Object();

      cvvObject[configColumnTitle] =
        configurations.cvvprocessing[provider].toconfigure;
      cvvObject[requiredOptionalColumnTitle] =
        configurations.cvvprocessing[provider].requiredoptional;

      configRowsToCreate.push(cvvObject);
    }

    if (typeof configurations.dynamicdescriptor[provider] != "undefined") {
      var dynamicDescriptorObject = new Object();

      dynamicDescriptorObject[configColumnTitle] =
        configurations.dynamicdescriptor[provider].toconfigure;
      dynamicDescriptorObject[requiredOptionalColumnTitle] =
        configurations.dynamicdescriptor[provider].requiredoptional;

      configRowsToCreate.push(dynamicDescriptorObject);
    }

    if (typeof configurations.webhooks[provider] != "undefined") {
      var webHooksObject = new Object();

      webHooksObject[configColumnTitle] =
        configurations.webhooks[provider].toconfigure;
      webHooksObject[requiredOptionalColumnTitle] =
        configurations.webhooks[provider].requiredoptional;

      configRowsToCreate.push(webHooksObject);
    }

    if (typeof configurations.custom[provider] != "undefined") {
      if (typeof configurations.custom[provider].custom1 != "undefined") {
        custom1ConfigObject = new Object();

        custom1ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom1.toconfigure;
        custom1ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom1.requiredoptional;

        configRowsToCreate.push(custom1ConfigObject);
      }

      if (typeof configurations.custom[provider].custom2 != "undefined") {
        custom2ConfigObject = new Object();

        custom2ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom2.toconfigure;
        custom2ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom2.requiredoptional;

        configRowsToCreate.push(custom2ConfigObject);
      }

      if (typeof configurations.custom[provider].custom3 != "undefined") {
        custom3ConfigObject = new Object();

        custom3ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom3.toconfigure;
        custom3ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom3.requiredoptional;

        configRowsToCreate.push(custom3ConfigObject);
      }

      if (typeof configurations.custom[provider].custom4 != "undefined") {
        custom4ConfigObject = new Object();

        custom4ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom4.toconfigure;
        custom4ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom4.requiredoptional;

        configRowsToCreate.push(custom4ConfigObject);
      }

      if (typeof configurations.custom[provider].custom5 != "undefined") {
        custom5ConfigObject = new Object();

        custom5ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom5.toconfigure;
        custom5ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom5.requiredoptional;

        configRowsToCreate.push(custom5ConfigObject);
      }

      if (typeof configurations.custom[provider].custom6 != "undefined") {
        custom6ConfigObject = new Object();

        custom6ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom6.toconfigure;
        custom6ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom6.requiredoptional;

        configRowsToCreate.push(custom6ConfigObject);
      }

      if (typeof configurations.custom[provider].custom7 != "undefined") {
        custom7ConfigObject = new Object();

        custom7ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom7.toconfigure;
        custom7ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom7.requiredoptional;

        configRowsToCreate.push(custom7ConfigObject);
      }

      if (typeof configurations.custom[provider].custom8 != "undefined") {
        custom8ConfigObject = new Object();

        custom8ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom8.toconfigure;
        custom8ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom8.requiredoptional;

        configRowsToCreate.push(custom8ConfigObject);
      }

      if (typeof configurations.custom[provider].custom9 != "undefined") {
        custom9ConfigObject = new Object();

        custom9ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom9.toconfigure;
        custom9ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom9.requiredoptional;

        configRowsToCreate.push(custom9ConfigObject);
      }

      if (typeof configurations.custom[provider].custom10 != "undefined") {
        custom10ConfigObject = new Object();

        custom10ConfigObject[configColumnTitle] =
          configurations.custom[provider].custom10.toconfigure;
        custom10ConfigObject[requiredOptionalColumnTitle] =
          configurations.custom[provider].custom10.requiredoptional;

        configRowsToCreate.push(custom10ConfigObject);
      }
    }

    for (row of configRowsToCreate) {
      configurationArray.push(row);
    }

    configurationArray.sort(function(a, b) {
      if (b[requiredOptionalColumnTitle] < a[requiredOptionalColumnTitle]) {
        return -1;
      }

      if (b[requiredOptionalColumnTitle] > a[requiredOptionalColumnTitle]) {
        return 1;
      }

      return 0;
    });

    buildHTMLTable(configurationArray, provider, "config", "");
  });
}

function createOverviewTables() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const specifications = specificationsGenerator(providerDisplayName);

    var overviewArray = [];

    for (var tableType of overviewTableTypes) {
      var value = {};

      var overviewObjects = {};
      var overviewRowsToCreate = [];

      overviewObjects[tableType + "apiversionObject"] = {};
      overviewObjects[tableType + "regionsObject"] = {};
      overviewObjects[tableType + "requestObject"] = {};
      overviewObjects[tableType + "currenciesObject"] = {};
      overviewObjects[tableType + "paymentMethodObject"] = {};
      overviewObjects[tableType + "processWithoutCVVObject"] = {};
      overviewObjects[tableType + "threeDsObject"] = {};

      if (
        typeof specifications.minapiversion[tableType] != "undefined" &&
        typeof specifications.minapiversion[tableType][provider] != "undefined"
      ) {
        overviewObjects[tableType + "apiversionObject"][specsColumnTitle] =
          "Minimum PaymentsOS API Version";
        overviewObjects[tableType + "apiversionObject"][
          specDetailsColumnTitle
        ] = specifications.minapiversion[tableType][provider];

        overviewRowsToCreate.push(
          overviewObjects[tableType + "apiversionObject"]
        );
      }

      if (
        typeof specifications.regions[tableType] != "undefined" &&
        typeof specifications.regions[tableType][provider] != "undefined"
      ) {
        overviewObjects[tableType + "regionsObject"][specsColumnTitle] =
          "Regions";
        overviewObjects[tableType + "regionsObject"][specDetailsColumnTitle] =
          specifications.regions[tableType][provider];

        overviewRowsToCreate.push(overviewObjects[tableType + "regionsObject"]);
      }

      if (
        typeof specifications.requests[tableType] != "undefined" &&
        typeof specifications.requests[tableType][provider] != "undefined"
      ) {
        overviewObjects[tableType + "requestObject"][specsColumnTitle] =
          "Requests";
        overviewObjects[tableType + "requestObject"][specDetailsColumnTitle] =
          specifications.requests[tableType][provider];

        overviewRowsToCreate.push(overviewObjects[tableType + "requestObject"]);
      }

      if (
        typeof specifications.currencies[tableType] != "undefined" &&
        typeof specifications.currencies[tableType][provider] != "undefined"
      ) {
        overviewObjects[tableType + "currenciesObject"][specsColumnTitle] =
          "Currencies";
        overviewObjects[tableType + "currenciesObject"][
          specDetailsColumnTitle
        ] = specifications.currencies[tableType][provider];

        overviewRowsToCreate.push(
          overviewObjects[tableType + "currenciesObject"]
        );
      }

      if (
        typeof specifications.paymentmethods[tableType] != "undefined" &&
        typeof specifications.paymentmethods[tableType][provider] != "undefined"
      ) {
        overviewObjects[tableType + "paymentMethodObject"][specsColumnTitle] =
          "Payment Methods";
        overviewObjects[tableType + "paymentMethodObject"][
          specDetailsColumnTitle
        ] = specifications.paymentmethods[tableType][provider];

        overviewRowsToCreate.push(
          overviewObjects[tableType + "paymentMethodObject"]
        );
      }

      if (
        typeof specifications.cvvtransactionswithout[tableType] !=
          "undefined" &&
        typeof specifications.cvvtransactionswithout[tableType][provider] !=
          "undefined"
      ) {
        overviewObjects[tableType + "processWithoutCVVObject"][
          specsColumnTitle
        ] = "Transaction Processing without CVV";
        overviewObjects[tableType + "processWithoutCVVObject"][
          specDetailsColumnTitle
        ] = specifications.cvvtransactionswithout[tableType][provider];

        overviewRowsToCreate.push(
          overviewObjects[tableType + "processWithoutCVVObject"]
        );
      }

      if (
        typeof specifications.threeds[tableType] != "undefined" &&
        typeof specifications.threeds[tableType][provider] != "undefined"
      ) {
        overviewObjects[tableType + "threeDsObject"][specsColumnTitle] =
          "3DS Redirection";
        overviewObjects[tableType + "threeDsObject"][specDetailsColumnTitle] =
          specifications.threeds[tableType][provider];

        overviewRowsToCreate.push(overviewObjects[tableType + "threeDsObject"]);
      }

      for (row of overviewRowsToCreate) {
        overviewArray.push(row);
      }

      if (overviewArray.length > 1) {
        buildHTMLTable(overviewArray, provider, tableType);
      }

      overviewArray = [];
      overviewRowsToCreate = [];
    }
  });
}

function createMinApiVersion() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const providerMeta = metaData(providerDisplayName);

    minApiVerion =
      "<p>Minimum required API version: " +
      providerMeta[provider].zoozdata.apiversion +
      "</p>";

    buildParagraph(provider, minApiVerion, "apiversion");
  });
  addMinApiVersionPerFeature();
}

function addMinApiVersionPerFeature() {
  const providerMeta = metaData();
  const apiVersionFeature = apiVersionPerFeature();
  var minApiVersionFeatureText = "";
  var isIntroSentenceGenerated = false;
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    apiVersionFeature.minApiVersionPerFeature.forEach(featureVersionObject => {
      for (var tableType of overviewTableTypes) {
        if (typeof providerMeta[provider].features[tableType] != "undefined") {
          providerMeta[provider].features[tableType].forEach(element => {
            if (
              element.name == featureVersionObject.feature &&
              element.supported == true
            ) {
              if (
                providerMeta[provider].zoozdata.apiversion !==
                featureVersionObject.version
              ) {
                if (isIntroSentenceGenerated == false) {
                  minApiVersionFeatureText =
                    minApiVersionFeatureText +
                    "<p>The following features require an API version higher than the minimum:</p>";
                }
                minApiVersionFeatureText =
                  minApiVersionFeatureText +
                  "<ul>" +
                  "<li>" +
                  element.name +
                  " requires API version " +
                  featureVersionObject.version +
                  "</li>" +
                  "</ul>";

                appendParagraph(
                  provider,
                  minApiVersionFeatureText,
                  "apiversion"
                );
                minApiVersionFeatureText = "";
                isIntroSentenceGenerated = true;
              }
            }
          });
        }
      }
    });
    isIntroSentenceGenerated = false;
  });
}

function createRequestTables() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const providerMeta = metaData(providerDisplayName);

    var overviewArray = [];

    // count the number of payment method types
    // so that you know whether to create tabs for the request types.
    for (var tableType of overviewTableTypes) {
      if (typeof providerMeta[provider].requests[tableType] != "undefined") {
        // update counter
        paymentMethodTypeCount++;
        // console.log(paymentMethodTypeCount)
        // console.log(provider + " "+ "generating request table: "+ paymentMethodTypeCount)
      }
    }

    for (var tableType of overviewTableTypes) {
      var overviewObjects = {};
      var overviewRowsToCreate = [];

      if (typeof providerMeta[provider].requests[tableType] != "undefined") {
        providerMeta[provider].requests[tableType].forEach(element => {
          var partialMultiple;

          // Create the object. Each new object is a row.
          overviewObjects[tableType + "requestObject"] = {};

          // Do not show Token in the table.
          if (element.type != "Token") {
            overviewObjects[tableType + "requestObject"][
              requestNameColumnTitle
            ] = element.type;

            // Lookup multiple / partial and construct the string
            if ((element.multiple == true) & (element.partial == true)) {
              partialMultiple = " Both partial and multiple are supported";
            } else if (
              (element.multiple == true) &
              (element.partial == false)
            ) {
              partialMultiple = " Multiple is supported";
            } else if (
              (element.multiple == false) &
              (element.partial == true)
            ) {
              partialMultiple = " Partial is supported";
            } else if (
              (typeof element.multiple == "undefined") &
              (typeof element.partial == "undefined")
            ) {
              partialMultiple = " Not Applicable";
            } else {
              partialMultiple = "Partial and multiple are not supported";
            }

            overviewObjects[tableType + "requestObject"][
              requestPartialMultipleTitle
            ] = partialMultiple;

            // lookup mode
            overviewObjects[tableType + "requestObject"][
              requestModeColumnTitle
            ] = element.mode;

            // Lookup notes
            if (typeof element.notes !== "undefined") {
              overviewObjects[tableType + "requestObject"][
                requestNotesColumnTitle
              ] = element.notes;
            }

            // Create the row
            overviewRowsToCreate.push(
              overviewObjects[tableType + "requestObject"]
            );
          }
        });
      }

      for (row of overviewRowsToCreate) {
        overviewArray.push(row);
      }

      overviewArray.sort(function(a, b) {
        if (
          b[requestNameColumnTitle].toLowerCase() <
          a[requestNameColumnTitle].toLowerCase()
        ) {
          return 1;
        }

        if (
          b[requestNameColumnTitle].toLowerCase() >
          a[requestNameColumnTitle].toLowerCase()
        ) {
          return -1;
        }

        return 0;
      });

      if (overviewArray.length >= 1) {
        buildHTMLTable(overviewArray, provider, tableType, "requests");
      }

      overviewArray = [];
      overviewRowsToCreate = [];
    }

    if (paymentMethodTypeCount > 1) {
      strippedHTML = striptags(requestTabs.html(), [
        "head",
        "body",
        "div",
        "table",
        "thead",
        "tr",
        "th",
        "tbody",
        "td",
        "script",
        "code",
        "a",
        "button",
        "ul",
        "li",
        "code"
      ]);

      createFile(strippedHTML, provider, "", "requests");
      paymentMethodTypeCount = 0;

      // clear the template before moving onto the next provider
      requestTabDomElement.forEach(function(domElement) {
        requestTabs("#" + domElement).empty();
      });

      requestTabs(".tab").empty();
    }
  });
}

function createCurrencies() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const providerMeta = metaData(providerDisplayName);

    currencies =
      "<p>" + providerMeta[provider].currencies.currencyList + "</p>";

    if (typeof providerMeta[provider].currencies.notes != "undefined") {
      currencies =
        currencies + "<p>" + providerMeta[provider].currencies.notes + "</p>";
    }

    buildParagraph(provider, currencies, "currencies");
  });
}

function createPaymentMethodTables() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const providerMeta = metaData(providerDisplayName);

    var overviewArray = [];

    for (var tableType of overviewTableTypes) {
      // Set the payment method type display name
      setPaymentMethodDisplayName(tableType);

      var overviewObjects = {};
      var overviewRowsToCreate = [];

      if (
        typeof providerMeta[provider].paymentmethods[tableType] !=
          "undefined" &&
        tableType != "paymentpage"
      ) {
        // If the number of payment methods is 1, just get the notes
        // and create a paragraph.
        if (
          providerMeta[provider].paymentmethods[tableType].length == 1 &&
          providerMeta[provider].paymentmethods[tableType][0].type == "All"
        ) {
          var paymentMethodNotes =
            "<p>" +
            providerMeta[provider].paymentmethods[tableType][0].notes +
            "</p>";

          buildParagraph(provider, paymentMethodNotes, "paymentmethods");
        } else {
          providerMeta[provider].paymentmethods[tableType].forEach(element => {
            var partialMultiple;

            // Create the object. Each new object is a row.
            overviewObjects[tableType + "paymentMethodObject"] = {};

            if (typeof element.type != "undefined") {
              overviewObjects[tableType + "paymentMethodObject"][
                paymentMethodNameColumnTitle
              ] = element.type;

              // Lookup reach
              // overviewObjects[tableType + "paymentMethodObject"][paymentMethodReachColumnTitle] = element.reach

              // Set payment method type
              overviewObjects[tableType + "paymentMethodObject"][
                paymentMethodTypeColumnTitle
              ] = paymentMethodTypeDisplayName;

              // Lookup requests if specific to the payment method type
              if (typeof element.forRequests != "undefined") {
                overviewObjects[tableType + "paymentMethodObject"][
                  paymentMethodRequestsColumnTitle
                ] = element.forRequests.join(", ");
              }

              // else (overviewObjects[tableType + "paymentMethodObject"][paymentMethodRequestsColumnTitle] = "All")

              // Lookup notes
              if (typeof element.notes !== "undefined")
                overviewObjects[tableType + "paymentMethodObject"][
                  paymentMethodNotesColumnTitle
                ] = element.notes;

              // Create the row
              overviewRowsToCreate.push(
                overviewObjects[tableType + "paymentMethodObject"]
              );
            }
          });

          for (row of overviewRowsToCreate) {
            overviewArray.push(row);
          }

          overviewArray.sort(function(a, b) {
            if (
              b[paymentMethodNameColumnTitle].toLowerCase() <
              a[paymentMethodNameColumnTitle].toLowerCase()
            ) {
              return 1;
            }

            if (
              b[paymentMethodNameColumnTitle].toLowerCase() >
              a[paymentMethodNameColumnTitle].toLowerCase()
            ) {
              return -1;
            }

            return 0;
          });
        }
      }
    }

    if (overviewArray.length >= 1) {
      buildHTMLTable(overviewArray, provider, "", "paymentmethods");
    }

    overviewArray = [];
    overviewRowsToCreate = [];
    // here
  });
}

function createPaymentPagePaymentMethodTables() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const providerMeta = metaData(providerDisplayName);

    var overviewArray = [];
    // Set the payment method type display name
    setPaymentMethodDisplayName("paymentpage");

    var overviewObjects = {};
    var overviewRowsToCreate = [];

    if (
      typeof providerMeta[provider].paymentmethods.paymentpage != "undefined"
    ) {
      providerMeta[provider].paymentmethods.paymentpage.forEach(element => {
        var partialMultiple;

        // Create the object. Each new object is a row.
        overviewObjects["paymentpage" + "paymentMethodObject"] = {};

        if (typeof element.type != "undefined") {
          overviewObjects["paymentpage" + "paymentMethodObject"][
            paymentMethodNameColumnTitle
          ] = element.type;

          // Lookup reach
          // overviewObjects[tableType + "paymentMethodObject"][paymentMethodReachColumnTitle] = element.reach

          // Set payment method type
          overviewObjects["paymentpage" + "paymentMethodObject"][
            paymentMethodPaymentPageColumnTitle
          ] = paymentMethodTypeDisplayName;

          // Lookup requests if specific to the payment method type
          if (typeof element.forRequests != "undefined") {
            overviewObjects["paymentpage" + "paymentMethodObject"][
              paymentMethodRequestsColumnTitle
            ] = element.forRequests.join(", ");
          }

          // else (overviewObjects[tableType + "paymentMethodObject"][paymentMethodRequestsColumnTitle] = "All")

          // Lookup notes
          if (typeof element.notes !== "undefined")
            overviewObjects["paymentpage" + "paymentMethodObject"][
              paymentMethodNotesColumnTitle
            ] = element.notes;

          // Create the row
          overviewRowsToCreate.push(
            overviewObjects["paymentpage" + "paymentMethodObject"]
          );
        }
      });

      for (row of overviewRowsToCreate) {
        overviewArray.push(row);
      }

      overviewArray.sort(function(a, b) {
        if (
          b[paymentMethodNameColumnTitle].toLowerCase() <
          a[paymentMethodNameColumnTitle].toLowerCase()
        ) {
          return 1;
        }

        if (
          b[paymentMethodNameColumnTitle].toLowerCase() >
          a[paymentMethodNameColumnTitle].toLowerCase()
        ) {
          return -1;
        }

        return 0;
      });
    }

    if (overviewArray.length >= 1) {
      buildHTMLTable(overviewArray, provider, "", "paymentpagepaymentmethods");
    }

    overviewArray = [];
    overviewRowsToCreate = [];
    // here
  });
}

function createFeaturesTables() {
  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const providerMeta = metaData(providerDisplayName);

    var overviewArray = [];

    for (var tableType of overviewTableTypes) {
      // Set the payment method type display name
      setPaymentMethodDisplayName(tableType);

      var overviewObjects = {};
      var overviewRowsToCreate = [];

      if (typeof providerMeta[provider].features[tableType] != "undefined") {
        providerMeta[provider].features[tableType].forEach(element => {
          // Create the object. Each new object is a row.
          overviewObjects[tableType + "featuresObject"] = {};

          // Lookup feature Name
          overviewObjects[tableType + "featuresObject"][
            featureNameColumnTitle
          ] = element.name;

          // Lookup feature value
          setTrueFalseDisplayName(element.supported);

          // For "Transaction Processing without CVV", store if it is true or false so you can only show
          // the tooltip if false
          if (
            element.name == "Transaction Processing without CVV" &&
            element.supported == true
          ) {
            tooltipDecision.isNoCVVSupported = true;
          }

          // Store the providers that support 3DS two. The BodyBuilder uses this to show or hide the "Show 3DS Two Internal Fields" checkbox.
          if (element.name == "3DS 2.0 Internal" && element.supported == true) {
            supportedThreeDsTwoProviders.push(provider);
          }

          overviewObjects[tableType + "featuresObject"][
            featureSupportedColumnTitle
          ] = trueFalseDisplayName;

          //  // Set payment method type
          // overviewObjects[tableType + "featuresObject"][featurePaymentMethodTypeColumnTitle] = paymentMethodTypeDisplayName

          // Lookup notes
          if (typeof element.notes !== "undefined")
            overviewObjects[tableType + "featuresObject"][
              featureNotesColumnTitle
            ] = element.notes;

          // Create the row
          overviewRowsToCreate.push(
            overviewObjects[tableType + "featuresObject"]
          );
        });
      }

      for (row of overviewRowsToCreate) {
        overviewArray.push(row);
      }
    }

    overviewArray.sort(function(a, b) {
      if (
        b[featureNameColumnTitle].toLowerCase() <
        a[featureNameColumnTitle].toLowerCase()
      ) {
        return 1;
      }

      if (
        b[featureNameColumnTitle].toLowerCase() >
        a[featureNameColumnTitle].toLowerCase()
      ) {
        return -1;
      }

      return 0;
    });

    if (overviewArray.length > 1) {
      buildHTMLTable(overviewArray, provider, "", "features");
    }

    overviewArray = [];
    overviewRowsToCreate = [];
    tooltipDecision.reset();
  });

  createThreeDsTwoProvidersList(supportedThreeDsTwoProviders);
}

function buildHTMLTable(map, providerName, tableType, forSpec) {
  var html = tableify(map);
  var $ = cheerio.load(html);
  $("table").addClass("customtable table");
  $("thead").addClass("thead-dark");
  if (forSpec == "requests" && paymentMethodTypeCount > 1) {
    if (tableType == "ccards") {
      requestTabs("#ccards_requests").append('<div class="request-table-intro">Supported requests for card transactions.</<div>').append($.html());

      // Create the tab button element
      var cardsTabButton =
      '<li id="defaultOpenRequests" onclick="openSpecRequests(event,' +
        "'ccards_requests'" + 
        '); return false">' +
        '<a class="nav-link tablinksrequests active" href="#ccards_requests">Cards</a>'
        "</li>";
      requestTabs(".tab").append(cardsTabButton);
    } else if (tableType == "dredirect") {
      requestTabs("#dredirect_requests").append('<div class="request-table-intro">Supported requests for debit redirect transactions.</<div>').append($.html());

      // Create the tab button element
      var dredirectTabButton =
        '<li id="defaultOpenRequests" onclick="openSpecRequests(event,' +
        "'dredirect_requests'" + 
        '); return false">' +
        '<a class="nav-link tablinksrequests active" href="#dredirect_requests">Debit Redirect</a>'
        "</li>";
      requestTabs(".tab").append(dredirectTabButton);
    } else if (tableType == "banktransfer") {
      requestTabs("#banktransfer_requests").append('<div class="request-table-intro">Supported requests for bank transfer transactions.</<div>').append($.html());

      // Create the tab button element
      var bankTransferTabButton =
        '<li id="defaultOpenRequests" onclick="openSpecRequests(event,' +
        "'banktransfer_requests'" + 
        '); return false">' +
        '<a class="nav-link tablinksrequests active" href="#banktransfer_requests">Bank Transfer</a>'
        "</li>";
      requestTabs(".tab").append(bankTransferTabButton);
    } else if (tableType == "cash") {
      requestTabs("#cash_requests").append('<div class="request-table-intro">Supported requests for cash transactions.</<div>').append($.html());

      // Create the tab button element
      var cashTabButton =
        '<li id="defaultOpenRequests" onclick="openSpecRequests(event,' +
        "'cash_requests'" + 
        '); return false">' +
        '<a class="nav-link tablinksrequests active" href="#cash_requests">Cash</a>'
        "</li>";
      requestTabs(".tab").append(cashTabButton);
    } else if (tableType == "ewallet") {
      requestTabs("#ewallet_requests").append('<div class="request-table-intro">Supported requests for eWallet transactions.</<div>').append($.html());

      // Create the tab button element
      var ewalletTabButton =
        '<li id="defaultOpenRequests" onclick="openSpecRequests(event,' +
        "'ewallet_requests'" + 
        '); return false">' +
        '<a class="nav-link tablinksrequests active" href="#ewallet_requests">eWallet</a>'
        "</li>";
      requestTabs(".tab").append(ewalletTabButton);
    } else if (tableType == "loyalty") {
      requestTabs("#loyalty_requests").append('<div class="request-table-intro">Supported requests for loyalty transactions.</<div>').append($.html());

      // Create the tab button element
      var loyaltyTabButton =
        '<li id="defaultOpenRequests" onclick="openSpecRequests(event,' +
        "'loyalty_requests'" + 
        '); return false">' +
        '<a class="nav-link tablinksrequests active" href="#loyalty_requests">Loyalty</a>'
        "</li>";
      requestTabs(".tab").append(loyaltyTabButton);
    } else if (tableType == "paymentpage") {
      requestTabs("#paymentpage_requests").append('<div class="request-table-intro">Supported requests for payment page transactions.</<div>').append($.html());

      // Create the tab button element
      var paymentPageTabButton =
        '<li id="defaultOpenRequests" onclick="openSpecRequests(event,' +
        "'paymentpage_requests'" + 
        '); return false">' +
        '<a class="nav-link tablinksrequests active" href="#paymentpage_requests">Payment Page</a>'
        "</li>";
      requestTabs(".tab").append(paymentPageTabButton);
    }
  } else if (forSpec == "features") {
    var textIndex;

    $(".string").each(function(i, elem) {
      if (
        $(this).text() == "3DS 1.0 External" ||
        $(this).text() == "3DS 2.0 External"
      ) {
        textIndex = i;
        $(".string")
          .slice(textIndex)
          .eq(0)
          .prepend(
            '<img  class="table-tooltip" src="tooltipicon.png" data-toggle="tooltip" title="If you use an external MPI (merchant plug-in) to authorize a card using 3DSecure, then you can pass the 3DS data returned from the MPI in your PaymentsOS transaction requests"></img>'
          );
        $(".string")
          .slice(textIndex)
          .eq(0)
          .html();
      } else if (
        $(this).text() == "3DS 1.0 Internal" ||
        $(this).text() == "3DS 2.0 Internal"
      ) {
        textIndex = i;
        $(".string")
          .slice(textIndex)
          .eq(0)
          .prepend(
            '<img class="table-tooltip" src="tooltipicon.png" data-toggle="tooltip" title="Internal 3DS refers to a 3DS authentication process initiated during the PaymentsOS transaction flow."></img>'
          );
        $(".string")
          .slice(textIndex)
          .eq(0)
          .html();
      } else if ($(this).text() == "Stored Credentials Flag") {
        textIndex = i;
        $(".string")
          .slice(textIndex)
          .eq(0)
          .prepend(
            '<img class="table-tooltip" src="tooltipicon.png" data-toggle="tooltip" title="A stored credentials flag indicates whether you are using stored card information in a transaction request. If you set this flag, we will pass it onto the provider you are transacting against."></img>'
          );
        $(".string")
          .slice(textIndex)
          .eq(0)
          .html();
      } else if (
        $(this).text() == "Transaction Processing without CVV" &&
        tooltipDecision.isNoCVVSupported == true
      ) {
        textIndex = i;
        $(".string")
          .slice(textIndex)
          .eq(0)
          .prepend(
            '<img class="table-tooltip" src="tooltipicon.png" data-toggle="tooltip" title="Transaction processing without cvv may not be supported by default. Support may depend on different parameters, such as your account configuration or the geography in which the payment is made."></img>'
          );
        $(".string")
          .slice(textIndex)
          .eq(0)
          .html();
      } else if (
        $(this).text() == "Retrieve Supported Payment Methods" &&
        tooltipDecision.isNoCVVSupported == true
      ) {
        textIndex = i;
        $(".string")
          .slice(textIndex)
          .eq(0)
          .prepend(
            '<img class="table-tooltip" src="tooltipicon.png" data-toggle="tooltip" title="If this feature is supported, you will be able to invoke the  Get Supported Payment Methods API to fetch all the payment methods supported by the default provider defined in the business unit used in the transaction request."></img>'
          );
        $(".string")
          .slice(textIndex)
          .eq(0)
          .html();
      }
    });

    textIndex = null;

    createFile($.html(), providerName, tableType, forSpec);
    paymentMethodTypeCount = 0;
  } else {
    createFile($.html(), providerName, tableType, forSpec);
    paymentMethodTypeCount = 0;
  }
}

function createFile(html, providerName, tableType, forSpec) {
  if (forSpec == "requests") tableType = "";

  fs.writeFile(
    tablesOutputFolder + providerName + "_" + tableType + forSpec + ".html",
    html,
    function(err) {
      if (err) {
        return console.log(err);
      }

      // console.log("Saved file: " + providerName + "_" + tableType + forSpec + ".html");
    }
  );
}

function buildParagraph(provider, html, spec) {
  fs.writeFile(
    tablesOutputFolder + provider + "_" + spec + ".html",
    html,
    function(err) {
      if (err) {
        return console.log(err);
      }

      // console.log("Saved file: " + provider + "_" + spec + ".html");
    }
  );
}

function appendParagraph(provider, html, spec) {
  fs.appendFile(
    tablesOutputFolder + provider + "_" + spec + ".html",
    html,
    function(err) {
      if (err) {
        return console.log(err);
      }

      // console.log("Saved file: " + provider + "_" + spec + ".html");
    }
  );
}

function setPaymentMethodDisplayName(tableType) {
  switch (tableType) {
    case "ccards":
      paymentMethodTypeDisplayName = "Cards";
      break;
    case "dredirect":
      paymentMethodTypeDisplayName = "Debit Redirect";
      break;
    case "cash":
      paymentMethodTypeDisplayName = "Cash";
      break;
    case "banktransfer":
      paymentMethodTypeDisplayName = "Bank Transfer";
      break;
    case "ewallet":
      paymentMethodTypeDisplayName = "eWallet";
      break;
    case "loyalty":
      paymentMethodTypeDisplayName = "Loyalty";
      break;
    case "paymentpage":
      paymentMethodTypeDisplayName = "Payment Page";
      break;
    default:
      break;
  }
}

function setTrueFalseDisplayName(boolValue) {
  if (boolValue == true) {
    trueFalseDisplayName = "Yes";
  } else trueFalseDisplayName = "No";
}
// // Get the request tab template
// getStuff("providers/lookups/requesttabs.html").then(data => {

//      requestTabs = cheerio.load(data, { decodeEntities: false

//     });

//     createRequestTables();

// });

// The BB needs this
function createUnsupportedRequestsJson() {
  // Fetch all available request types
  var allSupportedRequests = [];

  const metaJson = JSON.stringify(metaData());
  // Create the object using from anabolicsteriods/requesttypes.js
  var unsupportedrequests = {};

  for (var tableType of overviewTableTypes) {
    unsupportedrequests[tableType] = {};

    Object.entries(allRequestTypes()).forEach(([id, requestTypes]) => {
      Object.entries(requestTypes).forEach(([id, requestType]) => {
        if (requestType != "Payment") {
          allSupportedRequests.push(requestType);
          unsupportedrequests[tableType][requestType] = [];
        }
      });
    });
  }

  allSupportedRequests = _.uniq(allSupportedRequests);

  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    const providerMeta = metaData();
    var supportedRequestsPerProvider = [];

    for (var tableType of overviewTableTypes) {
      if (typeof providerMeta[provider].requests[tableType] != "undefined") {
        providerMeta[provider].requests[tableType].forEach(element => {
          supportedRequestsPerProvider.push(element.type);
        });
      }

      var notSupportedForProvider = _.uniq(
        _.difference(allSupportedRequests, supportedRequestsPerProvider)
      );

      if (notSupportedForProvider.length >= 1) {
        for (var requestType of notSupportedForProvider) {
          // added IF
          if (
            typeof providerMeta[provider].requests[tableType] != "undefined"
          ) {
            unsupportedrequests[tableType][requestType].push(provider);
          }
        }
      }

      supportedRequestsPerProvider = [];
    }
  });

  // To run from VS Code, change to requestbuilder/configlookups/
  // To rumn from script, change to ../../requestbuilder/configlookups/
  fs.writeFile(
    "../../requestbuilder/configlookups/" + "_unsupportedrequests" + ".json",
    JSON.stringify(unsupportedrequests),
    function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(
        "Saved file: " +
          "requestbuilder/configlookups/" +
          "_unsupportedrequests" +
          ".json"
      );
    }
  );
}

// The BB needs this
function createProvidersList() {
  const providerMeta = metaData();
  var providers = {};

  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    providers[provider] = {};
    providers[provider]["displayName"] = providerDisplayName;

    // for each provider, lookup the supported transaction type
    // then push.

    providers[provider]["transactionTypes"] = Object.keys(
      providerMeta[provider].requests
    );
  });
  // To run from VS code, change to requestbuilder/anabolicsteroids/
  // To run from script, change to ../../requestbuilder/anabolicsteroids/
  fs.writeFile(
    "../../requestbuilder/anabolicsteroids/" + "_providers" + ".json",
    JSON.stringify(providers),
    function(err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

// The BB needs this
function createAPMList() {
  const providerMeta = metaData();
  var bbGroupID;
  var apms = {};

  for (var tableType of overviewTableTypes) {
    apms[tableType] = {};
  }

  Object.entries(providerNames).forEach(([provider, providerDisplayName]) => {
    for (var tableType of overviewTableTypes) {
      var tempObj = {};

      if (
        typeof providerMeta[provider].paymentmethods[tableType] != "undefined"
      ) {
        providerMeta[provider].paymentmethods[tableType].forEach(element => {
          if (typeof element.bbgroupid != "undefined") {
            tempObj[element.id] = element.type;
            // tempObj = sortKeys(tempObj)
            bbGroupID = element.bbgroupid;
            apms[tableType][bbGroupID] = sortKeys(tempObj);
          }
        });
      }
    }
  });

  // To run from VS code, change to requestbuilder/anabolicsteroids/
  // To run from script, change to ../../requestbuilder/anabolicsteroids/
  fs.writeFile(
    "../../requestbuilder/anabolicsteroids/" + "_apms" + ".json",
    JSON.stringify(apms),
    function(err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

// The BB needs this
var createThreeDsTwoProvidersList = supportedThreeDsTwoProviders => {
  // console.log(supportedThreeDsTwoProviders);
  var supportedProviders = {
    threeDSTwoProviders: supportedThreeDsTwoProviders
  };

  fs.writeFile(
    "../../requestbuilder/configlookups/" +
      "supportedThreedDSProviders" +
      ".json",
    JSON.stringify(supportedProviders),
    function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(
        "Saved file: " +
          "requestbuilder/configlookups/" +
          "supportedThreedDSProviders" +
          ".json"
      );
    }
  );
};

var promise = new Promise(function(resolve, reject) {
  const providerMeta = metaData();
  var tempRequests = [];

  Object.entries(providerMeta).forEach(([provider, providerData]) => {
    providerNames[provider] = providerData.displayName;
    Object.entries(providerData.requests).forEach(([requestType]) => {
      tempRequests.push(requestType);
    });

    tempRequests = _.uniq(tempRequests);
  });

  overviewTableTypes = tempRequests;

  if (providerNames != null && overviewTableTypes != null) {
    resolve("ok");
  } else {
    reject(Error("It broke"));
  }
});

promise.then(
  function(result) {
    console.log(result); // "OK"
    // Get the request tab template
    // To run from VS Code, change path to providers/lookups/requesttabs.html
    // To run from script, change to requesttabs.html
    getStuff("requesttabs.html").then(data => {
      requestTabs = cheerio.load(data, { decodeEntities: false });

      createRequestTables();
    });
    createMinApiVersion();
    createConfigurationTable();
    createPaymentMethodTables();
    createPaymentPagePaymentMethodTables();
    createFeaturesTables();
    createCurrencies();

    // The BB needs the list of unsupported providers
    createUnsupportedRequestsJson();
    // The BB needs the provider list
    createProvidersList();
    // The BB needs the APM list
    createAPMList();
  },
  function(err) {
    console.log(err); // Error: "It broke"
  }
);
