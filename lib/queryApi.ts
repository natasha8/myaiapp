import { openai } from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
	console.log("model", model);
	let response: any;

	await openai
		.createCompletion({
			model,
			prompt,
			temperature: 0.9,
			max_tokens: 1000,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		})
		.then((res) => {
			console.log("RESPONSE DATA ====>", res.data.choices[0].text);

			response = res.data.choices[0].text;
		})
		.catch(
			(err) =>
				` MYAI was unable to find an answer for that! (Error: ${err.message})`
		);
	return response;
};

export default query;
