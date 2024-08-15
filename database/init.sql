SELECT 'CREATE DATABASE magasin' WHERE NOT EXISTS (
    SELECT
    FROM pg_database
    WHERE datname = 'magasin'
)\gexec

GRANT ALL PRIVILEGES ON SCHEMA public TO magasin;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";