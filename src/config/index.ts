import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, ACCESS_TOKEN,ACC_ID ,GOOGLE_DEVELOPER_TOKEN,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET} = process.env;
