/******************************************************************************
 *
 * Copyright (c) 2020, the Regular Table Authors.
 *
 * This file is part of the Regular Table library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */

describe("two_billion_rows.html Scroll Overflow", () => {
    beforeAll(async () => {
        await page.setViewport({width: 200, height: 100});
    });

    describe("scrolls down beyond bottom threshold", () => {
        beforeAll(async () => {
            await page.goto("http://localhost:8081/examples/two_billion_rows.html");
            const table = await page.$("regular-table");
            await page.evaluate(async (table) => {
                table.scrollTop = table.scrollHeight + 100000;
                await table.draw();
            }, table);
        });

        test("with the correct # of rows", async () => {
            const tbody = await page.$("regular-table tbody");
            const num_rows = await page.evaluate((tbody) => tbody.children.length, tbody);
            expect(num_rows).toEqual(5);
        });

        test("with the correct # of columns", async () => {
            const first_tr = await page.$("regular-table tbody tr:first-child");
            const num_cells = await page.evaluate((first_tr) => first_tr.children.length, first_tr);
            expect(num_cells).toEqual(3);
        });

        test("with the first row's cell test correct", async () => {
            const first_tr = await page.$("regular-table tbody tr:first-child");
            const cell_values = await page.evaluate((first_tr) => Array.from(first_tr.children).map((x) => x.textContent), first_tr);
            expect(cell_values).toEqual(["1,999,999,997", "1,999,999,998", "1,999,999,999"]);
        });
    });

    describe("scrolls rights beyond right border threshold", () => {
        beforeAll(async () => {
            await page.goto("http://localhost:8081/examples/two_billion_rows.html");
            const table = await page.$("regular-table");
            await page.evaluate(async (table) => {
                table.scrollLeft = table.scrollWidth + 100000;
                await table.draw();
            }, table);
        });

        test("with the correct # of rows", async () => {
            const tbody = await page.$("regular-table tbody");
            const num_rows = await page.evaluate((tbody) => tbody.children.length, tbody);
            expect(num_rows).toEqual(5);
        });

        test("with the correct # of columns", async () => {
            const first_tr = await page.$("regular-table tbody tr:first-child");
            const num_cells = await page.evaluate((first_tr) => first_tr.children.length, first_tr);
            expect(num_cells).toEqual(2);
        });

        test("with the first row's cell test correct", async () => {
            const first_tr = await page.$("regular-table tbody tr:first-child");
            const cell_values = await page.evaluate((first_tr) => Array.from(first_tr.children).map((x) => x.textContent), first_tr);
            expect(cell_values).toEqual(["998", "999"]);
        });
    });
});
