<script lang="ts">
	import { goto } from '$app/navigation';
	import { getLinks, deleteLink, type LinkData } from '$lib/commands/links';
	import { prefs } from '$lib/commands/userdata';
	import Button from '$lib/components/input/button.svelte';
	import Error from '$lib/components/input/error.svelte';
	import { getDateCountdown, mbToString } from '$lib/utils/conversions';
	import { PlusCircle, Trash2, Clipboard } from 'lucide-svelte';

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

	async function removeLink(i: number) {
		let id = links[i].id;
		links.splice(i, 1);
		links = links;
		const linkDeleteResult = await deleteLink(id);

		if (linkDeleteResult && 'error' in linkDeleteResult) {
			hasError = true;
			errorMsg = linkDeleteResult.message;
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
	<thead
		><tr>
			<th>url</th>
			<th>expires</th>
			<th>uses</th>
			<th>max size</th>
			<th>actions</th>
		</tr>
	</thead>
	<tbody>
		{#each links as link, i}
			<tr>
				<td class="py-2">
					<a href={link.url} class="text-aquamarine underline cursor-pointer">
						{link.url}
					</a>
				</td>
				<td class="py-2">{getDateCountdown(link.expires)}</td>
				<td class="py-2">0/{link.max_usage}</td>
				<td class="py-2">{mbToString(link.max_size)}</td>
				<td class="flex justify-end py-2">
					<Clipboard size={24} class="text-aquamarine" />
					<button on:click={() => removeLink(i)}>
						<Trash2 size={24} class="text-bright-pink" />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<div class="flex justify-center flex-col items-center">
	{#if isLoading}
		<p>Loading...</p>
	{:else}
		{#if links.length == 0}
			<p class="mb-8">Nothing here!</p>
		{/if}
		<Button center class="w-64" onClick={() => goto('links/new')}>
			<PlusCircle class="mr-2 text-aquamarine" />
			New Link
		</Button>
	{/if}
</div>
