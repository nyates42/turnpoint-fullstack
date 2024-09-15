import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/funding", async (req, res) => {
	const fundingSources = await prisma.fundingSource.findMany();
	res.json(fundingSources);
});

app.get("/clients", async (req, res) => {
	const clients = await prisma.client.findMany({
		include: { Funding: true },
	});
	res.json(clients);
});

app.post(`/clients`, async (req, res) => {
	const { fullName, dob, primaryLanguage, secondaryLanguage, fundingID } =
		req.body;
	try {
		const result = await prisma.client.create({
			data: {
				Name: fullName,
				DOB: new Date(dob).toISOString(),
				PrimaryLanguage: primaryLanguage,
				SecondaryLanguage: secondaryLanguage,
				fundingSourceId: fundingID,
			},
		});
		res.json(result);
	} catch (error) {
		res.json({
			error: "Error creating new client",
		});
	}
});

const server = app.listen(3000, () =>
	console.log(`
🚀 Server ready at: http://localhost:3000`)
);
