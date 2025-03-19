const express = require('express');
const router = express.Router();
const { pool } = require('../index');

// Get tickets by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const result = await pool.query(
      `SELECT t.*, e.name as event_name, e.event_date, e.location 
       FROM tickets t
       JOIN events e ON t.event_id = e.id
       WHERE t.user_id = $1`,
      [userId]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get tickets by event ID
router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const result = await pool.query(
      `SELECT t.*, u.name as user_name, u.email 
       FROM tickets t
       JOIN users u ON t.user_id = u.id
       WHERE t.event_id = $1`,
      [eventId]
    );
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Purchase ticket
router.post('/', async (req, res) => {
  try {
    const { user_id, event_id, quantity, payment_status } = req.body;
    
    // Check if event exists and has available tickets
    const eventCheck = await pool.query('SELECT * FROM events WHERE id = $1', [event_id]);
    
    if (eventCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // In a real application, you would check ticket availability and process payment here
    
    // Create ticket
    const result = await pool.query(
      'INSERT INTO tickets (user_id, event_id, quantity, payment_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, event_id, quantity, payment_status || 'completed']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel ticket
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM tickets WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json({ message: 'Ticket cancelled successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 