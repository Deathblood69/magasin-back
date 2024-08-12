import { Migration } from '@mikro-orm/migrations';

export class Migration20240812192536 extends Migration {
  async up(): Promise<void> {
    this.addSql('create schema if not exists "user";');
    this.addSql(
      'create type "user"."user_role_enum" as enum (\'ADMINISTRATEUR\', \'UTILISATEUR\');'
    );
    this.addSql(
      'create table "client" ("id" uuid not null default gen_random_uuid(), "nom" text not null, "prenom" text not null, "solde" numeric not null default 0, constraint "client_pkey" primary key ("id"));'
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
      'create table "user"."user" ("id" uuid not null default gen_random_uuid(), "last_name" varchar(255) not null, "first_name" varchar(255) not null, "username" varchar(255) not null, "password" varchar(255) not null, "roles" "user"."user_role_enum"[] not null, "is_disabled" boolean not null default false, "disabled_date" bigint not null default 0, "is_locked" boolean not null default false, "date_lock" bigint not null default 0, "login_attempts" int not null default 0, constraint "user_pkey" primary key ("id"));'
    );
    this.addSql(
      'alter table "user"."user" add constraint "user_username_unique" unique ("username");'
    );

    this.addSql(
      'alter table "produit" add constraint "produit_typeProduit_foreign" foreign key ("typeProduit") references "type_produit" ("id") on update cascade;'
    );
  }
}
