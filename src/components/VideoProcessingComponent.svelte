<script>
    import { onMount, onDestroy } from "svelte";

    let socket;
    let progres = 0;

    onMount(() => {
      socket = new WebSocket("ws://localhost:8080/ws");

      socket.addEventListener("open", (event) => {
        console.log(event);
      });

      socket.addEventListener("message", ({ data }) => {
        progres = data;
      });
    });

    onDestroy(() => socket.close());

    function sendUrl() {
      const URL = "UvnI1Sk5w2w";
      if (socket.readyState >= 1) {
        socket.send(URL);
      }
    }
  </script>

  <main class="h-screen flex">
    <div class="m-auto">
      <input
        class="p-2 bg-blue-500 text-white hover:bg-blue-400"
        type="button"
        value="connect"
        on:click={sendUrl}
      />
      <div>
        <p>{progres}%</p>
      </div>
    </div>
  </main>
