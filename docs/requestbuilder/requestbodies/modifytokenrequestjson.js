function modifyTokenRequestJson(jsonToModify) {

  if (bodyBuilder.transactionType == "ccards") {

        const token = {
            "token_type": "credit_card"
          };

    $.extend(jsonToModify, token);

    return jsonToModify

  }

  else if (bodyBuilder.transactionType == "ewallet") {

    const token = {
          "token_type": "billing_agreement",
          "vendor": "PayPal"
      };

      $.extend(jsonToModify, token);

      return jsonToModify

  }

}

function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}
