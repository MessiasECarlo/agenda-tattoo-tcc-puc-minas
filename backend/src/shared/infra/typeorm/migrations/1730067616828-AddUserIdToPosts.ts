import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export default class AddUserIdToPosts1730067616828
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      })
    );

    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        name: 'PostUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('posts', 'PostUser');
    await queryRunner.dropColumn('posts', 'user_id');
  }
}
