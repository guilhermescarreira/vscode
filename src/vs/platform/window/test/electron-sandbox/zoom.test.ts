/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { getZoomLevel, getZoomStep } from '../../../../base/browser/browser.js';
import { applyZoom, applyZoomStep, zoomIn, zoomOut } from '../../electron-sandbox/window.js';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../base/test/common/utils.js';

suite('Zoom Level and Zoom Step', () => {
	ensureNoDisposablesAreLeakedInTestSuite();

	const window = { vscodeWindowId: 1 } as unknown as Window;

	test('Base Zoom Level', () => {
		applyZoom(0, window);
		assert.strictEqual(getZoomLevel(window), 0);

		applyZoom(-0, window);
		assert.strictEqual(getZoomLevel(window), 0);

		applyZoom(1, window);
		assert.strictEqual(getZoomLevel(window), 1);

		applyZoom(-1, window);
		assert.strictEqual(getZoomLevel(window), -1);

		applyZoom(4, window);
		assert.strictEqual(getZoomLevel(window), 4);

		applyZoom(-4, window);
		assert.strictEqual(getZoomLevel(window), -4);

		applyZoom(8, window);
		assert.strictEqual(getZoomLevel(window), 8);

		applyZoom(-10, window);
		assert.strictEqual(getZoomLevel(window), -8);

		applyZoom(4.1, window);
		assert.strictEqual(getZoomLevel(window), 4.1);

		applyZoom(-4.1, window);
		assert.strictEqual(getZoomLevel(window), -4.1);

		applyZoom(Infinity, window);
		assert.strictEqual(getZoomLevel(window), 8);

		applyZoom(Number.NEGATIVE_INFINITY, window);
		assert.strictEqual(getZoomLevel(window), -8);
	});

	test('Zoom Step', () => {
		// Default Zoom Step
		applyZoomStep(1, window);
		assert.strictEqual(getZoomStep(window), 1);

		applyZoom(0, window);
		assert.strictEqual(getZoomLevel(window), 0);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 1);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), 0);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), -1);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 0);

		// Zoom Step Doubled
		applyZoomStep(2, window);
		assert.strictEqual(getZoomStep(window), 2);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 2);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), 0);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), -2);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 0);

		// Zoom Step Halved
		applyZoomStep(0.5, window);
		assert.strictEqual(getZoomStep(window), 0.5);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 0.5);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), 0);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), -0.5);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 0);

		// Zoom Step Lower Bound
		applyZoomStep(0.1, window);
		assert.strictEqual(getZoomStep(window), 0.1);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 0.1);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), 0);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), -0.1);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 0);

		// Zoom Step Higher Bound
		applyZoomStep(8, window);
		assert.strictEqual(getZoomStep(window), 8);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 8);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), 0);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), -8);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 0);

		// Zoom Level Bounds with Zoom Step
		applyZoomStep(7, window);
		assert.strictEqual(getZoomStep(window), 7);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 7);

		zoomIn(window);
		assert.strictEqual(getZoomLevel(window), 8);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), 1);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), -6);

		zoomOut(window);
		assert.strictEqual(getZoomLevel(window), -8);

		applyZoom(0, window); // reset the zoom level
		applyZoomStep(1, window); // reset the zoom step
	});

});
