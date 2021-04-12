var datadictDef = function() {
  var datadictAuthChargeCredit = {
    channel_type: {
      type: "string",
      credorax: "optional",
      shva: "optional"
    },
    installments: {
      type: "object",
      shva: "rule",
      payuromania: "rule",
      payuturkey: {
        ccards: "rule"
      },
      payuargentina: {
        ccards: "rule"
      },
      payuchile: {
        ccards: "rule"
      },
      payumexico: {
        ccards: "rule"
      },
      payucolombia: {
        ccards: "rule"
      },
      payubrazil: {
        ccards: "rule"
      },
      payupanama: {
        ccards: "rule"
      },
      payuperu: {
        ccards: "rule"
      }
      //new
    },
    installments__number_of_installments: {
      type: "integer",
      shva: "rule",
      payuromania: "rule",
      payuturkey: {
        ccards: "rule"
      },
      payuargentina: {
        ccards: "rule"
      },
      payuchile: {
        ccards: "rule"
      },
      payumexico: {
        ccards: "rule"
      },
      payucolombia: {
        ccards: "rule"
      },
      payubrazil: {
        ccards: "rule"
      },
      payupanama: {
        ccards: "rule"
      },
      payuperu: {
        ccards: "rule"
      }
      //new
    },
    installments__first_payment_amount: {
      type: "integer",
      shva: "rule"
      //new
    },
    installments__remaining_payments_amount: {
      type: "integer",
      shva: "rule"
      //new
    },
    reconciliation_id: {
      type: "string",
      alipay: "optional",
      alfabank: "optional",
      rsb: "optional",
      sberbank: "optional",
      shva: "optional",
      braintree: "optional",
      chasepaymentech: "optional",
      cybersource: "optional",
      payeasecup: "required",
      payucitrusindia: "required",
      payuindia: "required",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional"
      },
      payunigeria: {
        ccards: "optional",
        banktransfer: "optional"
      },
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
      credorax: "optional",
      safecharge: "optional",
      payumexico: {
        ccards: "required",
        cash: "required"
      },
      payucolombia: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
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
      worldpayeu: "optional",
      payusingleplatform: "required",
      dalenys: "optional",
      payeezy: "optional",
      payuasiapacific: {
        ewallet: "required"
      }
      //new
    },
    merchant_site_url: {
      type: "string",
      alipay: "required",
      credorax: "rule",
      rsb: "optional",
      sberbank: "condrequired",
      payucitrusindia: "required",
      payuindia: "required",
      safecharge: "rule",
      payurussia: {
        ccards: "optional",
        banktransfer: "required"
      },
      payuromania: "optional",
      payuturkey: {
        ccards: "optional",
        banktransfer: {
          bkm: "required",
          compay: "required"
        }
      },
      payuargentina: {
        cash: "optional"
      },
      payuchile: {
        dredirect: "required",
        cash: "required"
      },
      payumexico: {
        cash: "optional"
      },
      payucolombia: {
        cash: "optional",
        banktransfer: "required"
      },
      payubrazil: {
        cash: "optional"
      },
      payupanama: {},
      payuperu: {
        cash: "optional"
      },
      payusingleplatform: "required",
      paypal: {
        ewallet: {
          paypalexpress: "required"
        }
      },
      dalenys: "rule",
      payusouthafrica: {
        ccards: "rule",
        banktransfer: "required",
        ewallet: "required",
        loyalty: "required"
      },
      payukenya: {
        ccards: "rule",
        banktransfer: "required",
        ewallet: "required"
      },
      payunigeria: {
        ccards: "rule",
        banktransfer: "required"
      },
      payuasiapacific: {
        ewallet: "required"
      }
    },
    payment_method: {
      type: "object",
      alipay: "required",
      alfabank: "required",
      sberbank: "required",
      shva: "required",
      worldpayeu: "required",
      rsb: "required",
      braintree: "required",
      chasepaymentech: "required",
      cybersource: "required",
      payeasecup: "required",
      payuindia: "required",
      payucitrusindia: "required",
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
      credorax: "required",
      safecharge: "required",
      payumexico: {
        ccards: "required",
        cash: "required"
      },
      payucolombia: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
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
      payuasiapacific: "required"

      //new
    },
    payment_method__type: {
      type: "string",
      alipay: "required",
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
      credorax: "required",
      safecharge: "required",
      payumexico: {
        ccards: "required",
        cash: "required"
      },
      payucolombia: {
        ccards: "required",
        cash: "required",
        banktransfer: "required"
      },
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
      }

      //new
    },
    payment_method__token: {
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
      wirecard: "required",
      payuargentina: {
        ccards: "required"
      },
      payuchile: {
        ccards: "required"
      },
      credorax: "required",
      safecharge: "required",
      payumexico: {
        ccards: "required"
      },
      payucolombia: {
        ccards: "required"
      },
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
      payusingleplatform: {
        ccards: "required"
      },
      paypal: {
        ewallet: {
          paypalbillingagreement: "required"
        }
      },
      dalenys: "required",
      payeezy: "required"
      //new
    },
    payment_method__source_type: {
      type: "string",
      payucitrusindia: {
        banktransfer: "required"
      },
      payuindia: {
        banktransfer: "required",
        ewallet: "required",
        loyalty: "required"
      },
      payurussia: {
        banktransfer: "required"
      },
      payuturkey: {
        banktransfer: "required"
      },
      payuargentina: {
        cash: "required"
      },
      payuchile: {
        dredirect: "required",
        cash: "required"
      },
      payumexico: {
        cash: "required"
      },
      payucolombia: {
        cash: "required",
        banktransfer: "required"
      },
      payubrazil: {
        cash: "required"
      },
      payupanama: {},
      payuperu: {
        cash: "required"
      },
      payusingleplatform: {
        banktransfer: "required"
      },
      paypal: "required",
      payusouthafrica: {
        banktransfer: "required",
        ewallet: "required",
        loyalty: "required",
        paymentpage: "required"
      },
      payukenya: {
        banktransfer: "required",
        ewallet: "required",
        paymentpage: "required"
      },
      payunigeria: {
        banktransfer: "required",
        paymentpage: "required"
      },
      alipay: "required",
      payuasiapacific: {
        ewallet: "required"
      }
      //new
    },
    payment_method__vendor: {
      type: "string",
      payucitrusindia: {
        banktransfer: "required"
      },
      payuindia: {
        banktransfer: "required",
        ewallet: "required",
        loyalty: "required"
      },
      payurussia: {
        banktransfer: "required"
      },
      payuturkey: {
        banktransfer: "required"
      },
      payuargentina: {
        cash: "required"
      },
      payuchile: {
        dredirect: "required",
        cash: "required"
      },
      payumexico: {
        cash: "required"
      },
      payucolombia: {
        cash: "required",
        banktransfer: "required"
      },
      payubrazil: {
        cash: "required"
      },
      payuperu: {
        cash: "required"
      },
      payusingleplatform: {
        banktransfer: "required"
      },
      paypal: {
        ewallet: {
          paypalexpress: "required"
        }
      },
      payusouthafrica: {
        banktransfer: "required",
        ewallet: "required",
        loyalty: "required"
      },
      payukenya: {
        banktransfer: "required",
        ewallet: "required"
      },
      payunigeria: {
        banktransfer: "required"
      },
      alipay: "required"
      //new
    },
    payment_method__additional_details: {
      type: "object",
      payucitrusindia: {
        banktransfer: "required"
      },
      payuindia: {
        banktransfer: "required"
      },
      payurussia: {
        banktransfer: "required"
      },
      payuturkey: {
        banktransfer: "required"
      },
      payuargentina: {
        cash: "required"
      },
      payuchile: {
        cash: "required"
      },
      payumexico: {
        cash: "required"
      },
      payucolombia: {
        cash: "required",
        banktransfer: "required"
      },
      payubrazil: {
        cash: "required"
      },
      payupanama: {},
      payuperu: {
        cash: "required"
      },
      payusingleplatform: {
        banktransfer: "required"
      },
      payusouthafrica: {
        paymentpage: "required"
      },
      payukenya: {
        paymentpage: "required"
      },
      payunigeria: {
        paymentpage: "required"
      }
      //new
    },
    payment_method__additional_details___additionalDescription: {
      type: "string",
      payusingleplatform: {
        banktransfer: "optional"
      }
      //new
    },
    payment_method__additional_details___bank_name: {
      type: "string",
      payusingleplatform: {
        banktransfer: {
          payment_wall: "required",
          pbl: "required"
        }
      }
      //new
    },
    payment_method__additional_details___language: {
      type: "string",
      payusingleplatform: {
        banktransfer: "required"
      }
      //new
    },
    payment_method__additional_details___payment_method: {
      type: "string",
      payurussia: {
        banktransfer: "required"
      },
      payuturkey: {
        banktransfer: "required"
      },
      payuargentina: {
        cash: "required"
      },
      payuchile: {
        cash: "required"
      },
      payumexico: {
        cash: "required"
      },
      payucolombia: {
        cash: "required"
      },
      payubrazil: {
        cash: "required"
      },
      payuperu: {
        cash: "required"
      }
      //new
    },
    payment_method__additional_details___bill_cinumber: {
      type: "string",
      payuturkey: {
        banktransfer: {
          upt: "required"
        }
      }
      //new
    },
    payment_method__additional_details___bill_citype: {
      type: "string",
      payuturkey: {
        banktransfer: {
          upt: "required"
        }
      }
      //new
    },
    payment_method__additional_details___order_language: {
      type: "string",
      payuargentina: {
        cash: "required"
      },
      payuchile: {
        cash: "required"
      },
      payumexico: {
        cash: "required"
      },
      payucolombia: {
        cash: "required",
        banktransfer: "required"
      },
      payubrazil: {
        cash: "required"
      },
      payuperu: {
        cash: "required"
      }
      //new
    },
    payment_method__additional_details___payment_country: {
      type: "string",
      payuargentina: {
        cash: "required"
      },
      payuchile: {
        cash: "required"
      },
      payumexico: {
        cash: "required"
      },
      payucolombia: {
        cash: "required",
        banktransfer: "required"
      },
      payubrazil: {
        cash: "required"
      },
      payupanama: {},
      payuperu: {
        cash: "required"
      }
      //new
    },
    payment_method__additional_details___vpa: {
      type: "string",
      payuindia: {
        banktransfer: {
          upiindia: "required"
        }
      }
    },
    payment_method__additional_details___bank_transfer_payment_method_vendor: {
      type: "string",
      payucolombia: {
        banktransfer: "required"
      }
      //new
    },
    payment_method__additional_details___bank_transfer_financial_institution_code: {
      type: "string",
      payucolombia: {
        banktransfer: "required"
      }
      //new
    },
    payment_method__additional_details___bank_transfer_financial_institution_name: {
      type: "string",
      payucolombia: {
        banktransfer: "required"
      }
      //new
    },
    payment_method__additional_details___user_type: {
      type: "string",
      payucolombia: {
        banktransfer: "required"
      }
      //new
    },
    payment_method__additional_details___national_identify_number: {
      type: "string",
      payucolombia: {
        banktransfer: "required"
      },
      payubrazil: {
        cash: "required"
      }
      //new
    },
    payment_method__additional_details___national_identify_type: {
      type: "string",
      payucolombia: {
        banktransfer: "required"
      }
      //new
    },
    payment_method__additional_details___cash_payment_method_vendor: {
      type: "string",
      payuargentina: {
        cash: "required"
      },
      payuchile: {
        cash: "required"
      },
      payumexico: {
        cash: "required"
      },
      payucolombia: {
        cash: "required"
      },
      payubrazil: {
        cash: "required"
      },
      payuperu: {
        cash: "required"
      }
      // new
    },
    payment_method__additional_details___expiration_date: {
      type: "string",
      payuargentina: {
        cash: "optional"
      },
      payuchile: {
        cash: "optional"
      },
      payumexico: {
        cash: "optional"
      },
      payucolombia: {
        cash: "optional"
      },
      payubrazil: {
        cash: "optional"
      },
      payuperu: {
        cash: "optional"
      }
      //new
    },
    payment_method__additional_details___customer_national_identify_number: {
      type: "string",
      payuargentina: {
        cash: "optional"
      },
      payuchile: {
        cash: "optional"
      },
      payumexico: {
        cash: "optional"
      },
      payuperu: {
        cash: "optional"
      }
      //new
    },
    payment_method__additional_details___customer_cnpj_identify_number: {
      type: "string",
      payuargentina: {
        cash: "optional"
      },
      payuchile: {
        cash: "optional"
      },
      payumexico: {
        cash: "optional"
      },
      payucolombia: {
        cash: "optional"
      },
      payubrazil: {
        cash: "required"
      },
      payuperu: {
        cash: "optional"
      }
      //new
    },
    payment_method__additional_details___payment_mode_type: {
      type: "string",
      payucitrusindia: {
        banktransfer: "required"
      }
      //new
    },
    payment_method__additional_details___bank_code: {
      type: "string",
      payucitrusindia: {
        banktransfer: {
          netbanking: "required"
        }
      },
      payuindia: {
        banktransfer: {
          netbankingindia: "required"
        }
      }
      //new
    },
    payment_method__additional_details___supported_payment_methods: {
      type: "string",
      payusouthafrica: {
        paymentpage: "required"
      },
      payukenya: {
        paymentpage: "required"
      },
      payunigeria: {
        paymentpage: "required"
      }
      //new
    },
    payment_method__credit_card_cvv: {
      type: "string",
      alfabank: "required",
      sberbank: "required",
      shva: "required",
      worldpayeu: "optional",
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
      stripe: "optional",
      payuromania: "required",
      payuturkey: "required",
      wirecard: "required",
      payuargentina: {
        ccards: "required"
      },
      payuchile: {
        ccards: "required"
      },
      credorax: "required",
      safecharge: "required",
      payumexico: {
        ccards: "required"
      },
      payucolombia: {
        ccards: "required"
      },
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
      payusingleplatform: {
        ccards: "required"
      },
      dalenys: "required",
      payeezy: "optional"

      //new
    },

    cof_transaction_indicators: {
      type: "string",
      vantiv: "optional",
      credorax: "optional",
      dalenys: "optional",
      wirecard: "optional",
      payeezy: "optional",
      safecharge: "optional",
      chasepaymentech: "optional",
      worldpayeu: "rule",
      payusingleplatform: "optional",
      payuromania: "optional",
      payuturkey: "optional",
      payurussia: "optional",
    },

    cof_transaction_indicators__card_entry_mode: {
      type: "string",
      vantiv: "optional",
      credorax: "optional",
      dalenys: "optional",
      wirecard: "optional",
      payeezy: "optional",
      safecharge: "optional",
      chasepaymentech: "optional",
      worldpayeu: "rule",
      payusingleplatform: "optional",
      payuromania: "optional",
      payuturkey: "optional",
      payurussia: "optional",
    },

    cof_transaction_indicators__cof_consent_transaction_id: {
      type: "string",
      vantiv: "optional",
      payeezy: "optional",
      chasepaymentech: "optional",
      worldpayeu: "rule",
      payuromania: "optional",
      payuturkey: "optional",
      payurussia: "optional",
      credorax: "optional",
    },

    three_d_secure_attributes: {
      type: "object",
      shva: "rule",
      credorax: "rule",
      dalenys: "rule",
      wirecard: "rule",
      payeezy: "rule",
      payuromania: "rule",
      payusingleplatform: "rule"
      //new
    },
    three_d_secure_attributes__external: {
      type: "object",
      shva: "optional",
      credorax: "optional",
      dalenys: "optional",
      wirecard: "optional",
      payeezy: "optional",
      payuromania: "optional",
      payusingleplatform: "optional"

      //new
    },
    three_d_secure_attributes__external___three_d_secure_authentication_status: {
      type: "string",
      dalenys: "required",
      payusingleplatform: "condrequired"
    },
    three_d_secure_attributes__external___ds_xid: {
      type: "string",
      credorax: "condrequired",
      dalenys: "condrequired",
      wirecard: "condrequired",
      payusingleplatform: "condrequired",
      payuromania: "condrequired"
    },
    three_d_secure_attributes__external___three_d_secure_version: {
      type: "string",
      credorax: "required",
      dalenys: "required",
      wirecard: "condrequired",
      payuromania: "condrequired"
      //new
    },
    three_d_secure_attributes__external___encoding: {
      type: "string",
      shva: "required",
      wirecard: "required",
      credorax: "required",
      payeezy: "required",
      payuromania: "required",
      payusingleplatform: "required"
      //new
    },
    three_d_secure_attributes__external___xid: {
      type: "string",
      shva: "required",
      credorax: "condrequired",
      wirecard: "condrequired",
      payeezy: "required",
      payuromania: "condrequired",
      payusingleplatform: "condrequired",
      dalenys: "condrequired"
      //new
    },
    three_d_secure_attributes__external___cavv: {
      type: "string",
      shva: "required",
      credorax: "required",
      dalenys: "required",
      wirecard: "required",
      payeezy: "required",
      payuromania: "required",
      payusingleplatform: "required"
      //new
    },
    three_d_secure_attributes__external___eci_flag: {
      type: "string",
      shva: "required",
      credorax: "required",
      dalenys: "required",
      wirecard: "required",
      payeezy: "required",
      payuromania: "required",
      payusingleplatform: "required"
      //new
    },
    three_d_secure_attributes__internal: {
      type: "object",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___account_additional_information: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___account_age_indicator: {},
    three_d_secure_attributes__internal___account_change_date: {
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___account_change_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___account_create_date: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___account_purchases_six_months: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___account_pwd_change_date: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___account_pwd_change_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___add_card_attempts_day: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___address_match: {
      type: "boolean",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___browser_color_depth: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___browser_header: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___browser_java_enabled: {
      type: "boolean",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___browser_language: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___browser_screen_height: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___browser_screen_width: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___browser_time_zone: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___challenge_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform:  "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___challenge_window_size: {
      type: "string",
      credorax: "condrequired_threed_s_internal"
    },

    three_d_secure_attributes__internal___delivery_time_frame: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform:  "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___device_channel: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___fraud_activity: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform:  "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___home_phone: {},

    three_d_secure_attributes__internal___home_phone_country: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___mobile_phone: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___mobile_phone_country: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___payment_account_age: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___payment_account_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___pre_order_date: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___pre_order_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___prior_authentication_data: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___prior_authentication_method: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___prior_authentication_ref: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___prior_authentication_timestamp: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___product_code: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___purchase_date_time: {
      type: "string",
      credorax: "condrequired_threed_s_internal"
    },

    three_d_secure_attributes__internal___recurring_end_date: {
      type: "string",
      credorax: "condrequired_threed_s_internal",
      // payusingleplatform:  "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___recurring_frequency: {
      type: "string",
      credorax: "condrequired_threed_s_internal"
      // payusingleplatform:  "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___reorder_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___requestor_authentication_data: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___requestor_authentication_method: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },

    three_d_secure_attributes__internal___requestor_authentication_timestamp: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_app_id: {
      type: "string",
      // credorax: "optional_threed_s_internal"
      // payusingleplatform: "condrequired_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_encrypted_data: {
      type: "string"
      // credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_ephemeral_public_key: {
      type: "string"
      // credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_interface: {
      type: "string"
      // credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_max_timeout: {
      type: "integer",
      // credorax: "optional_threed_s_internal"
      // payusingleplatform: "condrequired_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_reference_number: {
      type: "string",
      // credorax: "optional_threed_s_internal"
      // payusingleplatform: "condrequired_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_transaction_id: {
      type: "integer",
      // credorax: "optional_threed_s_internal"
      // payusingleplatform: "condrequired_threed_s_internal"
    },
    three_d_secure_attributes__internal___sdk_ui_type: {
      type: "string"
      // credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___shipping_address_usage_date: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___shipping_address_usage_indicator: {
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___shipping_method_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___shipping_name_indicator: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___transaction_count_day: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___transaction_count_year: {
      type: "string",
      credorax: "optional_threed_s_internal",
      payusingleplatform: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___work_phone: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__internal___work_phone_country: {
      type: "string",
      credorax: "optional_threed_s_internal"
    },
    three_d_secure_attributes__sca_exemptions: {
      type: "object",
      credorax: "optional"
    },
    three_d_secure_attributes__sca_exemptions___exemption_action: {
      type: "boolean",
      credorax: "optional"
    },
    three_d_secure_attributes__sca_exemptions___request_exemption_stage: {
      type: "string",
      credorax: "rule"
    },
    three_d_secure_attributes__sca_exemptions___exemption_reason: {
      type: "string",
      credorax: "optional"
    }, 
    three_d_secure_attributes__sca_exemptions___tra_score: {
      type: "string",
      credorax: "optional"
    },    
    provider_specific_data: {
      type: "object",
      alipay: "required",
      chasepaymentech: "optional",
      alfabank: "optional",
      credorax: "optional",
      sberbank: "optional",
      shva: "optional",
      rsb: "optional",
      braintree: "optional",
      payeasecup: "required",
      payuindia: {
        ccards: "optional"
      },
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional"
      },
      payunigeria: {
        ccards: "required",
        banktransfer: "optional"
      },
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      },
      payusingleplatform: {
        ccards: "optional"
      },
      payuromania: {
        ccards: "optional"
      },
      payurussia: {
        ccards: "optional"
      },
      payuturkey: {
        ccards: "optional"
      },
      paypal: "optional",
      dalenys: "required",
      safecharge: "optional",
      wirecard: "optional",
      payuasiapacific: "condrequired"
      //new
    },
    provider_specific_data__payuasiapacific: {
      type: "object",
      payuasiapacific: "condrequired"
    },
    provider_specific_data__payuasiapacific___additional_details: {
      type: "object",
      payuasiapacific: "condrequired"
    },
    provider_specific_data__payuasiapacific___additional_details____accountId: {
      type: "string",
      payuasiapacific: "condrequired"
    },
    provider_specific_data__alipay: {
      type: "object",
      alipay: "required"
    },
    provider_specific_data__alipay___additional_details: {
      type: "object",
      alipay: "required"
    },
    provider_specific_data__alipay___additional_details____app_pay: {
      type: "string",
      alipay: "optional"
    },
    provider_specific_data__alipay___additional_details____service: {
      type: "object",
      alipay: "optional"
    },
    provider_specific_data__alipay___additional_details____settlement_currency: {
      type: "object",
      alipay: "optional"
    },
    provider_specific_data__alipay___additional_details____business_type: {
      type: "string",
      alipay: "required"
    },
    provider_specific_data__alipay___additional_details____hotel_name: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____check_in_time: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____check_out_time: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____flight_number: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____departure_time: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____admission_notice_url: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____goods_info: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____total_quantity: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____other_business_type: {
      type: "string",
      alipay: "condrequired"
    },
    provider_specific_data__alipay___additional_details____subject: {
      type: "string",
      alipay: "required"
    },
    provider_specific_data__wirecard: {
      type: "object",
      wirecard: "optional"
    },
    provider_specific_data__wirecard___additional_details: {
      type: "object",
      wirecard: "optional"
    },
    provider_specific_data__wirecard___additional_details____cof_consent_transaction_id: {
      type: "object",
      wirecard: "optional"
    },
    provider_specific_data__credorax: {
      type: "object",
      credorax: "optional"
    },
    provider_specific_data__credorax___additional_details: {
      type: "object",
      credorax: "optional"
    },
    // provider_specific_data__credorax___additional_details____three_d_secure_exemption_action: {
    //   type: "string",
    //   credorax: "optional_threed_s_internal"
    // },
    provider_specific_data__credorax___additional_details____three_d_secure_initiate: {
      type: "string",
      credorax: "optional"
    },
    // provider_specific_data__credorax___additional_details____three_d_secure_msg_extension_id: {
    //   type: "string",
    //   credorax: "optional_threed_s_internal"
    // },
    // provider_specific_data__credorax___additional_details____three_d_secure_msg_extension_name: {
    //   type: "string",
    //   credorax: "optional_threed_s_internal"
    // },
    // provider_specific_data__credorax___additional_details____three_d_secure_msg_extension_data: {
    //   type: "string",
    //   credorax: "optional_threed_s_internal"
    // },
    provider_specific_data__credorax___additional_details____smart_three_d_secure_risk_threshold_override: {
      type: "string",
      credorax: "optional"
    },
    provider_specific_data__credorax___additional_details____smart_guard_plus_threshold_override: {
      type: "string",
      credorax: "optional"
    },
    provider_specific_data__credorax___additional_details____bypass_smart_guard_check: {
      type: "boolean",
      credorax: "optional"
    },
    // provider_specific_data__credorax___additional_details____three_d_secure_tra_score: {
    //   type: "string",
    //   credorax: "optional_threed_s_internal"
    // },
    provider_specific_data__credorax___additional_details____three_d_secure_smart_plan: {
      type: "string",
      credorax: "optional"
    },
    // provider_specific_data__credorax___additional_details____three_d_secure_exemption_action: {
    //   type: "string",
    //   credorax: "optional_threed_s_internal"
    // },
    // provider_specific_data__credorax___additional_details____three_d_secure_exemption_reason: {
    //   type: "string",
    //   credorax: "optional_threed_s_internal"
    // },
    provider_specific_data__credorax___additional_details____multi_capture: {
      type: "boolean",
      credorax: "optional"
    },
    provider_specific_data__credorax___additional_details____credit_type: {
      type: "string",
      credorax: "rule"
    },
    provider_specific_data__credorax___additional_details____funds_recipient_first_name: {
      type: "string",
      credorax: "rule"
    },
    provider_specific_data__credorax___additional_details____funds_recipient_last_name: {
      type: "string",
      credorax: "rule"
    },
    provider_specific_data__paypal: {
      type: "object",
      paypal: "optional"
    },
    provider_specific_data__paypal___additional_details: {
      type: "object",
      paypal: "optional"
    },
    provider_specific_data__paypal___additional_details____allowed_payment_method: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional"
        }
      }
    },
    provider_specific_data__paypal___additional_details____custom_invoice_data: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional",
          paypalbillingagreement: "optional"
        }
      }
    },
    provider_specific_data__paypal___additional_details____brand_name: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional"
        }
      }
    },
    provider_specific_data__paypal___additional_details____landing_page: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional"
        }
      }
    },
    provider_specific_data__paypal___additional_details____locale: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional"
        }
      }
    },
    provider_specific_data__paypal___additional_details____note_to_payer: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional"
        }
      }
    },
    provider_specific_data__paypal___additional_details____shipping_preference: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional"
        }
      }
    },
    provider_specific_data__paypal___additional_details____subtotal: {
      type: "string",
      paypal: {
        ewallet: {
          paypalexpress: "optional",
          paypalbillingagreement: "optional"
        }
      }
    },
    provider_specific_data__payu_poland: {
      type: "object",
      payusingleplatform: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_poland___additional_details: {
      type: "object",
      payusingleplatform: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_poland___additional_details____language: {
      type: "string",
      payusingleplatform: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_poland___additional_details____additionalDescription: {
      type: "string",
      payusingleplatform: {
        ccards: "optional"
      }
      //new
    },

    provider_specific_data__payu_romania: {
      type: "object",
      payuromania: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_romania___additional_details: {
      type: "object",
      payuromania: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_romania___additional_details____payment_method: {
      type: "string",
      payuromania: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_romania___additional_details____ignore_line_items: {
      type: "string",
      payuromania: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_russia: {
      type: "object",
      payurussia: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_russia___additional_details: {
      type: "object",
      payurussia: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_russia___additional_details____payment_method: {
      type: "string",
      payurussia: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_russia___additional_details____ignore_line_items: {
      type: "string",
      payurussia: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_turkey: {
      type: "object",
      payuturkey: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_turkey___additional_details: {
      type: "object",
      payuturkey: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_turkey___additional_details____payment_method: {
      type: "string",
      payuturkey: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_turkey___additional_details____ignore_line_items: {
      type: "string",
      payuturkey: {
        ccards: "optional"
      }
    },
    provider_specific_data__payu_latam: {
      type: "object",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___device_fingerprint: {
      type: "object",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___device_fingerprint____provider: {
      type: "string",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___device_fingerprint____fingerprint: {
      type: "string",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details: {
      type: "object",
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
        ccards: "required",
        banktransfer: "unsupported"
      },
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____cookie: {
      type: "string",
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
        ccards: "required",
        banktransfer: "unsupported"
      },
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____order_language: {
      type: "string",
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
        ccards: "optional",
        banktransfer: "unsupported"
      },
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____month_without_interest_months: {
      type: "string",
      payuchile: {
        ccards: "optional"
      },
      payumexico: {
        ccards: "optional"
      },
      payucolombia: {
        ccards: "optional"
      },
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____month_without_interest_bank: {
      type: "string",
      payumexico: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____process_without_cvv2: {
      type: "boolean",
      payumexico: {
        ccards: "optional"
      },
      payucolombia: {
        ccards: "optional"
      },
      payubrazil: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____accept_terms_and_conditions: {
      type: "boolean",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____customer_national_identify_number: {
      type: "string",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____customer_cnpj_identify_number: {
      type: "string",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____payer_birthday: {
      type: "string",
      payuargentina: {
        ccards: "optional"
      },
      payuchile: {
        ccards: "optional"
      },
      payumexico: {
        ccards: "required"
      },
      payucolombia: {
        ccards: "optional"
      },
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____merchant_payer_id: {
      type: "string",
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
      payubrazil: {
        ccards: "optional"
      },
      payupanama: {
        ccards: "optional"
      },
      payuperu: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____payer_email: {
      type: "string",
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
      payubrazil: {
        ccards: "required"
      },
      payupanama: {
        ccards: "required"
      },
      payuperu: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__payu_latam___additional_details____promotion_id: {
      type: "integer",
      payuargentina: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__rsb: {
      type: "object",
      rsb: "optional"
      //new
    },
    provider_specific_data__rsb___is3ds: {
      type: "string",
      rsb: "optional"
      //new
    },
    provider_specific_data__payu_india: {
      type: "object",
      payuindia: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_india___additional_details: {
      type: "object",
      payuindia: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_india___additional_details____recurring: {
      type: "string",
      payuindia: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_india___additional_details____si: {
      type: "string",
      payuindia: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__payu_india___additional_details____zeroRedirect: {
      type: "string",
      payuindia: {
        ccards: "optional"
      }
      //new
    },
    "provider_specific_data__payease-cup": {
      type: "object",
      payeasecup: "required"
      //new
    },
    "provider_specific_data__payease-cup___sms_validation_required": {
      type: "string",
      payeasecup: "required"
      //new
    },
    provider_specific_data__alfabank: {
      type: "object",
      alfabank: "optional"
      //new
    },
    provider_specific_data__alfabank___additional_details: {
      type: "object",
      alfabank: "optional"
      //new
    },
    provider_specific_data__alfabank___additional_details____payment_timeout_secs: {
      type: "string",
      alfabank: "optional"
      //new
    },
    provider_specific_data__chasepaymentech: {
      type: "object",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details: {
      type: "object",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details____SDProductDescription: {
      type: "string",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details____SDMerchantCity: {
      type: "string",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details____SDMerchantPhone: {
      type: "string",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details____SDMerchantURL: {
      type: "string",
      chasepaymentech: "optional"
    },
    provider_specific_data__chasepaymentech___additional_details____SDMerchantEmail: {
      type: "string",
      chasepaymentech: "optional"
    },
    provider_specific_data__safecharge: {
      type: "object",
      safecharge: "optional"
      //new
    },
    provider_specific_data__safecharge___additional_details: {
      type: "object",
      safecharge: "optional"
      //new
    },
    provider_specific_data__safecharge___additional_details____is3ds: {
      type: "string",
      safecharge: "optional"
      //new
    },
    provider_specific_data__sberbank: {
      type: "object",
      sberbank: "optional"
      //new
    },
    provider_specific_data__sberbank___additional_details: {
      type: "object",
      sberbank: "optional"
      //new
    },
    provider_specific_data__sberbank___additional_details____payment_timeout_secs: {
      type: "string",
      sberbank: "optional"
      //new
    },
    provider_specific_data__sberbank___additional_details____is3ds: {
      type: "string",
      sberbank: "optional"
      //new
    },
    provider_specific_data__shva: {
      type: "object",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details: {
      type: "object",
      shva: "optional"
    },
    provider_specific_data__shva___additional_details____card_entry_channel: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____addendum1: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____addendum2: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____addendum1settl: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____addendum2settl: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____addendum3settl: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____addendum4settl: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____addendum5settl: {
      type: "string",
      shva: "optional"
      //new
    },
    provider_specific_data__shva___additional_details____preauthorization_hold: {
      type: "string",
      shva: "rule" // was optional
      //new
    },
    provider_specific_data__shva___additional_details____installments_type: {
      type: "string",
      shva: "rule" // was optional
      //new
    },
    provider_specific_data__shva___additional_details____transaction_type: {
      type: "string",
      shva: "rule"
      //new
    },
    provider_specific_data__shva___additional_details____stnd_order_frequency: {
      type: "string",
      shva: "rule"
      //new
    },
    provider_specific_data__shva___additional_details____stnd_order_number: {
      type: "string",
      shva: "rule"
      //new
    },
    provider_specific_data__shva___additional_details____stnd_order_total_number: {
      type: "string",
      shva: "rule"
      //new
    },
    provider_specific_data__shva___additional_details____stnd_order_total_sum: {
      type: "string",
      shva: "rule"
      //new
    },
    provider_specific_data__shva___additional_details____automatic_init_payment_id: {
      type: "string",
      shva: "rule" // was optional
      //new
    },
    provider_specific_data__braintree: {
      type: "object",
      braintree: "optional"
      //new
    },
    provider_specific_data__braintree___additional_details: {
      type: "object",
      braintree: "optional"
      //new
    },
    provider_specific_data__braintree___additional_details____skip_avs: {
      type: "string",
      braintree: "optional"
      //new
    },
    provider_specific_data__braintree___additional_details____skip_cvv: {
      type: "string",
      braintree: "optional"
      //new
    },
    provider_specific_data__magellan: {
      type: "object",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional"
      },
      payunigeria: {
        ccards: "required",
        banktransfer: "optional"
      }
      //new
    },
    provider_specific_data__magellan___recurring: {
      type: "boolean",
      payusouthafrica: {
        ccards: "optional"
      },
      payukenya: {
        ccards: "optional"
      },
      payunigeria: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__magellan___additional_details: {
      type: "object",
      payusouthafrica: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        ccards: "optional",
        banktransfer: "optional",
        ewallet: "optional"
      },
      payunigeria: {
        ccards: "required",
        banktransfer: "optional"
      }
      //new
    },
    provider_specific_data__magellan___additional_details____order_description: {
      type: "object",
      payusouthafrica: {
        banktransfer: "optional",
        ewallet: "optional",
        loyalty: "optional"
      },
      payukenya: {
        banktransfer: "optional",
        ewallet: "optional"
      },
      payunigeria: {
        banktransfer: "optional"
      }
      //new
    },
    provider_specific_data__magellan___additional_details____is3ds: {
      type: "string",
      payusouthafrica: {
        ccards: "optional"
      },
      payukenya: {
        ccards: "optional"
      },
      payunigeria: {
        ccards: "required"
      }
      //new
    },
    provider_specific_data__magellan___additional_details____demo_mode: {
      type: "string",
      payukenya: {
        ccards: "optional"
      },
      payunigeria: {
        ccards: "optional"
      }
      //new
    },
    provider_specific_data__dalenys: {
      type: "object",
      dalenys: "required"
    },
    provider_specific_data__dalenys___additional_details: {
      type: "object",
      dalenys: "required"
      //new
    },
    provider_specific_data__dalenys___additional_details____is3ds: {
      type: "string",
      dalenys: "rule"
      //new
    },
    provider_specific_data__dalenys___additional_details____CLIENTIDENT: {
      type: "string",
      dalenys: "required"
      //new
    },
    provider_specific_data__dalenys___additional_details____CLIENTEMAIL: {
      type: "string",
      dalenys: "required"
      //new
    },
    provider_specific_data__dalenys___additional_details____CLIENTREFERRER: {
      type: "string",
      dalenys: "required"
      //new
    },
    provider_specific_data__dalenys___additional_details____DESCRIPTION: {
      type: "string",
      dalenys: "required"
      //new
    },
    provider_specific_data__dalenys___additional_details____selected_brand: {
      type: "string",
      dalenys: "optional"
    },

    provider_specific_data__dalenys___additional_details____three_d_secure_cavv_algorithm: {
      type: "string",
      dalenys: "condrequired"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_challenge_cancellation: {
      type: "string",
      dalenys: "condrequired"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_preference: {
      type: "string",
      dalenys: "condrequired"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_challenge_score: {
      type: "string",
      dalenys: "condrequired"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_mode: {
      type: "string",
      dalenys: "condrequired"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_out_of_scope_reason: {
      type: "string",
      dalenys: "optional"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_result: {
      type: "string",
      dalenys: "condrequired"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_transaction_status_reason: {
      type: "string",
      dalenys: "condrequired"
    },
    provider_specific_data__dalenys___additional_details____three_d_secure_card_enrolled: {
      type: "string",
      dalenys: "condrequired"
    }
  };

  return datadictAuthChargeCredit;
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
  module.exports = datadictDef;
else bodyBuilder.datadict = datadictDef();
