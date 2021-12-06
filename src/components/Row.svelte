<script>
    import Cell from './Cell.svelte';
    export let rowData;
    export let headersData;

    function findCellWidth (columnId) {
        return headersData.find(e => e.id = columnId).width;
    };

</script>

<div class="ac-row">
    {#each rowData.cells as cell}
        <Cell cellData={cell} width={findCellWidth(cell.columnId)} />
    {/each}
</div>

<style>
    .ac-row {
        display: flex;
        height: 50px;
    }
</style>