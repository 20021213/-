import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // 确保是 POST 请求
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 这就是你从前端发来的 newMember 对象
    const newMember = request.body;

    if (!newMember || !newMember.uniqueId) {
      return response.status(400).json({ error: 'Missing member data or uniqueId' });
    }

    // 存入 KV 数据库
    // 'members' 是大组名，newMember.uniqueId 是键 (key)
    await kv.hset('members', { [newMember.uniqueId]: newMember });

    // 告诉前端 "搞定了"
    return response.status(200).json({ success: true, member: newMember });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}