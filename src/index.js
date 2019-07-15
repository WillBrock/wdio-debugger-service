export default class DebuggerService {
	constructor() {
		this.command_selector = null;
		this.wdio_class       = `.wdio-hidden-element`;
	}

	beforeCommand(command, args) {
		if(!this.checkCommands.includes(command)) {
			return;
		}

		this.command_selector = this.validSelector(args[0]) ? args[0] : this.command_selector;

		if(this.command_selector) {
			const state = this.getAttribute(`data-state`);

			if(state === `paused`) {
				this.setStyle(`border`, `3px solid #FF8C00`);
			}
		}

		browser.waitUntil(() => {
			if(!this.validSelector(this.wdio_class)) {
				return true;
			}

			const state = this.getAttribute(`data-state`);
			const next  = this.getAttribute(`data-next`);

			return state === `playing` || next;
		});

		this.removeAttribute(`data-next`);

		if(this.command_selector) {
			const state = this.getAttribute(`data-state`);

			if(state === `paused`) {
				this.setStyle(`border`, `none`);
			}
		}
	}

	validSelector(selector) {
		return browser.execute((selector) => {
			try {
				return document.querySelector(selector) || false;
			}
			catch(e) {
				return false;
			}
		}, selector);
	}

	getAttribute(attribute) {
		return browser.execute((selector, attribute) => {
			return document.querySelector(selector).getAttribute(attribute);
		}, this.wdio_class, attribute)
	}

	removeAttribute(attribute) {
		return browser.execute((selector, attribute) => {
			return document.querySelector(selector).removeAttribute(attribute);
		}, this.wdio_class, attribute);
	}

	setStyle(attribute, value) {
		browser.execute((selector, attribute, value) => {
			document.querySelector(selector).style[attribute] = value;
		}, this.command_selector, attribute, value)
	}

	get checkCommands() {
		return [
			`click`,
			`url`,
			`$`,
			`addValue`,
			`setValue`,
		];
	}
}
