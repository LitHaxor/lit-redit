export const __prod__ = process.env.NODE_ENV !== 'production'
export const DB_URL = process.env.DB_URL || 'postgresql://postgres:admin@127.0.0.1:5432'