import { createClient } from '@clickhouse/client'; // or '@clickhouse/client-web'

export const client = createClient({
  host:
    process.env.CLICKHOUSE_HOST ||
    'https://hcoi4ygok8.eu-central-1.aws.clickhouse.cloud:8443',
  username: process.env.CLICKHOUSE_USER || 'default',
  password: process.env.CLICKHOUSE_PASSWORD || 'Npz3XOeGz.YdU',
});
