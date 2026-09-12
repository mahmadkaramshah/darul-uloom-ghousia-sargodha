import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Key, User, ShieldCheck, Lock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const AdminAccountTab: React.FC = () => {
  const { adminToken, adminUsername, showToast, refreshData } = useApp();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(adminUsername || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!currentPassword) {
      showToast('Please enter your current admin password to authenticate.', 'error');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      showToast('New password must be at least 6 characters long.', 'error');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      showToast('New password and confirm password do not match.', 'error');
      return;
    }

    if (!newUsername.trim()) {
      showToast('Username cannot be empty.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername.trim(),
          newPassword: newPassword || undefined,
          newEmail: newEmail.trim() || undefined,
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setSuccessMessage('Admin credentials have been updated successfully!');
        showToast('Admin credentials updated successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        await refreshData();
      } else {
        showToast(resData.error || 'Failed to update credentials.', 'error');
      }
    } catch (err: any) {
      showToast('Network error while updating credentials.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white p-6 border border-[#E5E1D8] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#065F46]/10 border border-[#065F46]/20 flex items-center justify-center text-[#065F46]">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#111827]">
              Admin Security & Credentials
            </h2>
            <p className="text-xs text-[#4B5563]">
              Update your administrative login username and secure password directly inside the admin panel.
            </p>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 flex items-center gap-3 text-emerald-900 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 border border-[#E5E1D8] shadow-xs space-y-6">
        
        {/* Security Notice */}
        <div className="bg-[#FDFBF7] border-l-4 border-[#065F46] p-4 text-xs text-[#4B5563] space-y-1">
          <p className="font-bold text-[#111827]">Administrative Authentication Requirement</p>
          <p>
            You must enter your current password to authorize changes. Once updated, use the new credentials for all future sign-ins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Current Password */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold uppercase text-[#111827]">
              Current Admin Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E1D8] focus:border-[#065F46] focus:outline-hidden text-xs"
              />
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
            </div>
            <p className="text-[11px] text-[#6B7280]">Required for security verification.</p>
          </div>

          {/* New Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-[#111827]">
              Admin Username <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="e.g. admin or jamia_admin"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E1D8] focus:border-[#065F46] focus:outline-hidden text-xs font-medium"
              />
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
            </div>
          </div>

          {/* New Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-[#111827]">
              Admin Recovery Email (Optional)
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="admin@darululoomghousiasargodha.org"
              className="w-full px-4 py-2.5 bg-white border border-[#E5E1D8] focus:border-[#065F46] focus:outline-hidden text-xs"
            />
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-[#111827]">
              New Password (Leave blank to keep unchanged)
            </label>
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E1D8] focus:border-[#065F46] focus:outline-hidden text-xs"
              />
              <Key className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-[#111827]">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E1D8] focus:border-[#065F46] focus:outline-hidden text-xs"
              />
              <Key className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#065F46] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#044E39] disabled:opacity-50 transition-colors flex items-center gap-2 shadow-xs"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Updating Credentials...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Save New Credentials</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
