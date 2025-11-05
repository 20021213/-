import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { uniqueId } = request.body; // 从前端获取要删除的 ID

    if (!uniqueId) {
      return response.status(400).json({ error: 'Missing uniqueId' });
    }

    // 从 'members' 大组里，删除指定 key (uniqueId) 的条目
    await kv.hdel('members', uniqueId);

    return response.status(200).json({ success: true, deletedId: uniqueId });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}