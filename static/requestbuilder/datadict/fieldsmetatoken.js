var datadictDef = function() {
  var datadictToken = {
    card_number: {
      type: "string",
      alfabank: "required",
      sberbank: "required",
      shva: "required",
      worldpayeu: "required",
      rsb: "required",
      braintree: "required",
      chasepaymentech: "required",
      cybersource: "required",
      payeasecup: "required",
      payucitrusindia: "required",
      payuindia: "required",
      payurussia: "required",
      payusouthafrica: "required",
      payukenya: "required",
      payunigeria: "required",
      stripe: "required",
      payuromania: "required",
      payuturkey: "required",
      payuargentina: "required",
      wirecard: "required",
      payuchile: "required",
      credorax: "required",
      safecharge: "required",
      payumexico: "required",
      payucolombia: "required",
      payubrazil: "required",
      payupanama: "required",
      payuperu: "required",
      vantiv: "required",
      payusingleplatform: "required",
      dalenys: "required",
      payeezy: "required"
    },
    additional_details: {
      type: "string",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    additional_details__card_vendor_name: {
      type: "string",
      payuargentina: "required",
      payubrazil: "required"
    },
    expiration_date: {
      type: "string",
      alfabank: "required",
      sberbank: "required",
      shva: "required",
      worldpayeu: "required",
      rsb: "required",
      braintree: "required",
      chasepaymentech: "required",
      cybersource: "required",
      payeasecup: "required",
      payucitrusindia: "optional",
      payuindia: "required",
      payurussia: "required",
      payusouthafrica: "required",
      payukenya: "required",
      payunigeria: "required",
      stripe: "required",
      payuromania: "required",
      payuturkey: "required",
      payuargentina: "required",
      wirecard: "required",
      payuchile: "required",
      credorax: "required",
      safecharge: "required",
      payumexico: "required",
      payucolombia: "required",
      payubrazil: "required",
      payupanama: "required",
      payuperu: "required",
      vantiv: "required",
      payusingleplatform: "required",
      payeezy: "required"
    },
    holder_name: {
      type: "string",
      alfabank: "required",
      sberbank: "required",
      shva: "required",
      worldpayeu: "required",
      rsb: "required",
      braintree: "required",
      chasepaymentech: "required",
      cybersource: "required",
      payeasecup: "required",
      payucitrusindia: "required",
      payuindia: "required",
      payurussia: "required",
      payusouthafrica: "required",
      payukenya: "required",
      payunigeria: "required",
      stripe: "required",
      payuromania: "required",
      payuturkey: "required",
      payuargentina: "required",
      wirecard: "required",
      payuchile: "required",
      credorax: "required",
      safecharge: "required",
      payumexico: "required",
      payucolombia: "required",
      payubrazil: "required",
      payupanama: "required",
      payuperu: "required",
      vantiv: "required",
      payusingleplatform: "required",
      dalenys: "required",
      payeezy: "required"
    },
    token_type: {
      type: "string",
      alfabank: "required",
      sberbank: "required",
      shva: "required",
      worldpayeu: "required",
      rsb: "required",
      braintree: "required",
      chasepaymentech: "required",
      cybersource: "required",
      payeasecup: "required",
      payucitrusindia: "required",
      payuindia: "required",
      payurussia: "required",
      payusouthafrica: "required",
      payukenya: "required",
      payunigeria: "required",
      stripe: "required",
      payuromania: "required",
      payuturkey: "required",
      payuargentina: "required",
      wirecard: "required",
      payuchile: "required",
      credorax: "required",
      safecharge: "required",
      payumexico: "required",
      payucolombia: "required",
      payubrazil: "required",
      payupanama: "required",
      payuperu: "required",
      vantiv: "required",
      payusingleplatform: "required",
      dalenys: "required",
      paypal: "required",
      payeezy: "required"
    },
    credit_card_cvv: {
      type: "string",
      alfabank: "optional",
      sberbank: "optional",
      shva: "optional",
      worldpayeu: "optional",
      rsb: "optional",
      braintree: "optional",
      chasepaymentech: "optional",
      cybersource: "optional",
      payeasecup: "optional",
      payucitrusindia: "optional",
      payuindia: "optional",
      payurussia: "optional",
      payusouthafrica: "optional",
      payukenya: "optional",
      payunigeria: "optional",
      stripe: "optional",
      payuromania: "optional",
      payuturkey: "optional",
      payuargentina: "optional",
      wirecard: "optional",
      payuchile: "optional",
      credorax: "required",
      safecharge: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional",
      dalenys: "optional",
      payeezy: "optional"
    },
    configuration_id: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "required"
        }
      }
    },
    description: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
    },
    vendor: {
      type: "string",
      paypal: "required"
    },
    identity_document: {
      type: "object",
      shva: "required",
      payeasecup: "required",
      payuargentina: "required",
      payuchile: "required",
      payumexico: "required",
      payucolombia: "required",
      payubrazil: "required",
      payupanama: "required",
      payuperu: "required"
    },
    identity_document__number: {
      type: "string",
      shva: "required",
      payeasecup: "required",
      payuargentina: "required",
      payuchile: "required",
      payumexico: "required",
      payucolombia: "required",
      payubrazil: "required",
      payupanama: "required",
      payuperu: "required"
    },
    identity_document__type: {
      type: "string",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "required",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    billing_address: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    billing_address__country: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    billing_address__state: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    billing_address__line1: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    billing_address__zip_code: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "required",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    billing_address__first_name: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "status"
    },
    billing_address__last_name: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    billing_address__email: {
      type: "object",
      payuargentina: "optional",
      payuchile: "optional",
      payumexico: "optional",
      payucolombia: "optional",
      payubrazil: "optional",
      payupanama: "optional",
      payuperu: "optional"
    },
    // description: {
    //   "type": "string",
    //   "paypal": {
    //     "ewallet": {
    //       "paypalbillingagreement": "optional"
    //     }
    //   },

    // },
    merchant_site_url: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "required"
        }
      }
    },
    name: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
    },
    provider_specific_data: {
      type: "object",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
    },
    provider_specific_data__immutable_shipping_address: {
      type: "boolean",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
    },
    provider_specific_data__merchant_custom_data: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
    },
    // holder_name: {
    //   "type": "string",
    //   "alfabank": "required",
    //   "sberbank": "required",
    //   "shva": "required",
    //   "worldpayeu": "required",
    //   "rsb": "required",
    //   "braintree": "required",
    //   "chasepaymentech": "required",
    //   "cybersource": "required",
    //   "payeasecup": "required",
    //   "payucitrusindia": "required",
    //   "payuindia": "required",
    //   "payurussia": "required",
    //   "payusouthafrica": "required",
    //   "payukenya": "required",
    //   "payunigeria": "required",
    //   "stripe": "required",
    //   "payuromania": "required",
    //   "payuturkey": "required",
    //   "payuargentina": "required",
    //   "wirecard": "required",
    //   "payuchile": "required",
    //   "credorax": "required",
    //   "safecharge": "required",
    //   "payumexico": "required",
    //   "payucolombia": "required",
    //   "payubrazil": "required",
    //   "payupanama": "required",
    //   "payuperu": "required",
    //   "vantiv": "required",
    //   "payusingleplatform": "required",
    //   "dalenys": "required",
    //   "payeezy": "required"
    // },
    // token_type: {
    //   "type": "string",
    //   "alfabank": "required",
    //   "sberbank": "required",
    //   "shva": "required",
    //   "worldpayeu": "required",
    //   "rsb": "required",
    //   "braintree": "required",
    //   "chasepaymentech": "required",
    //   "cybersource": "required",
    //   "payeasecup": "required",
    //   "payucitrusindia": "required",
    //   "payuindia": "required",
    //   "payurussia": "required",
    //   "payusouthafrica": "required",
    //   "payukenya": "required",
    //   "payunigeria": "required",
    //   "stripe": "required",
    //   "payuromania": "required",
    //   "payuturkey": "required",
    //   "payuargentina": "required",
    //   "wirecard": "required",
    //   "payuchile": "required",
    //   "credorax": "required",
    //   "safecharge": "required",
    //   "payumexico": "required",
    //   "payucolombia": "required",
    //   "payubrazil": "required",
    //   "payupanama": "required",
    //   "payuperu": "required",
    //   "vantiv": "required",
    //   "payusingleplatform": "required",
    //   "dalenys": "required",
    //   "payeezy": "required"

    // },
    // credit_card_cvv: {
    //   "type": "string",
    //   "alfabank": "optional",
    //   "sberbank": "optional",
    //   "shva": "optional",
    //   "worldpayeu": "optional",
    //   "rsb": "optional",
    //   "braintree": "optional",
    //   "chasepaymentech": "optional",
    //   "cybersource": "optional",
    //   "payeasecup": "optional",
    //   "payucitrusindia": "optional",
    //   "payuindia": "optional",
    //   "payurussia": "optional",
    //   "payusouthafrica": "optional",
    //   "payukenya": "optional",
    //   "payunigeria": "optional",
    //   "stripe": "optional",
    //   "payuromania": "optional",
    //   "payuturkey": "optional",
    //   "payuargentina": "optional",
    //   "wirecard": "optional",
    //   "payuchile": "optional",
    //   "credorax": "required",
    //   "safecharge": "optional",
    //   "payumexico": "optional",
    //   "payucolombia": "optional",
    //   "payubrazil": "optional",
    //   "payupanama": "optional",
    //   "payeezy": "optional",
    //   "payuperu": "optional",
    //   "dalenys": "optional"
    // },
    shipping_address: {
      type: "object",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    },
    shipping_address__country: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "rule"
        }
      }
      //new
    },
    shipping_address__state: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    },
    shipping_address__city: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "rule"
        }
      }
      //new
    },
    shipping_address__first_name: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    },
    shipping_address__last_name: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
    },
    shipping_address__line1: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "rule"
        }
      }
      //new
    },
    shipping_address__line2: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    },
    shipping_address__zip_code: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    },
    shipping_address__phone: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    },
    shipping_address__title: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    },
    shipping_address__email: {
      type: "string",
      paypal: {
        ewallet: {
          paypalbillingagreement: "optional"
        }
      }
      //new
    }
  };
  return datadictToken;
};
if (typeof module !== "undefined" && typeof module.exports !== "undefined")
  module.exports = datadictDef;
else bodyBuilder.datadict = datadictDef();
