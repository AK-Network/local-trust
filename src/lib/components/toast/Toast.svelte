<script module lang="ts">
	import Button, { buttonVariants } from "../ui/button/button.svelte";
	
	export type ToastOptions = {
		type?: "success" | "error"
		position?: "top" | "bottom"
		duration?: number
	}

	let toastEl = $state<HTMLDivElement|null|undefined>()

	let toastObject = $state<{message: string, type?: string}>({message: 'This is my fist toast notification.'})

	export const toast = (message: string, options?: ToastOptions) => {

		toastEl?.showPopover()

		toastObject.type = options?.type ?? 'success'
		toastObject.message = message

		setTimeout(() => {
			toastEl?.hidePopover()
		}, options?.duration ?? 5000)
	}

	const dismiss = () => {
		toastEl?.hidePopover()
	}
</script>



<div bind:this={toastEl} id="toast" popover="manual">
	{#if toastObject.type === 'success'}
		 <!-- content here -->
	{/if}


	{#if toastObject.type === 'error'}
		 <!-- content here -->
	{/if}

	<span>{toastObject.message}</span>

	<div class="actions">
		<Button onclick={dismiss} class={buttonVariants({ variant: "destructive", size: "sm"})}>Dismiss</Button>
	</div>
</div>

<style>

	#toast {
	

		align-items: center;
		gap: 2rem;
		background-color: light-dark(#fff, #292929) ;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: .5rem .5rem .5rem 1rem;
		margin: auto auto 2rem auto;
		transition: all allow-discrete;

		&:popover-open {
			display: inline flex;
		}
	}
</style>