import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// silence ESLint no-unused-vars for framer-motion member usage in JSX
void motion;
import api from '../services/api';
import PlanCard from '../components/PlanCard';

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [subscribedPlans, setSubscribedPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('following');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [feedRes, subRes] = await Promise.all([
          api.get('/feed'),
          api.get('/subscriptions')
        ]);
        setFeed(feedRes.data.feed || []);
        setSubscribedPlans(subRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load feed');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Loading feed...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('following')}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'following'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Following
              {activeTab === 'following' && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('subscribed')}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'subscribed'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              My Subscriptions
              {activeTab === 'subscribed' && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          </div>

          {activeTab === 'following' ? (
            <div>
              {feed.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <p className="text-gray-600 text-lg mb-2">No updates from trainers you follow.</p>
                  <p className="text-gray-500">
                    Explore more plans to find trainers to follow.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {feed.map((plan, index) => (
                    <motion.div
                      key={plan._id || plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <PlanCard
                        {...plan}
                        trainerName={plan.trainer?.name || 'Unknown Trainer'}
                        trainerId={plan.trainer?._id}
                        planId={plan._id || plan.id}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              {subscribedPlans.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <p className="text-gray-600 text-lg mb-2">You haven't subscribed to any plans yet.</p>
                  <p className="text-gray-500">
                    Browse the Explore page to find a plan that fits your goals.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subscribedPlans.map((plan, index) => (
                    <motion.div
                      key={plan._id || plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <PlanCard
                        {...plan}
                        trainerName={plan.trainer?.name || 'Unknown Trainer'}
                        trainerId={plan.trainer?._id}
                        planId={plan._id || plan.id}
                        isSubscribed={true}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Feed;
