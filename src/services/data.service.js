import { tableRows } from '../stores/rows.store.js';
import { tableData } from '../stores/data.store.js';
import { get } from 'svelte/store';
import ProgressBar from "@badrap/bar-of-progress";
const progress = new ProgressBar();

export function setProgressBar(value) {
  if(value === 'start') {
    progress.start();
    return;
  }

  if(value === 'finish') {
    progress.finish();
    return;
  }
}

function parseDataFromServer(result) {
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
  tableData.set(result);
  return result;
}

export async function getTableData() {
    setProgressBar('start');
    const url = window.getTableUrl ?? '/app/v1.2/api/publications/action/get-table-data' ;
    const resp = await fetch(url);
    const result = await resp.json();

    return parseDataFromServer(result);
}

export async function checkTableData() {
    setProgressBar('start');
    const body = get(tableRows);
    const url = window.checkTableUrl ?? '/app/v1.2/api/publications/action/check-table-data';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: '{data:' + JSON.stringify(body) + '}'
      });
    const result = await response.json();
    parseDataFromServer(result); 
}

export async function setTableData() {
    setProgressBar('start');
    const body = get(tableRows);
    const url = window.setTableUrl ?? '/app/v1.2/api/publications/action/set-table-data';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: '{data:' + JSON.stringify(body) + '}'
      });
    const result = await response.json();
    alert(result);
}

