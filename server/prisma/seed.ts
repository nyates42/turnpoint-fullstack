import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const fundingData: Prisma.FundingSourceCreateInput[] = [
	{
		Name: "NDIS",
	},
	{
		Name: "HCP",
	},
	{
		Name: "CHSP",
	},
	{
		Name: "DVA",
	},
	{
		Name: "HACC",
	},
];

const clientData: Prisma.ClientCreateInput[] = [
	{
		Name: "Jordan Burkhart",
		DOB: new Date("1987-06-02").toISOString(),
		PrimaryLanguage: "English",
		Funding: {
			connect: { Id: 1 }
		}
	},
	{
		Name: "Manuel Cardenas",
		DOB: new Date("1991-06-25").toISOString(),
		PrimaryLanguage: "Spanish",
		SecondaryLanguage: "English",
		Funding: {
			connect: { Id: 2 }
		}
	},
	{
		Name: "Lonnie Mason",
		DOB: new Date("1966-01-16").toISOString(),
		PrimaryLanguage: "Mandarin",
		SecondaryLanguage: "English",
		Funding: {
			connect: { Id: 3 }
		}
	},
	{
		Name: "David Wilson",
		DOB: new Date("1978-11-11").toISOString(),
		PrimaryLanguage: "Portuguese",
		Funding: {
			connect: { Id: 4 }
		}
	},
	{
		Name: "Willard Hawkins",
		DOB: new Date("1981-08-06").toISOString(),
		PrimaryLanguage: "French",
		Funding: {
			connect: { Id: 5 }
		}
	},
]

async function main() {
	console.log(`Start seeding ...`);
	for (const u of fundingData) {
		const funding = await prisma.fundingSource.create({
			data: u,
		});
		console.log(`Created funding data with id: ${funding.Id}`);
	}
	for (const c of clientData) {
		const clients = await prisma.client.create({
			data: c,
		});
		console.log(`Created client with id: ${clients.Id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
