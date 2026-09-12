import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { WebsiteFeedback } from '../../types';
import { 
  MessageSquareHeart, 
  Star, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  Search,
  Filter,
  Check
} from 'lucide-react';

export const AdminFeedbackTab: React.FC = () => {
  const { adminToken, showToast } = useApp();
  const [feedbackList, setFeedbackList] = useState<WebsiteFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'reviewed' | 'resolved'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Deletion modal confirmation
  const [itemToDelete, setItemToDelete] = useState<{ id: string; author: string } | null>(null);

  const fetchFeedback = useCallback(async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/feedback', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFeedbackList(data);
      } else {
        showToast('Failed to load website feedback', 'error');
      }
    } catch {
      showToast('Network error loading feedback', 'error');
    } finally {
      setLoading(false);
    }
  }, [adminToken, showToast]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleUpdateStatus = async (id: string, newStatus: 'new' | 'reviewed' | 'resolved') => {
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setFeedbackList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        showToast(`Feedback status marked as "${newStatus}"`, 'success');
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch {
      showToast('Error updating feedback status', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`/api/admin/feedback/${itemToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (res.ok) {
        setFeedbackList((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        showToast('Feedback deleted successfully', 'info');
        setItemToDelete(null);
      } else {
        showToast('Failed to delete feedback entry', 'error');
      }
    } catch {
      showToast('Error deleting feedback', 'error');
    }
  };

  // Filtered feedback
  const filteredList = feedbackList.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch =
      !searchQuery ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.phone && item.phone.includes(searchQuery));

    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Calculate statistics
  const totalCount = feedbackList.length;
  const newCount = feedbackList.filter((f) => f.status === 'new').length;
  const avgRating =
    totalCount > 0
      ? (feedbackList.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalCount).toFixed(1)
      : '5.0';

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Metrics */}
      <div className="bg-white border border-[#E5E1D8] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E1D8] pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#065F46] text-white">
              <MessageSquareHeart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97706]">
                Visitor Community Feedback
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111827]">
                Website Improvement Suggestions
              </h2>
              <p className="text-xs text-gray-500">
                Review visitor suggestions, bug reports, and ratings to continually refine the Darul Uloom digital portal.
              </p>
            </div>
          </div>

          <button
            onClick={fetchFeedback}
            disabled={loading}
            className="self-start sm:self-center bg-[#F8F9F5] hover:bg-[#E5E1D8] text-gray-800 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-[#E5E1D8] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FDFBF7] border border-[#E5E1D8] p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Submissions</div>
              <div className="text-2xl font-serif font-bold text-[#111827] mt-0.5">{totalCount}</div>
            </div>
            <MessageSquareHeart className="w-8 h-8 text-gray-300" />
          </div>

          <div className="bg-[#FDFBF7] border border-[#E5E1D8] p-4 flex items-center justify-between border-l-4 border-l-[#D97706]">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Unread / New Suggestions</div>
              <div className="text-2xl font-serif font-bold text-[#D97706] mt-0.5">{newCount}</div>
            </div>
            <Clock className="w-8 h-8 text-amber-200" />
          </div>

          <div className="bg-[#FDFBF7] border border-[#E5E1D8] p-4 flex items-center justify-between border-l-4 border-l-[#065F46]">
            <div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Average User Rating</div>
              <div className="text-2xl font-serif font-bold text-[#065F46] mt-0.5 flex items-center gap-1.5">
                <span>{avgRating}</span>
                <span className="text-sm font-normal text-gray-400">/ 5</span>
              </div>
            </div>
            <Star className="w-8 h-8 text-emerald-200 fill-emerald-100" />
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 pt-2 border-t border-[#E5E1D8]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search feedback text, names, emails, phones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-[#FDFBF7] border border-[#E5E1D8] focus:outline-hidden focus:border-[#065F46]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#FDFBF7] border border-[#E5E1D8] px-2 py-1">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="text-xs bg-transparent border-none focus:outline-hidden font-bold text-gray-700"
              >
                <option value="all">All Statuses ({totalCount})</option>
                <option value="new">New ({newCount})</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved / Implemented</option>
              </select>
            </div>

            <div className="flex items-center gap-1 bg-[#FDFBF7] border border-[#E5E1D8] px-2 py-1">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs bg-transparent border-none focus:outline-hidden font-bold text-gray-700"
              >
                <option value="all">All Categories</option>
                <option value="General Suggestion">General Suggestion</option>
                <option value="Design & Usability">Design & Usability</option>
                <option value="Content & Information">Content & Information</option>
                <option value="Islamic Accuracy & Arabic">Islamic Accuracy & Arabic</option>
                <option value="Mobile & Speed">Mobile & Speed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-[#065F46] border-t-transparent rounded-full animate-spin"></div>
            <span>Loading visitor feedback records...</span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-[#E5E1D8] bg-[#FDFBF7] space-y-2">
            <MessageSquareHeart className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-xs font-bold text-gray-600">No feedback matching your filters.</p>
            <p className="text-[11px] text-gray-400">Visitors can submit feedback through the bottom of the website.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className={`border p-5 space-y-3 transition-all ${
                  item.status === 'new'
                    ? 'bg-[#FDFBF7] border-l-4 border-l-[#D97706] border-[#E5E1D8]'
                    : item.status === 'resolved'
                    ? 'bg-white border-l-4 border-l-[#065F46] border-[#E5E1D8]'
                    : 'bg-white border-[#E5E1D8]'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E1D8] pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#111827]">
                      {item.name || 'Anonymous Visitor'}
                    </span>
                    {(item.email || item.phone) && (
                      <span className="text-[11px] text-gray-500 font-mono">
                        ({[item.email, item.phone].filter(Boolean).join(' • ')})
                      </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F8F9F5] text-[#065F46] border border-[#E5E1D8] px-2 py-0.5">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= (item.rating || 5)
                              ? 'text-[#D97706] fill-[#D97706]'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {new Date(item.date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Feedback Message */}
                <div className="bg-[#F8F9F5] border border-[#E5E1D8] p-3.5 text-xs sm:text-sm text-[#374151] leading-relaxed">
                  {item.message}
                </div>

                {/* Footer Controls & Status Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                      Status:
                    </span>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'new')}
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 border transition-colors cursor-pointer ${
                        item.status === 'new'
                          ? 'bg-[#D97706] text-white border-[#D97706]'
                          : 'bg-white text-gray-600 border-[#E5E1D8] hover:bg-gray-100'
                      }`}
                    >
                      New
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'reviewed')}
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 border transition-colors cursor-pointer ${
                        item.status === 'reviewed'
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-gray-600 border-[#E5E1D8] hover:bg-gray-100'
                      }`}
                    >
                      Reviewed
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'resolved')}
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 border transition-colors cursor-pointer ${
                        item.status === 'resolved'
                          ? 'bg-[#065F46] text-white border-[#065F46]'
                          : 'bg-white text-gray-600 border-[#E5E1D8] hover:bg-gray-100'
                      }`}
                    >
                      Resolved
                    </button>
                  </div>

                  <button
                    onClick={() => setItemToDelete({ id: item.id, author: item.name || 'Anonymous' })}
                    className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 font-bold uppercase tracking-wider p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Confirmation Modal for Delete */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-[#E5E1D8] border-t-4 border-t-red-600 max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-serif font-bold text-[#111827]">
                Delete Feedback Record?
              </h3>
            </div>
            <p className="text-xs text-[#4B5563]">
              Are you sure you want to permanently delete the feedback entry from{' '}
              <strong>"{itemToDelete.author}"</strong>? This action cannot be undone.
            </p>
            <div className="pt-2 flex justify-end gap-3 border-t border-[#E5E1D8]">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
