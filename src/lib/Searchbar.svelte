<script>
    import { createEventDispatcher } from "svelte";

    export let placeholder = "Placeholder";
    let url = "";

    const dispatch = createEventDispatcher()
</script>

<input type="text" class="search" on:change={()=>dispatch("url", url)} bind:value={url} {placeholder} />

<style>
    .search {
        height: 100%;
        width: 100%;
        padding: 10px 15px 10px 15px;
        border-radius: 10px;
        position: relative;
        border: 2px solid rgba(0, 0, 0, 0.1);
        transition: all 0.25s ease-in-out;
    }

    .search:hover {
        -webkit-box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        -moz-box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
    }

    .search:focus {
        outline: none !important;
        -webkit-box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        -moz-box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        border: 2px solid #4f9be2;
    }
</style>
