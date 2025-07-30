<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
    import NavBar from '$lib/components/NavBar.svelte';
	
	type Props = {
		children: Snippet
	}
	let { children }: Props = $props();
</script>


<NavBar />

{@render children()}
