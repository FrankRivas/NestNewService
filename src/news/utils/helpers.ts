import { ErrorMessage } from '../interfaces/errors';

enum codes {
  'OK' = 200,
  'CREATED' = 201,
  'NO CONTENT' = 204,
  'BAD REQUEST' = 400,
  'UNAUTHORIZED' = 401,
  'FORBIDDEN' = 403,
  'NOT FOUND' = 404,
  'METHOD NOT ALLOWED' = 405,
  'CONFLICT' = 409,
  'INTERNAL SERVER ERROR' = 500,
  'SERVIDE UNAVAILABLE' = 503,
}

export function generateMessage(code: number, error?: {}): ErrorMessage {
  return {
    code: code,
    msg: codes[code],
    errors: error || {},
  };
}
