---
title: "Página de confirmação"
date: 2021-03-29T12:15:57-05:00
description: >
  Esta página permite obter confirmações do sistema relacionadas com os resultados da transação. Você pode atualizar os inventários, ordens ou bancos de dados do seu sistema. Esta página não é visível para o cliente e seu objetivo é permitir a comunicação entre sistemas. Os dados são enviados por método HTTP POST.</br>ISe o pagador gerar novas tentativas de pagamento durante o processo de pagamento, uma página de confirmação será gerada para cada transação. Esta página é invocada para estados aprovados e rejeitados.
weight: 30
tags: ["subtopic"]
---
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/additional-methods.min.js"></script>
<script src="/js/signature-generator/md5.js"></script>
<script src="/js/signature-generator/sha1.js"></script>
<script src="/js/signature-generator/sha256.js"></script>
<script src="/js/signature-generator/signature-generator.js"></script>

A página de confirmação permite que você atualize os bancos de dados em seu sistema, portanto não deve incluir código HTML, pois não é visível para o comprador. Esta página é opcional; quando uma transação é concluída (ou seja, quando aprovada, rejeitada ou cancelada) nossa plataforma envia as variáveis com o método HTTP POST.

Na página de confirmação, você deve capturar os dados que deseja armazenar no banco de dados. Essa captura depende da linguagem de programação que você usa.

## Observações {#considerations}
* Se o seu site for restrito com _basic access authentication_ ou semelhante, desative-o para a URL de confirmação.
* O IP associado à URL de confirmação deve ser público; não use URL acessível pela intranet ou localhost.
* Se estiver usando HTTPS, você deve ter um certificado válido.
* O formato da sua página de confirmação deve ser `x-www-form-urlencoded`.
* Não use certificados de segurança de curva elíptica ou que tenham o pacote de criptografia `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` na sua página de confirmação.
* PayU reporta a página de confirmação quando a transação tem um status conclusivo, por exemplo, quando aprovada, rejeitada ou expirada. Se uma transação estiver em andamento (aguardando pagamento ou análise), PayU não reporta nada até que a transação tenha um status conclusivo
 
## Variáveis enviadas com a página de confirmação {#variables-sent-with-the-confirmation-page}

<details>
<summary>Variáveis na página de confirmação</summary>
<br>
<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição |
|-|-|-|-|
| merchant_id | Numérico | 12 | O número de identificação do vendedor no sistema PayU, você encontra este número no e-mail de criação de conta. |
| state_pol | Alfanumérico | 32 | Indica o status da transação no sistema.<br>[Veja o status da transação na coluna fornecida]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| risk | Decimal (#.00) | — | Risco associado à transação. Valores entre 0 e 1.<br>Quanto maior o valor, maior o risco.<br>Formato `###.00`. |
| response_code_pol | Alfanumérico | 255 | Código de resposta do PayU.<br>[Veja os códigos de resposta na coluna fornecida]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| reference_sale | Alfanumérico | 255 | Referência da venda ou ordem. Deve ser exclusiva para cada transação enviada ao sistema. |
| reference_pol | Alfanumérico | 255 | O número de referência ou transação gerado pelo PayU. |
| sign | Alfanumérico | 255 | Assinatura digital criada para cada uma das transações. |
| extra1 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. |
| extra2 | Alfanumérico | 255 | Campo adicional para envio de informações sobre a compra. |
| payment_method | Numérico | — | O identificador interno do método de pagamento usado.<br>[Veja os códigos dos métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| payment_method_type | Numérico | — | O tipo de método de pagamento usado para pagar. |
| installments_number | Numérico | — | Quantidade de parcelas em que o pagamento com cartão de crédito foi programado. |
| value | Numérico | 14,2 | Valor total da transação. Ele pode conter dois dígitos decimais. Por exemplo, 10000.00 ou 10000 |
| tax | Numérico | 14,2 | Valor do IVA da transação. Se for enviado IVA zero, o sistema aplicará automaticamente 19%. Ele pode conter dois dígitos decimais. Por exemplo: 19000.00. Caso você não tenha IVA, deve preencher 0. |
| additional_value | Numérico | 14,2 | Valor Adicional Não Comissionado. |
| transaction_date | Date(YYYY-MM-DD HH:mm:ss) | — | A data em que a transação foi feita. |
| currency | Alfanumérico | 3 | A moeda em que o pagamento é feito.<br>[Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| email_buyer | Alfanumérico | 255 | Campo que contém o endereço de e-mail do comprador para notificar o resultado da transação. Recomenda-se validar quando os dados são extraídos de um formulário. |
| cus | Alfanumérico | 64 | O CUS (unique tracking code) é a referência do pagamento dentro do Banco, válido apenas para pagamentos com PSE. |
| pse_bank | Alfanumérico | 255 | O nome do banco, válido apenas para pagamentos com PSE. |
| test | Boolean (true, false) | — | Variável para identificar se a operação foi um teste. |
| description | Alfanumérico | 255 | Descrição da venda. |
| billing_address | Alfanumérico | 255 | O endereço de cobrança |
| shipping_address | Alfanumérico | 50 | O endereço de entrega da mercadoria. |
| phone | Alfanumérico | 20 | O telefone residencial do comprador. |
| office_phone | Alfanumérico | 20 |O telefone do comprador em horário comercial. |
| account_number_ach | Alfanumérico | 36 | O identificador da transação. |
| account_type_ach | Alfanumérico | 36 | O identificador da transação. |
| administrative_fee | Decimal (#.00) | — | Valor da taxa administrativa | 
| administrative_fee_base | Decimal (#.00) | — | Valor base da taxa administrativa |
| administrative_fee_tax | Decimal (#.00) | — | Valor do imposto da taxa administrativa |
| airline_code | Alfanumérico | 4 | Código da companhia aérea |
| attempts | Numérico | — | Número de tentativas de envio da confirmação. |
| authorization_code | Alfanumérico | 12 | Código de autorização de venda |
| bank_id | Alfanumérico | 255 | Identificador do banco |
| billing_city | Alfanumérico | 255 | Cidade de cobrança. |
| billing_country | Alfanumérico | 2 | O código ISO do país associado ao endereço de cobrança. |
| commision_pol | Decimal (#.00) | — | Valor da comissão. |
| commision_pol_currency | Alfanumérico | 3 | Moeda da comissão |
| customer_number | Numérico | — | Número do cliente. |
| date | Date (YYYY-MM-DD HH:mm:ss) | — |Data da operação. |
| error_code_bank | Alfanumérico | 255 | | error_code_bank | Alfanumérico | 255 | Código de erro do banco. |
| error_message_bank | Alfanumérico | 255 | Mensagem de erro do banco |
| exchange_rate | Decimal (#.00) | — | Valor da taxa de câmbio. |
| ip | Alfanumérico | 39 | O endereço IP a partir do qual a transação foi feita. |
| nickname_buyer | Alfanumérico | 150 | Nome abreviado do comprador. |
| nickname_seller | Alfanumérico | 150 | Nome abreviado do vendedor. |
| payment_method_id | Numérico | — | Identificador dos métodos de pagamento.<br>[Veja os códigos dos métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| payment_request_state | Alfanumérico | 32 | Status da solicitação de pagamento. |
| pse_reference1 | Alfanumérico | 255 | Nº de referência 1 para pagamentos PSE. |
| pse_reference2 | Alfanumérico | 255 | Nº de referência 2 para pagamentos PSE. |
| pse_reference3 | Alfanumérico | 255 | Nº de referência 3 para pagamentos PSE. |
| response_message_pol | Alfanumérico | 255 | Mensagem de resposta de PayU.<br>[Veja as mensagens de resposta na coluna disponível]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-page" >}}). |
| shipping_city | Alfanumérico | 50 | A cidade onde a mercadoria é entregue. |
| shipping_country | Alfanumérico | 2 | O código ISO associado ao país onde a mercadoria é entregue. |
| transaction_bank_id | Alfanumérico | 255 | ID da transação no sistema do banco. |
| transaction_id | Alfanumérico | 36 | Identificador da transação. |
| payment_method_name | Alfa Numérico | 255 | Método de pagamento utilizado, por exemplo VISA. |

</details>

## Exemplo de POST enviado para a página de confirmação {#post-example-send-to-the-confirmation-page}
A seguir, veja um exemplo básico das variáveis enviadas para a página de resposta via POST:

```HTML
response_code_pol=5
phone=
additional_value=0.00
test=1
transaction_date=2015-05-27 13:07:35
cc_number=************0004
cc_holder=test_buyer
error_code_bank=
billing_country=CO
bank_referenced_name=
description=test_payu_01
administrative_fee_tax=0.00
value=100.00
administrative_fee=0.00
payment_method_type=2
office_phone=
email_buyer=test@payulatam.com
response_message_pol=ENTITY_DECLINED
error_message_bank=
shipping_city=
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
sign=e1b0939bbdc99ea84387bee9b90e4f5c
tax=0.00
payment_method=10
billing_address=cll 93
payment_method_name=VISA
pse_bank=
state_pol=6
date=2015.05.27 01:07:35
nickname_buyer=
reference_pol=7069375
currency=USD
risk=1.0
shipping_address=
bank_id=10
payment_request_state=R
customer_number=
administrative_fee_base=0.00
attempts=1
merchant_id=508029
exchange_rate=2541.15
shipping_country=
installments_number=1
franchise=VISA
payment_method_id=2
extra1=
extra2=
antifraudMerchantId=
extra3=
nickname_seller=
ip=190.242.116.98
airline_code=
billing_city=Bogota
pse_reference1=
reference_sale=2015-05-27 13:04:37
pse_reference3=
pse_reference2=
```

## Validação de assinatura {#signature-validation}
A validação da assinatura permite confirmar a integridade dos dados. Você deve gerar a assinatura com a informação da página de confirmação e compará-la com a informação do parâmetro assinatura.

Para validar a assinatura na página de confirmação, você deve considerar:

* Se a segunda casa decimal for zero, o `new_value` para gerar a assinatura deve ter uma casa decimal. Exemplo (`150.00` -> `150.0`).
* Se a segunda casa decimal não for zero, o `new_value` to generate para gerar a assinatura deve manter os mesmos dois decimais. Exemplo (`150.26` -> `150.26`).
* Obtenha os parâmetros para gerar a assinatura (`merchant_id`, `reference_sale`, `value`, `currency` e `state_pol`) na página de confirmação, e não de seu banco de dados. 
* Você deve armazenar sua ApiKey com segurança.
* Crie a assinatura da seguinte forma:

```HTML
"ApiKey~merchant_id~reference_sale~new_value~currency~state_pol"
```
<br>

Exemplo

**Com uma casa decimal**

```
Sua apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parâmetros obtidos na página de confirmação
- merchant_id = 508029
- reference_sale = TestPayU04
- value = 150.00
- currency = USD
- state_pol = 6

A assinatura é gerada da seguinte maneira: 
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU04~150.0~USD~6) = b607a2c2fa100e0947b206d41864fb86

sign = b607a2c2fa100e0947b206d41864fb86
```

**With two decimals**

```
Sua apiKey: 4Vj8eK4rloUd272L48hsrarnUA 
Parâmetros obtidos na página de confirmação:
- merchant_id = 508029
- reference_sale = TestPayU05
- value = 150.26
- currency = USD
- state_pol = 4

A assinatura é gerada da seguinte maneira: 
MD5(4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU05~150.26~USD~4) = 1d95778a651e11a0ab93c2169a519cd6

sign = 1d95778a651e11a0ab93c2169a519cd6 
```

### Compare a sua assinatura {#compare-your-signature}

<!-- Signature generator - confirmation page -->
<div id="blue-box">
<span class="grey-text-13">
<div>
<form method="POST" id="signature_form_confirmation_page" >
    <table>
        <span class="blue-text-13"><b>Algoritmo: &nbsp;</b></span>
        <select id = "signature_algorithm_confirmation_page" class="calc_selector form_control">
            <option  value="md5">MD5</option>
            <option  value="sha1">SHA1</option>
            <option  value="sha256">SHA256</option>
        </select>
        <br>
        <br>
        <span class="calc_text">&nbsp;(</span>
        <input class="form_control" type="text"  id ="signature_apikey_confirmation_page" name = "signature_apikey_confirmation_page" placeholder="ApiKey" maxlength="26"> ~
        <input class="form_control number" type="text"  id ="signature_merchanId_confirmation_page" name = "signature_merchanId_confirmation_page" placeholder="MerchantId" maxlength="7"> ~
        <input class="form_control" type="text"  id ="signature_referenceCode_confirmation_page" name = "signature_referenceCode_confirmation_page" placeholder="Referência" maxlength="255"> ~
        <input class="form_control  number" type="text" id ="signature_amount_confirmation_page" name = "signature_amount_confirmation_page" placeholder="Valor" maxlength="14"> ~
        <select id = "signature_currency_confirmation_page" class="calc_selector form_control" >
            <option  value="USD">USD</option>
            <option  value="COP">COP</option>
            <option  value="MXN">MXN</option>
            <option  value="ARS">ARS</option>
            <option  value="PEN">PEN</option>
            <option  value="BRL">BRL</option>
            <option  value="CLP">CLP</option>
        </select> ~
        <select id = "signature_state_pol_confirmation_page" class="calc_selector form_control" >
            <option  value="4">4 (Aprovada)</option>
            <option  value="6">6 (Rejeitada)</option>
            <option  value="5">5 (Expirada)</option>
        </select>
        <span class="calc_text">)</span>
        <br>
        <br>
        <br>
        <span class="blue-text-13"><b>Resultado:&nbsp;</b></span><input class="form_control" id ="signature_generated_confirmation_page" name = "signature_generated_confirmation_page" value = ""  readonly />
    </table>
    <br>
    <table width="50%"  border="0" cellspacing="2" cellpadding="2">
        <input type="button" name="signature_generate_confirmation_page" id="signature_generate_confirmation_page" value="Gerar assinatura" >
        <input type="button" name="signature_generate_again_confirmation_page" id="signature_generate_again_confirmation_page" value="Gerar nova assinatura" >
    </table>
</form>
</div>
</span>
</div>
<!-- End of signature generator - confirmation page -->

Esta calculadora permite gerar a assinatura usando qualquer um dos métodos de criptografia disponíveis.

## Payment retries {#payment-retries}
Quando uma transação é rejeitada, o pagador tem a opção de repetir o pagamento usando o mesmo método ou outro. Lembre-se que a cada tentativa, PayU faz uma chamada para a página de confirmação com o status da transação correspondente.

Cada uma dessas chamadas é feita com a mesma referência de pagamento (`reference_sale`), o mesmo identificador de ordem (`reference_pol`), mas com identificador de transação diferente (`transaction_id`). Portanto, você pode receber várias chamadas na página de confirmação da mesma venda.

Abaixo, você encontra um exemplo de uma tentativa rejeitada e a nova tentativa aprovada:

````
reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=f5e668f1-7ecc-4b83-a4d1-0aaa68260862
state_pol=6

reference_sale=2015-05-27 13:04:37
reference_pol=7069375
transaction_id=01cfdce8-68d5-4a4c-aabf-d89370a0b92f
state_pol=4
````

Observe que se uma dessas chamadas para a página de confirmação indicar que uma referência de pagamento (`reference_sale`) foi aprovada, você pode ter certeza de que não receberá nenhum relatório para a mesma referência.