# Automação de E-mails com Gmail e Google Sheets 🚀

Este projeto é uma solução prática para **automatizar o gerenciamento de e-mails**, integrando o **Gmail** ao **Google Sheets** usando o **Google Apps Script**. Com ele, você pode atualizar e organizar seus e-mails em uma planilha e enviar respostas automáticas diretamente, tudo de forma simples e eficiente!

## **Funcionalidades**

- **Atualizar e-mails no Sheets**: Captura os 10 últimos e-mails da sua caixa de entrada do Gmail e organiza as informações em colunas como ID, Assunto, Remetente, Status e mais.
- **Enviar respostas automáticas**: Basta preencher a coluna **Resposta** na planilha, e o script enviará o e-mail correspondente.
- **Controle de envios**: Verifica o status dos e-mails para garantir que nenhuma resposta seja enviada mais de uma vez.
- **Menu interativo**: Adiciona um menu ao Google Sheets com as opções:
  - **Atualizar E-mails**: Sincroniza os e-mails do Gmail com a planilha.
  - **Enviar E-mail**: Envia as respostas preenchidas e atualiza o status.

## **Como Funciona**

1. **Atualizar E-mails**:  
   Clique no menu "Atualizar E-mails" para sincronizar os 10 últimos e-mails do Gmail na planilha. Isso criará uma lista com todas as informações necessárias para gerenciar os e-mails.
   
2. **Responder aos E-mails**:  
   Preencha a coluna **Resposta** com a mensagem que deseja enviar. Certifique-se de que o status do e-mail ainda não está marcado como **Respondido**.

3. **Enviar Respostas**:  
   Clique no menu "Enviar E-mail" para processar as respostas. O script enviará as mensagens e atualizará o status para **Respondido**, além de registrar a data e hora do envio.

## **Importante: Use o motor V8 no Apps Script**

Para garantir que o projeto funcione corretamente, certifique-se de que o motor do **Google Apps Script** esteja configurado como **V8**.  

### **Como verificar o motor V8**
1. Abra o Editor de Apps Script:  
   `Extensões > Apps Script` no Google Sheets.
2. Clique no menu lateral em **Configurações do Projeto**.
3. Na opção **Motor do Apps Script**, selecione **V8**.
4. Salve as configurações antes de executar o código.

Sem o motor V8, o código que utiliza recursos modernos do JavaScript (ES6+) não funcionará.

## **Tecnologias Utilizadas**

- **Google Workspace**: Integração entre Gmail e Google Sheets.
- **Google Apps Script**: Automação e execução do código JavaScript diretamente no Google Sheets.
- **JavaScript Moderno (ES6)**: Abordagem orientada a objetos para maior escalabilidade e eficiência.

## **Estrutura da Planilha**

A planilha gerada terá as seguintes colunas:  
`ID | Assunto | Remetente | Destinatário | Snippet | Resposta | Data | Status | Data Resposta`

- **ID**: Identificador único do e-mail.
- **Assunto**: O título do e-mail.
- **Remetente**: Quem enviou o e-mail.
- **Destinatário**: Quem recebeu o e-mail.
- **Snippet**: Um trecho do corpo do e-mail.
- **Resposta**: Onde você escreve a mensagem a ser enviada.
- **Data**: Data em que o e-mail foi recebido.
- **Status**: Indica se o e-mail foi lido ou respondido.
- **Data Resposta**: Registra quando o e-mail foi respondido.

## **Como Usar**

1. Abra uma planilha do Google Sheets.
2. Acesse o Editor de Apps Script: `Extensões > Apps Script`.
3. Certifique-se de que o motor do Apps Script está configurado para **V8** (veja a seção acima).
4. Cole o código fornecido no editor.
5. Salve e atualize a planilha.
6. Use o menu interativo para gerenciar seus e-mails.

## **Baixe a Planilha Modelo**

Para facilitar, você pode usar uma **planilha modelo pronta** e personalizada para este projeto.  
👉 [Clique aqui para baixar a planilha modelo](https://bit.ly/planilhaemailresponder)

## **Tutorial no Medium**

Você pode encontrar um tutorial detalhado no **MEDIUM**.  
👉 [Clique aqui para ir para o tutorial no Medium](https://bit.ly/gmailrespondermedium)

## **Vídeo no Youtube**

Se preferir aprender assistindo, temos um vídeo completo explicando este projeto no YouTube.  
👉 [Clique aqui para assistir no YouTube](https://bit.ly/gmailsheetsyoutube)