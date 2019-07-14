export default class DebuggerService {
	beforeCommand(command, args) {
		const wdio_class = `.wdio-hidden-element`;
		const dollar     = command === `$`;
		const selector   = args[0];

		const check_commands = [
			`click`,
			`url`,
			`$`,
			`value`,
		];

		if(!check_commands.includes(command)) {
			return;
		}

		if(dollar && selector) {
			browser.execute((selector, wdio_class) => {
				const state = document.querySelector(wdio_class).getAttribute(`data-state`);

				if(state === `paused`) {
					document.querySelector(selector).style.border = `3px solid #FF8C00`;
				}
			}, selector, wdio_class);
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

		browser.execute((wdio_class) => {
			document.querySelector(wdio_class).removeAttribute(`data-next`);
		}, wdio_class);

		if(dollar && selector) {
			browser.execute((selector, wdio_class) => {
				const state = document.querySelector(wdio_class).getAttribute(`data-state`);

				if(state === `paused`) {
					document.querySelector(selector).style.border = `none`;
				}
			}, selector, wdio_class);
		}
	}
}
