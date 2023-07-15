<script>
	import Button from '$lib/components/input/button.svelte';
	import Numberinput from '$lib/components/input/numberinput.svelte';
	import Popoutheader from '$lib/components/nav/popoutheader.svelte';
	import { PlusCircle } from 'lucide-svelte';

	async function makeLink() {}
</script>

<Popoutheader backLocation="/dashboard/links">New Link</Popoutheader>

<div class="w-64 mt-8 space-y-4">
	<Numberinput id="newLinkExpire" max={1000} min={0} value={1}>Expire After</Numberinput>
	<Numberinput id="newLinkMaxUse" max={1000} min={0} value={1}>Max Number of Uses</Numberinput>
	<Numberinput id="newLinkMaxUse" max={1000} min={0} value={1}>Max Accepted File Size</Numberinput>
	<br />
	<Button center onClick={makeLink}>Create Link</Button>
</div>
