<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";

    export let text = "Button";
    export let disabled = false;
    let buttonRef;

    const dispatch = createEventDispatcher();

    onMount(() => {
        buttonRef.addEventListener("mousemove", handleMouse);
    });

    onDestroy(() => {
        buttonRef.removeEventListener("mousemove", handleMouse);
    });

    function handleMouse(e) {
        const { x, y } = buttonRef.getBoundingClientRect();
        buttonRef.style.setProperty("--x", e.clientX - x);
        buttonRef.style.setProperty("--y", e.clientY - y);
    }

    function click() {
        dispatch("click");
    }
</script>

<button
    class={disabled ? "shiny-disabled" : "shiny"}
    bind:this={buttonRef}
    on:click={click}
    {disabled}
>
    {text}
</button>

<style>
    .shiny {
        width: 100%;
        position: relative;
        color: black;
        border: 2px solid rgba(0, 0, 0, 0.1);
        padding: 10px 15px;
        background: white;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        overflow: hidden;

        transition: all 0.25s ease-in-out;
    }

    .shiny::after {
        content: "";
        position: absolute;
        top: calc(var(--y, 0) * 1px - 115px);
        left: calc(var(--x, 0) * 1px - 115px);
        width: 220px;
        height: 220px;
        background: radial-gradient(#a4cdf3, #a4cdf300 100%);
        border-radius: 25px;

        opacity: 0;
        transition: opacity 0.2;
    }

    .shiny:hover {
        -webkit-box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        -moz-box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        box-shadow: 0px 4px 10px 0px rgba(171, 171, 171, 1);
        transition: all 0.25s ease-in-out;
        border: 2px solid #0585fd;
        color: #0585fd;
    }

    .shiny:hover::after {
        opacity: 0.4;
    }

    .shiny-disabled {
        width: 100%;

        position: relative;
        color: black;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 10px 15px;
        background: #dbdbdb;
        border-radius: 10px;
        font-weight: bold;
        cursor: auto;
        overflow: hidden;

        transition: all 0.1s ease-in-out;
    }
</style>
