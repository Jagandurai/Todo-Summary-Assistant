const { createClient } = require('@supabase/supabase-js');
const { sendToSlack } = require('../utils/slack');
const { summarizeWithOpenAI } = require('../utils/openai');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.getTodos = async (req, res) => {
  try {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) {
      console.error('Error fetching todos:', error);
      return res.status(500).json({ error });
    }
    res.json(data);
  } catch (err) {
    console.error('Unexpected error in getTodos:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const { data, error } = await supabase
      .from('todos')
      .insert([{ text }])
      .select();

    console.log('Insert response:', { data, error });

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message || error });
    }

    if (!data || data.length === 0) {
      console.error('Insert failed: no data returned');
      return res.status(500).json({ error: 'Insert failed: no data returned' });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Unexpected error in addTodo:', err);
    res.status(500).json({ error: err.message || err });
  }
};



exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return res.status(500).json({ error });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Unexpected error in deleteTodo:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.summarizeTodos = async (req, res) => {
  try {
    const { data, error } = await supabase.from('todos').select('*');
    if (error) {
      console.error('Error fetching todos for summary:', error);
      return res.status(500).json({ error });
    }

    const summary = await summarizeWithOpenAI(data);
    const slackResponse = await sendToSlack(summary);

    if (slackResponse.success) {
      res.json({ message: 'Summary sent to Slack successfully!' });
    } else {
      console.error('Slack error:', slackResponse.error);
      res.status(500).json({ error: 'Slack failed', details: slackResponse.error });
    }
  } catch (err) {
    console.error('Unexpected error in summarizeTodos:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
