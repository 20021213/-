import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    // 执行 SQL 查询：从 "members" 表中选择所有列
    const { rows } = await sql`SELECT * FROM members;`;

    // 把查询结果 (数组) 直接发回给前端
    return response.status(200).json(rows);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}