<script>
    import { updateTableRows } from '../helpers/updateTableRows'
    import { checkTableData } from '../services/data.service'

    export let cellData;
    export let rowId;
    export let cellStyles = '';
    let isEditing = false;

    function handleInput(event) {
        if(cellData.type === 'checkbox') {
            cellData.value = event.target.checked;
            return;
        }
		cellData.value = event.target.value;
        return;
	}

    function parseValue(value) {
        if(!value) {
            return '';
        }

        if(value === '0' && cellData.type === 'number') {
            return '';
        }

        return value;
    }

    function formatNumber(value) {
        if(value) {
            value = parseFloat(value);
            return value.toLocaleString();
        }
        return value;
    }
</script>

<div class="ac-cell" style="width: {cellData.width}px; background-color: {cellData.background || '#fff'}; {cellStyles}" on:blur="{() => isEditing = !isEditing}">
    {#if (isEditing && cellData.type === 'number') || cellData.type !== 'number'}
        <input
        title="{cellData?.tooltip || cellData.value}" style="background-color: {cellData.background || '#fff'};" type="{cellData.type || 'text'}" disabled={cellData?.canEdit === 0 || !cellData?.canEdit}
        on:input="{handleInput}"
        value={parseValue(cellData.value)}
        on:keyup="{e => updateTableRows(e.target.value, cellData.columnId, rowId)}"
        >
    {/if}

    {#if !isEditing && cellData.type === 'number'}
        <input
        title="{cellData?.tooltip || cellData.value}" style="background-color: {cellData.background || '#fff'};" type="{cellData.type || 'text'}" disabled={cellData?.canEdit === 0 || !cellData?.canEdit}
        value={formatNumber(cellData.value)}
        >
    {/if}

</div> 


<style>
    .ac-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #d7d7d7;
        box-sizing: border-box;
        border-bottom: 1px solid #d7d7d7;
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

    .ac-cell > input::-webkit-outer-spin-button,
    .ac-cell > input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="date"][title=""]::-webkit-datetime-edit-year-field,
    input[type="date"][title=""]::-webkit-datetime-edit-month-field,
    input[type="date"][title=""]::-webkit-datetime-edit-day-field,
    input[type="date"][title=""]::-webkit-datetime-edit-text {
        color: transparent !important;
    }
</style>