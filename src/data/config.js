// TODO: Move API_KEY to environment variables for production
export const AIRTABLE_CONFIG = {
  BASE_ID: 'apprCw7umxngG9qrn',
  API_KEY: import.meta.env.VITE_AIRTABLE_API_KEY || 'keynsSvk5hddjKVav',
  TABLES: {
    APPARATUS: 'apparatus',
    TECHS: 'techs'
  }
};

export const API_BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}`;

