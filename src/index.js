export default class DebuggerService {
	beforeCommand(command) {
		const wdio_class = `.wdio-hidden-element`;

		const check_commands = [
			`click`,
			`url`,
			`$`,
			`value`,
		];

		if(!check_commands.includes(command)) {
			return;
		}

		browser.waitUntil(() => {
			const exists = browser.execute((wdio_class) => {
				return document.querySelector(wdio_class) !== null;
			}, wdio_class);

			if(!exists) {
				return true;
			}

			const state = browser.execute((wdio_class) => {
				return document.querySelector(wdio_class).getAttribute(`data-state`);
			}, wdio_class);

			const next = browser.execute((wdio_class) => {
				return document.querySelector(wdio_class).getAttribute(`data-next`);
			}, wdio_class);

			return state === `playing` || next;
		});

		document.querySelector(wdio_class).removeAttribute(`data-next`);
	}
}
