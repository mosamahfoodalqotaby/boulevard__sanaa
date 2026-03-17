ALTER TABLE `bookings` ADD `customerName` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `customerPhone` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `guestCount` int DEFAULT 0 NOT NULL;