import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// work around ESLint `no-unused-vars` false positives for JSX member usage
void motion;
import api from '../services/api';
import PlanCard from '../components/PlanCard';

const Landing = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect logged-in users to their dashboard
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'trainer') {
          navigate('/trainer/dashboard');
        } else {
          navigate('/feed');
        }
      } catch (e) {
        // Invalid user data, let them stay on landing (or clear storage)
        localStorage.clear();
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/plans');
        setPlans(response.data || []);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        setError('Failed to load featured plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const features = [
    {
      icon: '💪',
      title: 'Expert Trainers',
      description: 'Work with certified fitness professionals who design personalized plans for your goals.',
    },
    {
      icon: '📱',
      title: 'Track Progress',
      description: 'Monitor your fitness journey with detailed progress tracking and analytics.',
    },
    {
      icon: '🎯',
      title: 'Custom Plans',
      description: 'Get workout plans tailored to your fitness level, goals, and preferences.',
    },
    {
      icon: '⏰',
      title: 'Flexible Schedule',
      description: 'Access your plans anytime, anywhere. Work out on your own schedule.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Expert Trainers' },
    { number: '1K+', label: 'Fitness Plans' },
    { number: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero image using an <img> for reliable loading */}
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80"
          alt="People exercising - hero"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            >
              Transform Your Body,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">Transform Your Life</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto"
            >
              Discover personalized workout plans from expert trainers and start your fitness journey today
            </motion.p>
            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 font-bold rounded-lg hover:bg-white/20 hover:border-white/40 transition-all transform hover:scale-105"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Decorative animated blobs */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-8 top-24 w-56 h-56 bg-emerald-600 rounded-full opacity-20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-12 bottom-20 w-64 h-64 bg-rose-500 rounded-full opacity-12 blur-3xl"
          />
        </div>
      </section>

      {/* Image gallery preview */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
                title: 'Strength Training',
              },
              {
                img: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?auto=format&fit=crop&w=1200&q=80',
                title: 'Cardio & Endurance',
              },
              {
                img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
                title: 'Nutrition Guidance',
              },
            ].map((g) => (
              <motion.div
                key={g.title}
                whileHover={{ scale: 1.03 }}
                className="rounded-xl overflow-hidden shadow-lg bg-gray-900 glass-card"
              >
                <img
                  src={g.img}
                  alt={g.title}
                  className="w-full h-44 object-cover object-center smooth-img"
                  loading="lazy"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-emerald-300">{g.title}</h4>
                  <p className="text-sm text-emerald-100/80 mt-1">Hand-picked plans and tips from top trainers.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose FitPlanHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to achieve your fitness goals in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Sign Up & Choose',
                description: 'Create your account and browse through hundreds of fitness plans from expert trainers.',
              },
              {
                step: '02',
                title: 'Subscribe & Access',
                description: 'Subscribe to plans that match your goals and get instant access to detailed workouts.',
              },
              {
                step: '03',
                title: 'Train & Transform',
                description: 'Follow your personalized plan, track your progress, and achieve your fitness goals.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-lg shadow-blue-500/20 transform -rotate-3">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already transforming their lives with FitPlanHub
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-all transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  F
                </div>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  FitPlanHub
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering your fitness journey with expert-led plans and tracking tools. Join our community today.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/explore" className="hover:text-emerald-400 transition-colors">Explore Plans</Link></li>
                <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Login</Link></li>
                <li><Link to="/signup" className="hover:text-emerald-400 transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <a href="mailto:mohitrp1729@gmail.com" className="hover:text-emerald-400 transition-colors">mohitrp1729@gmail.com /a>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+91 74890-95919</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>123 Fitness Street, E-sector, sudama nagar, Indore 90210</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} FitPlanHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
