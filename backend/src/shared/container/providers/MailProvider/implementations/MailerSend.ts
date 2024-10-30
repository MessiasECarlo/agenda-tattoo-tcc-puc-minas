import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { inject, injectable } from 'tsyringe';

import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class MailerSendProvider implements IMailProvider {
  private client: MailerSend;

  private mailTemplateProvider: IMailTemplateProvider;

  constructor(
    @inject('MailTemplateProvider') mailTemplateProvider: IMailTemplateProvider
  ) {
    this.mailTemplateProvider = mailTemplateProvider;

    const transporter = new MailerSend({
      apiKey: process.env.MAIL_SMTP_TOKEN_KEY
    });

    this.client = transporter;

    console.log('smtp mailer send configured');
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    const html = await this.mailTemplateProvider.parse(templateData);
    const emailParams = new EmailParams()
      .setFrom(new Sender(from.email, from.name))
      .setTo([new Recipient(to.email, to.name)])
      .setSubject(subject)
      .setHtml(html)
      .setText('Parece que uma troca de senha para sua conta foi solicitada.');

    await this.client.email.send(emailParams);
  }
}

export default MailerSendProvider;
