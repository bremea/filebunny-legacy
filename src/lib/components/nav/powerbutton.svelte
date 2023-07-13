<script lang="ts">
	import { Power } from 'lucide-svelte';

	export let active: boolean = false;
</script>

<button
	class="group focus:ring-white focus:ring-4 cursor-pointer w-16 h-16 flex items-center justify-center"
>
	<Power
		size={36}
		class={`${active ? 'text-aquamarine aquaGlow' : 'text-gray-400'} group-hover:text-ruddy-blue group-focus:text-ruddy-blue transition-all`}
	/>
</button>
