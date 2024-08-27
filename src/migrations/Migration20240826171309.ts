import { Migration } from '@mikro-orm/migrations';

export class Migration20240826171309 extends Migration {
  async up(): Promise<void> {
    this.addSql('create schema if not exists "user";');
    this.addSql(
      'create type "user"."user_role_enum" as enum (\'ADMINISTRATEUR\', \'UTILISATEUR\');'
    );
    this.addSql(
      'create table "client" ("id" uuid not null default gen_random_uuid(), "nom" text not null, "prenom" text not null, "solde" numeric not null default 0, constraint "client_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "course" ("id" uuid not null default gen_random_uuid(), "nom" text not null, "date" date not null, constraint "course_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "course" add constraint "course_nom_unique" unique ("nom");'
    );

    this.addSql(
      'create table "type_produit" ("id" uuid not null default gen_random_uuid(), "nom" text not null, constraint "type_produit_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "type_produit" add constraint "type_produit_nom_unique" unique ("nom");'
    );

    this.addSql(
      'create table "produit" ("id" uuid not null default gen_random_uuid(), "nom" text not null, "prix" int not null default 0, "stock" int not null default 0, "typeProduit" uuid not null, constraint "produit_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "produit" add constraint "produit_nom_unique" unique ("nom");'
    );

    this.addSql(
      'create table "achat" ("id" uuid not null default gen_random_uuid(), "course" uuid not null, "produit" uuid not null, "prix" int not null default 0, "stock" int not null default 0, constraint "achat_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "user"."user" ("id" uuid not null default gen_random_uuid(), "last_name" varchar(255) not null, "first_name" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "roles" "user"."user_role_enum"[] not null, "is_disabled" boolean not null default false, "disabled_date" bigint not null default 0, "is_locked" boolean not null default false, "date_lock" bigint not null default 0, "login_attempts" int not null default 0, constraint "user_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "user"."user" add constraint "user_username_unique" unique ("username");'
    );

    this.addSql(
      'create table "vente" ("id" uuid not null default gen_random_uuid(), "produit" uuid not null, "date" date not null, "prix" int not null default 0, "stock" int not null default 0, constraint "vente_pkey" primary key ("id"));'
    );

    this.addSql(
      'create table "vente_achat" ("vente_id" uuid not null, "achat_id" uuid not null, constraint "vente_achat_pkey" primary key ("vente_id", "achat_id"));'
    );

    this.addSql(
      'alter table "produit" add constraint "produit_typeProduit_foreign" foreign key ("typeProduit") references "type_produit" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "achat" add constraint "achat_course_foreign" foreign key ("course") references "course" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "achat" add constraint "achat_produit_foreign" foreign key ("produit") references "produit" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "vente" add constraint "vente_produit_foreign" foreign key ("produit") references "produit" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "vente_achat" add constraint "vente_achat_vente_id_foreign" foreign key ("vente_id") references "vente" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "vente_achat" add constraint "vente_achat_achat_id_foreign" foreign key ("achat_id") references "achat" ("id") on update cascade on delete cascade;'
    );
  }
}
