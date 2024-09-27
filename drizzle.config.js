import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./config/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://smartforms_owner:U9FQWiZbsn1V@ep-rapid-silence-a592lw0i.us-east-2.aws.neon.tech/smartforms?sslmode=require',
  }
});