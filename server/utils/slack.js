const axios = require('axios');

exports.sendToSlack = async (summary) => {
  try {
    const res = await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 Todo Summary:\n${summary}`
    });

    return { success: true, response: res.data };
  } catch (error) {
    console.error('Slack Error:', error.message);
    return { success: false, error: error.message };
  }
};
