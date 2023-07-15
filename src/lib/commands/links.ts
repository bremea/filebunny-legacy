import { API_URL } from '$lib/utils/constants';
import type { ApiResponse } from '$lib/utils/types';
import { fetch } from '@tauri-apps/api/http';
import { prefs } from './userdata';
import { get } from 'svelte/store';


export const getLinks = async (): Promise<ApiResponse<GetLinksResponse>> => {
	try {
		const req = await fetch<ApiResponse<GetLinksResponse>>(`${API_URL}/links`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${get(prefs).session?.token}`
			},
			timeout: 30
		});
		console.log(req);
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};


export interface LinkData {
    url: string,
    id: string,
    owner?: string,
    expires: bigint,
    max_usage: number,
    max_size: number,
}

export interface GetLinksResponse {
	links: LinkData[]
}