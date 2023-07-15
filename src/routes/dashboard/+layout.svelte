<script>
	import { prefs } from '$lib/commands/userdata';
	import { goto } from '$app/navigation';
	import Navitem from '$lib/components/nav/navitem.svelte';
	import Powerbutton from '$lib/components/nav/powerbutton.svelte';
	import { page } from '$app/stores';

    let currentPage = $page.url.pathname.split('/')[2];

	if (!$prefs.name) {
		goto('/');
	}
</script>

<div class="flex w-full h-screen">
	<div class="bg-jet w-16 flex flex-col h-full shadow-lg">
		<Navitem item={0} active={currentPage == 'links'} />
		<Navitem item={1} active={currentPage == 'files'} />
		<Navitem item={2} active={currentPage == 'cloud'} />
		<Navitem item={3} active={currentPage == 'settings'} />
		<div class="flex-grow" />
		<Powerbutton active />
	</div>
	<div class="m-4 w-full">
		<slot />
	</div>
</div>
