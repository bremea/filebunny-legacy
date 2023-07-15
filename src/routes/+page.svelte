<script>
	import { dataFileExists, readDataFile } from '$lib/commands/userdata';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/input/button.svelte';
	import Textinput from '$lib/components/input/textinput.svelte';

	async function init() {
		const exists = await dataFileExists();
		if (exists) {
			await readDataFile();
			goto('/dashboard/links');
		} else {
			goto('/setup');
		}
	}

	init();
</script>

<div class="w-full h-screen flex flex-col">
	<div class="w-full flex-grow text-center flex flex-col items-center justify-center space-y-5">
		<h1 class="text-aquamarine">filebunny.io</h1>
		<h2>Loading...</h2>
	</div>
	<p class="text-center text-outer-space text-sm">ALPHA_1</p>
</div>
