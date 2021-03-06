# labook (Grupo 5)

## Queries utilizadas para criação das tabelas

```sql
CREATE TABLE User_Info (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
```sql
CREATE TABLE Posts (
  id VARCHAR(255) PRIMARY KEY,
  photo_url VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at DATE,
  type ENUM("NORMAL", "EVENT") NOT NULL DEFAULT "NORMAL",
  user_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES User_Info(id) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
```
```sql
CREATE TABLE Friends_Relations(
  user_id VARCHAR(255) NOT NULL,
  user_friend_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, user_friend_id),
  FOREIGN KEY (user_id) REFERENCES User_Info(id) 
  ON DELETE CASCADE,
  FOREIGN KEY (user_friend_id) REFERENCES User_Info(id)
  ON DELETE CASCADE
);
```
```sql
CREATE TABLE Comments (
  id VARCHAR(255) NOT NULL,	
  comment VARCHAR(600) NOT NULL,
  created_at DATE DEFAULT (current_date),
  post_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (post_id) REFERENCES Posts(id) 
  ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES User_Info(id)
  ON DELETE CASCADE
);

```
