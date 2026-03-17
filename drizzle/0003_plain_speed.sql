ALTER TABLE `bookings` MODIFY COLUMN `paidAmount` text;--> statement-breakpoint
ALTER TABLE `bookings` MODIFY COLUMN `remainingAmount` text;--> statement-breakpoint
ALTER TABLE `bookings` ADD `generateQRCode` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` DROP COLUMN `endDate`;