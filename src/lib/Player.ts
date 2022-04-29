import { writable } from 'svelte/store';

export const points = writable(0);
export const position = writable({ x: 0, y: 0, z: 0 });
export const width = writable(0);
