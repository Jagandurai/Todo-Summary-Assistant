const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.summarizeWithOpenAI = async (todos) => {
  const text = todos.map((todo, idx) => `${idx + 1}. ${todo.text}`).join('\n');
  const prompt = `Summarize the following pending todo items:\n${text}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error.message);
    return 'Could not summarize the todos.';
  }
};
