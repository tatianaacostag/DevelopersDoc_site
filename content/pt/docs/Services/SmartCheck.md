---
title: "Smart Check – Reverificação Automática"
linkTitle: "Smart Check – Reverificação Automática"
date: 2025-03-26T15:09:39-05:00
description: >
  Smart Check é a solução de reverificação automática de comerciantes da PayU LATAM, desenvolvida para otimizar os processos de conformidade (KYC/AML).
weight: 60
---

Com este recurso, os comerciantes atualizam suas informações diretamente no **Merchant Panel**, enquanto o sistema executa automaticamente validações e screenings, reduzindo o trabalho manual das equipes de risco e conformidade.

## Como o Smart Check funciona?

O fluxo de reverificação é composto pelas seguintes etapas:

### 1. Criação do caso

A reverificação começa com a geração de um caso, da seguinte forma:

* **Automática:** conforme a periodicidade definida na seção AML da conta do comerciante.  
* **Manual:** em situações específicas, como processos de reativação.  
* Os casos são inicialmente atribuídos ao usuário **Automatic Reverification**.

### 2. Formulário digital

O comerciante recebe um formulário no **Merchant Panel** e tem até **80 dias configuráveis** para preenchê-lo.

### 3. Validações automáticas

O sistema executa os seguintes processos:

* **Web Scraper:** valida a atividade econômica em relação ao site registrado.  
* **Adverse Media:** busca notícias negativas, sanções ou vínculos com PEPs.  
* **Identity Validation & OCR:** verifica documentos e representantes legais.  
* **Matriz de risco:** é gerada e executada automaticamente com base nas informações declaradas e nas subcontas ativas.  

### 4. Resultado

Ao final das validações, o sistema determina o desfecho do caso de acordo com os achados.

* **Aprovação automática:** o caso é encerrado se nenhuma alerta for detectada.  
* **Revisão manual:** o caso é atribuído a analistas se forem encontrados achados (ex.: MCC proibido, inconsistências documentais ou CRP sancionado).  

## Principais benefícios

A implementação do Smart Check oferece vantagens significativas tanto para os comerciantes quanto para as equipes de risco e conformidade, tornando a gestão dos processos de reverificação mais ágil.

* Redução do esforço manual nos processos de KYC/AML.  
* Aprovação automática de casos de baixo risco.  
* Maior rastreabilidade e segurança nas informações declaradas.  
* Flexibilidade nos prazos de resposta e nas regras de gestão.  

## Status de um caso

No Salesforce, os casos passam pelos seguintes status:

* `Created:` Caso criado, formulário pendente.  
* `Waiting:` Formulário disponível para o comerciante.  
* `Filled:` Formulário preenchido e enviado.  
* `Form Expired:` O comerciante não respondeu dentro do prazo.  
* `Working:` Validações em andamento.  
* `Close Approved:` Caso aprovado automaticamente.  
* `Manual Review:` Caso atribuído a analistas devido a alertas ou inconsistências.  

### Considerações adicionais

Ao implementar o Smart Check, é importante considerar alguns aspectos operacionais e limitações que podem impactar a gestão dos casos:

* Na **Fase 1**, as informações aprovadas são atualizadas apenas no Salesforce. A integração com o Admin está prevista para a **Fase 2**.  
* Em operações em vários países, a criação de casos pode exigir gestão manual.  
* Alguns cenários podem exigir revisão manual (por exemplo, quando o Complif não confirma os representantes legais na Junta Comercial).  
