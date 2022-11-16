<script>
    import ButtonComponent from "../components/ButtonComponent.svelte";

    export let videoData;
</script>

<section class="grid md:grid-cols-3 grid-cols-1 md:gap-2">
    <div>
        <img
            class="rounded-xl"
            src={videoData["Thumbnails"][4]["URL"]}
            alt="preview"
        />
    </div>
    <div class="md:col-span-2 col-span-1">
        <h1 class="font-bold text-2xl">{videoData["Title"]}</h1>
        <p>{videoData["Author"]}</p>
        <p>{videoData["Duration"]}</p>
    </div>
    <ButtonComponent text="Download" />
</section>
