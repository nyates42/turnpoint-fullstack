-- CreateTable
CREATE TABLE "Client" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(512) NOT NULL,
    "DOB" DATE NOT NULL,
    "PrimaryLanguage" VARCHAR(512) NOT NULL,
    "SecondaryLanguage" VARCHAR(512),
    "AddedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fundingSourceId" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "FundingSource" (
    "Id" SERIAL NOT NULL,
    "Name" VARCHAR(512) NOT NULL,
    "AddedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingSource_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_fundingSourceId_fkey" FOREIGN KEY ("fundingSourceId") REFERENCES "FundingSource"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
