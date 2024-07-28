import { Migration } from '@mikro-orm/migrations';

export class Migration20240728064752 extends Migration {
  async up(): Promise<void> {
    this.addSql('create schema if not exists "user";');
    this.addSql(
      'create type "user"."user_role_enum" as enum (\'ADMINISTRATEUR\');',
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
  }
}
