import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { uniqueId } = request.body;

    if (!uniqueId) {
      return response.status(400).json({ error: 'Missing uniqueId' });
    }

    // 执行 SQL 删除：从 "members" 表中删除指定 "uniqueId" 的行
    await sql`DELETE FROM members WHERE "uniqueId" = ${uniqueId};`;

    return response.status(200).json({ success: true, deletedId: uniqueId });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}