<script>
	import { prefs } from '$lib/commands/userdata';
	import { goto } from '$app/navigation';
	import { DownloadCloud, FileDown, Link, Power, Wrench } from 'lucide-svelte';
	import Navitem from '$lib/components/nav/navitem.svelte';
	import Powerbutton from '$lib/components/nav/powerbutton.svelte';

	if (!$prefs.name) {
		goto('/');
	}
</script>

<div class="flex w-full h-screen">
	<div class="bg-jet w-16 flex flex-col h-full shadow-lg">
		<Navitem item={0} />
		<Navitem item={1} />
		<Navitem item={2} />
		<Navitem item={3} />
		<div class="flex-grow" />
		<Powerbutton active />
	</div>
	<div class="m-4">
		<slot />
	</div>
</div>
