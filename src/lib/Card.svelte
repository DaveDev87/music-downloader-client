<script>
    import ButtonComponent from "../components/ButtonComponent.svelte";

    export let videoData;

    async function download() {
        const config = {
            method: "POST",
        };
        let filename = "song.mp4";
        try {
            fetch(`http://localhost:8080/video/${videoData["Id"]}`, config)
                .then((result) => {
                    if (!result.ok) {
                        throw Error(result.statusText);
                    }

                    const header = result.headers.get("content-disposition");
                    console.log("El header: ", header);

                    return result.blob();
                })
                .then((blob) => {
                    if (blob != null) {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                    }
                });
        } catch (e) {
            console.error(e);
        }
    }
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
    <ButtonComponent text="Download" on:click={download} />
</section>
