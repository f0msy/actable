<script>
    export let headerData;
</script>

<div class="ac-header-cell" 
style="min-width: {headerData.width}; background-color: {headerData.background}; {headerData.textColor ? 'color:' + headerData.textColor + ';': ''}" title="{headerData.name}">
    <p>{headerData.name}</p>
</div> 


<style>
    .ac-header-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        box-sizing: border-box;
        cursor: pointer;
    }

    .ac-header-cell > p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 10px;
    }

</style>