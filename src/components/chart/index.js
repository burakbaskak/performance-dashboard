import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const Chart = ({ data, lineKey, xAxisKey, title }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div" aria-label="card-title">
            {title}
          </Typography>

          <ResponsiveContainer minHeight="200px">
            <LineChart
              data={data}
              width="100%"
              height="100%"
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <Line type="monotone" dataKey={lineKey} stroke="#8884d8" />
              <CartesianGrid stroke="3 3" />

              <Tooltip />
              <Legend />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};
