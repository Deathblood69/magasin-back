import { Migration } from '@mikro-orm/migrations';

export class Migration20240728083643 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "type_produit" ("nom" text not null, constraint "type_produit_pkey" primary key ("nom"));',
    );

    this.addSql(
      'create table "produit" ("nom" text not null, "prix" int not null, "stock" bigint not null, "typeProduit" text not null, constraint "produit_pkey" primary key ("nom"));',
    );

    this.addSql(
      'alter table "produit" add constraint "produit_typeProduit_foreign" foreign key ("typeProduit") references "type_produit" ("nom") on update cascade;',
    );
  }
}
