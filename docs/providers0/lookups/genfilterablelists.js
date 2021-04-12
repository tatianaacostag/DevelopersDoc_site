
const _ = require('lodash');
const fs = require('fs');
const cheerio =  require('cheerio');
const metaData = require('./providermeta.js')

var $; // stores the integrationGuideHtmlFile


var metaDataObject = metaData();

var filterOn = ["features", "requests", "paymentmethods"];
var paymentMethodTypes = [] // cards, bank transfer etc.

// Filter data per provider
var filterData = {
  cardProviders: {providers:[]}, // stores only those providers that support cards (are shown by the default in the filter page),
  ewalletProviders: {providers:[]}, // stores only those providers that support ewallet (are shown by the default in the filter page),
  loyaltyProviders: {providers:[]}, // stores only those providers that support loyalty (are shown by the default in the filter page),
  banktransferProviders: {providers:[]}, // stores only those providers that support bank transfer (are shown by the default in the filter page),
  cashProviders: {providers:[]}, // stores only those providers that support cash (are shown by the default in the filter page),
  paymentpageProviders: {providers:[]}, // stores only those providers that support payment page,
  paymentMethodTypes: {}, // cards, bank transfer etc.
  requests: {}, // auth, charge, capture etc.
  requestsSubType: {}, // multiple, partial
  features: {}, // 3DS, Installments etc.
  paymentMethods: {} // Visa, MasterCard etc.
}

var loadIntegrationGuideHtmlFile = () => {

  return new Promise((resolve, reject) => {

    fs.readFile('../../../layouts/shortcodes/providersearch/integrationguides.html', (err, data) => {
      if (err) throw err;
      if (data != null) {
        $ = cheerio.load(data, { decodeEntities: false })

        if ($ != null) resolve("OK")

      }
      
    });

  });

  

}

var genpaymentMethodTypes = () => {


  return new Promise((resolve, reject) => {


    for (var filterOnItem of filterOn) {

      Object.entries(metaDataObject).forEach(([provider, providerData]) => {

        Object.entries(providerData[filterOnItem]).forEach(([requestType]) => {

          paymentMethodTypes.push(requestType)

        });

      });

    }
    paymentMethodTypes = _.uniq(paymentMethodTypes)


    if (paymentMethodTypes.length >= 1) {
      resolve("OK")

      // Now that we have the payment method types, generate the DOM checkboxes
      
      // Clear existing checkboxes
      $('#pmtypeselectoptions').empty()

      $('#pmtypeselectoptions').append ('<option  selected="selected" id= "default" value="default">None selected</option>');
      
      paymentMethodTypes.sort()
      for (var pmTypeItem of paymentMethodTypes) {
        
        var id;
        var displayName;

        switch (pmTypeItem) {
          case "ccards":
            displayName = "Cards"
            var inputElement = generateDropDownElement(pmTypeItem, displayName)
            $('#pmtypeselectoptions').append(inputElement)
          break;
          
          case "ewallet":
            displayName = "eWallet"
            var inputElement = generateDropDownElement(pmTypeItem, displayName)
            $('#pmtypeselectoptions').append(inputElement)
          break;

          case "cash":
            displayName = "Cash"
            var inputElement = generateDropDownElement(pmTypeItem, displayName)
            $('#pmtypeselectoptions').append(inputElement)
          break;

          case "banktransfer":
            displayName = "Bank Transfer"
            var inputElement = generateDropDownElement(pmTypeItem, displayName)
            $('#pmtypeselectoptions').append(inputElement)
          break;

          case "loyalty":
            displayName = "Loyalty"
            var inputElement = generateDropDownElement(pmTypeItem, displayName)
            $('#pmtypeselectoptions').append(inputElement)
          break;

          case "paymentpage":
            displayName = "Payment Page"
            var inputElement = generateDropDownElement(pmTypeItem, displayName)
            $('#pmtypeselectoptions').append(inputElement)
          break;
        
          default:
            break;
        }

      }


      

    }

    fs.writeFile("../../../layouts/shortcodes/providersearch/integrationguides.html", $.html(), function (err) {
      if (err) {
        return console.log(err);
      }
  
  
    });

  });

};

var genProvidersPerPaymentMethodType = () => {

  // Create base object
  for (var pmTypeItem of paymentMethodTypes) {

    filterData.paymentMethodTypes[pmTypeItem] = []
   
  }


  //Now add the supported providers per payment method type
  for (var requestTypeItem of paymentMethodTypes) {

    Object.entries(metaDataObject).forEach(([provider, providerData]) => {

      if (typeof providerData.requests[requestTypeItem] != "undefined") {

        filterData.paymentMethodTypes[requestTypeItem].push(provider)
      }

    });


  }

  var pmTypes = filterData.paymentMethodTypes
  
  fs.writeFile("../../paymentmethodtypes.json", JSON.stringify(pmTypes), function (err) {
    if (err) {
      return console.log(err);
    }


  });
}

var genProvidersPerFeature = () => {

  // Create base object
  for (var requestTypeItem of paymentMethodTypes) {

    filterData.features[requestTypeItem] = {}

    Object.entries(metaDataObject).forEach(([provider, providerData]) => {

      if (typeof providerData.features[requestTypeItem] != "undefined") {

        providerData.features[requestTypeItem].forEach((feature) => {
         
        if (typeof feature.name != "undefined") {
            filterData.features[requestTypeItem][feature.name] = []
          }

        });

      }

    });
  }

  // Now add the supported providers per feature
  for (var requestTypeItem of paymentMethodTypes) {

    Object.entries(metaDataObject).forEach(([provider, providerData]) => {

      if (typeof providerData.features[requestTypeItem] != "undefined") {

        providerData.features[[requestTypeItem]].forEach((feature) => {

          if (feature.supported == true) {
            filterData.features[requestTypeItem][feature.name].push(provider)
          }

        });
      }

    });

  }

  var features = filterData.features
  fs.writeFile("../../searchbuilder/features.json", JSON.stringify(features), function (err) {
    if (err) {
      return console.log(err);
    }


  });


}

var genProvidersPerRequest = () => {

  // Create base object
  for (var requestTypeItem of paymentMethodTypes) {

    filterData.requests[requestTypeItem] = {}


    Object.entries(metaDataObject).forEach(([provider, providerData]) => {

      if (typeof providerData.requests[requestTypeItem] != "undefined") {


        providerData.requests[requestTypeItem].forEach((request) => {
          
          if (typeof request.type != "undefined") {
            
            filterData.requests[requestTypeItem][request.type]= {
              all:[],
              multiple:[], 
              partial:[]
            }
          }
        

        });

      }
     

    });
   
  }

  // Now add the supported providers per request
  for (var requestTypeItem of paymentMethodTypes) {

    

    Object.entries(metaDataObject).forEach(([provider, providerData]) => {


      if (typeof providerData.requests[requestTypeItem] != "undefined") {

        providerData.requests[requestTypeItem].forEach((request) => {

          if (typeof request.type != undefined) {
            
          filterData.requests[requestTypeItem][request.type].all.push(provider)
          // also store those providers that support cards only
          if(requestTypeItem == "ccards") filterData.cardProviders.providers.push(provider)
          else if(requestTypeItem == "cash") filterData.cashProviders.providers.push(provider)
          else if(requestTypeItem == "ewallet") filterData.ewalletProviders.providers.push(provider)
          else if(requestTypeItem == "loyalty") filterData.loyaltyProviders.providers.push(provider)
          else if(requestTypeItem == "banktransfer") filterData.banktransferProviders.providers.push(provider)
          else if(requestTypeItem == "paymentpage") filterData.paymentpageProviders.providers.push(provider)


            if (request.multiple == true) {

              filterData.requests[requestTypeItem][request.type].multiple.push(provider)
            }
            if (request.partial == true) {

              filterData.requests[requestTypeItem][request.type].partial.push(provider)
            }
          }

         

        });
      }

    });


  }
 
  filterData.cardProviders.providers = _.uniq(filterData.cardProviders.providers)
  filterData.loyaltyProviders.providers = _.uniq(filterData.loyaltyProviders.providers)
  filterData.ewalletProviders.providers = _.uniq(filterData.ewalletProviders.providers)
  filterData.banktransferProviders.providers = _.uniq(filterData.banktransferProviders.providers)
  filterData.cashProviders.providers = _.uniq(filterData.cashProviders.providers)
  filterData.paymentpageProviders.providers = _.uniq(filterData.paymentpageProviders.providers)
  var requests = filterData.requests
  
  fs.writeFile("../../searchbuilder/requests.json", JSON.stringify(requests), function (err) {
    if (err) {
      return console.log(err);
    }

  });

  fs.writeFile("../../searchbuilder/cardonlyproviders.json", JSON.stringify(filterData.cardProviders), function (err) {
    if (err) {
      return console.log(err);
    }

  });

  fs.writeFile("../../searchbuilder/cashonlyproviders.json", JSON.stringify(filterData.cashProviders), function (err) {
    if (err) {
      return console.log(err);
    }

  });

  fs.writeFile("../../searchbuilder/loyaltytonlyproviders.json", JSON.stringify(filterData.loyaltyProviders), function (err) {
    if (err) {
      return console.log(err);
    }

  });

  fs.writeFile("../../searchbuilder/ewalletonlyproviders.json", JSON.stringify(filterData.ewalletProviders), function (err) {
    if (err) {
      return console.log(err);
    }

  });

  fs.writeFile("../../searchbuilder/banktransferonlyproviders.json", JSON.stringify(filterData.banktransferProviders), function (err) {
    if (err) {
      return console.log(err);
    }

  });

  fs.writeFile("../../searchbuilder/paymentpageonlyproviders.json", JSON.stringify(filterData.paymentpageProviders), function (err) {
    if (err) {
      return console.log(err);
    }

  });


}

var genProvidersPerPaymentMethod = () => {

  // Create base object
  var tmpPMList = []
  for (var requestTypeItem of paymentMethodTypes) {

    filterData.paymentMethods[requestTypeItem] = {}

    Object.entries(metaDataObject).forEach(([provider, providerData]) => {

      if (typeof providerData.paymentmethods[requestTypeItem] != "undefined") {

        providerData.paymentmethods[requestTypeItem].forEach((paymentmethod) => {

          if (typeof paymentmethod.type != "undefined") {
            tmpPMList.push(paymentmethod.type)

            filterData.paymentMethods[requestTypeItem][paymentmethod.type] =[]
          }


          
        });


      }

      
      

    });

  }

  // Now add the supported providers per payment method
  for (var requestTypeItem of paymentMethodTypes) {

    Object.entries(metaDataObject).forEach(([provider, providerData]) => {

      if (typeof providerData.paymentmethods[requestTypeItem] != "undefined") {

        providerData.paymentmethods[requestTypeItem].forEach((paymentmethod) => {

          if (typeof paymentmethod.type != "undefined") {
            filterData.paymentMethods[requestTypeItem][paymentmethod.type].push(provider)
          }

        });
      }

    });

  }

  

  var paymentMethods = filterData.paymentMethods
  // console.log(paymentMethods)
  fs.writeFile("../../searchbuilder/paymentmethods.json", JSON.stringify(paymentMethods), function (err) {
    if (err) {
      return console.log(err);
    }


  });
  
}

var genProviderListInGuideHtml = () => {
  var providerList = {
    providers: []
  }

  var providerListMap = new Map()

  $('#providerlist').empty()

  Object.entries(metaDataObject).forEach(([provider, providerData]) => {

      providerList.providers.push(provider)
      providerListMap.set(provider, providerData)

      

  });

  
  let ar = [...providerListMap.entries()];
  sortedArray = ar.sort();
  sortedProvidersMap = new Map(sortedArray);
  
  for (let [provider, providerData] of sortedProvidersMap) {

    var listElement = '<li id='+provider+'>'+'<a href="'+providerData.zoozdata.zoozdocsurl+'"target="_blank">'+providerData.displayName+'</a>'+'</li>'
      
    $('#providerlist').append(listElement)

  }

  fs.writeFile("../../../layouts/shortcodes/providersearch/integrationguides.html", $.html(), function (err) {
    if (err) {
      return console.log(err);
    }


  });


fs.writeFile("../../searchbuilder/allproviders.json", JSON.stringify(providerList), function (err) {
    if (err) {
      return console.log(err);
    }


  });


}

loadIntegrationGuideHtmlFile().then((result) => {
    if (result == "OK"){

      genProviderListInGuideHtml()
      genpaymentMethodTypes().then((result) => {

        if (result == "OK") {
          genProvidersPerPaymentMethodType()
          genProvidersPerFeature()
          genProvidersPerRequest()
          genProvidersPerPaymentMethod()
        }
      });
    }
})

// Helper functions
function generateCheckBoxes(id, displayName) {
  
    return '<label for="' + id + '"><input type="checkbox" id= "' + id + '" name="' + displayName + '" value="' + displayName + '" ' + '>' + ' ' + displayName + '</label>' + '<br>';

}

function generateDropDownElement(id, displayName) {
   // Cards should be selected by default
   
  //  if (id == "ccards") {
  //   return '<option selected="selected" id= "' + id + '" value="' + displayName + '"'+'>'+ displayName + '</option>';
  //  }

    return '<option id= "' + id + '" value="' + displayName + '"'+'>'+ displayName + '</option>';
  
}


