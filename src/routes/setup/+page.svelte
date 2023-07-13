<script>
	import { goto } from '$app/navigation';
	import { newSession } from '$lib/commands/session';
	import { writeDataFile } from '$lib/commands/userdata';
	import Button from '$lib/components/input/button.svelte';
	import Textinput from '$lib/components/input/textinput.svelte';

	let name = '';

	async function setName() {
		const sessionData = await newSession();

		await writeDataFile({ name: name, session: sessionData });
		goto('/');
	}
</script>

<div class="w-full h-screen flex flex-col">
	<div class="w-full flex-grow text-center flex flex-col items-center justify-center space-y-5">
		<h1 class="text-aquamarine">filebunny.io</h1>
		<h2>Welcome! What's your name?</h2>
		<div class="w-25 space-y-5">
			<Textinput placeholder="Your Name" bind:value={name} />
			<Button onClick={setName}>Get Started</Button>
		</div>
	</div>
	<p class="text-center text-outer-space text-sm">ALPHA_1</p>
</div>
