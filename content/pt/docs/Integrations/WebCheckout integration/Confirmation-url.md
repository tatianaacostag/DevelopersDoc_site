---
title: "URL de Confirmação"
linkTitle: "URL de Confirmação"
date: 2021-03-29T12:15:57-05:00
description: >
  A URL de confirmação facilita a comunicação entre sistemas, permitindo que você receba os resultados das transações e atualize seus estoques, pedidos ou bases de dados.
weight: 30
tags: ["subtopic"]
---

Esta página, invisível para os clientes, recebe dados via HTTP POST. É importante notar que, caso o pagador realize tentativas de pagamento, uma confirmação será gerada para cada transação, independentemente de ter sido aprovada ou rejeitada.

Como essa URL é destinada exclusivamente à atualização do sistema e não é voltada ao cliente, ela não deve conter nenhum código HTML. Embora sua implementação seja opcional, ela é altamente recomendada para garantir que seu sistema reflita corretamente os resultados das transações.

Ao finalizar uma transação (seja aprovada, rejeitada ou cancelada), nossa plataforma envia as variáveis relevantes para a URL da sua URL de confirmação usando o método HTTP POST. Assim, é necessário implementar lógica do lado do servidor para capturar e processar esses dados de acordo com a linguagem de programação utilizada.

## Considerações {#considerations}

* **Desabilitar autenticação:** Caso seu site utilize autenticação básica de acesso ou medidas de segurança similares, certifique-se de desabilitá-las para a URL da URL de confirmação, permitindo o acesso por parte da PayU.
* **Endereço IP público:** O endereço IP associado à URL da sua URL de confirmação deve ser público. Evite usar URLs acessíveis apenas por intranet ou localhost.
* **Certificado HTTPS válido:** Se você estiver usando HTTPS para sua URL de confirmação, é obrigatório utilizar um certificado SSL/TLS válido.
* **Tipo de conteúdo:** A URL de confirmação deve estar configurada para processar dados no formato `x-www-form-urlencoded`.
* **Evitar certas configurações de segurança:** Não utilize certificados de segurança de curva elíptica nem a suíte de criptografia `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA` para sua URL de confirmação.
* **Envio de status final da transação:** A PayU acionará a URL de confirmação apenas quando uma transação alcançar um status final (por exemplo, aprovada, rejeitada ou expirada). Não serão enviados relatórios para transações ainda em andamento (aguardando pagamento ou análise).

## Lista de IPs permitidos para os servidores da PayU {#whitelist-of-ip-addresses-for-payu-servers}

Para garantir que seu servidor receba as solicitações e notificações da PayU Latam, é necessário permitir nossos endereços IP. Isso é especialmente importante se seu servidor estiver protegido por um firewall. Todas as requisições webhook e comunicações provenientes dos servidores da PayU terão origem nos IPs listados abaixo.

**Ambiente de produção**

* 34.233.144.154
* 184.73.94.138
* 52.73.124.136

**Ambiente de sandbox**

* 54.158.171.129
 
## Parâmetros {#parameters}

A URL de confirmação transmite os seguintes parâmetros via HTTP POST para o seu servidor:

<details>

<summary>Parâmetros</summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição |
|---|---|---|---|
| `merchant_id`         | Numérico     | 12     | Seu ID de Comerciante no sistema da PayU. Pode ser encontrado no e-mail de criação da conta. |
| `state_pol`           | Alfanumérico | 32     | Status da transação no sistema da PayU. [Veja os status de transação]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `risk`                | Decimal      | —      | Pontuação de risco associada à transação, variando de 0 a 1. Um valor mais alto indica maior risco. Formato: `###.00`. |
| `response_code_pol`   | Alfanumérico | 255    | Código interno de resposta da PayU para a transação. [Veja os códigos de resposta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `reference_sale`      | Alfanumérico | 255    | Sua referência única para a venda ou pedido. Deve ser distinta para cada transação enviada à PayU. |
| `reference_pol`       | Alfanumérico | 255    | Referência única ou número de transação gerado pela PayU. |
| `sign`                | Alfanumérico | 255    | Assinatura digital gerada pela PayU para esta transação específica, usada para validar a integridade dos dados. |
| `extra1`              | Alfanumérico | 255    | Campo adicional para enviar informações complementares sobre a compra. |
| `extra2`              | Alfanumérico | 255    | Campo adicional para enviar informações complementares sobre a compra. |
| `payment_method`      | Numérico     | —      | Identificador interno da PayU para o método de pagamento utilizado. [Veja os códigos de métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_method_type` | Numérico     | —      | Tipo geral de método de pagamento utilizado (ex: cartão de crédito, transferência bancária). |
| `installments_number` | Numérico     | —      | Número de parcelas escolhidas pelo comprador para pagamentos com cartão de crédito. |
| `value`               | Numérico     | 14.2   | Valor total da transação, com até duas casas decimais (ex: 10000.00 ou 10000). |
| `tax`                 | Numérico     | 14.2   | Valor do imposto (IVA) da transação. Aceita até duas casas decimais (ex: 19000.00). Use 0 se não houver imposto. <p><b>Nota:</b> Para transações na Colômbia, se for enviado valor zero, a PayU aplicará automaticamente o IVA padrão de 19%. |
| `additional_value`    | Numérico     | 14.2   | Valor adicional que não faz parte do cálculo da comissão. |
| `transaction_date`    | Data         | —      | Data e hora da transação (AAAA-MM-DD HH:mm:ss). |
| `currency`            | Alfanumérico | 3      | Código da moeda na qual o pagamento foi realizado. [Veja as moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| `email_buyer`         | Alfanumérico | 255    | E-mail do comprador, usado para notificações sobre o resultado da transação. Recomenda-se validar este e-mail caso seja fornecido via formulário. |
| `cus`                 | Alfanumérico | 64     | Código de Rastreamento Único, uma referência de pagamento dentro do banco, aplicável apenas para pagamentos PSE (transferência eletrônica na Colômbia). |
| `pse_bank`            | Alfanumérico | 255    | Nome do banco utilizado para pagamentos via PSE. |
| `test`                | Booleano     | —      | Indicador de teste, mostra se a transação foi um teste (true) ou uma transação real (false). |
| `description`         | Alfanumérico | 255    | Descrição dos itens ou serviços adquiridos na venda. |
| `billing_address`     | Alfanumérico | 255    | Endereço de cobrança do comprador. |
| `shipping_address`    | Alfanumérico | 50     | Endereço de entrega da mercadoria. |
| `phone`               | Alfanumérico | 20     | Número de telefone residencial do comprador. |
| `office_phone`        | Alfanumérico | 20     | Número de telefone comercial do comprador. |
| `account_number_ach`  | Alfanumérico | 36     | Identificador para transações ACH. |
| `account_type_ach`    | Alfanumérico | 36     | Tipo de conta utilizada em transações ACH. |
| `administrative_fee`  | Decimal      | —      | Valor da taxa administrativa associada à transação. |
| `administrative_fee_base`| Decimal   | —      | Valor base utilizado para o cálculo da taxa administrativa. |
| `administrative_fee_tax`| Decimal    | —      | Valor do imposto aplicado à taxa administrativa. |
| `airline_code`        | Alfanumérico | 4      | Código da companhia aérea, se aplicável. |
| `attempts`            | Numérico     | —      | Número de tentativas da PayU de enviar a confirmação ao seu servidor. |
| `authorization_code`  | Alfanumérico | 12     | Código de autorização fornecido pelo banco emissor para a venda. |
| `bank_id`             | Alfanumérico | 255    | Identificador do banco envolvido na transação. |
| `billing_city`        | Alfanumérico | 255    | Cidade do endereço de cobrança do comprador. |
| `billing_country`     | Alfanumérico | 2      | Código ISO 3166-1 alpha-2 do país do endereço de cobrança (ex: CO, US). |
| `commision_pol`       | Decimal      | —      | Valor da comissão cobrada pela PayU. |
| `commision_pol_currency`| Alfanumérico | 3    | Código da moeda da comissão. |
| `customer_number`     | Numérico     | —      | Identificador do cliente, se fornecido. |
| `date`                | Data         | —      | Data e hora da operação (AAAA-MM-DD HH:mm:ss). |
| `error_code_bank`     | Alfanumérico | 255    | Código de erro retornado pelo banco, se houver. |
| `error_message_bank`  | Alfanumérico | 255    | Mensagem de erro retornada pelo banco, se houver. |
| `exchange_rate`       | Decimal      | —      | Taxa de câmbio utilizada na transação, se aplicável. |
| `ip`                  | Alfanumérico | 39     | Endereço IP de onde o comprador iniciou a transação. |
| `nickname_buyer`      | Alfanumérico | 150    | Identificador ou apelido curto do comprador, se disponível. |
| `nickname_seller`     | Alfanumérico | 150    | Identificador ou apelido curto do vendedor (sua empresa), se disponível. |
| `payment_method_id`   | Numérico     | —      | Outro identificador do método de pagamento utilizado. [Veja os códigos de métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_request_state`| Alfanumérico | 32    | Estado atual da solicitação de pagamento no sistema da PayU. |
| `pse_reference1`      | Alfanumérico | 255    | Informação de referência adicional para pagamentos PSE. |
| `pse_reference2`      | Alfanumérico | 255    | Informação adicional complementar para pagamentos PSE. |
| `pse_reference3`      | Alfanumérico | 255    | Informação de referência adicional extra para pagamentos PSE. |
| `response_message_pol`| Alfanumérico | 255    | Mensagem legível da PayU referente à transação. [Veja as mensagens de resposta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `shipping_city`       | Alfanumérico | 50     | Cidade para onde a mercadoria será entregue. |
| `shipping_country`    | Alfanumérico | 2      | Código ISO 3166-1 alpha-2 do país de destino da entrega (ex: CO, US). |
| `transaction_bank_id` | Alfanumérico | 255    | Identificador único atribuído à transação pelo banco. |
| `transaction_id`      | Alfanumérico | 36     | Identificador único da PayU para esta tentativa específica de transação. |
| `payment_method_name` | Alfanumérico | 255    | Nome do método de pagamento utilizado (ex: VISA, MASTERCARD, PSE). |

</details>

## Exemplo de requisição POST para a URL de confirmação {#post-request-example-for-the-confirmation-url}

O exemplo a seguir mostra como nosso sistema envia os parâmetros para sua URL de confirmação usando uma requisição HTTP POST:

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

## Validação da assinatura {#signature-validation}

A validação da assinatura garante a integridade dos dados recebidos na sua URL de confirmação. Você deve gerar a assinatura utilizando os parâmetros fornecidos pela PayU e compará-la com o parâmetro `sign` enviado na requisição HTTP POST.

### Considerações importantes {#important-considerations}

* Se o segundo decimal do valor (`value`) for zero, formate o `new_value` com **uma casa decimal** (ex.: `150.00` → `150.0`).
* Se o segundo decimal **não** for zero, mantenha duas casas decimais no `new_value` (ex.: `150.25` → `150.25`).
* Sempre utilize os valores recebidos na URL de confirmação (`merchant_id`, `reference_sale`, `value`, `currency` e `state_pol`) para gerar a assinatura. **Não** use os valores armazenados em sua própria base de dados.
* Armazene sua chave de API com segurança.
* Construa a string da assinatura no seguinte formato:

<p>

    apiKey~merchant_id~reference_sale~new_value~currency~state_pol

### Exemplos de assinatura

Os exemplos a seguir ilustram como gerar uma assinatura, neste caso utilizando HMAC-SHA256.

#### Assinatura com uma casa decimal

Use este exemplo quando o segundo decimal do `value` for `0`. Neste caso, formate o valor com apenas uma casa decimal.

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da string | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.00` <br> `currency: USD` <br> `state_pol: 4` |
| String de entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.0~USD~4` |
| Chave secreta (aplicável apenas a HMAC-SHA256) | `test123` |
| `sign` gerado | `65fb2b3452572784e23e7d6480359fd2507c54dd285ca3c4dceffb8764cfb66f` |

#### Assinatura com duas casas decimais

Use o exemplo a seguir quando o segundo decimal do `value` **não** for `0`. Formate o valor com duas casas decimais.

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da string | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.25` <br> `currency: USD` <br> `state_pol: 4` |
| String de entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.25~USD~4` |
| Chave secreta (aplicável apenas a HMAC-SHA256) | `test123` |
| `sign` gerado | `7770a7933b90570a078fcacce1790eb13079cdf8f8a6e900b79f4f5eb96b8024` |

### Valide sua assinatura {#validate-your-signature}

Use este gerador para criar uma assinatura com qualquer um dos métodos de criptografia disponíveis. Esta funcionalidade ajuda você a verificar o valor do `sign` que a PayU envia para sua URL de confirmação.

<div>
{{< confirmationpage/signaturegen_conf_en >}}
</div>

## Novas tentativas de pagamento {#payment-retries}

Quando uma transação é rejeitada, o pagador tem a opção de tentar novamente o pagamento utilizando o mesmo ou um método de pagamento diferente. Lembre-se de que, para cada tentativa, a PayU envia uma requisição para a URL de confirmação com o respectivo status da transação.

Cada uma dessas requisições utiliza a mesma referência de pagamento (`reference_sale`) e o mesmo identificador de pedido (`reference_pol`), mas inclui um identificador de transação (`transaction_id`) diferente. Como resultado, você pode receber múltiplas chamadas à URL de confirmação para a mesma venda.

Abaixo está um exemplo mostrando uma tentativa rejeitada seguida de uma nova tentativa aprovada:

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

{{% alert title="Observação" color="info"%}}

Se qualquer uma das requisições à URL de confirmação indicar que uma referência de pagamento (`reference_sale`) foi aprovada, você pode ter certeza de que nenhum outro relatório será enviado para essa mesma referência.

{{% /alert %}}
