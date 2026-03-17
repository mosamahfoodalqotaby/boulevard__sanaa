ALTER TABLE `bookings` ADD `eventDate` timestamp;--> statement-breakpoint
ALTER TABLE `bookings` ADD `paidAmount` decimal(10,2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE `bookings` ADD `remainingAmount` decimal(10,2) DEFAULT '0';--> statement-breakpoint
ALTER TABLE `bookings` ADD `additionalDetails` longtext;