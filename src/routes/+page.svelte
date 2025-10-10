<script lang="ts">
    import { api } from "$lib/api/client";
    import { onMount } from "svelte";

    //   let data = $state("");

    onMount(async () => {
        const { data, status } = await api.hi.get();

        console.log(data, status);
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>
