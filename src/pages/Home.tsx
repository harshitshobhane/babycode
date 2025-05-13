import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentActivity, setRecentActivity] = React.useState<any>(null);

  React.useEffect(() => {
    const activity = localStorage.getItem('recentActivity');
    if (activity) {
      setRecentActivity(JSON.parse(activity));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Welcome to StudentDash
          </h1>
          <p className="text-xl text-muted-foreground">
            {user ? `Welcome back, ${user.email}!` : 'Your all-in-one student management solution'}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="glass-effect p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/students')}
                className="w-full gradient-border p-4 text-left hover:scale-[1.02] transition-transform"
              >
                View All Students
              </button>
              <button 
                onClick={() => navigate('/add-student')}
                className="w-full gradient-border p-4 text-left hover:scale-[1.02] transition-transform"
              >
                Add New Student
              </button>
              <button className="w-full gradient-border p-4 text-left hover:scale-[1.02] transition-transform">
                Generate Reports
              </button>
            </div>
          </div>

          <div className="glass-effect p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                {recentActivity && recentActivity.type === 'add' ? (
                  <p className="text-sm text-green-700">
                    You added <span className="font-semibold">{recentActivity.student.name}</span> (<span className="text-muted-foreground">{recentActivity.student.email}</span>) just now.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home; 