<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/components/ui/button/button.svelte";

	let domains = $state([""]);

	const removeDomain = (index: number) => {
		domains.splice(index, 1);
		domains = domains;
	};
	const addDomain = () => (domains = [...domains, ""]);

	const createURL = (domain: string) => new URL(`127.0.0.1/${domain}?path=foo&api-key=bar`, 'localtrust://add').toString()
</script>

<svelte:head>
	<title>Local Trust | Dashboard</title>
</svelte:head>

<!-- promise was fulfilled -->
{#if !page.data.rootCA}
	<!-- content here -->
	<div class="container mx-auto px-4 py-12">
		<div class="text-center">
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				aria-hidden="true"
				class="mx-auto size-12"
			>
				<path
					d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					stroke-width="2"
					vector-effect="non-scaling-stroke"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
			</svg>
			<h3 class="text-sm font-semibold">No Projects</h3>
			<p class="text-stone-600 text-sm mt-1">
				Get started by creating your Certification Authority.
			</p>
			<div class="mt-6">
				<button
					popovertarget="newCA"
					class="inline-flex items-center text-sm font-semibold py-2 px-3 bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white rounded-md"
				>
					<svg
						viewBox="0 0 20 20"
						fill="currentColor"
						data-slot="icon"
						aria-hidden="true"
						class="size-5 -ml-0.5 mr-1.5"
					>
						<path
							d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
						></path>
					</svg>
					<span>Create your Certification Authority</span>
				</button>

				<div
					id="newCA"
					popover="manual"
					class="shadow border rounded p-4 w-full max-w-lg"
				>
					<form action="?/createCA" method="POST" class="text-start">
						<div class="space-y-4">
							<div class="border-b border-gray-900/10 pb-12">
								<h2 class="text-base/7 font-semibold text-gray-900">
									Certification Authority
								</h2>
								<p class="mt-1 text-sm/6 text-gray-600">
									This information will be displayed publicly so be careful what
									you share.
								</p>

								<div
									class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6"
								>
									<div class="sm:col-span-6">
										<label
											for="organization"
											class="block text-sm/6 font-medium text-gray-900"
											>Organization</label
										>
										<div class="mt-2">
											<div
												class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<input
													id="organization"
													type="text"
													name="organization"
													placeholder="janesmith"
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
												/>
											</div>
										</div>
									</div>

									<div class="sm:col-span-2">
										<label
											for="countryCode"
											class="block text-sm/6 font-medium text-gray-900"
											>Country Code</label
										>
										<div class="mt-2">
											<div
												class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<input
													id="countryCode"
													type="text"
													name="countryCode"
													placeholder="GR"
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
												/>
											</div>
										</div>
									</div>

									<div class="sm:col-span-4">
										<label
											for="state"
											class="block text-sm/6 font-medium text-gray-900"
											>State</label
										>
										<div class="mt-2">
											<div
												class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<!-- <div
														class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
													>
														workcation.com/
													</div> -->
												<input
													id="state"
													type="text"
													name="state"
													placeholder="Attica"
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
												/>
											</div>
										</div>
									</div>

									<div class="sm:col-span-4">
										<label
											for="locality"
											class="block text-sm/6 font-medium text-gray-900"
											>Locality</label
										>
										<div class="mt-2">
											<div
												class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<!-- <div
														class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
													>
														workcation.com/
													</div> -->
												<input
													id="locality"
													type="text"
													name="locality"
													placeholder="Athens"
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
												/>
											</div>
										</div>
									</div>

									<div class="sm:col-span-2">
										<label
											for="validity"
											class="block text-sm/6 font-medium text-gray-900"
											>Validity</label
										>
										<div class="mt-2">
											<div
												class="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<input
													id="validity"
													type="text"
													name="validity"
													placeholder="365"
													pattern="[0-9]*"
													required
													class="block text-end min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
												/>
												<div
													class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
												>
													days
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- ACTIONS -->
							<div
								class="actions flex flex-row-reverse mt-6 items-center gap-x-6"
							>
								<button
									class="inline-flex items-center text-sm font-semibold py-2 px-3 bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white rounded-md"
									>Save</button
								>
								<button
									popovertarget="newCA"
									popovertargetaction="hide"
									class="hover:cursor-pointer">Cancel</button
								>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- {JSON.stringify(json.data.certificates)} -->
{:else}
	<h2
		class="title-size uppercase text-center pb-8 bg-zinc-900 text-zinc-950 font-bold"
	>
		Projects
	</h2>

	<div class="container mx-auto -mt-20">
		<div class="grid grid-cols-4 gap-4">
			<div>
				<Button
					popovertarget="newProjectPopover"
					class="w-60 h-80 rounded-2xl border border-[#59ceaa] text-[#59ceaa] bg-zinc-950 hover:bg-zinc-950 hover:cursor-pointer inline-grid place-content-center"
				>
					<span class="text-2xl">New Project</span>
					<span class="text-2xl">Certificates</span>
				</Button>

				<div
					id="newProjectPopover"
					popover="auto"
					class="shadow border rounded p-4 w-full max-w-lg"
				>
					<h3>New Project</h3>

					<form action="?/createProject" method="POST" class="text-start">
						<div class="space-y-4">
							<div class="border-b border-gray-900/10 pb-8">
								<h2 class="text-base/7 font-semibold text-card-foreground">
									Create project certificates
								</h2>
								<p class="mt-1 text-sm/6 text-muted-foreground">
									This information will be displayed publicly so be careful what
									you share.
								</p>

								<div
									class="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6"
								>
									<div class="sm:col-span-6">
										<label
											for="projectName"
											class="block text-sm/6 font-medium text-card-foreground"
											>Project Name</label
										>
										<div class="mt-2">
											<div
												class="flex items-center rounded-md bg-input pl-3 outline-1 -outline-offset-1 outline-border focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<input
													id="projectName"
													type="text"
													name="projectName"
													placeholder="acme.io"
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm/6"
												/>
											</div>
										</div>
									</div>

									<div class="sm:col-span-6">
										<label
											for="projectName"
											class="block text-sm/6 font-medium text-card-foreground"
											>Domains</label
										>
										{#each domains as _, index (index)}
											<div class="mt-2 flex items-center gap-2">
												<div
													class="flex flex-auto items-center rounded-md bg-input pl-3 outline-1 -outline-offset-1 outline-border focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
												>
													<input
														id="projectName"
														type="text"
														name="domains"
														placeholder="acme.io"
														class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm/6"
													/>
												</div>
												{#if domains.length > 1 && index !== domains.length - 1}
													<button
														type="button"
														onclick={() => removeDomain(index)}>Remove</button
													>
												{/if}
												{#if index === domains.length - 1}
													<Button onclick={() => addDomain()}>Add</Button>
												{/if}
											</div>
										{/each}
									</div>

									<!-- 
		
									<div class="sm:col-span-6">
										<div class="mt-2 flex items-center gap-2">
											<div
												class="flex flex-auto items-center rounded-md bg-input pl-3 outline-1 -outline-offset-1 outline-border focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<input
													id="projectName"
													type="text"
													name="domains"
													placeholder="acme.io"
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm/6"
												/>
											</div>
											<Button>Add</Button>
										</div>
										<div class="px-2 py-4">
											<label>
												<span>Wildcard</span>
												<input type="checkbox" name="isWildcard" />
											</label>
										</div>
									</div> -->

									<div class="sm:col-span-2">
										<label
											for="validity"
											class="block text-sm/6 font-medium text-card-foreground"
											>Validity</label
										>
										<div class="mt-2">
											<div
												class="flex flex-auto items-center rounded-md bg-input pl-3 outline-1 -outline-offset-1 outline-border focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
											>
												<input
													id="validity"
													type="text"
													name="validity"
													placeholder="5"
													pattern="[0-9]*"
													value="1"
													required
													class="block min-w-0 grow py-1.5 pr-3 pl-1 text-end text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm/6"
												/>
												<div
													class="shrink-0 me-4 text-base text-muted-foreground select-none sm:text-sm/6"
												>
													years
												</div>
											</div>
										</div>
									</div>

									<div class="sm:col-span-6">
										<label
											for="localhostToggle"
											class="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-lg border p-3 has-[input:checked]:border-blue-200 has-[input:checked]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
										>
											<div class="grid gap-1.5 font-normal">
												<p class="text-sm font-medium leading-none">
													Enable in "localhost"
												</p>
												<p class="text-muted-foreground text-sm">
													Add localhost domain to the list of allowed domains.
												</p>
											</div>
											<input
												type="checkbox"
												id="localhostToggle"
												name="enableLocalhost"
												class="[:checked]:border-blue-600 [:checked]:bg-blue-600 [:checked]:text-white dark:[:checked]:border-blue-700 dark:[:checked]:accent-blue-700"
											/>
										</label>
									</div>
								</div>
							</div>

							<!-- ACTIONS -->
							<div
								class="actions flex flex-row-reverse mt-6 items-center gap-x-6"
							>
								<button
									class="inline-flex items-center text-sm font-semibold py-2 px-3 bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white rounded-md"
									>Save</button
								>
								<button
									type="reset"
									popovertarget="newProjectPopover"
									popovertargetaction="hide"
									class="hover:cursor-pointer">Cancel</button
								>
							</div>
						</div>
					</form>
				</div>
			</div>

			{#if !page.data.projects.length}
				<div>No projects</div>
			{:else}
				{#each page.data.projects as project}
					<div
						class="relative grid place-items-center border rounded-2xl bg-card text-card-foreground"
					>
					<Button size="icon" variant="outline" aria-label="Download your project certificates" title="Download your project certificates" class="absolute top-2 right-2" href="/download/{project._id}">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
					</Button>
						<div>
							{project.options.projectName}

							{#if project.options.isWildcard}
								<div class="text-xs text-muted-foreground">Wildcard</div>
							{/if}

							{#if project.options.enableLocalhost}
								<div class="text-xs text-muted-foreground">Localhost</div>
							{/if}

							<div class="text-xs text-muted-foreground">
								{project.options.validity} days
							</div>
							<div>
								<ul>
									{#each project.options.domains as domain}
										<li>
											<a target="_blank" href="https://{domain}">{domain}</a>
											<a href={createURL(domain)}>Add Entry</a>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="preContainer container mx-auto">
		<pre>{JSON.stringify(page.data.session?.user, null, 2)}</pre>
	</div>
	<div class="preContainer container mx-auto">
		<pre>{JSON.stringify(page.data.rootCA, null, 2)}</pre>
	</div>
	<div class="preContainer container mx-auto">
		<pre>{JSON.stringify(page.data.projects, null, 2)}</pre>
	</div>
{/if}

<style>
	h2.title-size {
		font-size: clamp(4rem, 18vw, 16rem);
	}
	.preContainer {
		background-color: light-dark(#fff, #181818);
		padding: 1rem;
		border-radius: 16px;
		margin-top: 1rem;

		pre {
			overflow-x: auto;
		}
	}
	[popover] {
		margin: 10em auto;

		&::backdrop {
			background-color: rgba(0 0 0 / 0.7);
			backdrop-filter: blur(16px);
		}
	}

	label[for="localhostToggle"] {
		&:has(> input:checked) {
			border-color: light-dark(var(--color-blue-200), var(--color-blue-900));
			background-color: light-dark(
				var(--color-blue-100),
				var(--color-blue-950)
			);
		}
	}
</style>
