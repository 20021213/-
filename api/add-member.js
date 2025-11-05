import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { uniqueId, id, role, isCommander, isHighLevel, notes } = request.body;

    if (!uniqueId || !id || !role) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // 执行 SQL 插入：把数据插入 "members" 表
    await sql`
      INSERT INTO members ("uniqueId", "id", "role", "isCommander", "isHighLevel", "notes")
      VALUES (${uniqueId}, ${id}, ${role}, ${isCommander}, ${isHighLevel}, ${notes});
    `;

    return response.status(200).json({ success: true });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}