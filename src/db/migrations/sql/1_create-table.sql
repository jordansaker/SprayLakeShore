CREATE TABLE IF NOT EXISTS
    users(
      username varchar(128) PRIMARY KEY NOT NULL,
      email varchar(128) UNIQUE,
      user_role varchar(128) NOT NULL,  -- admin, manager, supervisor, spray
      password varchar(128) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    blocks(
      id SERIAL PRIMARY KEY,
      block_name varchar(128) NOT NULL,
      block_size float(2) NOT NULL,
      fencing polygon                   -- postgis
    );

CREATE TABLE IF NOT EXISTS
    spray_equipments(
      id SERIAL PRIMARY KEY,
      spray_equipment varchar(128) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    tractors(
      id SERIAL PRIMARY KEY,
      asset_id varchar(128) NOT NULL,
      tracking_device varchar(128) NOT NULL,
      gear varchar(128) NOT NULL,
      range varchar(128) NOT NULL,         -- profile picture URL
      equipment_id int REFERENCES spray_equipments (id)
    );

CREATE TABLE IF NOT EXISTS
    operators(
      id SERIAL PRIMARY KEY,
      first_name varchar(128) NOT NULL,
      last_name varchar(128) NOT NULL,
      chem_cert boolean NOT NULL,
      profile_url text NOT NULL         -- profile picture URL
    );

CREATE TABLE IF NOT EXISTS
    wind_drections(
      id SERIAL PRIMARY KEY,
      direction varchar(128) NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    tanks(
      id SERIAL PRIMARY KEY,
      tank_date date DEFAULT NOW(),
      start_time timestamp NOT NULL,
      stop_time timestamp,
      tank_level int NOT NULL,          -- Litres
      wind_speed int NOT NULL,          -- km/hr
      tractor_path geometry,          -- postgis
      user_id varchar(128) REFERENCES users (username),
      tractor_id int REFERENCES tractors (id),
      operator_id int REFERENCES operators (id),
      wind_direction_id int REFERENCES wind_drections (id)
    );

CREATE TABLE IF NOT EXISTS
    spray_weeks(
      id SERIAL PRIMARY KEY,
      date_starting date NOT NULL,
      tank_id int REFERENCES tanks (id),
      block_id int REFERENCES blocks (id)
    );

CREATE TABLE IF NOT EXISTS
    chemicals(
      id SERIAL PRIMARY KEY,
      chemical_name varchar(128) NOT NULL,
      targeted_pest varchar(128) NOT NULL,
      chemical_rate int NOT NULL
    );

CREATE TABLE IF NOT EXISTS
    chemical_usages(
      id SERIAL PRIMARY KEY,
      batch_no varchar(128) NOT NULL,
      spray_id int REFERENCES spray_weeks (id),
      chemical_id int REFERENCES chemicals (id)
    );
