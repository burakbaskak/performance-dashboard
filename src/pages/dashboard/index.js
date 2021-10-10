import { api } from "../../api";
import { Box, Grid } from "@mui/material";
import { Chart } from "../../components/chart";

const renderLineChart = (data = []) => {
  const pageLoads = data.filter((x) => x.name === "pageload");
  const windowload = data.filter((x) => x.name === "windowload");
  const ttfb = data.filter((x) => x.name === "ttfb");
  const fcp = data.filter((x) => x.name === "fcp");
  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item md={6} lg={6}>
        <Chart
          data={pageLoads}
          lineKey="duration"
          xAxisKey="createText"
          title="pageLoads"
        />
      </Grid>
      <Grid item md={6} lg={6}>
        <Chart
          data={windowload}
          lineKey="duration"
          xAxisKey="createText"
          title="windowload"
        />
      </Grid>
      <Grid item md={6} lg={6}>
        <Chart
          data={ttfb}
          lineKey="duration"
          xAxisKey="createText"
          title="ttfb"
        />
      </Grid>
      <Grid item md={6} lg={6}>
        <Chart
          data={fcp}
          lineKey="duration"
          xAxisKey="createText"
          title="fcp"
        />
      </Grid>
    </Grid>
  );
};

function Dashboard() {
  const { data } = api.useAnalyticsQuery(null, {
    pollingInterval: 2000,
  });

  return <Box>{renderLineChart(data)}</Box>;
}

export default Dashboard;
