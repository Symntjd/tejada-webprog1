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
  fetchArticles,
  createArticle,
  updateArticle,
} from "../../services/ArticleServices";

const defaultFormValues = {
  title: "",
  category: "",
  author: "",
  content: "",
  isPublished: true,
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadArticles = async () => {
    try {
      const response = await fetchArticles();
      const articlesData = response.data.articles || [];

      setArticles(
        articlesData.map((article, index) => ({
          id: article._id,
          displayId: index + 1,
          ...article,
          status: article.isPublished ? "Published" : "Draft",
        }))
      );
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const columns = [
    { field: "displayId", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", flex: 1.4, minWidth: 220 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
    { field: "author", headerName: "Author", flex: 1, minWidth: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.7rem",
            fontWeight: 700,
            color: params.value === "Published" ? "#ffffff" : "#475569",
            backgroundColor: params.value === "Published" ? "#16a34a" : "#e2e8f0",
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
            backgroundColor: params.row.isPublished ? "#f97316" : "#16a34a",
            color: "#ffffff",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: params.row.isPublished ? "#ea580c" : "#15803d",
            },
          }}
        >
          {params.row.isPublished ? "Draft" : "Publish"}
        </Button>
      ),
    },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const keyword = searchTerm.toLowerCase();

      const matchesSearch =
        article.title?.toLowerCase().includes(keyword) ||
        article.category?.toLowerCase().includes(keyword) ||
        article.author?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && article.isPublished) ||
        (statusFilter === "draft" && !article.isPublished);

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchTerm, statusFilter]);

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormValues(defaultFormValues);
    setErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: name === "isPublished" ? value === "true" : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.title.trim()) newErrors.title = "Title is required.";
    if (!formValues.category.trim()) newErrors.category = "Category is required.";
    if (!formValues.author.trim()) newErrors.author = "Author is required.";
    if (!formValues.content.trim()) newErrors.content = "Content is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddArticle = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      await createArticle(formValues);
      await loadArticles();
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding article:", error);
      alert(error.response?.data?.message || "Failed to add article.");
    }
  };

  const handleToggleStatus = async (article) => {
    try {
      await updateArticle(article.id, {
        isPublished: !article.isPublished,
      });

      await loadArticles();
    } catch (error) {
      console.error("Error updating article:", error);
      alert(error.response?.data?.message || "Failed to update article.");
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
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
            Dashboard Articles
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Article records loaded from MongoDB and managed using MUI Data Grid.
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
          Add Article
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 2 }}>
        <CardContent sx={{ py: 2 }}>
          <Grid container spacing={1.5} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                label="Search"
                placeholder="Search title, category, or author"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                select
                size="small"
                label="Status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
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
              Article Details
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Showing {filteredArticles.length} of {articles.length} articles
            </Typography>
          </Stack>

          <Box sx={{ height: 430, width: "100%" }}>
            <DataGrid
              rows={filteredArticles}
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
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1rem" }}>
          Add Article
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Category"
                name="category"
                value={formValues.category}
                onChange={handleInputChange}
                error={Boolean(errors.category)}
                helperText={errors.category}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Author"
                name="author"
                value={formValues.author}
                onChange={handleInputChange}
                error={Boolean(errors.author)}
                helperText={errors.author}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                size="small"
                label="Status"
                name="isPublished"
                value={String(formValues.isPublished)}
                onChange={handleInputChange}
              >
                <MenuItem value="true">Published</MenuItem>
                <MenuItem value="false">Draft</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                multiline
                minRows={5}
                label="Content"
                name="content"
                value={formValues.content}
                onChange={handleInputChange}
                error={Boolean(errors.content)}
                helperText={errors.content}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button size="small" onClick={handleCloseDialog}>
            Cancel
          </Button>

          <Button size="small" variant="contained" onClick={handleAddArticle}>
            Save Article
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;