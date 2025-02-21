import pool from '../db';

export const CampaignService = {
  async create(campaign: {
    name: string,
    description?: string,
    adventure_type?: string
  }) {
    const query = `
      INSERT INTO campaigns (name, description, adventure_type)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    return pool.query(query, [
      campaign.name,
      campaign.description,
      campaign.adventure_type
    ]).then(result => result.rows[0]);
  },

  async getById(params: {
    id: string
  }) {
    const query = `
      SELECT *
      FROM campaigns
      WHERE id = $1
    `;
    
    return pool.query(query, [params.id])
      .then(result => result.rows[0]);
  },

  async addPlayer(params: {
    campaign_id: string,
    user_id: string,
    character_name?: string
  }) {
    const query = `
      INSERT INTO campaign_players (campaign_id, user_id, character_name)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    return pool.query(query, [
      params.campaign_id,
      params.user_id,
      params.character_name
    ]).then(result => result.rows[0]);
  },

  async getPlayersForCampaign(params: {
    campaign_id: string
  }) {
    const query = `
      SELECT cp.*, u.username
      FROM campaign_players cp
      JOIN users u ON cp.user_id = u.id
      WHERE cp.campaign_id = $1
    `;
    
    return pool.query(query, [params.campaign_id])
      .then(result => result.rows);
  }
};