<script lang="ts">
	import { signOut } from "@auth/sveltekit/client";
	import { onNavigate } from "$app/navigation";

	let {user} = $props()
	let userMenu = $state<HTMLDivElement>();
	onNavigate((navigation) => {
		console.log("navigation", navigation);
		userMenu && userMenu.hidePopover();
	});
</script>

<button
				popovertarget="user-menu"
				popovertargetaction="toggle"
				class="px-3 py-1 border border-[#dbeeff] bg-transparent hover:cursor-pointer rounded flex items-center gap-2"
				>{user.name}</button
			>

			<div
				popover="auto"
				id="user-menu"
				class="shadow border rounded"
				bind:this={userMenu}
			>
				<div
					class="flex items-center justify-center flex-row gap-2 border-b p-2"
				>
					{#if user.image}
						<!-- content here -->
						<img
							class="w-11 h-11"
							src={user.image}
							alt="user avatar"
						/>
					{/if}
					<div class="flex flex-col">
						<span class="font-semibold">{user.name}</span>
						<span class="text-sm font-light"
							>{user.email}</span
						>
					</div>
				</div>

				<div class="flex justify-between p-2">
					<button onclick={() => signOut()}>Sign Out</button>

					<a href="/dashboard">Dashboard</a>
				</div>
			</div>

<style>
	button[popovertarget="user-menu"] {
		anchor-name: --userButton;
	}
	#user-menu {
		position-anchor: --userButton;
		position-area: bottom span-left;
	}
</style>
