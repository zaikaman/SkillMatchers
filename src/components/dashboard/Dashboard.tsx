import React from 'react';
import { Card, Grid, Typography, Box, Button, Avatar, Badge } from '@mui/material';
import { 
  Message as MessageIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  DateRange as DateIcon
} from '@mui/icons-material';

interface DashboardProps {
  userType: 'employer' | 'worker';
  userData: {
    name: string;
    matches: number;
    unreadMessages: number;
    upcomingInterviews: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ userType, userData }) => {
  return (
    <Box className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <Typography className="mb-8 text-3xl md:text-4xl font-bold text-indigo-600">
        Hey {userData.name}! 👋
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} sm={6} md={4}>
          <Card className="p-6 hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-blue-50 to-white">
            <Box className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <PersonIcon className="text-blue-500 text-3xl" />
              </div>
              <div>
                <Typography className="text-2xl font-bold text-blue-600">{userData.matches}</Typography>
                <Typography className="text-base text-blue-400 font-medium">New Matches</Typography>
              </div>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="p-6 hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-green-50 to-white">
            <Box className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <MessageIcon className="text-green-500 text-3xl" />
              </div>
              <div>
                <Typography className="text-2xl font-bold text-green-600">{userData.unreadMessages}</Typography>
                <Typography className="text-base text-green-400 font-medium">Unread Messages</Typography>
              </div>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="p-6 hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-purple-50 to-white">
            <Box className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <DateIcon className="text-purple-500 text-3xl" />
              </div>
              <div>
                <Typography className="text-2xl font-bold text-purple-600">{userData.upcomingInterviews}</Typography>
                <Typography className="text-base text-purple-400 font-medium">Upcoming Interviews</Typography>
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Matches */}
      <Card className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-white">
        <Typography className="mb-6 text-2xl font-bold text-indigo-600">
          Recent Matches ✨
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((match) => (
            <Grid item xs={12} sm={6} md={4} key={match}>
              <Card className="p-4 hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white">
                <Box className="flex items-center space-x-4">
                  <Avatar className="w-14 h-14 bg-indigo-100 text-indigo-600" />
                  <Box>
                    <Typography className="text-lg font-bold text-gray-800">
                      {userType === 'employer' ? 'John Developer' : 'Tech Corp'}
                    </Typography>
                    <Typography className="text-base text-indigo-400">
                      {userType === 'employer' ? 'Full Stack Developer' : 'Software Company'}
                    </Typography>
                  </Box>
                </Box>
                <Box className="mt-4 flex justify-between gap-2">
                  <Button 
                    variant="outlined"
                    className="text-base font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50 flex-1"
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="contained"
                    className="text-base font-medium bg-indigo-600 hover:bg-indigo-700 flex-1"
                  >
                    Message
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white">
        <Typography className="mb-6 text-2xl font-bold text-indigo-600">
          Quick Actions 🚀
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PersonIcon />}
              className="h-16 text-base font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            >
              {userType === 'employer' ? 'Find Talent' : 'Browse Jobs'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<MessageIcon />}
              className="h-16 text-base font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            >
              Messages
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<WorkIcon />}
              className="h-16 text-base font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            >
              {userType === 'employer' ? 'Post a Job' : 'Update Skills'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<DateIcon />}
              className="h-16 text-base font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            >
              Schedule Interview
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default Dashboard; 