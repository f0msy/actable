<script>
   import Header from './Header.svelte';
   import Row from './Row.svelte';
   import SaveButton from "./SaveButton.svelte";
   import CheckButton from "./CheckButton.svelte";
   import { getTableData, setProgressBar } from '../services/data.service';
   import { tableData } from '../stores/data.store';

   let data = getTableData();
   tableData.subscribe(d => {
    if(d) {
        data = d;
        setProgressBar('finish');
    }
   });
</script>
<div class="ac-table-container">
    <div class="ac-table">
        {#await data}
            <p>...загрузка</p>
        {:then table} 
        <div class="ac-table-header">
            <div class="ac-table-name">{table.tableName}</div>
            <div class="ac-table-btns-container">
                <div><CheckButton /></div>
                <div><SaveButton /></div>     
            </div>
        </div>
        <div class="ac-table-titles">
            <div class="ac-fixed-headers">
                <div class="ac-rownum"></div>
                {#each table.fixedTitles as header}
                    <Header headerData={header}/>
                {/each}
            </div>
            {#each table.titles as title}
                <Header headerData={title}/>
            {/each}
        </div>
        <div class="ac-table-headers">
            <div class="ac-fixed-headers">
                <div class="ac-rownum">№</div>
                {#each table.fixedHeaders as header}
                    <Header headerData={header}/>
                {/each}
            </div>
            {#each table.headers as header}
                <Header headerData={header}/>
            {/each}
        </div>
        <div class="ac-table-row">
            {#each table.rows as row}
                <Row rowData={row}/>
            {/each}
        </div>

        {/await}
    </div>
</div>
<style>

    .ac-table-container {
        width: 100%;
        height: 100%;
    }
    .ac-table-name {
        font-weight: 500;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
    }

    .ac-table-btns-container {
        display: flex;
        margin-right: 50px;
    }

    .ac-fixed-headers {
        display: flex;
        position: sticky;
        left: 0;
        z-index: 10;
    }

    .ac-table-header {
        width: 100%;
        background-color: #fff;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
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
        overflow: auto;
        flex-wrap: wrap;
    }

    .ac-table-titles {
        display: flex;
        flex-direction: row;
        height: 50px;
        font-weight: 500;
        position: sticky;
        top: 60px;
        z-index: 10;
    }

    .ac-table-headers {
        display: flex;
        flex-direction: row;
        height: 50px;
        font-weight: 500;
        position: sticky;
        top: 110px;
        z-index: 10;
    }

    .ac-table-row { 
        height: 50px;
        z-index: 1;
    }

    .ac-rownum {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        box-sizing: border-box;
        cursor: pointer;
        width: 40px;
        z-index: 10;
        background-color: #c7c7c7;;
    }
</style>