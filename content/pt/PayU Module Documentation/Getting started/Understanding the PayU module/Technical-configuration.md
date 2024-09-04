---
title: "Configuração Técnica"
linkTitle: "Configuração Técnica"
date: 2021-08-13T12:19:55-05:00
type: docs
Description: >
  Este guia fornece detalhes essenciais para integrar seu site usando qualquer um dos [métodos de integração](/pt/docs/integrations.html) que oferecemos.
weight: 20
tags: ["subtopic"]
---

## Visão Geral da Informação Técnica {#technical-information-overview}

Não importa qual [método de integração]({{< ref "integrations" >}}) você escolha, certos detalhes técnicos são necessários para garantir uma integração bem-sucedida. Este documento descreve as variáveis e configurações chave que você precisa configurar.

### Merchant ID e Account IDs {#merchant-and-account-ids}

Esses identificadores são cruciais para autenticar sua conta de comerciante com a PayU. Você pode encontrá-los no painel esquerdo do site de gestão após fazer login.

<img src="/assets/Merchant_Ids_pt.png" alt="PrintScreen" width="60%"/>

### API Key e API Login {#api-key-and-api-login}

1. Faça login no seu Painel de Gestão.

2. Navegue até _**Configurações**_ e selecione _**Configuração Técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_pt.png)

3. No painel direito, encontre tanto a chave API quanto o login API, necessários para autenticar suas transações durante a integração.

![PrintScreen](/assets/IntegrationVariables_02_pt.png)

{{% alert title="Aviso" color="warning"%}}

Sua chave API e login API são únicos para sua conta PayU. Certifique-se de que essas credenciais sejam mantidas em segurança, pois o uso indevido ou divulgação não autorizada é de sua responsabilidade.

{{% /alert %}} 

## Configurando a Informação Técnica {#configuring-technical-information}

Você pode personalizar várias configurações técnicas para cada conta ativa, incluindo:

- URLs para páginas de confirmação e resposta.
- Notificações por e-mail para compradores e para sua loja.
- Notificações do processo de disputa.
- Seleção do modo de teste ou transações ao vivo.

Para configurar essas informações, vá para _**Configurações**_ > _**Configuração Técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_pt.png)

Na janela de _**Configuração Técnica**_, você encontrará duas abas conforme suas necessidades: _**Pagamentos**_ e _**Disputas**_.

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_01_pt.png)

### Pagamentos {#payments}

Na aba _**Pagamentos**_, você pode configurar o seguinte:

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_02_pt.png)

<div class="variables"></div>

| Parâmetro | Descrição |
|---|---|
| Seus pagamentos serão processados | Escolha se suas transações serão processadas _Em Produção_ ou _Em Modo de Teste_. Transações processadas em _Modo de Teste_ são marcadas como testes e não são reais. |
| URL de resposta | A URL para onde os compradores são redirecionados após concluir uma transação. Esta página exibe o status da transação. |
| URL de confirmação | A URL para onde a PayU envia a confirmação do pagamento para o seu sistema. Use esta URL para atualizar o inventário ou bancos de dados quando uma transação atingir seu estado final. Este parâmetro é opcional. |
| Controlar pagamentos duplicados / Somente para vendas aprovadas | <li><b>Controlar pagamentos duplicados:</b> Se você habilitar esta opção, a referência só pode ser usada uma vez, independentemente do resultado da transação (aprovada, rejeitada, pendente).</li> <li><b>Apenas para vendas aprovadas:</b> Se você marcar esta caixa, uma referência só poderá ser reutilizada se a transação anterior tiver sido rejeitada. Se a transação anterior estava pendente ou aprovada, a referência não poderá ser reutilizada.</li> <li><b>Controlar pagamentos duplicados + Apenas para vendas aprovadas:</b> Se você habilitar ambas as funções, a referência só poderá ser usada uma vez (a regra "Validar referência única para todos os status" prevalece).</li> <li><b>Ambas as caixas desativadas:</b> A referência pode ser reutilizada várias vezes, independentemente do resultado da transação. Observe que ter ambas as opções desativadas pode afetar a reconciliação, pois a mesma referência pode aparecer várias vezes com diferentes status.</li> <br> <b>Nota:</b><br> Tempo de reenvio: Se você precisar reenviar uma referência, aguarde uma resposta da PayU ou pelo menos 60 segundos. |
| Notificações de pagamentos processados | Habilite notificações por e-mail a serem enviadas ao comprador ou à sua loja quando um pagamento for aprovado ou rejeitado. |

### Disputas {#disputes}

Na aba _**Disputas**_, você pode configurar as configurações relacionadas ao [processo de disputas]({{< ref "Disputes-MP.md" >}}).

![PrintScreen](/assets/TechnicalInformation/TechnicalInformation_03_pt.png)

<div class="variables"></div>

| Parâmetro | Descrição |
|---|---|
| Emails de notificação | Defina os endereços de e-mail a serem notificados quando uma disputa for iniciada. |
| URL automatica de notificação | Se habilitado, configure a URL para onde a PayU enviará notificações sobre processos de disputa. |

{{% alert title="Nota" color="info"%}}

Lembre-se de clicar no botão _**Salvar alterações**_ para aplicar as atualizações que você fizer.

{{% /alert %}} 