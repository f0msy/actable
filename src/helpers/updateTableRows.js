import { tableRows } from '../stores/rows.store.js';

export function updateTableRows(value, key, rowId) {
  tableRows.update((v) => {
    v.find((r) => r.id == rowId).cells.find((c) => c.columnId === key).value =
      value;
    return v;
  });
}
