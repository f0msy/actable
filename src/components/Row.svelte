<script>
    import Cell from './Cell.svelte';
    export let rowData;
    export let headersData;

    function findCellWidth (columnId) {
        return headersData.find(e => e.id === columnId).width;
    };

    // console.log('cells: ' + rowData.cells.length)
    // console.log('headers: ' + headersData.length)
    // console.log(headersData.filter(e => !rowData.cells.map(c => c.columnId).includes(e.id)));
    const orderedCells = [];
    headersData.forEach(h => {
        const cell = rowData.cells.find(c => c.columnId === h.id);
        orderedCells.push(cell);
    });

</script>

<div class="ac-row">
    {#each orderedCells as cell}
        <Cell cellData={cell} width={findCellWidth(cell.columnId)} rowId={rowData.id} />
    {/each}
</div>

<style>
    .ac-row {
        display: flex;
        height: 50px;
    }
</style>