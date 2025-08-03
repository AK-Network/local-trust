<script lang="ts">


let { data } = $props()

</script>


<h1>Dashboard</h1>



{#await data.getCertificates}
	<!-- promise is pending -->
	<div class="container mx-auto px-4 py-12 ">
		<div class="text-center">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" class="mx-auto size-12">
				<path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
			<h3 class="text-sm font-semibold">No Projects</h3>
			<p class="text-stone-600 text-sm mt-1">Get started by creating a new project.</p>
			<div class="mt-6">
				<button class="inline-flex items-center text-sm font-semibold py-2 px-3 bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white rounded-md">
					<svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 -ml-0.5 mr-1.5">
						<path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
					</svg>
					<span>New Project</span>
				</button>
			</div>
		</div>
	</div>
{:then json}



	<!-- promise was fulfilled -->
	 {JSON.stringify(json.data.certificates)}
{/await}





