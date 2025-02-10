import contactData from "@/data/contactData.json";

// nodejs module to read/write file system and file
import fs from "fs/promises";

/** api route to send form data to json */
export default async function handler(req, res) {
	// if it is GET request it will run below code
	if (req.method === "GET") {
		try {
			// returns data in file
			return res.status(200).json(contactData);
		} catch (error) {
			// if there is an error it will return error
			console.error("Error reading data:", error);
			return res.status(500).json({ error: "Error reading data" });
		}

		// if it is POST request it will run below code
	} else if (req.method === "POST") {
		try {
			// saved path of file in variable
			const dataFilePath = "src/data/contactData.json";

			// await data from post request body and saved it in variable
			const data = await req.body; // Assuming JSON data is sent in the request body

			// await data from file in json format and saved it in variable
			const rawData = await fs.readFile(dataFilePath, "utf-8");

			// converts json data to array format and saves it in variable
			const existingData = JSON.parse(rawData);

			// saved existing data in file(in array) and data send from post request with current date in new array
			const newData = [
				...existingData,
				{ ...data, date: new Date().toLocaleDateString() },
			];

			// add new data in dataFilePath
			await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2));

			// return response
			return res.status(200).json({ message: "Data added successfully" });
		} catch (error) {
			// if it not able to add data in file it will throw error
			console.error("Error adding data:", error);
			return res.status(500).json({ error: "Error adding data" });
		}
	} else {
		// if it is neither GET nor POST request it will throw error
		return res.status(405).json({ error: "Method Not Allowed" });
	}
}
