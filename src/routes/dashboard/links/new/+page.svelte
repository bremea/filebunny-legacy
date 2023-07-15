<script lang="ts">
	import { goto } from '$app/navigation';
	import { newLink } from '$lib/commands/links';
	import Button from '$lib/components/input/button.svelte';
	import Dropdowninput from '$lib/components/input/dropdowninput.svelte';
	import Error from '$lib/components/input/error.svelte';
	import Numberinput from '$lib/components/input/numberinput.svelte';
	import Sliderinput from '$lib/components/input/sliderinput.svelte';
	import Popoutheader from '$lib/components/nav/popoutheader.svelte';

	let isLoading = false;
	let hasError = false;
	let errorMsg: string;

	let backLocation = '/dashboard/links';

	let maxFileSize = 1000;
	let actualMaxFileSize = maxFileSize;
	let maxUse = 1;
	let expires = 2;
	let sliderText = '';
	let expireOptions = ['30 minutes', '1 hour', '3 hours', '6 hours', '12 hours', '1 day', '7 days'];
	let expireOptionsAsSeconds = [1800, 3600, 10800, 21600, 43200, 86400, 604800];

	updateSliderText();

	async function makeLink() {
		let expiresTimestamp = Math.floor((new Date()).getTime() / 1000);
		expiresTimestamp += expireOptionsAsSeconds[expires];

		isLoading = true;
		const linkData = await newLink(expiresTimestamp, maxUse, actualMaxFileSize);
		isLoading = false;

		if ('error' in linkData) {
			hasError = true;
			errorMsg = linkData.message;
		} else {
			goto(backLocation);
		}
	}

	function updateSliderText() {
		if (maxFileSize < 1000) {
			let suffix = 'MB';
			actualMaxFileSize = maxFileSize;
			sliderText = maxFileSize + ` ${suffix}`;
		} else {
			let suffix = 'GB';
			actualMaxFileSize = Math.round(((maxFileSize - 990) / 1000) * 100000);
			sliderText = parseFloat((actualMaxFileSize / 1000).toFixed(2)) + ` ${suffix}`;
		}
	}
</script>

<Popoutheader {backLocation}>New Link</Popoutheader>

<div class="w-72 mt-8 space-y-4">
	<Error show={hasError}>{errorMsg}</Error>
	<Dropdowninput bind:value={expires} id="newLinkExpire" options={expireOptions}
		>Expire After</Dropdowninput
	>
	<Numberinput bind:value={maxUse} id="newLinkMaxUse" max={1000} min={0}
		>Max Number of Uses</Numberinput
	>
	<Sliderinput
		bind:value={maxFileSize}
		id="newLinkMaxUse"
		{sliderText}
		max={2000}
		min={1}
		onInput={updateSliderText}>Max Accepted File Size</Sliderinput
	>
	<br />
	<Button disabled={isLoading} center onClick={makeLink}
		>{#if isLoading}
			Working...
		{:else}
			Create Link
		{/if}
	</Button>
</div>
