---
title: "URL de Confirmação"
linkTitle: "URL de Confirmação"
date: 2026-01-29T12:15:57-05:00
description: >
  A URL de Confirmação é um webhook servidor-a-servidor que automatiza a sincronização dos resultados das transações com seus sistemas internos.
weight: 50
---

A PayU utiliza esta URL para enviar uma requisição HTTP POST assíncrona diretamente para o seu servidor assim que uma transação atinge um estado final (Aprovada, Rejeitada ou Recusada). Como este processo ocorre em segundo plano, ele permanece invisível para o cliente. Portanto, enquanto a URL de Resposta gerencia a experiência do cliente, a URL de Confirmação gerencia a comunicação de backend entre a PayU e o seu servidor.

## Diretrizes de Implementação

* **Atualizações Automáticas:** Utilize este mecanismo para disparar fluxos de trabalho automatizados, como atualizar bancos de dados, ajustar níveis de estoque e finalizar status de pedidos.

* **Tratamento de Reentativas:** A PayU gera uma confirmação exclusiva para cada tentativa de transação. Se um pagador tentar refazer um pagamento, seu sistema receberá uma notificação para cada resultado individual, independentemente do desfecho.

* **Requisitos de Formato:** Como esta URL serve puramente para transmissão de dados, seu endpoint não deve retornar código HTML ou elementos visuais.

* **Lógica do Lado do Servidor:** Você deve implementar a lógica do lado do servidor na sua linguagem de programação de preferência para capturar, analisar (parse) e processar as variáveis transmitidas pela PayU.

{{% alert title="Nota" color="info"%}} 

Embora a implementação da URL de Confirmação seja opcional, nós a recomendamos fortemente para garantir que seu sistema mantenha um registro preciso e em tempo real de todos os resultados das transações. 

{{% /alert %}}

## Métodos de Integração

Dependendo do seu tipo de integração, use os seguintes parâmetros para definir seu endpoint de webhook:

| Tipo de Integração | Caminho do Parâmetro | Exemplo de Implementação |
| :--- | :--- | :--- |
| **WebCheckout** | `confirmationUrl` | `<input name="confirmationUrl" type="hidden" value="https://seusite.com/confirmar">` |
| **Integração via API** | `transaction.order.notifyUrl` | `"order": { "notifyUrl": "https://seusite.com/confirmar", ... }` |

## Considerações

* **Acessibilidade Pública:** A URL deve ser pública. Evite localhosts ou intranets internas.

* **Desabilitar Autenticação:** Certifique-se de que o endpoint não exija Basic Auth ou qualquer medida de segurança que bloqueie a requisição POST automatizada da PayU.

* **Certificados SSL/TLS:** Se você estiver usando HTTPS para sua URL de Confirmação, deverá utilizar um certificado SSL/TLS válido. Não utilize certificados de segurança de curva elíptica ou aqueles com a suíte de criptografia `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA`.

* **Tipo de Conteúdo (Content Type):** Seu servidor deve estar configurado para processar dados no formato `x-www-form-urlencoded`.

* **Relatório de Status Final da Transação:** A PayU acionará a URL de Confirmação apenas quando uma transação atingir um status final (ex: aprovada, rejeitada ou expirada). Você não receberá relatórios de transações que ainda estão em andamento (aguardando pagamento ou em análise).

* **Sem Saída HTML:** Como esta é uma chamada de sistema para sistema, seu script deve processar a lógica e retornar um status HTTP 200 OK padrão, sem renderizar código HTML. 

## Lista de IPs Permitidos (Whitelist) para Servidores PayU

Para garantir que seu servidor receba as requisições e notificações da PayU Latam, é necessário incluir nossos endereços IP na lista de permissões. Isso é especialmente importante se o seu servidor estiver protegido por um firewall. Todas as requisições de webhook e comunicações dos servidores PayU originarão dos endereços IP listados abaixo.

**Ambiente de Produção**

* 34.233.144.154
* 184.73.94.138
* 52.73.124.136

**Ambiente de Sandbox**

* 54.158.171.129

## Parâmetros POST

A PayU transmite uma ampla gama de parâmetros para o seu servidor.

### Considerações Importantes

* **Payloads Dinâmicos:** A PayU ajusta o payload dinamicamente com base no método de pagamento utilizado. Por exemplo, a PayU envia `cc_number`, `cc_holder` e `cardType` para transações com cartão de crédito, mas os exclui para pagamentos em dinheiro ou transferências bancárias.

* **Tratamento de Erros:** Sua integração deve lidar com chaves opcionais ou ausentes para evitar erros de script quando variáveis específicas estiverem ausentes na requisição POST.

* **Variáveis Configuráveis:** Para incluir dados estendidos — como `cardType`, `transaction_type`, `bank_reference_code`, `payment_method_id`, `expiration_date` ou `adminFee` — entre em contato com seu representante PayU. Esses parâmetros não são enviados por padrão e devem ser habilitados especificamente para sua conta.

<details>

<summary><b>Parâmetros</b></summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição |
|---|---|---|---|
| `merchant_id` | Numérico | 12 | Seu ID de Comerciante no sistema da PayU. Pode ser encontrado no e-mail de criação da sua conta. |
| `state_pol` | Alfanumérico | 32 | Status da transação no sistema da PayU. [Ver status de transação]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `risk` | Decimal | — | Pontuação de risco associada à transação, variando de 0 a 1. Um valor maior indica maior risco. Formato: `###.00`. |
| `response_code_pol` | Alfanumérico | 255 | Código de resposta interno da PayU para a transação. [Ver códigos de resposta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `reference_sale` | Alfanumérico | 255 | Sua referência exclusiva para a venda ou pedido. Deve ser distinta para cada transação enviada à PayU. |
| `reference_pol` | Alfanumérico | 255 | Referência única ou número de transação gerado pela PayU. |
| `sign` | Alfanumérico | 255 | Assinatura digital gerada pela PayU para esta transação específica, usada para validação de integridade dos dados. |
| `extra1` | Alfanumérico | 255 | Campo personalizado para informações adicionais da compra. |
| `extra2` | Alfanumérico | 255 | Campo personalizado para informações adicionais da compra. |
| `payment_method` | Numérico | — | Identificador interno da PayU para o método de pagamento utilizado. [Ver códigos de métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_method_type` | Numérico | — | Tipo geral de método de pagamento utilizado (ex: cartão de crédito, transferência bancária). |
| `installments_number` | Numérico | — | Número de parcelas escolhidas pelo comprador para pagamentos com cartão de crédito. |
| `value` | Numérico | 14.2 | Valor total da transação, que pode incluir até duas casas decimais (ex: 10000.00 ou 10000). |
| `tax` | Numérico | 14.2 | Valor do IVA para a transação. Este campo aceita até duas casas decimais (ex: 19000.00). Use 0 se não houver IVA. <p><b>Nota:</b> Para transações na Colômbia, se um valor zero for enviado, a PayU aplicará automaticamente o IVA padrão de 19%. |
| `additional_value` | Numérico | 14.2 | Um valor adicional que não faz parte do cálculo da comissão. |
| `transaction_date` | Data | — | Data e hora em que a transação ocorreu (YYYY-MM-DD HH:mm:ss). |
| `currency` | Alfanumérico | 3 | Código da moeda em que o pagamento foi feito. [Ver moedas aceitas]({{< ref "response-codes-and-variables.html#accepted-currencies" >}}). |
| `email_buyer` | Alfanumérico | 255 | E-mail do comprador, usado para notificações de resultado da transação. Recomenda-se validar este e-mail se ele foi fornecido por meio de um formulário. |
| `cus` | Alfanumérico | 64 | Código Único de Rastreamento (Código Único de Seguimiento). Serve como a referência de pagamento específica no banco para todas as transações processadas na Colômbia. |
| `pse_bank` | Alfanumérico | 255 | Nome do banco utilizado para pagamentos PSE. |
| `test` | Booleano | — | Flag indicando se a transação foi um teste (true) ou uma transação real (false). |
| `description` | Alfanumérico | 255 | Descrição dos itens ou serviços adquiridos na venda. |
| `billing_address` | Alfanumérico | 255 | Endereço de cobrança do comprador. |
| `shipping_address` | Alfanumérico | 50 | Endereço de entrega da mercadoria. |
| `phone` | Alfanumérico | 20 | Número de telefone residencial do comprador. |
| `office_phone` | Alfanumérico | 20 | Número de telefone comercial do comprador. |
| `account_number_ach` | Alfanumérico | 36 | Identificador para transações ACH. |
| `account_type_ach` | Alfanumérico | 36 | Tipo de conta usada para transações ACH. |
| `administrative_fee` | Decimal | — | Valor da taxa administrativa associada à transação. |
| `administrative_fee_base`| Decimal | — | Valor base usado para calcular a taxa administrativa. |
| `administrative_fee_tax`| Decimal | — | Valor do imposto aplicado sobre a taxa administrativa. |
| `airline_code` | Alfanumérico | 4 | Código da companhia aérea, se aplicável. |
| `attempts` | Numérico | — | Número de vezes que a PayU tentou enviar a confirmação para o seu servidor. |
| `authorization_code` | Alfanumérico | 12 | Código de autorização fornecido pelo banco emissor para a venda. |
| `bank_id` | Alfanumérico | 255 | Identificador do banco envolvido na transação. |
| `billing_city` | Alfanumérico | 255 | Cidade de cobrança do comprador. |
| `billing_country` | Alfanumérico | 2 | Código ISO 3166-1 alpha-2 do país associado ao endereço de cobrança (ex: BR, CO, US). |
| `commision_pol` | Decimal | — | Valor da comissão cobrada pela PayU. |
| `commision_pol_currency`| Alfanumérico | 3 | Código da moeda para o valor da comissão. |
| `customer_number` | Numérico | — | Identificador do cliente, se fornecido. |
| `date` | Data | — | Data e hora da operação (YYYY-MM-DD HH:mm:ss). |
| `error_code_bank` | Alfanumérico | 255 | Código de erro retornado pelo banco, se houver. |
| `error_message_bank` | Alfanumérico | 255 | Mensagem de erro retornada pelo banco, se houver. |
| `exchange_rate` | Decimal | — | Taxa de câmbio usada para a transação, se aplicável. |
| `ip` | Alfanumérico | 39 | Endereço IP a partir do qual o comprador iniciou a transação. |
| `nickname_buyer` | Alfanumérico | 150 | Identificador curto ou apelido do comprador, se disponível. |
| `nickname_seller` | Alfanumérico | 150 | Identificador curto ou apelido do vendedor (seu negócio), se disponível. |
| `payment_method_id` | Numérico | — | Outro identificador para o método de pagamento usado. [Ver códigos de métodos de pagamento]({{< ref "response-codes-and-variables.html#codes-of-the-payment-methods" >}}). |
| `payment_request_state`| Alfanumérico | 32 | Estado atual da solicitação de pagamento no sistema da PayU. |
| `pse_reference1` | Alfanumérico | 255 | Campo de referência personalizada 1 para pagamentos PSE (apenas Colômbia). |
| `pse_reference2` | Alfanumérico | 255 | Campo de referência personalizada 2 para pagamentos PSE (apenas Colômbia). |
| `pse_reference3` | Alfanumérico | 255 | Campo de referência personalizada 3 para pagamentos PSE (apenas Colômbia). |
| `response_message_pol`| Alfanumérico | 255 | Mensagem de resposta da PayU legível para humanos. [Ver mensagens de resposta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-confirmation-url" >}}). |
| `shipping_city` | Alfanumérico | 50 | Cidade onde a mercadoria deve ser entregue. |
| `shipping_country` | Alfanumérico | 2 | Código ISO 3166-1 alpha-2 do país onde a mercadoria deve ser entregue (ex: BR, CO, US). |
| `transaction_bank_id` | Alfanumérico | 255 | Identificador exclusivo atribuído à transação pelo banco. |
| `transaction_id` | Alfanumérico | 36 | Identificador exclusivo da PayU para esta tentativa de transação específica. |
| `payment_method_name` | Alfanumérico | 255 | Nome do método de pagamento usado (ex: VISA, MASTERCARD, PSE). |
| `cc_holder` | Alfanumérico | 150 | Nome do titular do cartão conforme aparece no cartão de crédito. |
| `cc_number` | Alfanumérico | — | Número do cartão de crédito mascarado usado para a transação (ex: `************0004`). |
| `cardType` | Alfanumérico | — | Bandeira ou tipo do cartão (ex: VISA, MASTERCARD). |
| `franchise` | Alfanumérico | — | Franquia associada ao cartão de crédito (ex: VISA). |

</details>

## Exemplo de Requisição POST para a URL de Confirmação

O exemplo a seguir mostra como nosso sistema envia parâmetros para sua URL de Confirmação usando uma requisição HTTP POST:

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

## Exemplo de Implementação (PHP)

Este script captura os dados POST enviados pela PayU (compatível com notificações de WebCheckout e API):

```PHP
<?php
/**
 * PayU Confirmation URL / notifyUrl Listener
 * Signature algorithm: MD5
 *
 * This endpoint receives server-to-server notifications from PayU.
 * It must be publicly accessible and return HTTP 200 on success.
 */

// -----------------------------------------------------------------------------
// 1. Configuration
// -----------------------------------------------------------------------------

// Store securely (environment variable recommended)
$apiKey = 'YOUR_API_KEY_HERE';

// -----------------------------------------------------------------------------
// 2. Capture incoming data
//    - WebCheckout sends application/x-www-form-urlencoded
//    - API notifyUrl may send application/json
// -----------------------------------------------------------------------------

$data = $_POST;

if (empty($data)) {
    $rawBody = file_get_contents('php://input');
    $decoded = json_decode($rawBody, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

// -----------------------------------------------------------------------------
// 3. Extract required parameters (from Confirmation URL payload)
// -----------------------------------------------------------------------------

$merchantId     = $data['merchant_id']     ?? '';
$referenceSale  = $data['reference_sale']  ?? '';
$value          = $data['value']            ?? '';
$currency       = $data['currency']         ?? '';
$statePol       = $data['state_pol']        ?? '';
$receivedSign   = $data['sign']             ?? '';

// -----------------------------------------------------------------------------
// 4. Format value for signature (NO floats)
//    Rule:
//    - If second decimal is 0 → 1 decimal (150.00 → 150.0)
//    - Otherwise → 2 decimals (150.25 → 150.25)
// -----------------------------------------------------------------------------

$parts = explode('.', $value);

if (!isset($parts[1])) {
    $formattedValue = $parts[0] . '.0';
} elseif (strlen($parts[1]) > 1 && $parts[1][1] !== '0') {
    $formattedValue = $parts[0] . '.' . substr($parts[1], 0, 2);
} else {
    $formattedValue = $parts[0] . '.' . $parts[1][0];
}

// -----------------------------------------------------------------------------
// 5. Generate and validate signature (MD5)
// -----------------------------------------------------------------------------

$signatureString = implode('~', [
    $apiKey,
    $merchantId,
    $referenceSale,
    $formattedValue,
    $currency,
    $statePol
]);

$calculatedSign = md5($signatureString);

if (!hash_equals(strtolower($receivedSign), strtolower($calculatedSign))) {
    // Invalid signature — do NOT process the transaction
    http_response_code(403);
    echo 'Invalid signature';
    exit;
}

// -----------------------------------------------------------------------------
// 6. Signature valid — process transaction
// -----------------------------------------------------------------------------

switch ($statePol) {
    case '4':
        // APPROVED
        // ✔ Mark order as paid
        // ✔ Trigger fulfillment
        break;

    case '6':
        // REJECTED
        // ✔ Mark order as rejected
        break;

    case '5':
        // EXPIRED
        // ✔ Mark order as expired
        break;

    default:
        // Other states (optional handling)
        break;
}

// -----------------------------------------------------------------------------
// 7. Respond to PayU
// -----------------------------------------------------------------------------

http_response_code(200);
echo 'OK';

```

## Validação de Assinatura (Signature)

Para garantir a integridade dos dados e verificar se a notificação foi originada pela PayU, você deve gerar uma assinatura em seu servidor e compará-la com o parâmetro `sign` enviado na requisição HTTP POST.

### Regras de Arredondamento para Webhooks

O arredondamento para o campo `value` em webhooks segue estas regras específicas para a string de assinatura:

* Se a segunda casa decimal do `value` for zero, formate o `new_value` usando **uma casa decimal** (ex: `150.00` torna-se `150.0`).
* Se a segunda casa decimal **não** for zero, mantenha duas casas decimais no `new_value` (ex: `150.25` permanece `150.25`).

### Formato da Assinatura

Sempre use os valores da URL de Confirmação (`merchant_id`, `reference_sale`, `value`, `currency` e `state_pol`) para gerar a assinatura. **Não** use valores do seu próprio banco de dados.

A string para o hash é:
<p>

    apiKey~merchant_id~reference_sale~new_value~currency~state_pol

### Exemplos de Assinatura

Os exemplos a seguir ilustram como gerar uma assinatura, neste caso, usando HMAC-SHA256.

#### Assinatura com uma Casa Decimal

Use este exemplo quando a segunda casa decimal do `value` for `0`. Neste caso, formate o valor com apenas uma casa decimal.

| **Item** | **Valor** |
|-----------|----------|
| Parâmetros da String | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.00` <br> `currency: USD` <br> `state_pol: 4` |
| String de Entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.0~USD~4` |
| Chave Secreta (aplicável apenas ao HMAC-SHA256)   | `test123` |
| `sign` Gerado | `65fb2b3452572784e23e7d6480359fd2507c54dd285ca3c4dceffb8764cfb66f` |

#### Assinatura com duas Casas Decimais

Use o exemplo a seguir quando a segunda casa decimal do `value` **não for** `0`. Formate o valor com duas casas decimais.

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da String | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchant_id: 508029` <br> `reference_sale: PayUTest01` <br> `value: 150.25` <br> `currency: USD` <br> `state_pol: 4` |
| String de Entrada (formatada)   | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.25~USD~4` |
| Chave Secreta (aplicável apenas ao HMAC-SHA256)   | `test123` |
| `sign` Gerado | `7770a7933b90570a078fcacce1790eb13079cdf8f8a6e900b79f4f5eb96b8024` |

### Valide sua Assinatura

Use este gerador para criar uma assinatura com qualquer um dos métodos de criptografia disponíveis. Esta funcionalidade auxilia na verificação do valor `sign` que a PayU envia para sua URL de Confirmação.

<div>
{{< confirmationpage/signaturegen_conf_en >}}
</div>

## Reentativas de Pagamento

Se uma transação for rejeitada, o pagador pode tentar novamente usando um método diferente. A PayU envia uma confirmação para cada tentativa.

* Cada tentativa compartilha a mesma referência de pagamento (`reference_sale`) e identificador de pedido (`reference_pol`).
* Cada tentativa possui um identificador de transação exclusivo (`transaction_id`).

{{% alert title="Nota" color="info"%}}

Se você receber um status de Aprovado (state_pol = 4) para uma `reference_sale` específica, seu sistema pode ignorar com segurança quaisquer relatórios subsequentes para essa mesma referência para evitar a duplicidade na entrega do pedido.

{{% /alert %}}

Abaixo está um exemplo mostrando uma tentativa rejeitada seguida por uma reentativa aprovada:

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
