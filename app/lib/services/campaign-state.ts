import pool from '../db';

export const CampaignStateService = {
  async upsert(state: {
    campaign_id: string,
    current_scene?: string,
    active_npcs?: any,
    quest_state?: any,
    last_context?: string
  }) {
    const query = `
      INSERT INTO campaign_states 
        (campaign_id, current_scene, active_npcs, quest_state, last_context)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (campaign_id) DO UPDATE
      SET 
        current_scene = EXCLUDED.current_scene,
        active_npcs = EXCLUDED.active_npcs,
        quest_state = EXCLUDED.quest_state,
        last_context = EXCLUDED.last_context,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    
    return pool.query(query, [
      state.campaign_id,
      state.current_scene,
      state.active_npcs,
      state.quest_state,
      state.last_context
    ]).then(result => result.rows[0]);
  },

  async getForCampaign(params: {
    campaign_id: string
  }) {
    const query = `
      SELECT *
      FROM campaign_states
      WHERE campaign_id = $1
    `;
    
    return pool.query(query, [params.campaign_id])
      .then(result => result.rows[0]);
  }
};