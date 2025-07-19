---
title: "Guia de Conformidade e Segurança PCI DSS"
linkTitle: "Guia de Conformidade e Segurança PCI DSS"
date: 2024-10-30T15:48:08-05:00
description: >
  A segurança em transações eletrônicas é essencial para proteger empresas e consumidores no ambiente digital. Este guia apresenta boas práticas e normas que garantem transações seguras e conformidade regulatória, fortalecendo a confiança do usuário e mitigando riscos operacionais e reputacionais.
weight: 20
tags: ["subtopic"]
---

## Conformidade no processamento de pagamentos: O que você precisa saber

O crescimento acelerado dos pagamentos digitais abriu um mundo de oportunidades para as empresas, mas também introduziu novos riscos. À medida que as transações online aumentam, torna-se fundamental para as empresas seguirem normas internacionais de segurança e proteção de dados. Essa conformidade não é apenas uma exigência legal — é um pilar fundamental para construir a confiança dos usuários e garantir a continuidade dos negócios.

### Por que a conformidade com as normas é essencial?

Em um ambiente onde os pagamentos eletrônicos movimentam trilhões de dólares todos os anos, ameaças como fraudes e vazamentos de dados são cada vez mais frequentes e sofisticadas. O não cumprimento das regulamentações pode levar a consequências sérias: multas, perda de credibilidade, interrupções nos serviços e até ações judiciais.

Proteger as informações dos portadores de cartão, especialmente os dados financeiros, não é opcional — é uma responsabilidade compartilhada entre comerciantes, processadores de pagamento e plataformas tecnológicas.

## Fundamentos do PCI DSS 4.0

Cumprir normas internacionais como o PCI DSS 4.0 (Padrão de Segurança de Dados para a Indústria de Cartões de Pagamento) é essencial para garantir a segurança das transações e evitar sanções legais.

### Requisitos-chave do PCI DSS

O padrão PCI DSS estabelece um conjunto de medidas obrigatórias que as organizações devem adotar para proteger os dados de cartões de pagamento. Esses requisitos visam fortalecer a infraestrutura de segurança, reduzir riscos de fraude e garantir a integridade das transações eletrônicas.

1. **Rede segura:** Implementação de firewalls e senhas seguras.  
2. **Proteção dos dados do portador de cartão:** Armazenamento criptografado e acesso restrito apenas a pessoal autorizado.  
3. **Gestão de vulnerabilidades:** Atualizações regulares de software para prevenir ataques.  
4. **Controle de acesso:** Apenas funcionários necessários têm acesso aos dados de cartão, com monitoramento de acesso.  
5. **Monitoramento e testes contínuos:** Auditorias periódicas para identificar e corrigir vulnerabilidades.  
6. **Política abrangente de segurança:** Implementação de políticas de segurança e treinamento contínuo para todos que lidam com dados sensíveis.

### Escopo e segmentação no PCI DSS

Com a publicação da versão 4.0 do PCI DSS, as organizações enfrentam novos desafios e oportunidades em suas estratégias de conformidade. A transformação digital trouxe ambientes cada vez mais dinâmicos: infraestruturas multicloud, arquiteturas Zero Trust e virtualização de redes — todos exigindo reavaliação do escopo e das medidas técnicas para proteger os dados dos portadores de cartão.

#### Escopo no PCI DSS v4.0

Nas versões anteriores, o escopo do PCI DSS focava principalmente nos sistemas que processavam, armazenavam ou transmitiam dados de cartão. O PCI DSS v4.0 adota uma abordagem mais ampla e precisa:

* Inclui sistemas e processos que possam impactar a segurança dos dados, mesmo que não manipulem diretamente o PAN (Número Primário da Conta) ou SAD (Dados Sensíveis de Autenticação).
* Sistemas com conectividade direta ao Ambiente de Dados do Portador de Cartão (CDE) são considerados dentro do escopo.
* Componentes fora do escopo devem ser isolados de forma eficaz e validados por testes de segmentação de rede.
* Essa validação deve ser documentada e renovada periodicamente como parte do ciclo de conformidade.

{{% alert title="Exemplo" color="info" %}}

Um servidor administrativo que não armazena dados de cartão, mas tem acesso ao CDE, está dentro do escopo, a menos que esteja isolado e formalmente testado.

{{% /alert %}}

#### Segmentação para reduzir o escopo do PCI

A segmentação de rede continua sendo uma ferramenta chave para limitar o escopo de conformidade e reduzir riscos, mas precisa ser adaptada aos ambientes tecnológicos modernos. Existem diversas estratégias, dependendo do tipo de arquitetura:

1. **Segmentação tradicional (rede física ou lógica)**  
   * Uso de firewalls, roteadores, VLANs, ACLs etc.  
   * Ainda válida em ambientes on-premise, híbridos ou em nuvem.

2. **Segmentação em arquiteturas Zero Trust**  
   * Baseada em políticas de acesso granulares, microsegmentação e controle por identidade, dispositivo e contexto.  
   * Cada acesso é avaliado dinamicamente — não se presume confiança com base na localização da rede.  
   * Exige monitoramento contínuo, validação de dispositivos e forte gerenciamento de identidade.

3. **Segmentação em ambientes multicloud**  
   * Envolve o controle do tráfego entre diferentes CSPs (provedores de serviços em nuvem) usando VPNs, links privados, firewalls nativos, proxies e service mesh.  
   * Recomenda-se o uso de controles no nível de host ou aplicação (ex: microsserviços, containers, API gateways).  
   * Visibilidade centralizada dos fluxos de dados, configuração e mudanças (Infraestrutura como Código – IaC) é vital.

4. **Testes de intrusão obrigatórios**  
   * Toda segmentação usada para reduzir o escopo deve ser testada por meio de pentests.  
   * Os testes devem ser realizados a partir de sistemas externos que capturam dados de cartão (ex: plataformas de e-commerce, gateways).

### Tokenização de dados: Protegendo o PAN

A tokenização é uma técnica de segurança que substitui o número real do cartão (PAN) por um token sem valor intrínseco. Isso permite processar transações ou armazenar referências sem comprometer o PAN, protegendo os dados sensíveis mesmo em caso de vazamento.

Segundo as Diretrizes de Segurança de Produtos de Tokenização, existem dois principais tipos de tokens:

#### Tokens irreversíveis

* Gerados com funções matemáticas unidirecionais.  
* Não podem ser revertidos ao PAN original.  
* Úteis quando a recuperação do PAN não é necessária (ex: análises ou armazenamento de backoffice).

#### Tokens reversíveis

* Permitem recuperar o PAN original se certos requisitos de segurança forem atendidos.  
* Usados em modelos centralizados de tokenização que exigem detokenização (ex: conciliações ou estornos).  
* Requerem gerenciamento seguro de chaves e autenticação multifator para acessar os dados originais.

#### Controles recomendados para soluções de tokenização

* Validação FIPS 140-2 Nível 2 ou 3, conforme se trate de uma solução de software ou hardware.  
* Separação clara entre tokens e dados originais do PAN.  
* Monitoramento de acessos, auditoria de eventos e proteção criptográfica dos tokens.  
* Autenticação forte, controle de acesso baseado em função e isolamento dos cofres de tokens.

### Níveis e métodos de conformidade PCI DSS

A conformidade com o padrão PCI DSS varia de acordo com o tipo de entidade (comerciante ou prestador de serviço) e seu volume anual de transações. O padrão classifica as organizações em diferentes níveis, cada um com exigências específicas como auditorias externas, autoavaliações ou varreduras técnicas.

Um elemento-chave para validar a conformidade técnica é o uso de um ASV (Fornecedor de Varredura Aprovado) — uma organização certificada pelo PCI Security Standards Council que realiza varreduras de vulnerabilidade em sistemas expostos à internet. Essas varreduras ajudam a:

* Detectar configurações inseguras ou softwares vulneráveis.  
* Validar a conformidade com o requisito 11.3.2 do PCI DSS v4.0.  
* Emitir relatórios oficiais usados em processos como o AOC (Attestation of Compliance) ou SAQ (Self-Assessment Questionnaire).

{{% alert title="Nota" color="info" %}}

As varreduras devem ser realizadas pelo menos uma vez por trimestre ou após mudanças significativas na infraestrutura de tecnologia.

{{% /alert %}}

Abaixo estão os diferentes níveis de conformidade e os métodos de avaliação aplicáveis.

#### Níveis de conformidade para comerciantes

Organizações que processam transações com cartão são agrupadas em quatro níveis com base no volume anual de transações, o que determina os requisitos de conformidade.

| **Nível de conformidade** | **Volume anual de transações** | **Requisitos de avaliação** |
|-|-|-|
| **Nível 1** | Mais de 6 milhões de transações Visa/MasterCard ou mais de 2,5 milhões de American Express | <li> Auditoria externa anual (QSA) <br> <li> Varredura trimestral de vulnerabilidades (ASV) <br> <li> Relatório anual de conformidade (AOC e ROC) |
| **Nível 2** | Entre 1 e 6 milhões de transações | <li> Autoavaliação anual (SAQ) ou auditoria externa <br> <li> Varredura trimestral de vulnerabilidades (ASV) |
| **Nível 3** | Entre 20.000 e 1 milhão de transações | <li> Autoavaliação anual (SAQ) <br> <li> Varredura trimestral de vulnerabilidades (ASV) |
| **Nível 4** | Menos de 20.000 transações | <li> Autoavaliação anual (SAQ) <br> <li> Varredura trimestral de vulnerabilidades (ASV, conforme exigido pelo banco adquirente) |

#### Níveis de conformidade para prestadores de serviço

Prestadores de serviço são agrupados em dois níveis com base na relevância e volume de transações:

| **Nível de conformidade** | **Volume anual de transações** | **Requisitos de avaliação** |
|-|-|-|
| **Nível 1** | Mais de 300.000 transações ou considerados críticos | <li> Auditoria anual por um QSA ou ISA <br> <li> Testes trimestrais de vulnerabilidade (ASV) <br> <li> Testes de intrusão anuais |
| **Nível 2** | Menos de 300.000 transações | <li> Autoavaliação (SAQ) <br> <li> Testes trimestrais de vulnerabilidade (ASV) |

#### Métodos de avaliação

- **Questionário de autoavaliação (SAQ):** Autoavaliação usada por comerciantes e prestadores de menor porte para validar a conformidade.  
- **Relatório de conformidade (RoC):** Auditoria anual para entidades de Nível 1, documentando a conformidade.  
- **Declaração de conformidade (AoC):** Documento assinado que confirma a conformidade após auditoria ou autoavaliação.

{{% alert title="Nota" color="info" %}}

Empresas que sofrem incidentes de segurança podem ser reclassificadas para um nível superior, independentemente do volume de transações.

{{% /alert %}}

## Estratégias abrangentes de segurança de dados

Fraudes online são uma ameaça constante para qualquer plataforma de transações eletrônicas. Para minimizar riscos e proteger os dados dos clientes, implemente estas práticas essenciais:

- **Reforce a autenticação com 2FA:** Exija uma camada adicional de autenticação (como código enviado ao celular ou método MFA) para prevenir acessos não autorizados e transações fraudulentas.
- **Comunique-se com criptografia avançada:** Garanta que todas as comunicações cliente-servidor estejam criptografadas com TLS 1.2 ou 1.3 para proteger informações sensíveis contra interceptação.
- **Monitore transações suspeitas ativamente:** Use algoritmos de detecção de fraude para identificar padrões incomuns, como transações frequentes em curto período ou localizações atípicas.
- **Proteja dados sensíveis com tokenização:** Substitua dados confidenciais, como números de cartão, por tokens alfanuméricos sem valor intrínseco, garantindo a segurança em caso de acesso não autorizado.

### Garantindo a integridade dos dados dos clientes

Implementar as melhores práticas de segurança, além de seguir os padrões, é essencial para manter a integridade e confidencialidade dos dados dos clientes. Medidas-chave incluem:

- **Backups frequentes:** Permitem restaurar sistemas com mínima perda de dados após um incidente.  
- **Controle de Acesso Baseado em Funções (RBAC):** Limita o acesso aos dados conforme o papel dos funcionários, reduzindo o risco de uso indevido.  
- **Política de privacidade transparente:** Explique claramente como os dados são tratados e protegidos, gerando confiança na plataforma.

## Recursos adicionais

- <a href="https://www.pcisecuritystandards.org" target="_blank">PCI Security Standards Council:</a> Informações oficiais sobre o PCI DSS.  
- <a href="https://docs-prv.pcisecuritystandards.org/Guidance%20Document/PCI%20DSS%20General/PCI-DSS-Scoping-and-Segmentation-Guidance-for-Modern-Network-Architectures.pdf" target="_blank">Guia de Escopo do PCI DSS:</a> Aplicação do padrão em diferentes negócios.  
- <a href="https://listings.pcisecuritystandards.org/documents/Tokenization_Product_Security_Guidelines.pdf" target="_blank">Diretrizes do PCI Council sobre Tokenização</a>.