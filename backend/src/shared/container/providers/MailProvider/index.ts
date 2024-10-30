import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import MailerSendProvider from '@shared/container/providers/MailProvider/implementations/MailerSend';
import SESMailProvider from '@shared/container/providers/MailProvider/implementations/SESMailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  mailersend: container.resolve(MailerSendProvider)
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
