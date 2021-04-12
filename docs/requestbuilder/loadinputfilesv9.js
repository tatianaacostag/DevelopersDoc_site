const filesLoadedOK = "filesloadedok"
const filesLoadError = "filesloaderror"

function loadInputFiles(selection) {

    if (sessionStorage.getItem('fileloadstatus')!= null) sessionStorage.removeItem('fileloadstatus');
 
    if (selection == "Payment") {
        
        loadPayments()
    
    } else if (selection == "Authorize" || selection == "Charge" || selection == "Credit") {

        getScripts(["/requestbuilder/datadict/fieldsmetaauthorizechargecredit.js", "/requestbuilder/messages/authorizechargecreditmessages.js", "/requestbuilder/fielddescriptions/authorizechargecreditfielddescriptions.js"], function (scriptsloaded, status) {
            if (status == 'done') {  

                setFileLoadStatus(scriptsloaded, filesLoadedOK);
                bodyBuilder.completerequestbody = ["/requestbuilder/requestbodies/requestjsonauthorizecharge.json"];
            }
            else {
                setFileLoadStatus (filesLoadError)
            }
        });
    } else if (selection == "Capture") {
        getScripts(["/requestbuilder/datadict/fieldsmetacapture.js", "/requestbuilder/messages/capturemessages.js", "/requestbuilder/fielddescriptions/capturefielddescriptions.js"], function (scriptsloaded, status) {
            if (status == 'done') {
                setFileLoadStatus(scriptsloaded, filesLoadedOK);
                bodyBuilder.completerequestbody = ["/requestbuilder/requestbodies/requestjsoncapture.json"];
            }
            else {
                setFileLoadStatus (scriptsloaded, filesLoadError)
            }
        });
    }
    else if (selection == "Void") {
        getScripts(["/requestbuilder/datadict/fieldsmetavoid.js", "/requestbuilder/messages/voidmessages.js", "/requestbuilder/fielddescriptions/voidfielddescriptions.js"], function (scriptsloaded, status) {
            if (status == 'done') {
                setFileLoadStatus(scriptsloaded, filesLoadedOK);
                bodyBuilder.completerequestbody = ["/requestbuilder/requestbodies/requestjsonvoid.json"];
            }
            else {
                setFileLoadStatus (scriptsloaded, filesLoadError)
            }
        });
    }
    else if (selection == "Refund") {
        getScripts(["/requestbuilder/datadict/fieldsmetarefund.js", "/requestbuilder/messages/refundmessages.js", "/requestbuilder/fielddescriptions/refundfielddescriptions.js"], function (scriptsloaded, status) {
            if (status == 'done') {
                setFileLoadStatus(scriptsloaded,filesLoadedOK);
                bodyBuilder.completerequestbody = ["/requestbuilder/requestbodies/requestjsonrefund.json"];
            }
            else {
                setFileLoadStatus (scriptsloaded, filesLoadError)
            }
        });
    }

    else if (selection == "Token") {
        getScripts(["/requestbuilder/datadict/fieldsmetatoken.js", "/requestbuilder/messages/tokenmessages.js", "/requestbuilder/fielddescriptions/tokenfielddescriptions.js"], function (scriptsloaded, status) {
            if (status == 'done') {
                setFileLoadStatus(scriptsloaded, filesLoadedOK);
                bodyBuilder.completerequestbody = ["/requestbuilder/requestbodies/requestjsontoken.json"];
            }
            else {
                setFileLoadStatus (scriptsloaded, filesLoadError)
            }
        });
    }
}

function loadPayments() {

    getScripts(["/requestbuilder/datadict/fieldsmetapayment.js", "/requestbuilder/messages/paymentmessages.js", "/requestbuilder/fielddescriptions/paymentfielddescriptions.js"], function (scriptsloaded, status) {
        if (status == 'done') {
            setFileLoadStatus(scriptsloaded, filesLoadedOK);
            bodyBuilder.completerequestbody = ["/requestbuilder/requestbodies/requestjsonpayment.json"];
        }
        else {
            setFileLoadStatus (scriptsloaded, filesLoadError)
        }
    });
  }

function getScripts(scripts, callback) {
    // clearSelectionOnRequestChange();
    var progress = 0;
    scripts.forEach(function(script) { 
        $.getScript(script, function () {
            if (++progress == scripts.length) callback(scripts, "done");
        }); 
    });
}


function setFileLoadStatus(filesloaded, fileloadstatus) {

    sessionStorage.setItem('fileloadstatus', fileloadstatus);

    // console.log (filesloaded + " " + fileloadstatus)
}