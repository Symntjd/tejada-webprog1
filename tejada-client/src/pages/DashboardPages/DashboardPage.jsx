import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Summary of the website information and activity.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Articles</Typography>
              <Typography variant="h4">24</Typography>
              <Typography variant="body2">Published website articles</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">10</Typography>
              <Typography variant="body2">Registered users</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Views</Typography>
              <Typography variant="h4">1,200</Typography>
              <Typography variant="body2">Overall page views</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;