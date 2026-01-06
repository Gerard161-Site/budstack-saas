-- CreateTable
CREATE TABLE IF NOT EXISTS "platform_config" (
    "id" TEXT NOT NULL DEFAULT 'config',
    "drGreenApiUrl" TEXT,
    "awsBucketName" TEXT,
    "awsFolderPrefix" TEXT,
    "awsRegion" TEXT,
    "awsAccessKeyId" TEXT,
    "awsSecretAccessKey" TEXT,
    "emailServer" TEXT,
    "emailFrom" TEXT,
    "redisUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_config_pkey" PRIMARY KEY ("id")
);
