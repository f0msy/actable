import { writable } from 'svelte/store';

export const tableRows = writable([]);
export const selectedRow = writable('');