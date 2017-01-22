Create database VTAMobileSensorCloudDB;

Create table VTAMobileSensorCloudDB.user_details(
user_name varchar(255),user_address varchar(255),phoneno bigint(15),user_password varchar(255),user_email varchar(255) ,PRIMARY KEY (`user_email`) );

Create table Sensor_details
(Sensor_ID varchar(255),
Sensor_name varchar(250),Sensor_type varchar(250),Sensor_description varchar(255),
Sensor_Location varchar(250),
 PRIMARY KEY (`Sensor_ID`) );

Create table Sensor_hub(
hub_id int ,hub_name VARCHAR(50), Sensor_ID varchar(255),
`allocation_date` TIMESTAMP NOT NULL, `Released_date` TIMESTAMP NULL,  terminate_date TIMESTAMP NULL,
PRIMARY KEY (hub_id,Sensor_ID),
FOREIGN KEY (`Sensor_ID`)
  REFERENCES `vtamobilesensorclouddb`.`sensor_details` (`Sensor_ID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION);


CREATE TABLE sensor_allocation (
  `user_email` VARCHAR(255) NOT NULL,
  `Sensor_ID` VARCHAR(255) NOT NULL,
  `allocation_date` TIMESTAMP NOT NULL,
  `Released_date` TIMESTAMP NULL,
  Sensor_status VARCHAR(45) NOT NULL,
  terminate_date TIMESTAMP NULL,
  allocation_id int ,
  PRIMARY KEY (allocation_id));
  
 
 ALTER TABLE `vtamobilesensorclouddb`.`sensor_allocation` 
ADD INDEX `FK2_idx` (`user_email` ASC);
ALTER TABLE `vtamobilesensorclouddb`.`sensor_allocation` 
ADD CONSTRAINT `FK1`
  FOREIGN KEY (`Sensor_ID`)
  REFERENCES `vtamobilesensorclouddb`.`sensor_details` (`Sensor_ID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `FK2`
  FOREIGN KEY (`user_email`)
  REFERENCES `vtamobilesensorclouddb`.`user_details` (`user_email`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  


