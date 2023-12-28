CREATE TABLE IF NOT EXISTS
    users(
      username varchar(128) PRIMARY KEY NOT NULL,
      email varchar(128) NOT NULL,
      user_role varchar(128) NOT NULL,  -- admin, manager, supervisor, spray
      password varchar(128) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    tanks(
      id SERIAL PRIMARY KEY,
      username varchar(128),
      tank_date date DEFAULT NOW(),
      start_time timestamp NOT NULL,
      stop_time timestamp NOT NULL,
      tank_level int NOT NULL,          -- Litres
      tractor_id varchar(128),
      wind_direction_id varchar(128),
      wind_speed int NOT NULL,          -- km/hr
      operator_id int NOT NULL,
      spray_area geometry
    );