function removefields () {

  // console.log(bodyBuilder.toremove)

  for (var property of bodyBuilder.toremove.sort().reverse()) {

    var hasParent = property.includes("__");
    var hasParentL2 = property.includes("___");
    var hasParentL3 = property.includes("____");
    var hasParentL4 = property.includes("_____");

    if (!hasParent){
      delete bodyBuilder.completeRequestJSONObject[property]}

      // Check if there's a level1 parent and make sure it's not a level2
      else if (hasParent & (property.indexOf("___")==-1)) {

        var parent = property.substr(0, property.indexOf('__'));
        var prop = property.split('__')[1];

          delete bodyBuilder.completeRequestJSONObject[parent][prop]
      }

      // Check if there's a level2 parent and make sure it's not a level3
      else if (hasParentL2 & (property.indexOf("____")==-1)) {

        var parentL2 = property.substr(0, property.indexOf('___'));

        // Decompose the property and construct the path
        var prop = property.split('___')[1];
        var parent = parentL2.split('__')[1];
        var source = parentL2.substr(0, property.indexOf('__'));

        // Delete the property.
        delete bodyBuilder.completeRequestJSONObject[source][parent][prop]

        // The parent may be an array!
        if (Array.isArray(bodyBuilder.completeRequestJSONObject[source][parent])) {

          bodyBuilder.completeRequestJSONObject[source][parent].forEach(function(key, index, value) {

          for (var key in bodyBuilder.completeRequestJSONObject[source][parent]) {
            if (bodyBuilder.completeRequestJSONObject[source][parent].hasOwnProperty(key)) {

                delete bodyBuilder.completeRequestJSONObject[source][parent][key][prop]
              }

                }
              });

          }

        }




        else if (hasParentL3 & property.indexOf("_____")==-1) {

          var parentL3 = property.substr(0, property.indexOf('____'));

          var prop = property.split('____')[1];
          var parentL1 = parentL3.split('___')[1];
          var parentL2 = property.split('__')[1];
          var source = parentL3.substr(0, property.indexOf('__'));
            delete bodyBuilder.completeRequestJSONObject[source][parentL2][parentL1][prop]
          }

        else if (hasParentL4) {

            var parentL4 = property.substr(0, property.indexOf('_____'));
            var prop = property.split('_____')[1];
            var parentL1 = parentL4.split('____')[1];
            var parentL2 = property.split('___')[1];
            var parentL3 = property.split('__')[1];
            var source = parentL4.substr(0, property.indexOf('__'));
            delete bodyBuilder.completeRequestJSONObject[source][parentL3][parentL2][parentL1][prop]
            }
      
          

    }

}
