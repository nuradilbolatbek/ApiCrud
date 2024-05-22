const db = require('../db/index');

const createUser = async (userDetails) => {
    const { name, age } = userDetails || {};
    const { rows } = await db.query(
      'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *',
      [name, age]
    );
    return rows[0];
  };

const getAllUsers = async () => {
  const { rows } = await db.query('SELECT * FROM users ORDER BY id ASC');
  return rows;
};

const getUserById = async (id) => {
    const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0]; 
  };
  

  const updateUser = async (id, { name, age }) => {
    const params = [];
    const setParts = [];
    let query = 'UPDATE users SET ';

    if (name !== undefined) {
        params.push(name);
        setParts.push(`name = $${params.length}`);
    }

    if (age !== undefined) {
        params.push(age);
        setParts.push(`age = $${params.length}`);
    }

    query += setParts.join(', ') + ` WHERE id = $${params.length + 1} RETURNING *`;
    params.push(id);

    if (setParts.length === 0) {
        throw new Error('Not valid input');
    }

    try {
        const { rows } = await db.query(query, params);
        return rows[0]; 
    } catch (error) {
        console.error('Error updatingUser:', error);
        throw error;
    }
};


const deleteUser = async (id) => {
  const { rows } = await db.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  return rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
