import { openai } from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
	try {
		const res = await openai.createCompletion({
			model,
			prompt,
			temperature: 0.9,
			max_tokens: 1000,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		});
		const json = res.data.choices[0].text;
		return json;
	} catch (err) {
		console.log(
			`MYAI was unable to find an answer for that! (Error: ${err})`
		);
	}
};

export default query;
