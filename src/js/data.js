/******************************************************************************
 *
 * Copyright (c) 2020, the Regular Table Authors.
 *
 * This file is part of the Regular Table library, distributed under the terms
 * of the Apache License 2.0.  The full license can be found in the LICENSE
 * file.
 *
 */

import Papa from "papaparse";

export class DataModel {
    to_columns(idx_2d) {
        return this.get_data_slice(idx_2d);
    }

    // eslint-disable-next-line no-unused-vars
    get_data_slice({start_row, end_row, start_col, end_col}) {
        throw new TypeError("Must override method");
    }
}

export class CsvDataModel extends DataModel {
    constructor(csv, opt = {}) {
        super();
        this.cols = [];

        const {data} = Papa.parse(csv, opt);
        const paths = data.shift();
        for (let i = 0; i < paths.length; i++) {
            const val = [];
            for (let j = 0; j < data.length; j++) {
                val.push(data[i][j]);
            }

            this.cols.push({
                cidx: i,
                paths: paths[i],
                val,
            });
        }
    }

    get_data_slice({start_row, end_row, start_col, end_col}) {
        const cols = [];

        for (let i = start_col; i < end_col; i++) {
            cols.push({
                cidx: this.cols[i].cidx,
                paths: this.cols[i].paths,
                val: this.cols[i].val.slice(start_row, end_row),
            });
        }

        return cols;
    }
}
