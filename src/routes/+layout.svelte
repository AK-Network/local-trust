<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	import NavBar from '$lib/components/NavBar.svelte';
	import type { Snippet } from 'svelte';
    import Toast from '$lib/components/toast/Toast.svelte';
	
	type Props = {
		children: Snippet
	}
	let { children }: Props = $props();
</script>

<ModeWatcher />
<NavBar />

{@render children()}

<Toast />