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
				Authorization: `Bearer ${get(prefs).session?.token}`
			},
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const newLink = async (
	expires: number,
	max_usage: number,
	max_size: number
): Promise<ApiResponse<LinkData>> => {
	try {
		const req = await fetch<ApiResponse<LinkData>>(`${API_URL}/links`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${get(prefs).session?.token}`
			},
			body: {
				type: 'Json',
				payload: { expires, max_usage, max_size }
			},
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const deleteLink = async (id: string): Promise<ApiResponse<undefined>> => {
	try {
		const req = await fetch<ApiResponse<undefined>>(`${API_URL}/links/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${get(prefs).session?.token}`
			},
			timeout: 30
		});
		return req.data;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export interface LinkData {
	url: string;
	id: string;
	owner?: string;
	expires: number;
	max_usage: number;
	max_size: number;
}

export interface GetLinksResponse {
	links: LinkData[];
}
