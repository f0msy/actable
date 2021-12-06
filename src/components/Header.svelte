<script>
    export let headerData;
</script>

<div class="ac-header-cell" style="min-width: {headerData.width}; background-color: {headerData.background};">
    {headerData.name}
</div> 


<style>
    .ac-header-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #f7f7f7;
        box-sizing: border-box;
    }
</style>