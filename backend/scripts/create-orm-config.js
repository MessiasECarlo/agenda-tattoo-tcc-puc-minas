require('dotenv').config();

const fs = require('fs');

const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'password';
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'postgres_db';

const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'mongo';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'password';
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'mongo_db';

const AMBIENTE = 'PRODUCAO'; // PRODUCAO ou DESENVOLVIMENTO
const SOURCE_FOLDER = AMBIENTE === 'PRODUCAO' ? 'dist' : 'src'; // src ou dist

// Estrutura do arquivo ormconfig.json
const ormConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    entities: [
      `./${SOURCE_FOLDER}/modules/**/infra/typeorm/entities/*.{js,ts}`
    ],
    migrations: [
      `./${SOURCE_FOLDER}/shared/infra/typeorm/migrations/*.{js,ts}`
    ],
    seeds: [`./${SOURCE_FOLDER}/modules/**/infra/typeorm/seeds/*.{js,ts}`],
    factories: [
      `./${SOURCE_FOLDER}/modules/**/infra/typeorm/factories/*.{js,ts}`
    ],
    cli: {
      migrationsDir: `./${SOURCE_FOLDER}/shared/infra/typeorm/migrations`
    }
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: MONGO_HOST,
    port: Number(MONGO_PORT),
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    database: MONGO_DATABASE,
    useUnifiedTopology: true,
    authSource: 'admin',
    useNewUrlParser: true,
    entities: [`./${SOURCE_FOLDER}/modules/**/infra/typeorm/schemas/*.{js,ts}`]
  }
];

// Escrevendo o arquivo ormconfig.json
fs.writeFileSync('ormconfig.json', JSON.stringify(ormConfig, null, 2), 'utf-8');

console.log('Arquivo ormconfig.json criado com sucesso!');
