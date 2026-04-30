import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Reports
      </Typography>

      <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
        Data visualization of article views from January to May.
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Monthly Article Views
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflowX: "auto",
            }}
          >
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Jan", "Feb", "Mar", "Apr", "May"],
                  label: "Month",
                },
              ]}
              yAxis={[
                {
                  label: "Views",
                },
              ]}
              series={[
                {
                  label: "Article Views",
                  data: [120, 200, 150, 180, 220],
                },
              ]}
              width={700}
              height={400}
              margin={{ top: 40, right: 30, bottom: 60, left: 70 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReportsPage;