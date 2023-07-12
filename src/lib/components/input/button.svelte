<script>
	export let onClick = () => {};
</script>

<button
	class="cursor-pointer w-full px-3 py-1 rounded-full bg-transparent border-2 border-outer-space focus:border-aquamarine focus:bg-outer-space hover:bg-outer-space transition-all active:scale-95"
	on:click={onClick}
>
	<slot />
</button>
