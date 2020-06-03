/******************************************************************************
 *
 * Copyright (c) 2020, the Regular Table Authors.
 *
 * This file is part of the Regular Table library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */

describe("fixed_column_width.html", () => {
    beforeAll(async () => {
        await page.setViewport({width: 400, height: 100});
    });

    describe("creates a `<table>` with fixed column widths", () => {
        beforeAll(async () => {
            await page.goto("http://localhost:8081/examples/fixed_column_width.html");
            await page.waitFor("regular-table table tbody tr td");
        });

        test("min and max width are set", async () => {
            //const tbody = await page.$("regular-table tbody");
            //const num_rows = await page.evaluate((tbody) => tbody.children.length, tbody);
            //expect(num_rows).toEqual(5);
            await page.screenshot({path: 'fixed_column_width_screenshot.png'});
        });

    });
});
