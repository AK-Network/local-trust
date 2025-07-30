<script lang="ts">
	import { page } from "$app/state";
	import { signIn } from "@auth/sveltekit/client";
</script>

<div class="text-center">
	<h1 class="text-3xl font-bold underline">Welcome to LocalTust</h1>
	<p class="mt-4">
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
		documentation
	</p>
</div>
{#if page.data.session}
	<!-- content here -->
	<div>
		{#if page.data.session.user?.image}
			<!-- content here -->
			<img src={page.data.session.user.image} alt="user avatar" />
		{/if}
		<h1>Welcome {page.data.session.user?.name}</h1>
	</div>
{:else}
	<!-- else content here -->
	<div>
		<img src="/img/logo.svg" alt="Company Logo" />
		<button onclick={() => signIn("github")}>Sign in with GitHub</button>
	</div>
{/if}
