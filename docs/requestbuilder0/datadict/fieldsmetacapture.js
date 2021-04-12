var datadictDef = function() {
  var datadictCapture = {
    additional_details: {
      type: "object",
      paypal: "optional"
    },
    additional_details__is_final_capture: {
      type: "string",
      paypal: "optional"
    },
    reconciliation_id: {
      type: "string",
      cybersource: "optional",
      payusouthafrica: "optional",
      payukenya: "optional",
      payunigeria: "optional",
      wirecard: "optional",
      credorax: "optional",
      safecharge: "optional",
      dalenys: "optional",
      payeezy: "optional",
      payuasiapacific: "required",
      shva: "optional"
    },
    amount: {
      type: "integer",
      alfabank: "optional",
      sberbank: "optional",
      braintree: "optional",
      chasepaymentech: "optional",
      cybersource: "optional",
      payeasecup: "optional",
      payucitrusindia: "optional",
      shva: "optional",
      rsb: "optional",
      worldpayeu: "optional",
      payurussia: "optional",
      payusouthafrica: "optional",
      payukenya: "optional",
      payunigeria: "optional",
      wirecard: "optional",
      payuargentina: "optional",
      credorax: "optional",
      safecharge: "optional",
      payumexico: "optional",
      payubrazil: "optional",
      dalenys: "optional",
      paypal: "optional",
      payeezy: "optional",
      payuasiapacific: "optional"
    },
    provider_specific_data: {
      type: "object",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech: {
      type: "object",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details: {
      type: "object",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn1: {
      type: "string",
      chasepaymentech: "rule"
    },
    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn2: {
      type: "string",
      chasepaymentech: "rule"
    },
    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn3: {
      type: "string",
      chasepaymentech: "rule"
    },
    provider_specific_data__chasepaymentech___additional_details____AMEXTranAdvAddn4: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3: {
      type: "object",
      chasepaymentech: "optional"
    },
    level_2_3__discount_amount: {
      type: "integer",
      chasepaymentech: "optional"
    },
    level_2_3__duty_amount: {
      type: "integer",
      chasepaymentech: "optional"
    },
    level_2_3__from_shipping_zip_code: {
      type: "string",
      chasepaymentech: "optional"
    },
    level_2_3__line_items: {
      type: "array",
      chasepaymentech: "optional"
    },
    level_2_3__line_items___commodity_code: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___discount_amount: {
      type: "integer",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___discount_percentage: {
      type: "number",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___id: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___name: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___quantity: {
      type: "integer",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___sub_total: {
      type: "integer",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___tax_amount: {
      type: "integer",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___tax_percentage: {
      type: "number",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___unit_of_measure: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__line_items___unit_price: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__order_id: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address: {
      type: "object",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___city: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___country: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___first_name: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___last_name: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___line1: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___line2: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___state: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_address___zip_code: {
      type: "string",
      chasepaymentech: "rule"
    },
    level_2_3__shipping_amount: {
      type: "integer",
      chasepaymentech: "optional"
    },
    level_2_3__tax_amount: {
      type: "integer",
      chasepaymentech: "rule"
    },
    level_2_3__tax_mode: {
      type: "string",
      chasepaymentech: "rule"
    }
  };
  return datadictCapture;
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
  module.exports = datadictDef;
else bodyBuilder.datadict = datadictDef();
