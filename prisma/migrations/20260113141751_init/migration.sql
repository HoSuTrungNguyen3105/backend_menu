-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `calories` INTEGER NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductTag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductTag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOptionGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `minSelect` INTEGER NOT NULL DEFAULT 0,
    `maxSelect` INTEGER NOT NULL DEFAULT 1,
    `isRequired` BOOLEAN NOT NULL DEFAULT false,
    `productId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOption` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `optionGroupId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantTable` (
    `id` VARCHAR(191) NOT NULL,
    `tableNumber` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL DEFAULT 2,
    `status` ENUM('AVAILABLE', 'OCCUPIED', 'RESERVED', 'OUT_OF_SERVICE') NOT NULL DEFAULT 'AVAILABLE',
    `qrCode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RestaurantTable_tableNumber_key`(`tableNumber`),
    UNIQUE INDEX `RestaurantTable_qrCode_key`(`qrCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'PREPARING', 'SERVED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `type` ENUM('DINE_IN', 'TAKE_AWAY') NOT NULL DEFAULT 'DINE_IN',
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `tableId` VARCHAR(191) NULL,
    `tableNumber` VARCHAR(191) NULL,
    `paymentStatus` ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `paymentMethod` ENUM('CASH', 'MOMO', 'ZALOPAY', 'STRIPE') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `selectedOptions` JSON NULL,
    `productId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `role` ENUM('GUEST', 'CUSTOMER', 'ADMIN', 'MONITOR') NOT NULL DEFAULT 'ADMIN',
    `password` VARCHAR(100) NOT NULL,
    `pictureUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `rank` ENUM('NONE', 'SILVER', 'GOLD', 'PLATINUM') NOT NULL DEFAULT 'NONE',
    `authType` VARCHAR(191) NOT NULL DEFAULT 'ID,PW',
    `prevPassword` VARCHAR(191) NOT NULL DEFAULT '',
    `isEmailVerified` VARCHAR(191) NOT NULL DEFAULT 'N',
    `accountLockYn` VARCHAR(191) NOT NULL DEFAULT 'N',
    `lastLoginDate` DECIMAL(20, 3) NULL,
    `loginFailCnt` INTEGER NOT NULL DEFAULT 0,
    `mfaEnabledYn` VARCHAR(191) NOT NULL DEFAULT 'N',
    `mfaSecretKey` VARCHAR(191) NULL DEFAULT '',
    `tempPassword` VARCHAR(191) NULL,
    `resetTokenExpires` DECIMAL(20, 3) NULL,
    `resetToken` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `otpCode` VARCHAR(191) NULL,
    `otpExpire` DECIMAL(20, 3) NULL,
    `baseSalary` DOUBLE NULL,
    `department` ENUM('HR', 'IT', 'FINANCE', 'OPS', 'SECURITY', 'OTHER') NULL,
    `employeeNo` VARCHAR(191) NULL,
    `hireDate` DECIMAL(20, 3) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'TERMINATED') NOT NULL DEFAULT 'ACTIVE',
    `fromTransferAdminUserYn` VARCHAR(191) NULL DEFAULT 'N',
    `toTransferAdminUserYn` VARCHAR(191) NULL DEFAULT 'N',
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Staff_email_key`(`email`),
    UNIQUE INDEX `Staff_employeeNo_key`(`employeeNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermission` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('GUEST', 'CUSTOMER', 'ADMIN', 'MONITOR') NOT NULL,
    `permissions` JSON NOT NULL,
    `createdAt` DECIMAL(20, 3) NOT NULL,
    `updatedAt` DECIMAL(20, 3) NOT NULL,

    UNIQUE INDEX `RolePermission_role_key`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PermissionDefinition` (
    `id` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DECIMAL(20, 3) NOT NULL,
    `updatedAt` DECIMAL(20, 3) NOT NULL,

    UNIQUE INDEX `PermissionDefinition_key_key`(`key`),
    INDEX `PermissionDefinition_category_idx`(`category`),
    INDEX `PermissionDefinition_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `fromUserId` INTEGER NOT NULL,
    `toUserId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `requestedAt` DECIMAL(20, 3) NOT NULL,
    `approvedAt` DECIMAL(20, 3) NULL,

    UNIQUE INDEX `TransferAdmin_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `token` TEXT NOT NULL,
    `createdAt` DECIMAL(20, 3) NULL,
    `browser` VARCHAR(191) NULL,
    `device` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `isCurrent` BOOLEAN NOT NULL DEFAULT false,
    `location` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `customerId` VARCHAR(191) NULL,

    INDEX `idx_usersession_userId`(`userId`),
    INDEX `idx_usersession_customerId`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customers` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `passport` VARCHAR(191) NOT NULL,
    `accountLockYn` VARCHAR(191) NOT NULL DEFAULT 'N',
    `isEmailVerified` VARCHAR(191) NOT NULL DEFAULT 'Y',
    `lastLoginDate` DECIMAL(20, 3) NULL,
    `password` VARCHAR(100) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'TERMINATED') NOT NULL DEFAULT 'ACTIVE',
    `otpCode` VARCHAR(191) NULL,
    `otpExpire` DECIMAL(20, 3) NULL,
    `role` ENUM('GUEST', 'CUSTOMER', 'ADMIN', 'MONITOR') NOT NULL DEFAULT 'CUSTOMER',
    `loginFailCnt` INTEGER NOT NULL DEFAULT 0,
    `mfaEnabledYn` VARCHAR(191) NOT NULL DEFAULT 'N',
    `mfaSecretKey` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `Customers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payroll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `baseSalary` DOUBLE NOT NULL,
    `allowances` DOUBLE NOT NULL DEFAULT 0,
    `deductions` DOUBLE NOT NULL DEFAULT 0,
    `tax` DOUBLE NOT NULL DEFAULT 0,
    `netPay` DOUBLE NOT NULL,
    `status` ENUM('DRAFT', 'FINALIZED', 'PAID') NOT NULL DEFAULT 'DRAFT',
    `generatedAt` DECIMAL(20, 3) NOT NULL,

    INDEX `Payroll_employeeId_idx`(`employeeId`),
    UNIQUE INDEX `Payroll_employeeId_month_year_key`(`employeeId`, `month`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `date` DECIMAL(20, 3) NOT NULL,
    `checkIn` DECIMAL(20, 3) NOT NULL,
    `checkOut` DECIMAL(20, 3) NOT NULL,
    `status` ENUM('PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE', 'REMOTE') NOT NULL DEFAULT 'PRESENT',
    `workedHours` DOUBLE NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DECIMAL(20, 3) NOT NULL,

    INDEX `Attendance_employeeId_idx`(`employeeId`),
    UNIQUE INDEX `Attendance_employeeId_date_key`(`employeeId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HolidayTrip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `destination` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `startDate` DECIMAL(20, 3) NOT NULL,
    `endDate` DECIMAL(20, 3) NOT NULL,
    `createdAt` DECIMAL(20, 3) NOT NULL,
    `updatedAt` DECIMAL(20, 3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `leaveType` VARCHAR(191) NOT NULL,
    `startDate` DECIMAL(20, 3) NOT NULL,
    `endDate` DECIMAL(20, 3) NOT NULL,
    `days` DOUBLE NOT NULL,
    `reason` VARCHAR(191) NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `approverId` INTEGER NULL,
    `approverNote` VARCHAR(191) NULL,
    `appliedAt` DECIMAL(20, 3) NOT NULL,
    `decidedAt` DECIMAL(20, 3) NULL,
    `holidayTripId` INTEGER NULL,

    INDEX `LeaveRequest_holidayTripId_idx`(`holidayTripId`),
    INDEX `LeaveRequest_employeeId_idx`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnlockRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` TEXT NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DECIMAL(20, 3) NOT NULL,
    `approvedAt` DECIMAL(20, 3) NULL,
    `employeeId` INTEGER NOT NULL,

    INDEX `UnlockRequest_employeeId_fkey`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToProductTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductToProductTag_AB_unique`(`A`, `B`),
    INDEX `_ProductToProductTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOptionGroup` ADD CONSTRAINT `ProductOptionGroup_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOption` ADD CONSTRAINT `ProductOption_optionGroupId_fkey` FOREIGN KEY (`optionGroupId`) REFERENCES `ProductOptionGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `RestaurantTable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferAdmin` ADD CONSTRAINT `TransferAdmin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_holidayTripId_fkey` FOREIGN KEY (`holidayTripId`) REFERENCES `HolidayTrip`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToProductTag` ADD CONSTRAINT `_ProductToProductTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToProductTag` ADD CONSTRAINT `_ProductToProductTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
