import { PREFERENCES_PATH } from '$lib/utils/constants';
import { writeFile, readTextFile, exists, BaseDirectory } from '@tauri-apps/api/fs';
import { writable, type Writable } from 'svelte/store';
import type { SessionData } from './session';

interface UserPreferences {
	name: string;
	session?: SessionData;
}

export const prefs: Writable<UserPreferences> = writable({name: ''});

export const writeDataFile = async (newData: UserPreferences) => {
	try {
		await writeFile(
			{
				contents: JSON.stringify(newData),
				path: PREFERENCES_PATH
			},
			{ dir: BaseDirectory.AppData }
		);
		prefs.set(newData);
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const readDataFile = async (): Promise<UserPreferences> => {
	try {
		const datastr = await readTextFile(PREFERENCES_PATH, { dir: BaseDirectory.AppData });
		const freshPrefs = JSON.parse(datastr) as UserPreferences;
		prefs.set(freshPrefs);
		return freshPrefs;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const dataFileExists = async (): Promise<boolean> => {
	try {
		const doesExist = await exists(PREFERENCES_PATH, { dir: BaseDirectory.AppData });
		return doesExist;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
