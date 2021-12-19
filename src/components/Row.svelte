<script>
    import { selectedRow } from '../stores/rows.store';
    import Cell from './Cell.svelte';

    export let rowData;

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
        <Cell cellData={cell} rowId={rowData.id} cellStyles={'position: sticky; left:'+ cell.left +'px;'}/>
    {/each}
    {#each rowData.cells as cell}
        <Cell cellData={cell} rowId={rowData.id} />
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