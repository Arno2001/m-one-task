import { db } from './db';

//Initialize tables with creation of uuid for primary key
async function init() {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          uuid PRIMARY KEY  NOT NULL DEFAULT uuid_generate_v4(),
      created_at  TIMESTAMP NOT NULL DEFAULT now(),
      updated_at  TIMESTAMP NOT NULL DEFAULT now(),
      first_name  VARCHAR(255) NOT NULL,
      last_name   VARCHAR(255) NOT NULL,
      email       VARCHAR(255) NOT NULL UNIQUE,
      age         integer NOT NULL,
      password    VARCHAR(255) NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS friend_requests (
      id          uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
      sender_id   uuid REFERENCES users(id) ON DELETE CASCADE,
      receiver_id uuid REFERENCES users(id) ON DELETE CASCADE,
      status      VARCHAR(20) CHECK (status IN ('PENDING', 'ACCEPT', 'DECLINE')) DEFAULT 'PENDING',
      sent_at     TIMESTAMP NOT NULL DEFAULT now(),
      UNIQUE(sender_id, receiver_id) 
    );
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS friends (
      id          uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
      created_at  TIMESTAMP NOT NULL DEFAULT now(),
      user1_id    uuid REFERENCES users(id) ON DELETE CASCADE,
      user2_id    uuid REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user1_id, user2_id),
      CHECK (user1_id <> user2_id)
    );
  `);
  console.log('✅ Table created');
  process.exit(0);
}

void init();
