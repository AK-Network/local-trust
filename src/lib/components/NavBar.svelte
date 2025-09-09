<script lang="ts">
	import { page } from "$app/state";
	import { signIn } from "@auth/sveltekit/client";
	import AccountButton from "./AccountButton.svelte";
    import { toast } from "./toast/Toast.svelte";
    import { Button } from "./ui/button";

	let userMenu: HTMLDivElement|undefined = $state()
</script>

<header class="flex justify-between items-center px-4 py-2 border-b">
	<div class="flex items-center gap-4">
		<a href="/" class="flex items-center gap-2 text-lg">
			<img src="/img/logo.svg" alt="Application Logo" class="h-6" />
			<span>Local<span class="font-bold">Trust</span></span>
		</a>

		{#if page.data.rootCA}
			<!-- content here -->
			<button
				popovertarget="rootCA-menu"
				class="flex items-center gap-2 ps-2 pe-1 py-0 border border-zinc-600 hover:cursor-pointer rounded"
			>
				<span class="font-bold text-sm"
					>{page.data.rootCA.options.organization}</span
				>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 0 24 24"
					width="24px"
					fill="currentColor"
					><path d="M0 0h24v24H0V0z" fill="none" /><path
						d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
					/></svg
				>
			</button>

			<div
				popover="auto"
				id="rootCA-menu"
				class="relative shadow border rounded"
				bind:this={userMenu}
			>
				<div>
					<p class="text-sm">Organization</p>
					<h3 class="font-semibold">{page.data.rootCA.options.organization}</h3>

					<div>
						<label for="">Expires on</label>
						<input
							type="text"
							value={new Intl.DateTimeFormat("en-US").format(
								new Date(page.data.rootCA.expiresAt),
							)}
							readonly
						/>
					</div>
					<Button size="icon" variant="outline" aria-label="Download your root certificate" title="Download your root certificate" class="absolute top-2 right-2" href="/download/rootCA">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
					</Button>

				</div>
			</div>
		{/if}
	</div>

	<div class="flex gap-2">
		<nav></nav>

		{#if page.data.session}
			<!-- content here -->
			<AccountButton user={page.data.session.user}/>
		{:else}
			<button
				onclick={() =>
					signIn("github", {
						redirectTo: "/dashboard",
					})}>Sign In</button
			>
		{/if}
	</div>
</header>

<style>
	button[popovertarget="rootCA-menu"] {
		anchor-name: --rootCAButton;
	}
	#rootCA-menu {
		position-anchor: --rootCAButton;
		position-area: bottom span-right;
	}
</style>
