function orderFieldsinTable(fieldsArray) {

  if ((fieldsArray.indexOf("installments__first_payment_amount") != -1) && (fieldsArray.indexOf("installments__number_of_installments") != -1)) {

    oldIndex = fieldsArray.indexOf("installments__number_of_installments");
    newIndex = oldIndex - 1;
    fieldsArray.splice(oldIndex, 1);
    fieldsArray.splice(newIndex, 0, "installments__number_of_installments")


    return fieldsArray;
  }

  if (fieldsArray.indexOf("provider_specific_data__alipay___additional_details____business_type") != -1) {

    oldIndexBT = fieldsArray.indexOf("provider_specific_data__alipay___additional_details____business_type");
    newIndexBT = oldIndexBT - 2;
    fieldsArray.splice(oldIndexBT, 1);
    fieldsArray.splice(newIndexBT, 0, "provider_specific_data__alipay___additional_details____business_type")

    if (fieldsArray.indexOf("provider_specific_data__alipay___additional_details____app_pay") != -1) {
      oldIndexAppPay = fieldsArray.indexOf("provider_specific_data__alipay___additional_details____app_pay");
      newIndexAppPay = oldIndexAppPay - 2;
      fieldsArray.splice(oldIndexAppPay, 1);
      fieldsArray.splice(newIndexAppPay, 0, "provider_specific_data__alipay___additional_details____app_pay")

      return fieldsArray;
    }

  }

}
