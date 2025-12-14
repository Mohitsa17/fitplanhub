import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import PlanCard from '../components/PlanCard';

const TrainerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [plans, setPlans] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    brandName: '',
    serviceName: '',
    profileImage: '',
  });
  const [isOwner, setIsOwner] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // If id is undefined (from /profile/setup) or 'setup', treat as setup mode
  const isSetup = !id || id === 'setup';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        let profileData;
        let plansData = [];
        let isProfileOwner = false;

        // Get current user to check ownership and follow status
        let currentUser = null;
        try {
          const meRes = await api.get('/auth/me');
          currentUser = meRes.data;
        } catch (e) {
          // Not logged in
        }

        if (isSetup) {
          if (!currentUser) {
            navigate('/login');
            return;
          }
          profileData = currentUser;
          isProfileOwner = true;

          if (profileData.role === 'trainer') {
            const plansRes = await api.get(`/profile/${profileData._id}`);
            plansData = plansRes.data.plans;
          }
        } else {
          const res = await api.get(`/profile/${id}`);
          profileData = res.data.user;
          plansData = res.data.plans;

          if (currentUser && currentUser._id === profileData._id) {
            isProfileOwner = true;
          }

          if (currentUser && currentUser.followedTrainers) {
            setIsFollowing(currentUser.followedTrainers.includes(profileData._id));
          }
        }

        setProfile(profileData);
        setPlans(plansData);
        setIsOwner(isProfileOwner);

        setFormData({
          bio: profileData.profile?.bio || '',
          brandName: profileData.profile?.brandName || '',
          serviceName: profileData.profile?.serviceName || '',
          profileImage: profileData.profile?.profileImage || '',
        });

        // Fetch followers if owner and trainer
        if (isProfileOwner && profileData.role === 'trainer') {
          try {
            const followersRes = await api.get('/trainers/followers');
            setFollowers(followersRes.data);
          } catch (e) {
            console.log('Failed to fetch followers', e);
          }
        }

      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, isSetup, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/profile', { profile: formData });
      setProfile(res.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await api.post(`/trainers/unfollow/${profile._id}`);
        // Optimistic update
        setIsFollowing(false);
      } else {
        await api.post(`/trainers/follow/${profile._id}`);
        // Optimistic update
        setIsFollowing(true);
      }
    } catch (err) {
      alert('Failed to update follow status');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!profile) return <div className="text-center py-12">Profile not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="flex items-end">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                  {profile.profile?.profileImage ? (
                    <img src={profile.profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-2xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-4 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{profile.profile?.brandName || profile.name}</h1>
                  <p className="text-gray-600">{profile.profile?.serviceName || 'Fitness Trainer'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {isOwner ? (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                ) : (
                  <>
                    {/* Only show follow button if viewer is NOT a trainer */}
                    {JSON.parse(localStorage.getItem('user') || '{}').role !== 'trainer' && (
                      <button
                        onClick={handleFollow}
                        className={`px-6 py-2 rounded-md font-medium text-white transition-colors ${isFollowing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                      >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Name</label>
                  <input
                    type="text"
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                  <input
                    type="text"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{profile.profile?.bio || 'No bio available.'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Followers Section (Only for Owner) */}
        {isOwner && profile.role === 'trainer' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Followers ({followers.length})</h2>
            {followers.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
                No followers yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {followers.map((follower) => (
                  <div key={follower._id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                      {follower.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{follower.name}</p>
                      <p className="text-xs text-gray-500">{follower.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Plans Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fitness Plans</h2>
          {plans.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No plans available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <PlanCard
                  key={plan._id}
                  {...plan}
                  trainerName={profile.name}
                  trainerId={profile._id}
                  planId={plan._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
