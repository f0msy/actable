<script>
    import { setTableData } from '../services/data.service.js'
</script>

    <button on:click={setTableData} class="ac-table-btn">
        Сохранить
    </button>


<style>
    .ac-table-btn {
        width: 150px;
        height: 40px;
        border-radius: 8px;
        margin: 10px;
        border: none;
        background-color: #1976d2;
        color: #fff;
        cursor: pointer;
    }
</style>