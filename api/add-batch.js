import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const membersArray = request.body; // 这是从前端发来的成员数组

    if (!Array.isArray(membersArray) || membersArray.length === 0) {
      return response.status(400).json({ error: 'No members to add' });
    }

    // 关键：Vercel Postgres 不支持一次插入多行，我们只能循环插入
    // (对用户来说没区别，就是慢一点点)
    for (const member of membersArray) {
       const { uniqueId, id, role, isCommander, isHighLevel, notes } = member;
       if (uniqueId && id && role) {
         await sql`
           INSERT INTO members ("uniqueId", "id", "role", "isCommander", "isHighLevel", "notes")
           VALUES (${uniqueId}, ${id}, ${role}, ${isCommander}, ${isHighLevel}, ${notes})
           ON CONFLICT ("uniqueId") DO NOTHING; -- 如果ID冲突，就跳过
         `;
       }
    }

    return response.status(200).json({ success: true, count: membersArray.length });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}