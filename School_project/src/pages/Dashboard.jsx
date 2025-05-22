import { Grid, Paper, Typography, Box } from '@mui/material'
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material'

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
      bgcolor: color,
      color: 'white',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography component="h2" variant="h6" gutterBottom>
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
)

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Classes"
            value="10"
            icon={<SchoolIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value="500"
            icon={<PeopleIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Fees"
            value="₹50,000"
            icon={<PaymentIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Collection"
            value="₹5,00,000"
            icon={<AccountBalanceIcon />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard 