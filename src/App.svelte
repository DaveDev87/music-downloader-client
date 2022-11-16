<script>
  import Searchbar from "./lib/Searchbar.svelte";
  import Card from "./lib/Card.svelte";
  import ButtonComponent from "./components/ButtonComponent.svelte";

  let disabled = false;
  let url =
    "https://www.youtube.com/watch?v=F165DwQRUfE&list=RDF165DwQRUfE&start_radio=1&ab_channel=PXNDX-Topic";
  let videoData;

  $: youtubeId = getId(url);

  function getId(id = "") {
    const arrUrl = id.split(/[=\&]/);

    if (arrUrl.length < 2) {
      return null;
    }

    return arrUrl[1];
  }

  function getVideo(id) {
    disabled = true;
    fetch(`http://localhost:8080/video/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        videoData = data;
        disabled = false;
      })
      .catch((err) => {
        console.log(err);
        disabled = false;
      });
  }

  //   async function downloadVideo(id) {
  //       const config = {
  //           method: "POST",
  //       };
  //       let filename = "song.mp4";
  //       try {
  //           fetch(`http://localhost:8080/video/${id}`, config)
  //               .then((result) => {
  //                   if (!result.ok) {
  //                       throw Error(result.statusText);
  //                   }

  //                   const header = result.headers.get("content-disposition");
  //                   console.log("El header: ", header);

  //                   return result.blob();
  //               })
  //               .then((blob) => {
  //                   if (blob != null) {
  //                       let url = window.URL.createObjectURL(blob);
  //                       let a = document.createElement("a");
  //                       a.href = url;
  //                       a.download = filename;
  //                       document.body.appendChild(a);
  //                       a.click();
  //                       a.remove();
  //                   }
  //               });
  //       } catch (e) {
  //           console.error(e);
  //       }
  //   }
</script>

<main class="h-screen">
  <div class="h-48" />
  <div class="">
    <div class="grid grid-cols-12 gap-1">
      <div class="md:col-span-5 md:col-start-4 col-span-12">
        <Searchbar
          placeholder="Paste Youtube link here"
          on:url={({ detail }) => (url = detail)}
        />
      </div>
      <div class="md:col-span-1 col-span-12">
        <ButtonComponent
          text="Search"
          on:click={() => getVideo(youtubeId)}
          {disabled}
        />
      </div>
    </div>
    {#if videoData}
      <div class="grid grid-cols-12 mt-6">
        <div class="md:col-span-6 col-span-12 md:col-start-4">
          <Card {videoData} />
        </div>
      </div>
    {/if}
  </div>
</main>
