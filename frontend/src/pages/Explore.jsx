import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import PlanCard from '../components/PlanCard';

const Explore = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await api.get('/plans');
                setPlans(res.data);
            } catch (err) {
                setError('Failed to fetch plans');
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const filteredPlans = plans.filter((plan) => {
        const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plan.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory ? plan.category === filterCategory : true;
        return matchesSearch && matchesCategory;
    });

    const categories = [...new Set(plans.map(plan => plan.category).filter(Boolean))];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
                <p className="text-gray-500">Loading plans...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Explore Fitness Plans</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover the perfect workout plan for your goals. Browse through our collection of expert-curated fitness programs.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
                    <input
                        type="text"
                        placeholder="Search plans..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-96"
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {filteredPlans.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No plans found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlans.map((plan, index) => (
                            <PlanCard
                                key={plan._id}
                                {...plan}
                                trainerName={plan.trainer?.name || 'Unknown Trainer'}
                                trainerId={plan.trainer?._id}
                                planId={plan._id}
                                image={plan.image}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
