class EmailManager {
  constructor(sheetName) {
    this.sheetName = sheetName
    this.planilha = SpreadsheetApp.getActiveSpreadsheet()
    this.aba = this.planilha.getSheetByName(sheetName)

    if (!this.aba) {
      throw new Error(`A aba "${sheetName}" não foi encontrada!`)
    }
  }

  // Obtém os IDs já existentes na planilha
  getExistingIds() {
    const ultimaLinha = this.aba.getLastRow()
    return ultimaLinha > 1
      ? this.aba.getRange(2, 1, ultimaLinha - 1, 1).getValues().flat().filter(id => id)
      : []
  }

  // Busca os últimos e-mails do Gmail
  fetchEmails(limit = 10) {
    const threads = GmailApp.getInboxThreads(0, limit)
    const emails = []

    threads.forEach(thread => {
      thread.getMessages().forEach(mensagem => {
        const id = mensagem.getId()
        const assunto = mensagem.getSubject()
        const remetente = mensagem.getFrom()
        const destinatario = mensagem.getTo()
        const snippet = mensagem.getPlainBody().substring(0, 100)
        const data = mensagem.getDate()
        const status = mensagem.isUnread() ? 'Não lido' : 'Lido'

        emails.push({
          id, assunto, remetente, destinatario, snippet, data, status
        })
      })
    })

    return emails
  }

  // Salva novos e-mails na planilha
  saveNewEmails() {
    const existingIds = this.getExistingIds()
    const emails = this.fetchEmails()

    const novosEmails = emails
      .filter(email => !existingIds.includes(email.id))
      .map(email => [
        email.id,
        email.assunto,
        email.remetente,
        email.destinatario,
        email.snippet,
        '', 
        email.data,
        email.status,
        '' 
      ])

    if (novosEmails.length > 0) {
      const ultimaLinha = this.aba.getLastRow()
      this.aba.getRange(ultimaLinha + 1, 1, novosEmails.length, novosEmails[0].length).setValues(novosEmails)
      Logger.log(`Novos e-mails adicionados: ${novosEmails.length}`)
    } else {
      Logger.log('Nenhum novo e-mail foi encontrado.')
    }
  }

// Envia respostas para os e-mails
sendEmails() {
  const ultimaLinha = this.aba.getLastRow()
  if(ultimaLinha <= 1) {
    SpreadsheetApp.getUi().alert('Nenhum e-mail apra processar. Atualize a planilha primeiro!')
  }

  const dados = this.aba.getRange(2, 1, ultimaLinha - 1, 9).getValues()
  let emailsEnviados = 0

  dados.forEach((linha, index) => {
    const [idEmail, , , , , resposta, , status] = linha

    // Verifica se há texto na coluna Resposta e se o Status não é Respondido
    if(resposta && resposta.trim() !== '' && status !== 'Respondido'){
     try {
      const mensagem = GmailApp.getMessageById(idEmail)
      if (!mensagem) {
        throw new Error(`E-mail não encontrado para o ID: ${idEmail}`)
      }

      // Enviar resposta
      mensagem.reply(resposta)
      Logger.log(`Resposta enviada para o e-mail com ID: ${idEmail}`)
      
      //Atualizar o Status e a data Resposta na planilha
      const linhaPlanilha = index + 2
      this.aba.getRange(linhaPlanilha, 8).setValue('Respondido')
      this.aba.getRange(linhaPlanilha, 9).setValue(new Date())
      emailsEnviados++

     }catch (erro) {
      Logger.log(`Erro ao responder e-mail com ID ${idEmail}: ${erro.mensagem}`)
     }

    } else if (!resposta || resposta.trim() === '') {
      Logger.log(`Linha ${index + 2} ignorada: Resposta vazia`)
    } else if (status === 'Respondido') {
      Logger.log(`Linha ${index + 2} ignorada: E-mail já respondido`)
    }
  })

  const ui = SpreadsheetApp.getUi()
  if (emailsEnviados === 0) {
    ui.alert('Nenhum e-mail enviado. Certifique-se de preencher a coluna "Resposta" e que os e-mails não tenham sido respondido anteriomente.')
  } else {
    ui.alert(`${emailsEnviados} e-mails(s) enviado(s) com sucesso!`)
   }

  }
}
// Função apra salvar e-mails na planilha
function salvarEmailsNaPlanilha() {
  const emailManager = new EmailManager('email')
  emailManager.saveNewEmails()
}

// Função para enviar respostas
function responderEmailsDaPlanilha() {
  const emailManager = new EmailManager('email')
  emailManager.sendEmails()
}

// Função apra criar o menu no Google Sheets
function onOpen() {
 const ui = SpreadsheetApp.getUi()
        ui.createMenu('E-mails')
          .addItem('Atualizar E-mails', 'salvarEmailsNaPlanilha')
          .addItem('Enviar Email', 'responderEmailsDaPlanilha')
          .addToUi()
}



























