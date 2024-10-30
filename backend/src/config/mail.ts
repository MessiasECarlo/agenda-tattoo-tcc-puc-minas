interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'mailersend';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: `${process.env.MAIL_DRIVER}` || 'ethereal',
  defaults: {
    from: {
      name: 'Equipe Agenda Tattoo',
      email: 'noreply@trial-0p7kx4x2zqmg9yjr.mlsender.net'
    }
  }
} as IMailConfig;
