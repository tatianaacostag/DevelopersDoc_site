$.getJSON("/requestbuilder/configlookups/_unsupportedrequests.json", function(json) {
    bodyBuilder.unsupportedRequests = json;
});

$.getJSON("/requestbuilder/configlookups/supportedThreedDSProviders.json", function(json) {
    bodyBuilder.supportedTreeDsProviders = json;
});