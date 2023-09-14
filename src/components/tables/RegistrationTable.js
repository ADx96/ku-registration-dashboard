import { useState } from 'react';
import { filter } from 'lodash';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from 'src/sections/@dashboard/user';
import useRegistrationMutation, {
  useGetRegistrations,
} from 'src/hooks/useRegistrationData';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import Dialog from 'src/components/Dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'orderNumber', label: 'رقم الطلب', alignRight: false },
  { id: 'UniId', label: 'رقم الجامعي', alignRight: false },
  { id: 'name', label: 'الاسم الثلاثي', alignRight: false },
  { id: 'email', label: 'البريد الالكتروني', alignRight: false },
  { id: 'mobile', label: 'النقال', alignRight: false },
  { id: 'isReviewed', label: 'هل تم النظر بالطلب', alignRight: true },
  { id: 'status', label: 'الحالة', alignRight: false },
  { id: '', label: 'مشاهدة البيانات' },
  { id: '' },
];

// ----------------------------------------------------------------------

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

function applySortFilter(data, comparator, query) {
  const stabilizedThis = data.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      data,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const RegistrationTable = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [openPopup, setOpenPopup] = useState(false);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [userId, setUserId] = useState(null);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading } = useGetRegistrations();

  const { deleteMutation } = useRegistrationMutation();

  const newData = data?.data;

  const handleOpenMenu = (event, id) => {
    setUserId(id);
    setOpen(event.currentTarget);
  };

  const handleShowDetails = (id) => {
    if (id) {
      navigate(`/dashboard/registrations/${id}`);
    }
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  if (isLoading) {
    return <CircularProgress />;
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = newData.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClosePopUp = () => {
    setOpenPopup(false);
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(userId);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newData.length) : 0;

  const filteredUsers = applySortFilter(
    newData,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h4' gutterBottom>
            طلبات التسجيل
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={newData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id } = row;
                      const {
                        orderNumber,
                        UniId,
                        name,
                        email,
                        mobile,
                        isReviewed,
                        status,
                      } = row.attributes;
                      const selectedUser = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={selectedUser}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>

                          <TableCell align='left'>{`#${orderNumber}`}</TableCell>

                          <TableCell align='left'>{UniId}</TableCell>

                          <TableCell component='th' scope='row' padding='none'>
                            <Stack
                              direction='row'
                              alignItems='center'
                              spacing={2}
                            >
                              <Avatar alt={name} />
                              <Typography variant='subtitle2' noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align='left'>{email}</TableCell>

                          <TableCell align='left'>{mobile}</TableCell>

                          <TableCell align='left'>
                            {isReviewed ? 'Yes' : 'No'}
                          </TableCell>

                          <TableCell align='left'>
                            <Label
                              color={
                                (status === 'rejected' && 'error') ||
                                (status === 'accepted' && 'success') ||
                                (status === 'underreview' && 'info') ||
                                (status === 'reviewed' && 'warning') ||
                                (status === 'pending' && 'warning')
                              }
                            >
                              {status}
                            </Label>
                          </TableCell>

                          <TableCell align='right'>
                            <IconButton
                              size='large'
                              color='inherit'
                              onClick={(e) => handleShowDetails(id)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>

                          <TableCell align='right'>
                            <IconButton
                              size='large'
                              color='inherit'
                              onClick={(event) => handleOpenMenu(event, id)}
                            >
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant='h6' paragraph>
                            Not found
                          </Typography>

                          <Typography variant='body2'>
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={data.meta.pagination.pageCount}
            rowsPerPage={data.meta.pagination.pageSize}
            page={data.meta.pagination.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Dialog
        title='Are You Sure You want to Delete?'
        openPopup={openPopup}
        handleCloseDialog={handleClosePopUp}
        handleSubmit={handleDelete}
      />
    </>
  );
};

export default RegistrationTable;
