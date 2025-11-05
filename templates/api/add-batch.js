import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const membersArray = request.body; // 这是从前端发来的成员数组

    if (!Array.isArray(membersArray) || membersArray.length === 0) {
      return response.status(400).json({ error: 'No members to add' });
    }

    // 把数组 [ {...}, {...} ] 转换成 KV 需要的对象 { "id1": {...}, "id2": {...} }
    const membersObject = membersArray.reduce((acc, member) => {
      if (member && member.uniqueId) {
        acc[member.uniqueId] = member;
      }
      return acc;
    }, {});

    // 一次性批量写入
    await kv.hset('members', membersObject);

    return response.status(200).json({ success: true, count: membersArray.length });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}