import { useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArticleIcon from "@mui/icons-material/Article";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const monthlyData = [
  { id: 1, month: "January", articles: 12, views: 120 },
  { id: 2, month: "February", articles: 18, views: 200 },
  { id: 3, month: "March", articles: 15, views: 150 },
  { id: 4, month: "April", articles: 20, views: 180 },
  { id: 5, month: "May", articles: 22, views: 220 },
];

const categoryData = [
  { id: 0, value: 35, label: "News" },
  { id: 1, value: 25, label: "Sports" },
  { id: 2, value: 20, label: "Campus" },
  { id: 3, value: 20, label: "Opinion" },
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "month", headerName: "Month", width: 160 },
  { field: "articles", headerName: "Articles", width: 130 },
  { field: "views", headerName: "Views", width: 130 },
];

function ReportsPage() {
  const printRef = useRef(null);

  const totalArticles = monthlyData.reduce((total, item) => total + item.articles, 0);
  const totalViews = monthlyData.reduce((total, item) => total + item.views, 0);
  const averageViews = Math.round(totalViews / monthlyData.length);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            #printable-report,
            #printable-report * {
              visibility: visible;
            }

            #printable-report {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
              background: white;
            }

            .no-print {
              display: none !important;
            }

            .print-sheet {
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
            }

            .print-chart-box {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            table {
              page-break-inside: avoid;
            }
          }
        `}
      </style>

      <Stack
        className="no-print"
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Reports
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Dashboard reports using MUI charts, table, and print function.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<PrintIcon sx={{ fontSize: 15 }} />}
          onClick={handlePrint}
          sx={{
            minWidth: 0,
            px: 1.5,
            py: 0.45,
            fontSize: "0.72rem",
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
          Print
        </Button>
      </Stack>

      <Stack className="no-print" direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <SummaryCard
          icon={<ArticleIcon color="primary" />}
          label="Total Articles"
          value={totalArticles}
        />

        <SummaryCard
          icon={<VisibilityIcon color="primary" />}
          label="Total Views"
          value={totalViews}
        />

        <SummaryCard
          icon={<AssessmentIcon color="primary" />}
          label="Average Views"
          value={averageViews}
        />
      </Stack>

      <Stack className="no-print" direction={{ xs: "column", lg: "row" }} spacing={2} sx={{ mb: 2 }}>
        <Card sx={{ flex: 2, borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Monthly Report Output
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              This chart displays monthly article views.
            </Typography>

            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: monthlyData.map((item) => item.month),
                  },
                ]}
                series={[
                  {
                    data: monthlyData.map((item) => item.views),
                    label: "Views",
                  },
                ]}
                width={650}
                height={320}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Report Category Share
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              Distribution of reports by category.
            </Typography>

            <PieChart
              series={[
                {
                  data: categoryData,
                  innerRadius: 25,
                  outerRadius: 90,
                  paddingAngle: 3,
                  cornerRadius: 4,
                },
              ]}
              width={320}
              height={250}
            />
          </CardContent>
        </Card>
      </Stack>

      <Card className="no-print" sx={{ borderRadius: 2, boxShadow: 2, mb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Report Table
          </Typography>

          <Box sx={{ height: 340, width: "100%" }}>
            <DataGrid
              rows={monthlyData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography className="no-print" variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Printable Report Preview
          </Typography>

          <Divider className="no-print" sx={{ mb: 3 }} />

          <Box
            id="printable-report"
            ref={printRef}
            className="print-sheet"
            sx={{
              border: "1px solid #cbd5e1",
              borderRadius: 2,
              p: 4,
              backgroundColor: "#ffffff",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3, pb: 2, borderBottom: "3px solid #1976d2" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
                Reports Summary
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Tejada Client Dashboard
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Generated report for monthly articles, views, category share, and report output.
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
              <Box sx={summaryCardStyle}>
                <Typography variant="body2" color="text.secondary">
                  Total Articles
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {totalArticles}
                </Typography>
              </Box>

              <Box sx={summaryCardStyle}>
                <Typography variant="body2" color="text.secondary">
                  Total Views
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {totalViews}
                </Typography>
              </Box>

              <Box sx={summaryCardStyle}>
                <Typography variant="body2" color="text.secondary">
                  Average Views
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {averageViews}
                </Typography>
              </Box>
            </Stack>

            <Box className="print-chart-box" sx={printSectionStyle}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Monthly Article Views Chart
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Bar chart showing the total article views from January to May.
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: monthlyData.map((item) => item.month),
                    },
                  ]}
                  series={[
                    {
                      data: monthlyData.map((item) => item.views),
                      label: "Views",
                    },
                  ]}
                  width={650}
                  height={280}
                />
              </Box>
            </Box>

            <Box className="print-chart-box" sx={printSectionStyle}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Report Category Share Chart
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Pie chart showing the distribution of reports by category.
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
                <PieChart
                  series={[
                    {
                      data: categoryData,
                      innerRadius: 25,
                      outerRadius: 95,
                      paddingAngle: 3,
                      cornerRadius: 4,
                    },
                  ]}
                  width={420}
                  height={260}
                />
              </Box>
            </Box>

            <Box className="print-chart-box" sx={printSectionStyle}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Monthly Report Summary
              </Typography>

              <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th" sx={tableHeaderStyle}>
                      Month
                    </Box>
                    <Box component="th" sx={tableHeaderStyle}>
                      Articles
                    </Box>
                    <Box component="th" sx={tableHeaderStyle}>
                      Views
                    </Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  {monthlyData.map((item) => (
                    <Box component="tr" key={item.id}>
                      <Box component="td" sx={tableCellStyle}>
                        {item.month}
                      </Box>
                      <Box component="td" sx={tableCellStyle}>
                        {item.articles}
                      </Box>
                      <Box component="td" sx={tableCellStyle}>
                        {item.views}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box className="print-chart-box" sx={printSectionStyle}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Category Summary
              </Typography>

              <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th" sx={tableHeaderStyle}>
                      Category
                    </Box>
                    <Box component="th" sx={tableHeaderStyle}>
                      Percentage
                    </Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  {categoryData.map((item) => (
                    <Box component="tr" key={item.id}>
                      <Box component="td" sx={tableCellStyle}>
                        {item.label}
                      </Box>
                      <Box component="td" sx={tableCellStyle}>
                        {item.value}%
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "#eff6ff",
                borderLeft: "4px solid #1976d2",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Report Remarks
              </Typography>

              <Typography variant="body2">
                This report shows the total articles, total views, average views,
                monthly article performance, and report category distribution.
              </Typography>
            </Box>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 4,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              Prepared for Laboratory Activity 6
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <Card sx={{ flex: 1, borderRadius: 2, boxShadow: 2 }}>
      <CardContent sx={{ py: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {icon}
          <Box>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

const summaryCardStyle = {
  flex: 1,
  border: "1px solid #cbd5e1",
  borderRadius: 2,
  p: 2,
  backgroundColor: "#f8fafc",
};

const printSectionStyle = {
  mt: 3,
  p: 2,
  border: "1px solid #e2e8f0",
  borderRadius: 2,
  backgroundColor: "#ffffff",
};

const tableHeaderStyle = {
  backgroundColor: "#1976d2",
  color: "#ffffff",
  p: 1.5,
  textAlign: "left",
};

const tableCellStyle = {
  border: "1px solid #cbd5e1",
  p: 1.5,
};

export default ReportsPage;