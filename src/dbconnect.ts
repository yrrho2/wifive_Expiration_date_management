import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

interface DbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  keepAliveInitialDelay: number;
  enableKeepAlive: boolean;
}

const dbConfig: DbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'edm',
  keepAliveInitialDelay: Number(process.env.DB_KEEP_ALIVE_INITIAL_DELAY) || 10000,
  enableKeepAlive: process.env.DB_ENABLE_KEEP_ALIVE === 'true',
};


declare global {
  var db: mysql.Connection;
}

interface DbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  keepAliveInitialDelay: number;
  enableKeepAlive: boolean;
}

export default async function connectToDatabase() {
  try {
    if (!global.db) {
      global.db = await mysql.createPool(dbConfig);
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}


/**
 * 데이터베이스 연결 설정을 관리하는 파일
 * MySQL 데이터베이스 연결 설정 및 전역 연결 객체 관리
 * 
 * 주요 기능:
 * - 데이터베이스 연결 설정
 * - 전역 연결 객체 관리
 * - 연결 에러 처리
 */
