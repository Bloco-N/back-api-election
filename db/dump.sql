--create database websocket_api;
drop table if exists users;
drop table if exists messages;

create table if not exists users (
	id text primary key,
  	name varchar(30) not null,
	hash text not null
);

create table if not exists messages(

  id text primary key,
  user_id text not null,
  content text not null,
  type varchar(10) not null  

);