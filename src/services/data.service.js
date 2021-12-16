import { tableRows } from '../stores/rows.store.js';
import { get } from 'svelte/store';

export async function getTableData() {
    const url = window.getTableUrl ?? '/app/v1.2/api/publications/action/get-table-data' ;
    const resp = await fetch(url);
    const result = await resp.json();
    const fixedColumnsCount = result.fixedColumnsCount;

    result.rows.map(r => {
      let orderedCells = [];
      result.headers.forEach(h => {
        const cell = r.cells.find(c => c.columnId === h.id);
        orderedCells.push(cell);
      });
      r.cells = orderedCells;
      return r
    });

    result.rows.map(r => {
      r.fixedCells = [];
      r.cells.map((c, i) => {
        if(i < fixedColumnsCount) {
          r.fixedCells.push(c);
        }
      })
      r.cells = r.cells.slice(fixedColumnsCount);
      return r
    })
    result.fixedHeaders = []
    result.headers.map((h, i) => {
      if(i < fixedColumnsCount) {
        result.fixedHeaders.push(h)
      }
      return h;
    })
    result.headers = result.headers.slice(fixedColumnsCount);

    result.fixedTitles = []
    result.titles.map((t, i) => {
      if(i < fixedColumnsCount) {
        result.fixedTitles.push(t)
      }
      return t;
    })
    result.titles = result.titles.slice(fixedColumnsCount);

  
    tableRows.set(result.rows);

    return result;
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

