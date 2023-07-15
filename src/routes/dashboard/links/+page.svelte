<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLinks, type LinkData } from '$lib/commands/links';
	import { prefs } from '$lib/commands/userdata';
	import Button from '$lib/components/input/button.svelte';
	import Error from '$lib/components/input/error.svelte';
	import { PlusCircle } from 'lucide-svelte';

	let links: LinkData[] = [];
	let isLoading = true;
	let hasError = false;
	let errorMsg: string;

	async function loadLinks() {
		isLoading = true;
		const linkData = await getLinks();
		isLoading = false;

		if ('error' in linkData) {
			hasError = true;
			errorMsg = linkData.message;
		} else {
			links = linkData.links;
		}
	}

	loadLinks();
</script>

<div>
	<h1>Hi, {$prefs.name}</h1>
	<p class="mt-3">You have {links.length} active upload link{links.length == 1 ? '' : 's'}.</p>
</div>

<div class="flex justify-center">
	<Error center show={hasError}>
		{errorMsg}
	</Error>
</div>

<table class="my-8 w-full">
	<tr>
		<th>url</th>
		<th>expires</th>
		<th>max uses</th>
		<th>max size</th>
		<th>actions</th>
	</tr>
</table>

<div class="flex justify-center">
	{#if isLoading}
		<p>Loading...</p>
	{:else}
		<Button center class="w-64" onClick={() => goto('links/new')}>
			<PlusCircle class="mr-2 text-aquamarine" />
			New Link
		</Button>
	{/if}
</div>
