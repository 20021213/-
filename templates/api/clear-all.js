import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 直接删除 'members' 这个大组 (hash)
    await kv.del('members');

    return response.status(200).json({ success: true });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}