const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDashboardStats = async () => {
  await delay(400);
  return {
    success: true,
    data: {
      totalStudents: 156,
      activeApplications: 48,
      totalUniversities: 12,
      totalAdmins: 8,
      pendingTasks: 23,
      revenueThisMonth: 12500,
      studentsByCountry: { Germany: 89, UK: 45, Italy: 12, Serbia: 10 },
      applicationsByStatus: {
        DRAFT: 5,
        CLAIM_PENDING: 8,
        UNDER_REVIEW: 20,
        COMPLETED: 15,
      },
      recentActivities: [
        { id: 1, action: "New application submitted", user: "John Doe", time: "2 hours ago" },
        { id: 2, action: "Document approved", user: "Priya Sharma", time: "4 hours ago" },
        { id: 3, action: "Payment received", user: "Ahmed Khan", time: "1 day ago" },
        { id: 4, action: "University added", user: "Admin", time: "2 days ago" },
        { id: 5, action: "Admin registered", user: "Sarah Wilson", time: "3 days ago" },
      ],
      monthlyGrowth: { students: 12, applications: 8, revenue: 3500 },
    },
  };
};

export const getDashboardCharts = async () => {
  await delay(400);
  return {
    success: true,
    data: {
      applicationsOverTime: [
        { month: "Jan", count: 12 },
        { month: "Feb", count: 18 },
        { month: "Mar", count: 25 },
        { month: "Apr", count: 30 },
      ],
      revenueOverTime: [
        { month: "Jan", amount: 5000 },
        { month: "Feb", amount: 7500 },
        { month: "Mar", amount: 10000 },
        { month: "Apr", amount: 12500 },
      ],
    },
  };
};

export default { getDashboardStats, getDashboardCharts };
