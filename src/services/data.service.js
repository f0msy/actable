export async function getTableData(taskId) {
    const url = '/app/v1.2/api/publications/action/get-table-data';
    return await (await fetch(url)).json();
}