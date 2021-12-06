<script>
   import Header from './Header.svelte';
   import Row from './Row.svelte';
   import { getTableData } from '../services/data.service';

   let data = getTableData(1);

</script>
<div class="ac-table-container">
    <div class="ac-table">
        {#await data}
            <p>...загрузка</p>
        {:then table} 
        <div class="ac-table-headers">
            {#each table.titles as title}
                <Header headerData={title}/>
            {/each}
        </div>
        <div class="ac-table-headers">
            {#each table.headers as header}
                <Header headerData={header}/>
            {/each}
        </div>
        <div class="ac-table-row">
            {#each table.rows as row}
                <Row rowData={row} headersData={table.headers}/>
            {/each}
        </div>

        {/await}
    </div>
</div>
<style>

    .ac-table-container {
        overflow: auto;
        width: 100%;
        height: 100%;
    }

    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border: 2px solid transparent;
        box-shadow: inset 0 0 0 24px rgb(0 0 0 / 37%);
        border-radius: 24px;
    }

    .ac-table {
        width: 100%;
        height: 100%;
        background-color: #fff ;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .ac-table-headers {
        display: flex;
        flex-direction: row;
        height: 50px;
        font-weight: 500;
    }

    .ac-table-row { 
        height: 50px;
    }
</style>