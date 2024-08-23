import { Migration } from '@mikro-orm/migrations';

export class Migration20240823141056 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "course" ("id" uuid not null default gen_random_uuid(), "nom" text not null, "date" date not null, constraint "course_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "course" add constraint "course_nom_unique" unique ("nom");'
    );

    this.addSql(
      'create table "achat" ("id" uuid not null default gen_random_uuid(), "course" uuid not null, "produit" uuid not null, "prix" int not null default 0, "stock" int not null default 0, constraint "achat_pkey" primary key ("id"));'
    );

    this.addSql(
      'alter table "achat" add constraint "achat_course_foreign" foreign key ("course") references "course" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "achat" add constraint "achat_produit_foreign" foreign key ("produit") references "produit" ("id") on update cascade;'
    );
  }
}
