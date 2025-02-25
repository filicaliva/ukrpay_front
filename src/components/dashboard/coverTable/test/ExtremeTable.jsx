import React, { useState } from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import {
    generateRows,
    defaultColumnValues,
} from '../../../demo-data/generator';

const getRowId = row => row.id;

export default () => {
    const [columns] = useState([
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
    ]);
    const [rows, setRows] = useState(generateRows({
        columnValues: { id: ({ index }) => index, ...defaultColumnValues },
        length: 8,
    }));
    const [tableColumnExtensions] = useState([
        { columnName: 'id', width: 60 },
    ]);
    const [editingRowIds, setEditingRowIds] = useState([]);
    const [addedRows, setAddedRows] = useState([]);
    const [rowChanges, setRowChanges] = useState({});

    const changeAddedRows = (value) => {
        const initialized = value.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
        setAddedRows(initialized);
    };

    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
            const deletedSet = new Set(deleted);
            changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };

    return (
        <div className="card">
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            >
                <EditingState
                    editingRowIds={editingRowIds}
                    onEditingRowIdsChange={setEditingRowIds}
                    rowChanges={rowChanges}
                    onRowChangesChange={setRowChanges}
                    addedRows={addedRows}
                    onAddedRowsChange={changeAddedRows}
                    onCommitChanges={commitChanges}
                />
                <Table
                    columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow />
                <TableEditRow />
                <TableEditColumn
                    showAddCommand={!addedRows.length}
                    showEditCommand
                    showDeleteCommand
                />
            </Grid>
        </div>
    );
};
