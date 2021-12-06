<script>
    export let cellData;
    export let width;
</script>

<div class="ac-cell" style="min-width: {width}; background-color: {cellData.background || '#fff'};">
    <input style="background-color: {cellData.background || '#fff'};" type="text" bind:value="{cellData.value}">
</div> 


<style>
    .ac-cell {
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #f7f7f7;
        box-sizing: border-box;
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
    }
</style>