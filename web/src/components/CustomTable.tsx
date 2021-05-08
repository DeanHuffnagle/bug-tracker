import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import {
	Column,
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from 'react-table';
import { GlobalFilter } from './GlobalFilter';

type CustomTableProps = {
	dataInput: any[];
	columnInput: any[];
	userInput?: any;
	pageSizeInput?: number;
	dependencyInput?: string[];
};

export const CustomTable: React.FC<CustomTableProps> = ({
	dataInput,
	columnInput,
	userInput,
	pageSizeInput,
	dependencyInput,
}) => {
	const meData = userInput ? userInput : null;
	const isData = dataInput ? dataInput : [{}];
	const size = pageSizeInput ? pageSizeInput : 10;

	const columns = useMemo<Column<object>[]>(() => columnInput, []);

	const data = dependencyInput
		? useMemo(() => isData, [isData, dependencyInput])
		: useMemo(() => isData, [isData]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
		prepareRow,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageSize: size },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;

	if (!isData) {
		return <>no data</>;
	} else {
		return (
			<>
				<Box mt={1} mx={1}>
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
				</Box>

				<Box mx={1}>
					<Table
						{...getTableProps()}
						striped
						bordered
						hover
						responsive
						variant="light"
					>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											{column.render('Header')}
											<span>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<ChevronDownIcon w={5} h={5} />
													) : (
														<ChevronUpIcon w={5} h={5} />
													)
												) : (
													''
												)}
											</span>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => {
											return (
												<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Box>
				<Flex flex={1} justifyContent="center">
					<Box my="auto" mr={1}>
						Page{' '}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{' '}
					</Box>
					<Box ml={1} mb={1}>
						<Button
							size="xs"
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
						>
							{'<<'}
						</Button>
					</Box>
					<Box mx={1} mb={1}>
						<Button
							size="xs"
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
						>
							Previous
						</Button>
					</Box>
					<Box mr={1} mb={1}>
						<Button
							size="xs"
							onClick={() => nextPage()}
							disabled={!canNextPage}
						>
							Next
						</Button>
					</Box>
					<Box mr={1} mb={1}>
						<Button
							size="xs"
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
						>
							{'>>'}
						</Button>
					</Box>
				</Flex>
			</>
		);
	}
};
