<script>
    import { checkTableData } from '../services/data.service.js'
</script>

    <button on:click={checkTableData} class="ac-table-btn">
        Пересчитать
    </button>


<style>
    .ac-table-btn {
        width: 150px;
        height: 40px;
        border-radius: 8px;
        margin: 10px 0;
        border: none;
        background-color: #bc5100;
        color: #fff;
        cursor: pointer;
    }
</style>