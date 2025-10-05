const db = require("../event_db");

const getAllEvents = async (req, res) => {
    const [rows] = await db.query(`
		SELECT e.*, c.name AS category_name, o.name AS org_name
		FROM events e
		JOIN categories c ON e.category_id = c.id
		JOIN organisations o ON e.org_id = o.id
		WHERE e.status = 'active'
		ORDER BY e.start_datetime ASC
    `);
    res.json(rows);
};

const getEventById = async (req, res) => {
    const eventId = req.params.id;
    const [rows] = await db.query(
		`
		SELECT e.*, c.name AS category_name, o.name AS org_name
		FROM events e
		JOIN categories c ON e.category_id = c.id
		JOIN organisations o ON e.org_id = o.id
		WHERE e.id = ?
		`,
		[eventId]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json(rows[0]);
};

module.exports = { getAllEvents, getEventById };
