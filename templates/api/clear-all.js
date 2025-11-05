import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 执行 SQL 清空：删除 "members" 表中的所有行
    await sql`TRUNCATE TABLE members;`;

    return response.status(200).json({ success: true });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}