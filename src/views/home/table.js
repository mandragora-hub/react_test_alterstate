import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import useClient from 'src/utils/api-client';
import { usePaginatedQuery } from 'react-query';
import Searches from './searches';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'login', numeric: false, label: 'Login' },
  { id: 'id', numeric: true, label: 'ID' },
  { id: 'type', numeric: false, label: 'Type' },
  { id: 'node_id', numeric: false, label: 'Node ID' },
  { id: 'site_admin', numeric: false, label: 'Site Admin' },
  { id: 'score', numeric: true, label: 'Score' }
];

const EnhancedTableHead = props => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    columnGap: theme.spacing(2)
  }
}));

const EnhancedTable = ({ className }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const client = useClient();
  const [pagination, setPagination] = useState({
    query: 'mandragora',
    orderBy: 'login',
    order: 'asc',
    page: 1,
    rowsPerPage: 5
  });
  const fetch = pagination =>
    client(
      `search/users?q=${pagination.query}&page=${pagination.page}&per_page=${pagination.rowsPerPage}&order=${pagination.order}&sort=${pagination.orderBy}`
    );
  const { resolvedData: users } = usePaginatedQuery(
    ['search', 'users', pagination],
    () => fetch(pagination)
  );

  const handleQueryChange = event => {
    setPagination({ ...pagination, query: event.target.value });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = pagination.orderBy === property && pagination.order === 'asc';
    setPagination({
      ...pagination,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    });
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleChangeRowsPerPage = event => {
    setPagination({
      ...pagination,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  //   const emptyRows =
  //     pagination.rowsPerPage -
  //     Math.min(
  //       pagination.rowsPerPage,
  //       users.count - pagination.page * pagination.rowsPerPage
  //     );

  if (!users) return <></>;

  return (
    <Paper className={clsx(className, classes.root)}>
      <Typography variant="h4">Github`s users</Typography>
      <Searches
        query={pagination.query}
        onChangeQuery={handleQueryChange} />
      <TableContainer>
        <Table className={classes.table}>
          <EnhancedTableHead
            classes={classes}
            order={pagination.order}
            orderBy={pagination.orderBy}
            onRequestSort={handleRequestSort}
            rowCount={users.total_count}
          />
          <TableBody>
            {stableSort(
              users.items,
              getComparator(pagination.order, pagination.orderBy)
            ).map((row, index) => {
              return (
                <TableRow
                  key={index}
                  hover
                  onClick={() => navigate(`./details/${row.id}`)}
                  // role="checkbox"
                >
                  <TableCell
                    component="th"
                    scope="row">
                    <Box className={classes.avatar}>
                      <Avatar src={row.avatar_url} />
                      {row.login}
                    </Box>
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.node_id}</TableCell>
                  <TableCell align="right">
                    {row.site_admin ? 'True' : 'False'}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              );
            })}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.total_count}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

EnhancedTable.propTypes = {
  className: PropTypes.object
};

export default EnhancedTable;
