import { API_URL } from '$lib/utils/constants';
import type { ApiResponse } from '$lib/utils/types';
import { fetch } from '@tauri-apps/api/http';

export const newSession = async (name: string): Promise<ApiResponse<SessionData>> => {
	try {
		const req = await fetch<ApiResponse<SessionData>>(`${API_URL}/session`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				type: 'Json',
				payload: { name: name }
			},
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export interface SessionData {
	token: string;
	id: string;
}
