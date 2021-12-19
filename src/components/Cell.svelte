<script>
    import { updateTableRows } from '../helpers/updateTableRows'
    import { checkTableData } from '../services/data.service'

    export let cellData;
    export let rowId;
    export let cellStyles = '';
</script>

<div class="ac-cell" style="width: {cellData.width}px; background-color: {cellData.background || '#fff'}; {cellStyles}">
    <input 
    title="{cellData.value}" style="background-color: {cellData.background || '#fff'};" type="text" disabled={cellData.canEdit === 0}
    bind:value="{cellData.value}" 
    on:keyup="{e => updateTableRows(e.target.value, cellData.columnId, rowId)}" 
    on:change={checkTableData}
    >
</div> 


<style>
    .ac-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e4e4e4;
        box-sizing: border-box;
        border-bottom: 1px solid #e4e4e4;
    }

    .ac-cell > input {
        color: #333;
        margin: 0 auto;
        padding: 5px;
        border-radius: 0.2rem;
        border: none;
        width: 90%;
        display: block;
        border-bottom: 0.3rem solid transparent;
        transition: all 0.3s;
        text-align: end;
        cursor: pointer;
    }
</style>