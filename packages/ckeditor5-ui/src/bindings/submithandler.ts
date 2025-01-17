/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import type View from '../view';

/**
 * @module ui/bindings/submithandler
 */

/**
 * A handler useful for {@link module:ui/view~View views} working as HTML forms. It intercepts a native DOM
 * `submit` event, prevents the default web browser behavior (navigation and page reload) and
 * fires the `submit` event on a view instead. Such a custom event can be then used by any
 * {@link module:utils/dom/emittermixin~Emitter emitter}, e.g. to serialize the form data.
 *
 *		import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
 *
 *		// ...
 *
 *		class AnyFormView extends View {
 *			constructor() {
 *				super();
 *
 *				// ...
 *
 *				submitHandler( {
 *					view: this
 *				} );
 *			}
 *		}
 *
 *		// ...
 *
 *		const view = new AnyFormView();
 *
 *		// A sample listener attached by an emitter working with the view.
 *		this.listenTo( view, 'submit', () => {
 *			saveTheFormData();
 *			hideTheForm();
 *		} );
 *
 * @param {Object} [options] Configuration options.
 * @param {module:ui/view~View} options.view The view which DOM `submit` events should be handled.
 */
export default function submitHandler( { view }: { view: View } ): void {
	view.listenTo( view.element!, 'submit', ( evt, domEvt ) => {
		domEvt.preventDefault();
		view.fire<SubmitEvent>( 'submit' );
	}, { useCapture: true } );
}

export type SubmitEvent = {
	name: 'submit';
	args: [];
};
