var datadictDef = function() {
  var datadictToken = {
    provider_specific_data: {
      type: "object",
      shva: "optional",
      chasepaymentech: "optional",
      payeasecup: "required"
    },
    provider_specific_data__chasepaymentech: {
      type: "object",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details: {
      type: "object",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details____onlineReversalIndicator: {
      type: "string",
      chasepaymentech: "condrequired"
    },
    provider_specific_data__shva: {
      type: "object",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details: {
      type: "object",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____remove_from_batch: {
      type: "string",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____addendum1: {
      type: "string",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____addendum2: {
      type: "string",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____addendum1settl: {
      type: "string",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____addendum2settl: {
      type: "string",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____addendum3settl: {
      type: "string",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____addendum4settl: {
      type: "string",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____addendum5settl: {
      type: "string",
      shva: "optional"
    }
  };
  return datadictToken;
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
  module.exports = datadictDef;
else bodyBuilder.datadict = datadictDef();
