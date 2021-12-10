---
title: "Códigos e variáveis de resposta"
linkTitle: "Códigos e variáveis de resposta"
date: 2021-04-06T15:33:35-05:00
description:
  Nesta seção, você encontra dados relevantes utilizados durante o processo de integração, como as tabelas de variáveis, idiomas e moedas aceitas na plataforma do PayU.
weight: 50
---

## Códigos de resposta para transações {#response-codes-for-transactions}  

| Código de resposta | Descrição |
|-|-|
| `ERROR` | Erro geral. |
| `APPROVED` | A transação foi aprovada. |
| `ANTIFRAUD_REJECTED` | A transação foi rejeitada pelo sistema antifraude. |
| `BANK_FRAUD_REJECTED` | A transação foi rejeitada por suspeita de fraude na instituição financeira. |
| `PAYMENT_NETWORK_REJECTED` | A rede financeira rejeitou a transação. |
| `ENTITY_DECLINED` | A transação foi recusada pelo banco ou rede financeira devido a um erro. |
| `INTERNAL_PAYMENT_PROVIDER_ERROR` | Ocorreu um erro no sistema ao tentar processar o pagamento. |
| `INACTIVE_PAYMENT_PROVIDER` | O provedor de pagamento não estava ativo. |
| `DIGITAL_CERTIFICATE_NOT_FOUND` | The financial network reported an authentication error. |
| `INVALID_EXPIRATION_DATE_OR_SECURITY_CODE` | O código de segurança ou a data de validade eram inválidos. |
| `INVALID_RESPONSE_PARTIAL_APPROVAL` | Tipo de resposta inválido. A resposta da entidade é uma aprovação parcial e deve ser cancelada automaticamente (auto-void) pelo sistema. |
| `INSUFFICIENT_FUNDS` | A conta não tinha fundos suficientes. |
| `CREDIT_CARD_NOT_AUTHORIZED _FOR_INTERNET_TRANSACTIONS` | O cartão de crédito não foi autorizado para transações na Internet. |
| `INVALID_TRANSACTION` | A rede financeira informou que a transação era inválida. |
| `INVALID_CARD` | O cartão é inválido. |
| `EXPIRED_CARD` | O cartão expirou. |
| `RESTRICTED_CARD` | O cartão tem uma restrição. |
| `CONTACT_THE_ENTITY` | Você deve entrar em contato com o banco. |
| `REPEAT_TRANSACTION` | Você deve repetir a transação. |
| `ENTITY_MESSAGING_ERROR` | A rede financeira relatou um erro de comunicação com o banco. |
| `BANK_UNREACHABLE` | O banco não estava disponível. |
| `EXCEEDED_AMOUNT` | A transação ultrapassa o valor definido pelo banco. |
| `NOT_ACCEPTED_TRANSACTION` | A transação não foi aceita pelo banco por algum motivo. |
| `ERROR_CONVERTING_TRANSACTION_AMOUNTS` | Ocorreu um erro ao converter os valores para a moeda de pagamento. |
| `EXPIRED_TRANSACTION` | A transação expirou. |
| `PENDING_TRANSACTION_REVIEW` | A transação foi interrompida e deve ser revisada, isso pode ocorrer por causa dos filtros de segurança. |
| `PENDING_TRANSACTION_CONFIRMATION` | A transação está sujeita a confirmação. |
| `PENDING_TRANSACTION_TRANSMISSION` | A transação está sujeita a transmissão para a rede financeira. Isso geralmente se aplica a transações com meios de pagamento em dinheiro. |
| `PAYMENT_NETWORK_BAD_RESPONSE` | A mensagem retornada pela rede financeira é inconsistente. |
| `PAYMENT_NETWORK_NO_CONNECTION` | Não foi possível conectar à rede financeira. |
| `PAYMENT_NETWORK_NO_RESPONSE` | A rede financeira não respondeu. |
| `FIX_NOT_REQUIRED` | Clínica de transações: código de tratamento interno. |
| `AUTOMATICALLY_FIXED_AND_SUCCESS_REVERSAL` | Clínica de transações: código de tratamento interno. Consulta de API. |
| `AUTOMATICALLY_FIXED_AND_UNSUCCESS_REVERSAL` | Clínica de transações: código de tratamento interno. Consulta de API. |
| `AUTOMATIC_FIXED_NOT_SUPPORTED` | Clínica de transações: código de tratamento interno. Consulta de API. |
| `NOT_FIXED_FOR_ERROR_STATE` | Clínica de transações: código de tratamento interno. Consulta de API. |
| `ERROR_FIXING_AND_REVERSING` | Clínica de transações: código de tratamento interno. Consulta de API. |
| `ERROR_FIXING_INCOMPLETE_DATA` | Clínica de transações: código de tratamento interno. Consulta de API. |

## Códigos de resposta enviados para a página de confirmação {#response-codes-sent-to-the-response-page}

<div class="variables"></div>

| lap Transaction State | transaction State | pol Transaction State | lapResponseCode | pol Response Code | Descrição |
|-|-|-|-|-|-|
|  APPROVED  |  4 (Aprovada) |  4 (Aprovada) |  APPROVED  | 1 | Transação aprovada |
|  DECLINED  |  6 (Rejeitada)  |  6 (Rejeitada)  |  PAYMENT_NETWORK_REJECTED  | 4 | Transação rejeitada pela rede de pagamento |
|   |   |   |  ENTITY_DECLINED  | 5 | A transação foi recusada pelo banco |
|   |   |   |  INSUFFICIENT_FUNDS  | 6 | Fundos insuficientes |
|   |   |   |  INVALID_CARD  | 7 | Cartão inválido |
|   |   |   |  CONTACT_THE_ENTITY  | 8 | Entre em contato com sua entidade financeira |
|   |   |   |  BANK_ACCOUNT_ACTIVATION _ERROR  | 8 | Débito automático não permitido |
|   |   |   |  BANK_ACCOUNT_NOT_AUTHORIZED _FOR_AUTOMATIC_DEBIT  | 8 | Débito automático não permitido |
|   |   |   |  INVALID_AGENCY_BANK_ACCOUNT  | 8 | Débito automático não permitido |
|   |   |   |  INVALID_BANK_ACCOUNT  | 8 | Débito automático não permitido |
|   |   |   |  INVALID_BANK  | 8 | Débito automático não permitido |
|   |   |   |  EXPIRED_CARD  | 9 | Cartão vencido |
|   |   |   |  RESTRICTED_CARD  | 10 | Cartão restrito |
|   |   |   |  INVALID_EXPIRATION_DATE_OR _SECURITY_CODE  | 12 | Data de vencimento ou código de segurança inválido |
|   |   |   |  REPEAT_TRANSACTION  | 13 | Repita a transação |
|   |   |   |  INVALID_TRANSACTION  | 14 | Transação inválida |
|   |   |   |  EXCEEDED_AMOUNT  | 17 | O valor excede o máximo permitido por esta entidade |
|   |   |   |  ABANDONED_TRANSACTION  | 19 | Transação abandonada pelo pagador |
|   |   |   |  CREDIT_CARD_NOT_AUTHORIZED_FOR _INTERNET_TRANSACTIONS  | 22 | O cartão não está autorizado para compras na Internet |
|   |   |   |  ANTIFRAUD_REJECTED  | 23 | A transação foi rejeitada pelo módulo antifraude |
|   |   |   |  BANK_FRAUD_REJECTED  | 23 | A transação foi rejeitada devido a suspeita de fraude na instituição financeira |
|   |   |   |  DIGITAL_CERTIFICATE_ NOT_FOUND  | 9995 | Certificado digital não encontrado |
|   |   |   |  BANK_UNREACHABLE  | 9996 | Erro ao tentar se comunicar com o banco |
|   |   |   |  ENTITY_MESSAGING _ERROR  | 9997 | Erro de comunicação com a instituição financeira |
|   |   |   |  NOT_ACCEPTED_ TRANSACTION  | 9998 | Transação não permitida ao titular do cartão |
|   |   |   |  INTERNAL_PAYMENT _PROVIDER_ERROR  | 9999 | Erro interno |
|   |   |   |  INACTIVE_PAYMENT_ PROVIDER  | 9999 | Erro interno |
|  ERROR  |  104 (Erro)  |  6 (Rejeitada)  |  ERROR  | 9999 | Erro interno |
|   |   |   |  ERROR_CONVERTING_TRANSACTION _AMOUNTS  | 9999 | Erro interno |
|   |   |   |  BANK_ACCOUNT_ACTIVATION_ERROR  | 9999 | Erro interno |
|   |   |   |  FIX_NOT_REQUIRED  | 9999 | Erro interno |
|   |   |   |  AUTOMATICALLY_FIXED_AND_SUCCESS _REVERSAL  | 9999 | Erro interno |
|   |   |   |  AUTOMATICALLY_FIXED _AND_UNSUCCESS _REVERSAL  | 9999 | Erro interno |
|   |   |   |  AUTOMATIC_FIXED_ NOT_SUPPORTED  | 9999 | Erro interno |
|   |   |   |  NOT_FIXED_FOR_ ERROR_STATE  | 9999 | Erro interno |
|   |   |   |  ERROR_FIXING_AND _REVERSING  | 9999 | Erro interno |
|   |   |   |  ERROR_FIXING_ INCOMPLETE_DATA  | 9999 | Erro interno |
|   |   |   |  PAYMENT_NETWORK_ BAD_RESPONSE  | 9999 | Erro interno |
|   |   |   |  PAYMENT_NETWORK_ NO_CONNECTION  | 9996 | Não foi possível contatar a instituição financeira |
|   |   |   |  PAYMENT_NETWORK_ NO_RESPONSE  | 9996 | Sem resposta da instituição financeira |
|  EXPIRED  |  5 (Expirada)  |  5 (Expirada)  |  EXPIRED_TRANSACTION  | 20 | Transação expirada |
|  PENDING  |  7 (Pendente)  |  7 (Pendente)  |  PENDING_TRANSACTION_ REVIEW  | 15 | A transação está com aprovação pendente |
|   |   |  14 (Pendente)  |  PENDING_TRANSACTION_ CONFIRMATION  | 25 | Recibo de pagamento gerado. Pagamento Pendente |
|   |   |  7 (Pendente)  |  PENDING_TRANSACTION_ TRANSMISSION  | 9998 | Transação não permitida |
|   |   |  14 (Pendente)  |  PENDING_PAYMENT_IN_ENTITY  | 25 | Recibo de pagamento gerado. Pagamento Pendente |
|   |   |  15 (Pendente)  |  PENDING_PAYMENT_IN_BANK  | 26 | Recibo de pagamento gerado. Pagamento Pendente |
|   |   |  10 (Pendente)  |  PENDING_SENT_TO_FINANCIAL _ENTITY  | 29 |                        |
|   |   |  12 (Pendente)  |  PENDING_AWAITING_PSE _CONFIRMATION  | 9994 | Confirmação de PSE pendente |
|   |   |  18 (Pendente)  |  PENDING_NOTIFYING_ENTITY  | 25 | Recibo de pagamento gerado. Pagamento Pendente |

## Códigos de resposta enviados para a página de confirmação {#response-codes-sent-to-the-confirmation-page}

<div class="variables"></div>

| state_pol | response_message_pol | response_code_pol | Descrição |
|-|-|-|-|
|  4 (Aprovada) |  APPROVED  | 1 | Transação aprovada |
|  6 (Rejeitada)  |  PAYMENT_NETWORK_REJECTED  | 4 | Transação rejeitada pela instituição financeira |
|   |  ENTITY_DECLINED  | 5 | Transação rejeitada pelo banco |
|   |  INSUFFICIENT_FUNDS  | 6 | Fundos insuficientes |
|   |  INVALID_CARD  | 7 | Cartão inválido |
|   |  CONTACT_THE_ENTITY  | 8 | Entre em contato com a instituição financeira |
|   |  BANK_ACCOUNT_ACTIVATION_ERROR  | 8 | Débito automático não permitido |
|   |  BANK_ACCOUNT_NOT_AUTHORIZED _FOR_AUTOMATIC_DEBIT  | 8 | Débito automático não permitido |
|   |  INVALID_AGENCY_BANK_ACCOUNT  | 8 | Débito automático não permitido |
|   |  INVALID_BANK_ACCOUNT  | 8 | Débito automático não permitido |
|   |  INVALID_BANK  | 8 | Débito automático não permitido |
|   |  EXPIRED_CARD  | 9 | Cartão vencido |
|   |  RESTRICTED_CARD  | 10 | Cartão restrito |
|   |  INVALID_EXPIRATION_DATE_OR _SECURITY_CODE  | 12 | Data de validade ou código de segurança inválido |
|   |  REPEAT_TRANSACTION  | 13 | Tente novamente o pagamento |
|   |  INVALID_TRANSACTION  | 14 | Transação inválida |
|   |  EXCEEDED_AMOUNT  | 17 | O valor ultrapassa o máximo permitido pela entidade |
|   |  ABANDONED_TRANSACTION  | 19 | Transação abandonada pelo pagador |
|   |  CREDIT_CARD_NOT_AUTHORIZED_FOR _INTERNET_TRANSACTIONS  | 22 | Cartão não autorizado a comprar online |
|   |  ANTIFRAUD_REJECTED  | 23 | Transação recusada devido a suspeita de fraude |
|   |  BANK_FRAUD_REJECTED  | 23 | A transação foi rejeitada devido a suspeita de fraude na instituição financeira |
|   |  DIGITAL_CERTIFICATE_NOT_FOUND  | 9995 | Certificado digital não encontrado |
|   |  BANK_UNREACHABLE  | 9996 | Erro ao tentar se comunicar com o banco |
|   |  PAYMENT_NETWORK_NO_CONNECTION  | 9996 | Não foi possível contatar a instituição financeira |
|   |  PAYMENT_NETWORK_NO_RESPONSE  | 9996 | Nenhuma resposta recebida da instituição financeira |
|   |  ENTITY_MESSAGING_ERROR  | 9997 | Erro de comunicação com a instituição financeira |
|   |  NOT_ACCEPTED_TRANSACTION  | 9998 | Transação não permitida |
|   |  INTERNAL_PAYMENT_PROVIDER_ERROR  | 9999 | Erro |
|   |  INACTIVE_PAYMENT_PROVIDER  | 9999 | Erro |
|   |  ERROR  | 9999 | Erro |
|   |  ERROR_CONVERTING_TRANSACTION _AMOUNTS  | 9999 | Erro |
|   |  BANK_ACCOUNT_ACTIVATION_ERROR  | 9999 | Erro |
|   |  FIX_NOT_REQUIRED  | 9999 | Erro |
|   |  AUTOMATICALLY_FIXED_AND_SUCCESS _REVERSAL  | 9999 | Erro |
|   |  AUTOMATICALLY_FIXED_AND_UNSUCCESS _REVERSAL  | 9999 | Erro |
|   |  AUTOMATIC_FIXED_NOT_SUPPORTED  | 9999 | Erro |
|   |  NOT_FIXED_FOR_ERROR_STATE  | 9999 | Erro |
|   |  ERROR_FIXING_AND_REVERSING  | 9999 | Erro |
|   |  ERROR_FIXING_INCOMPLETE_DATA  | 9999 | Erro |
|   |  PAYMENT_NETWORK_BAD_RESPONSE  | 9999 | Erro |
|  5 (Expirada)  |  EXPIRED_TRANSACTION  | 20 | Transação expirada |

## Códigos dos métodos de pagamento {#codes-of-the-payment-methods}
Os seguintes códigos se aplicam a `payment_method_type` (Página de confirmação), `payment_method_id` (Página de confirmação) e `polPaymentMethodType` (Página de resposta).

| Código | lapPaymentMethodType<br>(Página de resposta) | Descrição                     |
|:------:|----------------------------------------------|-------------------------------|
|    2   | CREDIT_CARD                                  | Cartões de crédito            |
|    4   | PSE                                          | Transferências bancárias PSE  |
|    5   | ACH                                          | Débitos ACH                   |
|    6   | DEBIT_CARD                                   | Cartões de débito             |
|    7   | CASH                                         | Dinheiro                      |
|    8   | REFERENCED                                   | Pagamento referenciado        |
|   10   | BANK_REFERENCED                              | Pagamento em bancos           |
|   14   | SPEI                                         | Transferências bancárias SPEI |

## Comandos aceitos pela API de pagamentos {#commands-accepted-by-the-payments-api}

| Comando               | Descrição                                                                 |
|-----------------------|---------------------------------------------------------------------------|
| `PING`                | Usado no ping do serviço.                                                 |
| `SUBMIT_TRANSACTION`  | Usado para enviar transações de qualquer tipo.                            |
| `GET_PAYMENT_METHODS` | Usado para consultar os métodos de pagamento disponíveis para o comércio. |
| `GET_BANKS_LIST`      | Usado para obter a lista de bancos para transações PSE.                   |

## Comandos aceitos pela API de consulta {#commands-accepted-by-the-query-api}

| Comando                          | Descrição                                                       |
|----------------------------------|-----------------------------------------------------------------|
| `PING`                           | Usado no ping do serviço.                                       |
| `ORDER_DETAIL`                   | Usado para consultar uma ordem usando seu identificador.        |
| `ORDER_DETAIL_BY_REFERENCE_CODE` | Usado para consultar uma ordem usando seu código de referência. |
| `TRANSACTION_RESPONSE_DETAIL`    | Usado para verificar a resposta de uma transação.               |

## Moedas aceitas {#accepted-currencies}

| Moeda    | Descrição          |
|----------|--------------------|
| `ARS`    | Peso argentino     |
| `BRL`    | Real brasileiro    |
| `CLP`    | Peso Chileno       |
| `COP`    | Peso colombiano    |
| `MXN`    | Peso mexicano      |
| `PEN`    | Nuevo Sol peruano  |
| `USD`    | Dólar americano    |

## Status da ordem {#order-status}

| Status        | Descrição                                                       |
|---------------|-----------------------------------------------------------------|
| `NEW`         | A ordem foi criada no sistema.                                  |
| `IN_PROGRESS` | A ordem está sendo processado.                                  |
| `AUTHORIZED`  | A última transação da ordem é uma autorização aprovada.         |
| `CAPTURED`    | A última transação da ordem é uma captura aprovada.             |
| `CANCELLED`   | A última transação da ordem é um cancelamento aprovado.         |
| `DECLINED`    | A última transação da ordem foi recusada.                       |
| `REFUNDED`    | A última transação da ordem é um reembolso aprovado.            |
| `CHARGEBACK`  | A última transação da ordem é um estorno. Ou seja, corresponde a uma [Disputa]({{< ref "Disputes.md" >}}) perdida. |

## Transaction states {#transaction-states}

| Estado       | Descrição                                                                                                   |
|-------------|-------------------------------------------------------------------------------------------------------------|
| `APPROVED`  | Transação aprovada                                                                                          |
| `DECLINED`  | Transação rejeitada                                                                                         |
| `ERROR`     | Erro ao processar a transação                                                                               |
| `EXPIRED`   | Transação expirada                                                                                          |
| `PENDING`   | Transação pendente ou em validação                                                                          |
| `SUBMITTED` | Transação enviada para a instituição financeira, mas o processamento não foi concluído.<br>API de consulta. |

## Tipos de transação {#transaction-types} 

| Tipo                        | Descrição                                                     |
|-----------------------------|---------------------------------------------------------------|
| `AUTHORIZATION`             | Transação de autorização.                                     |
| `AUTHORIZATION_AND_CAPTURE` | Transação de cobrança, autorização e captura em uma só etapa. |
| `CAPTURE`                   | Transação de captura.                                         |
| `VOID`                      | Transação de cancelamento de uma autorização.                 |
| `REFUND`                    | Transação de reembolso ou cancelamento de uma captura.        |

## Países de processamento {#processing-countries}

| País      | Descrição   |
|-----------|-------------|
| `AR`      | Argentina   |
| `BR`      | Brasil      |
| `CL`      | Chile       |
| `CO`      | Colômbia    |
| `MX`      | México      |
| `PA`      | Panamá      |
| `PE`      | Peru        |

## Idiomas disponíveis {#supported-languages}

| Código ISO 639 | Idioma    |
|----------------|-----------|
| `en`           | Inglês    |
| `es`           | Espanhol  |
| `pt`           | Português |

## Tipos de documentos {#document-types}

| ISO  | Descrição                                                                                | País                   |
|------|------------------------------------------------------------------------------------------|------------------------|
| CC   | Cartão de cidadania.                                                                     | Colômbia               |
| CE   | Cartão de cidadão estrangeiro.                                                           | Colômbia, Peru         |
| CEL  | Quando identificado pela linha móvel.                                                    | Colômbia               |
| Código postal  | Recibo de Pagamento Eletrônico                                                           | México                 |
| CI   | Cartão de identidade.                                                                    | Argentina, Chile       |
| CNPJ | Registro Nacional de Pessoas Jurídicas                                                   | Brasil                 |
| CPF  | Registro de Indivíduos                                                                   | Brasil                 |
| CUIL | Código Único de Identificação de Trabalho                                                | Argentina              |
| CUIT | Identificação Fiscal Única                                                               | Argentina              |
| CURP | Código Único de Registro de População                                                    | México                 |
| DE   | Número de Identificação Estrangeiro                                                      | Peru                   |
| DL   | Carteira de motorista                                                                    |                        |
| DNI  | Documento de Identidade Nacional                                                         | Argentina, Peru, Chile |
| DNIE | Documento de Identidade Nacional - Eletrônico                                            | Argentina, Peru, Chile |
| EIN  | Número de Identificação do Empregado                                                     | Peru                   |
| ID   | Identificação                                                                            |                        |
| IDC  | Identificador único do cliente, em casos com ID único de cliente/ID de conta de serviços |                        |
| IFE  | Instituto Eleitoral Federal                                                              | México                 |
| LC   | Caderno Cívico                                                                           | Argentina              |
| LE   | Inscrição de livro                                                                       | Argentina              |
| NIF  | Número de identificação fiscal                                                           |                        |
| NIT  | Número de identificação fiscal                                                           | Colômbia               |
| PP   | Passaporte.                                                                              |                        |
| RC   | Certidão de nascimento.                                                                  | Colômbia               |
| RDE  | Tipo de documento RDE                                                                    |                        |
| RE   | Tipo de documento RE                                                                     |                        |
| RFC  | Cadastro de contribuinte federal                                                         | México                 |
| RIF  | Registro de Informações Fiscais                                                          |                        |
| RM   | Registro comercial                                                                       |                        |
| RMC  | Registro Consular                                                                        |                        |
| RNC  | Registro Nacional de Contribuintes                                                       |                        |
| RUC  | Registro Único de Contribuinte                                                           | Peru                   |
| RUN  | Papel Nacional Único                                                                     | Chile                  |
| RUT  | Papel Tributário Único                                                                   | Chile                  |
| SC   | Passagem Segura                                                                          |                        |
| SIEM | Sistema Mexicano de Informação Empresarial                                               | México                 |
| SSN  | Número de Previdência Social                                                             |                        |
| TI   | Cartão de identidade.                                                                    | Colômbia               |

## Bancos para Payouts {#banks-for-payouts}
Envie o valor exato exibido na coluna `Código` na variável `transfers[n].bankAccount.bankCode`. Consulte [Payouts]({{< ref "Payouts-API.md" >}}) para obter mais informações.

### Colômbia {#colombia}

| Código    | Bank name                                         |
|-----------|---------------------------------------------------|
| `001`     | BOGOTA                                            |
| `002`     | POPULAR                                           |
| `006`     | ITAU CORPBANCA                                    |
| `007`     | BANCOLOMBIA                                       |
| `009`     | CITIBANK COLOMBIA                                 |
| `012`     | GNB SUDAMERIS                                     |
| `014`     | ITAU                                              |
| `013`     | BBVA                                              |
| `019`     | SCOTIABANK                                        |
| `023`     | BANCO DE OCCIDENTE                                |
| `031`     | BANCOLDEX                                         |
| `032`     | BCSC                                              |
| `040`     | BANCO AGRARIO                                     | 
| `041`     | JPMORGAN                                          |
| `042`     | BNP PARIBAS                                       |
| `047`     | MUNDOMUJER                                        |
| `051`     | DAVIVIENDA                                        |
| `052`     | AV VILLAS                                         |
| `053`     | BANCO WWB                                         |
| `059`     | BANCAMIA                                          |
| `060`     | PICHINCHA                                         |
| `061`     | BANCOOMEVA                                        |
| `062`     | FALABELLA                                         |
| `063`     | FINANDINA                                         |
| `065`     | BCO SANTANDER DE NEGOCIOS                         |
| `066`     | COOPCENTRAL                                       |
| `067`     | COOMPARTIR                                        |
| `069`     | BANCO SERFINANZA                                  |
| `070`     | LULO BANK                                         |
| `071`     | BANCO JP MORGAN COLOMBIA                          |
| `083`     | COMPENSAR                                         |
| `084`     | APORTES EN LINEA (GESTION Y CONTACTO)             |
| `086`     | ASOPAGOS                                          |
| `087`     | FEDECAJAS                                         |
| `088`     | SIMPLE                                            |
| `089`     | ENLACE OPERATIVO                                  |
| `090`     | CORFICOLOMBIANA                                   |
| `121`     | JURISCOOP                                         |
| `151`     | RAPPIPAY                                          |
| `283`     | COOPERATIVA FINANCIERA DE ANTIOQUIA               |
| `289`     | COTRAFA                                           |
| `292`     | CONFIAR COOPERATIVA FINANCIERA                    |
| `370`     | COLTEFINANCIERA S.A. - COMPANIA DE FINANCIAMIENTO |
| `507`     | NEQUI                                             |
| `550`     | DECEVAL                                           |
| `558 `    | CREDIFINANCIERA S.A.                              |
| `683`     | DGCPTN                                            |
| `685`     | DGCPTN-REGALIAS                                   |
| `801`     | MOVII                                             |
| `0551`    | DAVIPLATA                                         |
| `1062`    | BANCO FALABELLA S.A.                              |
| `1063`    | BANCO FINANDINA S.A.                              |
| `1069`    | BANCO SERFINANZA S.A.                             |
| `1283`    | COOPERATIVA FINANCIERA DE ANTIOQUIA               |
| `1291`    | COOFINEP                                          |
| `1292`    | CONFIAR COOPERATIVA FINANCIERA                    |
| `1303`    | GIROS Y FINANZAS                                  |
| `1637`    | IRIS                                              |
