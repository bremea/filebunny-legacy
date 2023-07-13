import { API_URL } from '$lib/utils/constants';
import { fetch } from '@tauri-apps/api/http';

export interface SessionData {
	token: string;
	id: string;
}

export const newSession = async (): Promise<SessionData> => {
	try {
		const req = await fetch<SessionData>(`${API_URL}/session`, {
			method: 'GET',
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
