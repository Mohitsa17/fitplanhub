import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// mark 'motion' as used for linters that miss JSX member usage
void motion;
import api from '../services/api';

const PlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isUser = user?.role === 'user';
  const isPreviewOnly = plan && !plan.description;

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/plans/${id}`);
        const planData = response.data.plan;
        setPlan(planData);
        setIsSubscribed(!!planData.description);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load plan');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setSubscribing(true);
      await api.post(`/subscriptions/${id}`);
      setIsSubscribed(true);
      const response = await api.get(`/plans/${id}`);
      setPlan(response.data.plan);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to subscribe');
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading plan details...</p>
      </div>
    );
  }

  if (error && !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-10"
        >
          {isPreviewOnly && (
            <div className="mb-6">
              <span className="inline-block px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-md">
                Preview Only
              </span>
            </div>
          )}

          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
            <img
              src={plan.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'}
              alt={plan.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 w-full">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{plan.title}</h1>
                {isPreviewOnly && (
                  <span className="inline-block px-3 py-1.5 text-sm font-medium text-white bg-white/20 backdrop-blur-md rounded-md border border-white/30">
                    Preview Only
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 pb-6 border-b border-gray-200">
            <p className="text-gray-600 mb-3">
              by <span className="font-semibold text-gray-900">{plan.trainer?.name || 'Unknown Trainer'}</span>
            </p>
            {!isPreviewOnly && (
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${plan.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  plan.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {plan.difficulty || 'Beginner'}
                </span>
                {plan.category && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {plan.category}
                  </span>
                )}
              </div>
            )}
            <p className="text-3xl font-bold text-gray-900">₹{plan.price}</p>
          </div>

          {!isPreviewOnly && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
                <p className="text-lg font-semibold text-gray-900">{plan.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Frequency</h3>
                <p className="text-lg font-semibold text-gray-900">{plan.frequency || 'Flexible'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Equipment</h3>
                <p className="text-lg font-semibold text-gray-900">{plan.equipment || 'None'}</p>
              </div>
            </div>
          )}

          {plan.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{plan.description}</p>
            </div>
          )}



          {isPreviewOnly && (!user || isUser) && !isSubscribed && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-5">
                Subscribe to this plan to view full details and access all content.
              </p>
              <button
                onClick={handleSubscribe}
                disabled={subscribing}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          )}

          {isSubscribed && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <span className="inline-block px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-md">
                Subscribed
              </span>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PlanDetails;
