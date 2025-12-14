import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ensure 'motion' is recognized by linters that don't pick up JSX member usage
void motion;

const PlanCard = ({ title, price, trainerName, trainerId, isSubscribed, planId, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          {isSubscribed ? (
            <span className="inline-block px-2.5 py-1 text-xs font-bold text-green-700 bg-green-100/90 backdrop-blur-sm rounded-md shadow-sm">
              Subscribed
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">

          <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-500">
            by{' '}
            {trainerId ? (
              <Link to={`/trainer/${trainerId}`} className="hover:text-blue-600 hover:underline">
                {trainerName}
              </Link>
            ) : (
              trainerName
            )}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
          </div>
          <Link
            to={`/plans/${planId}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            View Plan
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanCard;
