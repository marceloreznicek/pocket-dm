import pool from '../db';

export const UserService = {
  async create(user: {
    username: string,
    email: string,
    password_hash: string
  }) {
    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    
    return pool.query(query, [
      user.username,
      user.email,
      user.password_hash
    ]).then(result => result.rows[0]);
  },

  async getById(params: {
    id: string
  }) {
    const query = `
      SELECT id, username, email, created_at
      FROM users
      WHERE id = $1
    `;
    
    return pool.query(query, [params.id])
      .then(result => result.rows[0]);
  },

  async getByEmail(params: {
    email: string
  }) {
    const query = `
      SELECT *
      FROM users
      WHERE email = $1
    `;
    
    return pool.query(query, [params.email])
      .then(result => result.rows[0]);
  }
};