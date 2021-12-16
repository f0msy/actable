<script>
    import Cell from './Cell.svelte';
    import { selectedRow } from '../stores/rows.store';
    import { get } from 'svelte/store';

    export let rowData;
    export let tableData;

    function findCellWidth (columnId) {
        const headersWidth = tableData?.headers?.find(e => e.id === columnId)?.width;
        const fixedHeadersWidth = tableData?.fixedHeaders?.find(e => e.id === columnId)?.width;
        
        return headersWidth ? headersWidth : fixedHeadersWidth;
    };

    rowData.fixedCells.map(c => {
        c.width = parseInt(findCellWidth(c.columnId).replace('px', ''));
        return c;
    })

    rowData.fixedCells.map((c, i) => {
        if(i == 0) {
            c.left = 0;
            return c;
        } 
        c.left = rowData.fixedCells.reduce((acc, curr, index) => {
            if(index < i) {
                return acc + curr.width;
            }
            return acc;
        }, 0)
        return c;
    })
    let focused = false;

    selectedRow.subscribe(v => {
        if(v == rowData.id) {
            focused = true;
        } else {
            focused = false;
        }
    });

</script>

<div class="ac-row" class:ac-row-focused={focused} on:click="{() => selectedRow.set(rowData.id)}">
    {#each rowData.fixedCells as cell}
        <Cell cellData={cell} width={findCellWidth(cell.columnId)} rowId={rowData.id} cellStyles={'position: sticky; left:'+ cell.left +'px;'}/>
    {/each}
    {#each rowData.cells as cell}
        <Cell cellData={cell} width={findCellWidth(cell.columnId)} rowId={rowData.id} />
    {/each}
</div>

<style>
    .ac-row {
        display: flex;
        height: 50px;
    }

    .ac-row-focused {
        box-sizing: border-box;
        border-bottom: 1px solid rgb(143, 143, 143);
        border-top: 1px solid rgb(143, 143, 143);
    }
</style>