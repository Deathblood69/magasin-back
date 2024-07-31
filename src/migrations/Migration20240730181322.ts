import { Migration } from '@mikro-orm/migrations';

export class Migration20240730181322 extends Migration {
  async up(): Promise<void> {
    this.addSql('create schema if not exists "user";');
    this.addSql(
      'create type "user"."user_role_enum" as enum (\'ADMINISTRATEUR\');',
    );
    this.addSql(
      'create table "solde" ("id" uuid not null, "nom" text not null, "valeur" int not null, constraint "solde_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "client" ("id" uuid not null, "identifiant" text not null, "nom" text not null, "prenom" text not null, "solde_id" uuid not null, constraint "client_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "client" add constraint "client_solde_id_unique" unique ("solde_id");',
    );

    this.addSql(
      'create table "type_produit" ("id" uuid not null, "nom" text not null, constraint "type_produit_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "produit" ("id" uuid not null, "nom" text not null, "prix" int not null, "stock" int not null, "typeProduit" uuid not null, constraint "produit_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "user"."user" ("id" uuid not null, "last_name" varchar(255) not null, "first_name" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "roles" "user"."user_role_enum"[] not null, "is_disabled" boolean not null default false, "disabled_date" bigint not null default 0, "is_locked" boolean not null default false, "date_lock" bigint not null default 0, "login_attempts" int not null default 0, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "user"."user" add constraint "user_email_unique" unique ("email");',
    );
    this.addSql(
      'alter table "user"."user" add constraint "user_username_unique" unique ("username");',
    );

    this.addSql(
      'alter table "client" add constraint "client_solde_id_foreign" foreign key ("solde_id") references "solde" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "produit" add constraint "produit_typeProduit_foreign" foreign key ("typeProduit") references "type_produit" ("id") on update cascade;',
    );
  }
}
