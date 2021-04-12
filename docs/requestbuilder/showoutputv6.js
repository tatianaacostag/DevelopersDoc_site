// Show output
function showoutput (callback) {
  var linebrake = "<br>"
  var boldopen = "<b>"
  var boldclose = "</b>"
  var outputsummarymessage = document.getElementById('outputsummarymessage');
  var ciResponseText = document.getElementById('ciResponseText');


  checkCustomMessages(function(requestNotSupported, message) {

    if (requestNotSupported.length >= 1) {

      for (var property of message) {

        ciResponseText.insertAdjacentHTML("afterbegin",property+linebreak)

        message = [];

      }

    }
    else {

      if (message.length != 0) {
           var node = document.createElement("p");
           node.id = 'messagenotes';
           var textnode = document.createTextNode("");
           node.appendChild(textnode);
           node.innerHTML = "Notes:";
          document.getElementById("custommessage").appendChild(node);


      }

        for (var property of message) {

        var node = document.createElement("li");
        node.id = "notelistitem"
        var textnode = document.createTextNode(property);
        node.appendChild(textnode);
        node.innerHTML = property;
        document.getElementById("custommessage").appendChild(node);

        }


      }



      window.bodyBuilder.messagesToShow = [];

    });

    if (requestNotSupported.length == 0)
      {
        outputsummarymessage.innerHTML = "Example request header and body for request type "+boldopen+bodyBuilder.requesttype+boldclose+ " and providers " +boldopen+ bodyBuilder.checkBoxNames+boldclose+"."

        ciResponseText.innerHTML = JSON.stringify(bodyBuilder.completeRequestJSONObject, undefined, 2);

        if (bodyBuilder.keepOptionals && bodyBuilder.optionalFields.length > 0) {

          buildHeaderTable();
          buildFieldsTable(true, bodyBuilder.requesttype);

        }

        else {

            if (bodyBuilder.requiredFields.length >= 0) {
              buildHeaderTable();
              if (bodyBuilder.requiredFields.length > 0) {
                buildFieldsTable(false, bodyBuilder.requesttype);
              }
            }
        }
      }
  
  bodyBuilder.toremove = [];
  bodyBuilder.messagesToShow = [];
  window.requestNotSupported = [];
  bodyBuilder.ruleFields = [];
  bodyBuilder.requiredFields = [];
  bodyBuilder.condRequiredFields = [];
  bodyBuilder.optionalFields = [];
  bodyBuilder.optionalFieldstagingTable = [];
  bodyBuilder.optionalFieldTable = [];
  bodyBuilder.requiredFieldstagingTable = [];
  window.requiredFieldTable = [];
  window.allHeaderFields = [];
  window.uniqueHeaderFields = [];

  callback()

}
