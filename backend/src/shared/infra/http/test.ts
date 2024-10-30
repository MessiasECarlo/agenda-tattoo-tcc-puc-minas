import 'reflect-metadata';

import { createConnection } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

async function testConnection() {
  try {
    // Cria a conexão com base nas configurações do ormconfig.json
    const connection = await createConnection('default');
    console.log('Conexão estabelecida com sucesso!');

    // Testa uma consulta simples para verificar a funcionalidade
    const queryRunner = connection.createQueryRunner();
    const result = await queryRunner.query('SELECT 1');
    console.log('Resultado da consulta:', result);

    const userRepo = connection.getRepository(User);
    const users = await userRepo.find();
    console.log('Usuários:', users);

    // Fecha a conexão após o teste
    await connection.close();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

testConnection();
