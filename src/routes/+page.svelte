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
		<button
			onclick={() => signIn("github")}
			class="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border h-9 px-4 py-2 has-[>svg]:px-3 w-fit"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><path
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
					fill="currentColor"
				></path></svg
			>
			<span>Login in with GitHub</span>
		</button>
	</div>
{/if}
