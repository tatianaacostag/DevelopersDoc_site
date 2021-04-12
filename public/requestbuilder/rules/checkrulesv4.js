function checkRules() {

  executeParentRules();
  executeLevelOneRules();

}



function makeFieldRequiredBasedOnField(fieldToMakeRequired) {
    if (bodyBuilder.ruleFields.indexOf(fieldToMakeRequired) != -1) {

        if (bodyBuilder.toremove.indexOf(fieldToMakeRequired) != -1) {
            var index = bodyBuilder.toremove.indexOf(fieldToMakeRequired);
            if (index >= 0) {
                bodyBuilder.toremove.splice(index, 1);
                bodyBuilder.requiredFields.push(fieldToMakeRequired)
            }
        }

        if (bodyBuilder.optionalFields.indexOf(fieldToMakeRequired) != -1) {
            var index = bodyBuilder.optionalFields.indexOf(fieldToMakeRequired);
            if (index >= 0) {
                bodyBuilder.optionalFields.splice(index, 1);
                bodyBuilder.requiredFields.push(fieldToMakeRequired)
            }
        }

    }

}

function makeFieldConditionallyRequiredBasedOnField(fieldToMakeConditionallyRequired) {
    if (bodyBuilder.ruleFields.indexOf(fieldToMakeConditionallyRequired) != -1) {

        if (bodyBuilder.toremove.indexOf(fieldToMakeConditionallyRequired) != -1) {
            var index = bodyBuilder.toremove.indexOf(fieldToMakeConditionallyRequired);
            if (index >= 0) {
                bodyBuilder.toremove.splice(index, 1);
                bodyBuilder.condRequiredFields.push(fieldToMakeConditionallyRequired)
            }
        }

        if (bodyBuilder.optionalFields.indexOf(fieldToMakeConditionallyRequired) != -1) {
            var index = bodyBuilder.optionalFields.indexOf(fieldToMakeConditionallyRequired);
            if (index >= 0) {
                bodyBuilder.optionalFields.splice(index, 1);
                bodyBuilder.condRequiredFields.push(fieldToMakeConditionallyRequired)
            }
        }

    }

}

// Rule field is either in toremove or already in the optionals array.
// So only check if the field is in toremove.
function makeFieldOptionalBasedOnField(fieldToMakeOptional) {
    if (bodyBuilder.ruleFields.indexOf(fieldToMakeOptional) != -1) {

        if (bodyBuilder.toremove.indexOf(fieldToMakeOptional) != -1) {
            var index = bodyBuilder.toremove.indexOf(fieldToMakeOptional);
            if (index >= 0) {
                bodyBuilder.toremove.splice(index, 1);
                bodyBuilder.optionalFields.push(fieldToMakeOptional)
            }
        }

    }

}
// basedOnParentRuleOnly: the children aren't rule fields.
function makeFieldsUnsupported(fieldToMakeUnsupported, basedOnParentRuleOnly) {

   
        if (basedOnParentRuleOnly) {
            checkInArrays(fieldToMakeUnsupported);

        }

        else if (!basedOnParentRuleOnly) {
            if (bodyBuilder.toremove.indexOf(fieldToMakeUnsupported) != -1) { 
                if (bodyBuilder.ruleFields.indexOf(fieldToMakeUnsupported) != -1) {
                    checkInArrays(fieldToMakeUnsupported);
                }
            }   
           
        }

        bodyBuilder.toremove.push (fieldToMakeUnsupported)

    
}


function checkInArrays(fieldToMakeUnsupported) {

    if (bodyBuilder.requiredFields.indexOf(fieldToMakeUnsupported)!=-1 ) {
        
        var index = bodyBuilder.requiredFields.indexOf(fieldToMakeUnsupported);
        bodyBuilder.requiredFields.splice(index, 1)

      }

      if (bodyBuilder.optionalFields.indexOf(fieldToMakeUnsupported)!=-1 ) {

        var index = bodyBuilder.optionalFields.indexOf(fieldToMakeUnsupported);
        bodyBuilder.optionalFields.splice(index, 1)

      }

      if (bodyBuilder.condRequiredFields.indexOf(fieldToMakeUnsupported)!=-1 ) {

        var index = bodyBuilder.condRequiredFields.indexOf(fieldToMakeUnsupported);
        bodyBuilder.condRequiredFields.splice(index, 1)

      }

}
