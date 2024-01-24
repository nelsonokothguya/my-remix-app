import OpenAI from "openai";

const openai = new OpenAI({
  // eslint-disable-next-line no-undef
  apiKey: process.env.OPENAI_API_KEY,
});


//Prompt will come from the action
export const getAiAssistant = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": `${prompt}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 50,

      top_p: 1,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Example
getAiAssistant()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });


