var datadictDef = function() {
  var datadictRefund = {
    reconciliation_id: {
      type: "string",
      alipay: "required",
      cybersource: "optional",
      shva: "optional",
      payusouthafrica: "required",
      payukenya: "required",
      payunigeria: "required",
      stripe: "optional",
      wirecard: "optional",
      credorax: "optional",
      safecharge: "optional",
      dalenys: "optional",
      payeezy: "optional",
      payuasiapacific: "required"
    },
    amount: {
      type: "integer",
      alipay: "optional",
      alfabank: "optional",
      sberbank: "optional",
      chasepaymentech: "optional",
      cybersource: "optional",
      payucitrusindia: "optional",
      payuindia: {
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      shva: "optional",
      rsb: "optional",
      worldpayeu: "optional",
      payurussia: "optional",
      payusouthafrica: "optional",
      payukenya: "optional",
      payunigeria: "optional",
      payusingleplatform: "optional",
      stripe: "optional",
      payuromania: "optional",
      payuturkey: "optional",
      wirecard: "optional",
      payuargentina: "optional",
      payuchile: "optional",
      credorax: "optional",
      safecharge: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional",
      dalenys: "optional",
      paypal: "optional",
      payeezy: "optional",
      payuasiapacific: "optional"
    },
    capture_id: {
      type: "string",
      wirecard: "optional",
      paypal: "optional",
      payeezy: "optional"
    },
    refund_reason: {
      type: "string",
      stripe: "optional",
      payuargentina: "required",
      payuchile: "required",
      safecharge: "optional",
      payumexico: "required",
      payucolombia: "required",
      payubrazil: "required",
      payupanama: "required",
      payuperu: "required",
      alipay: "optional"
    },
    provider_specific_data: {
      type: "object",
      shva: "optional"
    },
    provider_specific_data__shva: {
      type: "object",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details: {
      type: "object",
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

  return datadictRefund;
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
  module.exports = datadictDef;
else bodyBuilder.datadict = datadictDef();
