var datadictDef = function() {
  var datadictPayments = {
    currency: {
      type: "string",
      alipay: "required",
      alfabank: "required",
      sberbank: "required",
      braintree: "required",
      chasepaymentech: "required",
      cybersource: "required",
      payeasecup: "required",
      payucitrusindia: "required",
      payuindia: "required",
      shva: "required",
      rsb: "required",
      worldpayeu: "required",
      payurussia: "required",
      payusouthafrica: "required",
      payukenya: "required",
      payunigeria: "required",
      stripe: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "required",
      payuargentina: {
        ccards: "required",
        cash: "required"
      },
      payuchile: {
        ccards: "required",
        dredirect: "required",
        cash: "required"
      },
      payumexico: {
        ccards: "required",
        cash: "required"
      },
      payucolombia: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
      credorax: "required",
      safecharge: "required",
      payubrazil: {
        ccards: "required",
        cash: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required",
        cash: "required"
      },
      vantiv: "required",
      payusingleplatform: "required",
      paypal: "required",
      dalenys: "required",
      payeezy: "required",
      payuasiapacific: {
        ewallet: "required"
      },
      //new
    },
    amount: {
      type: "integer",
      alipay: "required",
      alfabank: "required",
      sberbank: "required",
      braintree: "required",
      chasepaymentech: "required",
      cybersource: "required",
      payeasecup: "required",
      payucitrusindia: "required",
      payuindia: "required",
      shva: "required",
      rsb: "required",
      worldpayeu: "required",
      payurussia: "required",
      payusouthafrica: "required",
      payukenya: "required",
      payunigeria: "required",
      stripe: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "required",
      payuargentina: {
        ccards: "required",
        cash: "required"
      },
      payuchile: {
        ccards: "required",
        dredirect: "required",
        cash: "required"
      },
      payumexico: {
        ccards: "required",
        cash: "required"
      },
      payucolombia: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
      credorax: "required",
      safecharge: "required",
      payubrazil: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
      vantiv: "required",
      payusingleplatform: "required",
      paypal: "required",
      dalenys: "required",
      payeezy: "required",
      payuasiapacific: {
        ewallet: "required"
      },
      //new
    },
    additional_details: {
      type: "string",
      wirecard: "optional"
      //new
    },
    customer_id: {
      type: "string",
      safecharge: "optional",
      dalenys: "optional"
      //new
    },
    order: {
      type: "object",
      alfabank: "required",
      sberbank: "required",
      payuindia: "required",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "required"
      },
      payuchile: {
        ccards: "required"
      },
      payumexico: {
        ccards: "required"
      },
      payucolombia: {
        ccards: "required"
      },
      credorax: "optional",
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      },
      vantiv: "required",
      safecharge: "required",
      payusingleplatform: "required",
      paypal: "optional",
      dalenys: "optional",
      worldpayeu: "optional"
      //new
    },
    order__additional_details: {
      type: "object",
      payuindia: "optional"
    },
    order__id: {
      type: "string",
      alfabank: "required",
      sberbank: "required",
      payuindia: "required",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      credorax: "optional",
      safecharge: "optional",
      vantiv: "required",
      payusingleplatform: "required",
      paypal: "optional",
      dalenys: "optional",
      worldpayeu: "optional"
      //new
    },
    order__tax_amount: {
      type: "integer",
      payuargentina: {
        ccards: "required"
      },
      payuchile: {
        ccards: "required"
      },
      payumexico: {
        ccards: "required"
      },
      payucolombia: {
        ccards: "required"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      },
      paypal: "optional"
      //new
    },
    order__line_items: {
      type: "array",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      safecharge: "required",
      payusingleplatform: "required",
      paypal: "optional",
      dalenys: "optional"
      //new
    },
    order__line_items___name: {
      type: "string",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      safecharge: "required",
      payusingleplatform: "required",
      paypal: "optional",
      dalenys: "optional"
      //new
    },
    order__line_items___id: {
      type: "string",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      payusingleplatform: "required",
      paypal: "optional",
      dalenys: "optional"
      //new
    },
    order__line_items___tax_percentage: {
      type: "double",
      payurussia: "optional",
      payuromania: "optional",
      payuturkey: "optional"
      //new
    },
    order__line_items___quantity: {
      type: "integer",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      safecharge: "required",
      payusingleplatform: "required",
      paypal: "rule",
      dalenys: "optional"
      //new
    },
    order__line_items___unit_price: {
      type: "integer",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      safecharge: "required",
      payusingleplatform: "required",
      paypal: "rule",
      dalenys: "optional"
      //new
    },
    billing_address: {
      type: "object",
      credorax: "required",
      chasepaymentech: "optional",
      cybersource: "required",
      payeasecup: "required",
      payuindia: "required",
      shva: "optional",
      vantiv: "optional",
      worldpayeu: "required",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "required",
      payubrazil: {
        ccards: "optional",
        cash: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "required"
      },
      payusingleplatform: "optional",
      paypal: "optional",
      dalenys: "optional",
      payeezy: "optional",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "required",
        ewallet: "required"
      },
      payunigeria: {
        ccards: "optional",
        banktransfer: "optional"
      },
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__phone: {
      type: "string",
      chasepaymentech: "optional",
      payeasecup: "required",
      payuindia: "required",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      credorax: "optional",
      safecharge: "optional",
      paypal: "optional",
      dalenys: "optional",
      payeezy: "optional",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "required",
        ewallet: "required"
      },
      payunigeria: {
        ccards: "optional",
        banktransfer: "optional"
      },
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__first_name: {
      type: "string",
      // worldpayeu: "optional",
      chasepaymentech: "optional",
      cybersource: "required",
      payuindia: "required",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "required"
      },
      paypal: "optional",
      dalenys: "optional",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "required",
        ewallet: "required"
      },
      payunigeria: {
        ccards: "optional",
        banktransfer: "optional"
      },
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__last_name: {
      type: "string",
      // worldpayeu: "optional",
      chasepaymentech: "optional",
      cybersource: "required",
      payuindia: "optional",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "required"
      },
      paypal: "optional",
      dalenys: "optional",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "required",
        ewallet: "required"
      },
      payunigeria: {
        ccards: "optional",
        banktransfer: "optional"
      },
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__country: {
      type: "string",
      chasepaymentech: "optional",
      cybersource: "required",
      payuindia: "optional",
      worldpayeu: "required",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "rule"
      },
      payuchile: {
        ccards: "optional",
        cash: "rule"
      },
      payumexico: {
        ccards: "optional",
        cash: "rule"
      },
      payucolombia: {
        ccards: "optional",
        cash: "rule"
      },
      credorax: "condrequired",
      safecharge: "required",
      payubrazil: {
        ccards: "optional",
        cash: "rule"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "required"
      },
      paypal: "rule",
      dalenys: "optional",
      payeezy: "optional",
      payusingleplatform: "optional",
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__state: {
      type: "string",
      chasepaymentech: "optional",
      cybersource: "required",
      payuindia: "optional",
      worldpayeu: "required",
      wirecard: "optional",
      safecharge: "optional",
      payuargentina: {
        ccards: "optional"
      },
      payuchile: {
        ccards: "optional"
      },
      payumexico: {
        ccards: "optional"
      },
      payucolombia: {
        ccards: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      },
      paypal: "optional",
      payeezy: "optional",
      payusingleplatform: "optional",
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__city: {
      type: "string",
      chasepaymentech: "optional",
      cybersource: "required",
      payuindia: "optional",
      shva: "optional",
      worldpayeu: "required",
      wirecard: "optional",
      credorax: "condrequired",
      safecharge: "optional",
      paypal: "optional",
      dalenys: "optional",
      payeezy: "optional",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      payusingleplatform: "optional",
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__line1: {
      type: "string",
      chasepaymentech: "optional",
      cybersource: "required",
      payuindia: "optional",
      shva: "optional",
      worldpayeu: "required",
      vantiv: "optional",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional"
      },
      wirecard: "optional",
      payuchile: {
        ccards: "optional"
      },
      payumexico: {
        ccards: "optional"
      },
      payucolombia: {
        ccards: "optional"
      },
      credorax: "condrequired",
      safecharge: "optional",
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "required"
      },
      paypal: "rule",
      dalenys: "optional",
      payeezy: "optional",
      payusingleplatform: "optional"
      //new
    },
    billing_address__line2: {
      type: "string",
      chasepaymentech: "optional",
      credorax: "condrequired",
      payuindia: "optional",
      vantiv: "optional",
      wirecard: "optional",
      safecharge: "optional",
      paypal: "optional",
      payeezy: "optional"
      //new
    },
    billing_address__title: {
      type: "string",
      wirecard: "optional"
      //new
    },
    billing_address__zip_code: {
      type: "string",
      cybersource: "required",
      payuindia: "optional",
      shva: "optional",
      worldpayeu: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional"
      },
      payuchile: {
        ccards: "optional"
      },
      payumexico: {
        ccards: "optional"
      },
      payucolombia: {
        ccards: "optional"
      },
      credorax: "condrequired",
      safecharge: "optional",
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      },
      paypal: "optional",
      dalenys: "optional",
      chasepaymentech: "optional",
      payusingleplatform: "optional",
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    billing_address__email: {
      type: "string",
      cybersource: "required",
      payuindia: "required",
      payurussia: "required",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional"
      },
      payuchile: {
        ccards: "optional"
      },
      payumexico: {
        ccards: "optional"
      },
      payucolombia: {
        ccards: "required"
      },
      credorax: "required",
      safecharge: "required",
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "required"
      },
      payusingleplatform: "optional",
      paypal: "optional",
      payeezy: "optional",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "required",
        ewallet: "required"
      },
      payunigeria: {
        ccards: "optional",
        banktransfer: "optional"
      },
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    },
    shipping_address: {
      type: "object",
      credorax: "condrequired",
      cybersource: "required",
      payucitrusindia: "required",
      worldpayeu: "optional",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      paypal: "optional",
      dalenys: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__country: {
      type: "string",
      credorax: "condrequired",
      cybersource: "required",
      worldpayeu: "rule",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "rule"
      },
      payuchile: {
        ccards: "optional",
        cash: "rule"
      },
      payumexico: {
        ccards: "optional",
        cash: "rule"
      },
      payucolombia: {
        ccards: "optional",
        cash: "rule"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "rule"
      },
      paypal: "rule",
      dalenys: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__state: {
      type: "string",
      credorax: "condrequired",
      cybersource: "required",
      worldpayeu: "rule",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      paypal: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__city: {
      type: "string",
      credorax: "condrequired",
      cybersource: "required",
      worldpayeu: "rule",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      paypal: "optional",
      dalenys: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__first_name: {
      type: "string",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      paypal: "optional",
      dalenys: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__last_name: {
      type: "string",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      //new
      paypal: "optional",
      dalenys: "optional",
      payusingleplatform: "optional",
    },
    shipping_address__line1: {
      type: "string",
      credorax: "condrequired",
      cybersource: "required",
      worldpayeu: "rule",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      paypal: "rule",
      dalenys: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__line2: {
      type: "string",
      credorax: "condrequired",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      paypal: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__zip_code: {
      type: "string",
      credorax: "condrequired",
      cybersource: "required",
      worldpayeu: "rule",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "optional"
      },
      paypal: "optional",
      dalenys: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__phone: {
      type: "string",
      payucitrusindia: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "required"
      },
      paypal: "optional",
      dalenys: "optional",
      payusingleplatform: "optional",
      //new
    },
    shipping_address__title: {
      type: "string",
      wirecard: "optional"
      //new
    },
    shipping_address__email: {
      type: "string",
      credorax: "optional",
      payucitrusindia: "required",
      wirecard: "optional",
      payuargentina: {
        ccards: "optional",
        cash: "optional"
      },
      payuchile: {
        ccards: "optional",
        cash: "optional"
      },
      payumexico: {
        ccards: "optional",
        cash: "optional"
      },
      payucolombia: {
        ccards: "optional",
        cash: "optional"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "optional",
        cash: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional",
        cash: "required"
      },
      paypal: "optional",
      payusingleplatform: "optional",
      //new
    },
    statement_soft_descriptor: {
      type: "string",
      chasepaymentech: "optional",
      shva: "optional",
      stripe: "optional",
      wirecard: "optional",
      payuargentina: {
        ccards: "required",
        cash: "required"
      },
      payuchile: {
        ccards: "required",
        dredirect: "required",
        cash: "required"
      },
      payumexico: {
        ccards: "required",
        cash: "required"
      },
      payucolombia: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
      safecharge: "optional",
      payubrazil: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required",
        cash: "required"
      },
      vantiv: "optional",
      paypal: "optional",
      payeezy: "optional",
      worldpayeu: "optional",
      payuasiapacific: {
        ewallet: "optional"
      },
      //new
    }
  };
  return datadictPayments;
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
  module.exports = datadictDef;
else bodyBuilder.datadict = datadictDef();
