import pool from "../db";

export const MessageService = {
  async create(message: {
    campaign_id: string;
    sender_id: number;
    content: any;
    message_type: string;
    metadata?: any;
  }) {
    const query = `
      INSERT INTO messages (campaign_id, sender_id, content, message_type, metadata)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    return pool
      .query(query, [
        message.campaign_id,
        message.sender_id,
        message.content,
        message.message_type,
        message.metadata,
      ])
      .then((result) => result.rows[0]);
  },

  async getForCampaign(params: { campaign_id: string; limit?: number }) {
    const query = `
      WITH tbA AS (SELECT m.*, u.username
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.campaign_id = $1
      ORDER BY m.created_at DESC
      LIMIT $2)

      SELECT * FROM tbA        
      ORDER BY created_at ASC
    `;

    return pool
      .query(query, [params.campaign_id, params.limit || 50])
      .then((result) => result.rows);
  },

  async get10LastMessagesForCampaign(params: {
    campaign_id: string;
    limit?: number;
  }) {
    const query = `
      SELECT m.*, u.username
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.campaign_id = $1
      ORDER BY m.created_at DESC
      LIMIT $2
    `;

    return pool
      .query(query, [params.campaign_id, params.limit || 50])
      .then((result) => result.rows);
  },

  async getLatestForCampaign(params: {
    campaign_id: string;
    after_timestamp?: Date;
  }) {
    const query = `
      SELECT m.*, u.username
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.campaign_id = $1
      AND ($2::timestamp IS NULL OR m.created_at > $2)
      ORDER BY m.created_at DESC
    `;

    return pool
      .query(query, [params.campaign_id, params.after_timestamp])
      .then((result) => result.rows);
  },
};
