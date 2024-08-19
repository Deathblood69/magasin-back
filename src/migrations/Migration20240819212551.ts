import { Migration } from '@mikro-orm/migrations';

export class Migration20240819212551 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "statistique" ("produit" uuid not null, "date" timestamptz not null, "quantite" int not null default 0, constraint "statistique_pkey" primary key ("produit", "date"));'
    );

    this.addSql(
      'alter table "statistique" add constraint "statistique_produit_foreign" foreign key ("produit") references "produit" ("id") on update cascade;'
    );
  }
}
