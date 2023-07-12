<script>
	export let value = '';
	export let placeholder = '';
</script>

<input
	class="w-full px-3 py-1 rounded-full bg-transparent border-2 border-outer-space focus:border-aquamarine focus:bg-outer-space hover:bg-outer-space transition-all"
	bind:value
	{placeholder}
/>
