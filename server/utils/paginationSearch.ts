import { RowDataPacket } from 'mysql2';
import db from '../database/connection';

const PaginationSearch = async <T>(
  tableName: string,
  searchField: string,
  search: string,
  page: number,
  limit: number
): Promise<{
  total: number;
  numberOfPages: number;
  currentPage: number;
  data: T[];
}> => {
  const offset = (page - 1) * limit;
  let query = `SELECT * FROM ${tableName}`;
  let countQuery = `SELECT COUNT(*) as total FROM ${tableName}`;

  const searchParams = [];

  if (search) {
    const searchQuery = ` WHERE ${searchField} LIKE ?`;
    query += searchQuery;
    countQuery += searchQuery;
    searchParams.push(`%${search}%`);
  }

  query += ' LIMIT ? OFFSET ?';
  searchParams.push(limit, offset);

  const [totalResults] = await db.query<RowDataPacket[]>(
    countQuery,
    searchParams.slice(0, -2)
  );
  const total = totalResults[0].total;
  const [data] = await db.query<RowDataPacket[]>(query, searchParams);
  const numberOfPages = Math.ceil(total / limit);

  return { total, numberOfPages, currentPage: page, data: data as T[] };
};

export default PaginationSearch;
