import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  try {
    // 从 "members" 这个大组里，获取所有成员
    const membersDict = await kv.hgetall('members');

    // KV 存的是对象 { "id1": {...}, "id2": {...} }
    // 我们把它转成数组 [ {...}, {...} ]
    const membersArray = Object.values(membersDict || {});

    // 把数组发回给前端
    return response.status(200).json(membersArray);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}