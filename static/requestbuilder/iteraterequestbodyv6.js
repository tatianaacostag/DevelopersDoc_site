function IterateCompleteRequestBody (requestjson) {

    var requestJsonToParse;
    var newJson;

  if (bodyBuilder.requesttype == "Authorize" || bodyBuilder.requesttype == "Charge" || bodyBuilder.requesttype == "Credit") {

    newJson = sortObject(modifyAuthChargeRequestJson(JSON.parse(requestjson)))

    bodyBuilder.completerequestjson = JSON.stringify(newJson)

    requestJsonToParse = JSON.stringify(newJson)


  }

  else if (bodyBuilder.requesttype == "Token") {

    newJson = sortObject(modifyTokenRequestJson(JSON.parse(requestjson)))

    bodyBuilder.completerequestjson = JSON.stringify(newJson)

    requestJsonToParse = JSON.stringify(newJson)

  }

  else requestJsonToParse = requestjson

  $.each(JSON.parse(requestJsonToParse), function(k, v) {

    bodyBuilder.requestbodykey = k;
    bodyBuilder.requestbodyvalue = v;

    checkstatusperkey()

    // Loop over level 1 if it exists
    if (typeof v == 'object') {

      var parentKey = k;

      $.each(v, function(i, j){

        bodyBuilder.requestbodykey = parentKey+"__"+i;
        bodyBuilder.requestbodyvalue = j;

        // Construct the property so you can match it against the meta file.
        var parentKeyL1 = parentKey+"__"+i

        checkstatusperkey()

        // Loop over level2 ARRAY if it exists
        if (Array.isArray(bodyBuilder.requestbodyvalue)) {

            bodyBuilder.requestbodyvalue.forEach(function(key, index, value) {
                var objectInArray = bodyBuilder.requestbodyvalue[index];
                  for (var key in objectInArray) {
                    if (objectInArray.hasOwnProperty(key)) {

                      bodyBuilder.requestbodykey = parentKeyL1+"___"+key;
                      bodyBuilder.requestbodyvalue = objectInArray[key];

                      checkstatusperkey()
                    }
                  }
                });

      }
      // Loop over level2 OBJECT if it exists
      if (typeof bodyBuilder.requestbodyvalue == 'object') {

        $.each(bodyBuilder.requestbodyvalue, function(k, l) {

        // Construct the property so you can match it against the meta file.
        bodyBuilder.requestbodykey = parentKeyL1+"___"+k;

        bodyBuilder.requestbodyvalue = l;
        var parentKeyL2 = parentKeyL1+"___"+k


        checkstatusperkey()

          // Loop over level3 if it exists
          if (typeof bodyBuilder.requestbodyvalue == 'object') {

              $.each(bodyBuilder.requestbodyvalue, function(m, n){

                if (typeof n !== 'object') {
                   // Construct the property so you can match it against the meta file.
                  bodyBuilder.requestbodykey = parentKeyL2+"____"+m;
                  bodyBuilder.requestbodyvalue = n;

                  checkstatusperkey()

                }

                //Loop over level4 if it exists
                else {

                  var parentKeyL3 = parentKeyL2+"____"+m
                  $.each(n, function(m, n){

                    bodyBuilder.requestbodykey = parentKeyL3+"_____"+m;
                    // console.log(bodyBuilder.requestbodykey)
                    checkstatusperkey()
                  });  

                }

              });

             

          }

        });
      }
      
      });
    }
  });

  }




