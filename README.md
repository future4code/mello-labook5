# labook (Grupo 5)

## Queries utilizadas para criação das tabelas

```sql
CREATE TABLE user_info (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
```sql
CREATE TABLE posts (
  id VARCHAR(255) PRIMARY KEY,
  photo_url VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT (current_timestamp),
  type ENUM("NORMAL", "EVENT") NOT NULL DEFAULT "NORMAL",
  user_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_info(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
```
```sql
CREATE TABLE friends_relations(
  user_id VARCHAR(255) NOT NULL,
  friend_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, friend_id),
  FOREIGN KEY (user_id) REFERENCES user_info(id) 
  ON DELETE CASCADE,
  FOREIGN KEY (friend_id) REFERENCES user_info(id)
  ON DELETE CASCADE
);

```
