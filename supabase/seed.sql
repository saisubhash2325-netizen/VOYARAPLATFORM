insert into destinations (name, country, description) values
 ('Goa','India','Beaches and nightlife'), ('Jaipur','India','The Pink City');
insert into hotels (destination_id, name, description, price_per_night, rating, total_rooms)
 select id, 'Sea Breeze Resort', 'Beachfront stay', 3500, 4.4, 10 from destinations where name='Goa';
insert into hotels (destination_id, name, description, price_per_night, rating, total_rooms)
 select id, 'Haveli Palace', 'Heritage hotel', 2800, 4.6, 6 from destinations where name='Jaipur';
