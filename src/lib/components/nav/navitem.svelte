<script lang="ts">
	import { DownloadCloud, FileDown, Link, Wrench } from 'lucide-svelte';

	export let item: number;
	export let active: boolean = false;

	const elements = [Link, FileDown, DownloadCloud, Wrench];
	const colors = ['bg-aquamarine', 'bg-ruddy-blue', 'bg-ultra-violet', 'bg-bright-pink'];
</script>

<button
	class="group focus:ring-white focus:ring-4 cursor-pointer pr-2 w-16 h-16 flex items-center justify-center relative transition-all"
>
	<svelte:component
		this={elements[item]}
		size={36}
		class={`group-focus:text-black group-hover:text-black group-active:text-black ${active ? 'text-black' : 'text-white'} z-10 transition-all`}
	/>
	<div
		class={`${colors[item]} h-full  ${active ? 'w-full' : 'w-2'} group-focus:w-full group-hover:w-full group-active:w-full absolute right-0 transition-all`}
	/>
</button>
