import pool from '../db.js'

export async function getDatabaseHealth() {
  const connection = await pool.query(`
    SELECT
      current_database() AS database,
      current_schema() AS schema,
      inet_server_addr()::text AS server,
      inet_server_port() AS port
  `)
  const tables = await pool.query(`
    SELECT
      to_regclass('public.categorie') IS NOT NULL AS categorie_exists,
      to_regclass('public.produits') IS NOT NULL AS produits_exists
  `)

  return { connection: connection.rows[0], tables: tables.rows[0] }
}
