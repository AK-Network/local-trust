<script>
	import { page } from "$app/state";
	import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<header class="flex justify-between items-center p-4 border-b">
	<a href="/" class="text-lg">Local<span class="font-bold">Trust</span></a>

	<div class="flex gap-2">
		<nav>

		</nav>

		{#if page.data.session}
			<!-- content here -->
			<button popovertarget="user-menu" popovertargetaction="toggle"
				>{page.data.session.user?.name}</button
			>

			<div popover="auto" id="user-menu" class="shadow border rounded">

				<div class="flex items-center justify-center flex-row gap-2 border-b p-2">
					{#if page.data.session.user?.image}
						<!-- content here -->
						<img class="w-11 h-11" src={page.data.session.user.image} alt="user avatar" />
					{/if}
					<div class="flex flex-col">
						<span class="font-semibold">{page.data.session.user?.name}</span>
						<span class="text-sm font-light">{page.data.session.user?.email}</span>
					</div>
				</div>



				<div class="flex justify-between p-2">
					<button onclick={() => signOut()}>Sign Out</button>

					<a href="/dashboard">Dashboard</a>
				</div>
			</div>
		{:else}
			<button onclick={() => signIn('github', {
				redirectTo: '/dashboard'
			})}>Sign In</button>
		{/if}
	</div>
</header>

<style>
	button[popovertarget="user-menu"] {
		anchor-name: --userButton;
	}
	#user-menu {
		position-anchor: --userButton;
		position-area: bottom span-left;
	}
</style>
