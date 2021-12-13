import { tableRows } from '../stores/rows.store.js';
import { get } from 'svelte/store';

export async function getTableData() {
    const url = window.getTableUrl ?? '/app/v1.2/api/publications/action/get-table-data' ;
    return await (await fetch(url)).json();
}

export async function checkTableData() {
    const body = get(tableRows);
    const url = window.checkTableUrl ?? '/app/v1.2/api/publications/action/check-table-data';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
      });
      await response.json().then(r => {
        alert(JSON.parse(r))
      });
      
}

export async function setTableData() {
    const body = get(tableRows);
    const url = window.setTableUrl ?? '/app/v1.2/api/publications/action/set-table-data';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
      });
      await response.json().then(r => {
        alert(JSON.parse(r))
      });
}

