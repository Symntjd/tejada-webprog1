import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

import {
  fetchUsers,
  createUser,
  updateUser,
} from "../../services/UserService";

const defaultFormValues = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      const usersData = response.data.users || response.data || [];

      setUsers(
        usersData.map((user, index) => ({
          id: user._id,
          displayId: index + 1,
          ...user,
          status: user.isActive ? "Active" : "Inactive",
          fullName: `${user.firstName} ${user.lastName}`,
        }))
      );
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    { field: "displayId", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 170 },
    { field: "username", headerName: "Username", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1.3, minWidth: 220 },
    {
      field: "type",
      headerName: "Role",
      width: 120,
      renderCell: (params) => labelize(params.value),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.7rem",
            fontWeight: 700,
            color: params.value === "Active" ? "#ffffff" : "#475569",
            backgroundColor: params.value === "Active" ? "#16a34a" : "#e2e8f0",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          onClick={() => handleToggleStatus(params.row)}
          sx={{
            minWidth: 72,
            px: 1,
            py: 0.35,
            fontSize: "0.68rem",
            textTransform: "uppercase",
            fontWeight: 700,
            borderRadius: 1,
            boxShadow: "none",
            backgroundColor: params.row.isActive ? "#f97316" : "#16a34a",
            color: "#ffffff",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: params.row.isActive ? "#ea580c" : "#15803d",
            },
          }}
        >
          {params.row.isActive ? "Disable" : "Activate"}
        </Button>
      ),
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = searchTerm.toLowerCase();

      const matchesSearch =
        user.firstName?.toLowerCase().includes(keyword) ||
        user.lastName?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword) ||
        user.username?.toLowerCase().includes(keyword);

      const matchesRole = roleFilter === "all" || user.type === roleFilter;
      const matchesGender = genderFilter === "all" || user.gender === genderFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, genderFilter, statusFilter]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormValues(defaultFormValues);
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formValues.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!formValues.age.trim()) {
      newErrors.age = "Age is required.";
    } else if (!/^[0-9]+$/.test(formValues.age)) {
      newErrors.age = "Age must be a number only.";
    }

    if (!formValues.gender) newErrors.gender = "Gender is required.";

    if (!formValues.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^[0-9]{11}$/.test(formValues.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 11 digits.";
    }

    if (!formValues.email.trim()) newErrors.email = "Email is required.";
    if (!formValues.type) newErrors.type = "Role is required.";

    if (!formValues.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (formValues.username.includes(" ")) {
      newErrors.username = "Username must not contain spaces.";
    }

    if (!formValues.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formValues.address.trim()) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    try {
      await createUser({
        ...formValues,
        age: String(formValues.age),
      });

      await loadUsers();
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding user:", error);
      alert(error.response?.data?.message || "Failed to add user.");
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await updateUser(user.id, {
        isActive: !user.isActive,
      });

      await loadUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert(error.response?.data?.message || "Failed to update user.");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setGenderFilter("all");
    setStatusFilter("all");
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Users
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            User records loaded from MongoDB and displayed using MUI Data Grid.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon sx={{ fontSize: 15 }} />}
          onClick={handleOpenDialog}
          sx={{
            minWidth: 0,
            px: 1.4,
            py: 0.42,
            fontSize: "0.68rem",
            textTransform: "uppercase",
            fontWeight: 700,
            borderRadius: 1,
            backgroundColor: "#1976d2",
            color: "#ffffff",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "none",
            },
          }}
        >
          Add User
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 2 }}>
        <CardContent sx={{ py: 2 }}>
          <Grid container spacing={1.5} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Search"
                placeholder="Search first name, last name, email, or username"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                select
                size="small"
                label="Role"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                select
                size="small"
                label="Gender"
                value={genderFilter}
                onChange={(event) => setGenderFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <TextField
                fullWidth
                select
                size="small"
                label="Status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={handleClearFilters}
                sx={{
                  height: 40,
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  borderRadius: 1,
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              User Details
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Showing {filteredUsers.length} of {users.length} users
            </Typography>
          </Stack>

          <Box sx={{ height: 430, width: "100%" }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1rem" }}>Add User</DialogTitle>

        <DialogContent>
          <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="First Name" name="firstName" value={formValues.firstName} onChange={handleInputChange} error={Boolean(errors.firstName)} helperText={errors.firstName} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="Last Name" name="lastName" value={formValues.lastName} onChange={handleInputChange} error={Boolean(errors.lastName)} helperText={errors.lastName} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="Age" name="age" value={formValues.age} onChange={handleInputChange} error={Boolean(errors.age)} helperText={errors.age || "Numbers only"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth select size="small" label="Gender" name="gender" value={formValues.gender} onChange={handleInputChange} error={Boolean(errors.gender)} helperText={errors.gender}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="Contact Number" name="contactNumber" value={formValues.contactNumber} onChange={handleInputChange} error={Boolean(errors.contactNumber)} helperText={errors.contactNumber || "Must be 11 digits"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="Email Address" name="email" value={formValues.email} onChange={handleInputChange} error={Boolean(errors.email)} helperText={errors.email} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth select size="small" label="Role" name="type" value={formValues.type} onChange={handleInputChange} error={Boolean(errors.type)} helperText={errors.type}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="Username" name="username" value={formValues.username} onChange={handleInputChange} error={Boolean(errors.username)} helperText={errors.username || "No spaces allowed"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth size="small" label="Password" name="password" type="password" value={formValues.password} onChange={handleInputChange} error={Boolean(errors.password)} helperText={errors.password || "At least 8 characters"} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth select size="small" label="Status" name="isActive" value={String(formValues.isActive)} onChange={handleInputChange}>
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth size="small" multiline minRows={2} label="Address" name="address" value={formValues.address} onChange={handleInputChange} error={Boolean(errors.address)} helperText={errors.address} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button size="small" onClick={handleCloseDialog}>
            Cancel
          </Button>

          <Button size="small" variant="contained" onClick={handleAddUser}>
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function labelize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default UsersPage;