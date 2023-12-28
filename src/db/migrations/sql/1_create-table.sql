CREATE TABLE IF NOT EXISTS
    users(
      username varchar(128) PRIMARY KEY NOT NULL,
      email varchar(128) NOT NULL,
      user_role varchar(128) NOT NULL,
      password varchar(128) NOT NULL
    );
    