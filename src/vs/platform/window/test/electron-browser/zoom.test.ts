/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import assert from 'assert';
import { getZoomLevel, getZoomStep } from '../../../../base/browser/browser.js';
import { applyZoom, applyZoomStep, zoomIn, zoomOut } from '../../electron-browser/window.js';
import { ensureNoDisposablesAreLeakedInTestSuite } from '../../../../base/test/common/utils.js';
import { mainWindow } from '../../../../base/browser/window.js';

suite('Zoom Level and Zoom Step', () => {
	ensureNoDisposablesAreLeakedInTestSuite();

	test('Base Zoom Level', () => {
		applyZoom(0, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		applyZoom(-0, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		applyZoom(1, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 1);

		applyZoom(-1, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -1);

		applyZoom(4, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 4);

		applyZoom(-4, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -4);

		applyZoom(8, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 8);

		applyZoom(-10, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -8);

		applyZoom(4.1, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 4.1);

		applyZoom(-4.1, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -4.1);

		applyZoom(Infinity, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 8);

		applyZoom(Number.NEGATIVE_INFINITY, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -8);
	});

	test('Zoom Step', () => {
		// Default Zoom Step
		applyZoomStep(1, mainWindow);
		assert.strictEqual(getZoomStep(mainWindow), 1);

		applyZoom(0, mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 1);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -1);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		// Zoom Step Doubled
		applyZoomStep(2, mainWindow);
		assert.strictEqual(getZoomStep(mainWindow), 2);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 2);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -2);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		// Zoom Step Halved
		applyZoomStep(0.5, mainWindow);
		assert.strictEqual(getZoomStep(mainWindow), 0.5);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0.5);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -0.5);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		// Zoom Step Lower Bound
		applyZoomStep(0.1, mainWindow);
		assert.strictEqual(getZoomStep(mainWindow), 0.1);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0.1);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -0.1);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		// Zoom Step Higher Bound
		applyZoomStep(8, mainWindow);
		assert.strictEqual(getZoomStep(mainWindow), 8);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 8);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -8);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 0);

		// Zoom Level Bounds with Zoom Step
		applyZoomStep(7, mainWindow);
		assert.strictEqual(getZoomStep(mainWindow), 7);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 7);

		zoomIn(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 8);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), 1);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -6);

		zoomOut(mainWindow);
		assert.strictEqual(getZoomLevel(mainWindow), -8);

		applyZoom(0, mainWindow); // reset the zoom level
		applyZoomStep(1, mainWindow); // reset the zoom step
	});

});
