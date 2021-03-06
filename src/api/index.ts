import { QueryParams } from 'interfaces';
import { stringifyParams } from 'utils';
import CONFIG from './config';

class Api {
  /**
   * Performs a GET method request.
   * @async
   * @param {string} endpoint - Giphy endpoint
   * @param {QueryParams} params - An object which each <key, param> represents the param name and value
   */
  async get<T>(endpoint: string, params: QueryParams): Promise<T> {
    const res = await fetch(`${CONFIG.API_BASE_PATH}/${endpoint}${stringifyParams(params)}`);
    const jsonRes = await res.json();

    if (!res.ok) {
      throw new Error(jsonRes.message);
    }

    return jsonRes as T;
  }

  async patch(endpoint: string, params: QueryParams): Promise<number> {
    const res = await fetch(`${CONFIG.API_BASE_PATH}/${endpoint}`, {
      method: 'PATCH',
      body: JSON.stringify(params),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const jsonRes = await res.json();
      throw new Error(jsonRes.message);
    }

    return res.status;
  }
}

export default new Api();

export const API_CONFIG = CONFIG;
