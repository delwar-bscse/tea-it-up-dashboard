"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Shield,
  Pencil,
  Lock,
  Eye,
  EyeOff,
  Save,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminDetailsInputs {
  fullName: string;
  email: string;
  golfClub: string;
}

interface ChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    formState: { errors: detailsErrors }
  } = useForm<AdminDetailsInputs>({
    defaultValues: {
      fullName: "Club Admin",
      email: "admin@golfclub.com",
      golfClub: "Greenway Golf Club",
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors }
  } = useForm<ChangePasswordInputs>();

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onDetailsSubmit = (data: AdminDetailsInputs) => {
    console.log("Details updated:", data);
    setIsEditing(false);
  };

  const onPasswordSubmit = (data: ChangePasswordInputs) => {
    console.log("Password changed:", data);
    setIsChangingPassword(false);
    resetPassword();
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10 p-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your admin account details</p>
      </div>

      <div className="space-y-6">
        {/* Admin Details Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <User className="w-5 h-5 text-gray-400" />
              <span>Admin Details</span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-sm font-bold text-[#2ea268] hover:text-[#288c5a] transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmitDetails(onDetailsSubmit)} className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-[#142d22] flex items-center justify-center text-white font-bold text-2xl relative">
                  CA
                  <div className="absolute -bottom-1 -right-1 bg-[#eefaf3] p-1.5 rounded-full border-4 border-white">
                    <Shield className="w-4 h-4 text-[#2ea268]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Club Admin</h3>
                  <span className="bg-[#eefaf3] text-[#2ea268] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1 inline-block">
                    Administrator
                  </span>
                </div>
              </div>

              <div className="grid gap-6">
                {/* Full Name */}
                <div className={cn("p-4 rounded-2xl transition-all", isEditing ? "bg-white border-2 border-[#2ea268]/20" : "bg-gray-50/50")}>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      {...registerDetails("fullName", { required: true })}
                      className="w-full font-bold text-gray-900 outline-none bg-transparent"
                    />
                  ) : (
                    <p className="font-bold text-gray-900">Club Admin</p>
                  )}
                </div>

                {/* Email Address */}
                <div className={cn("p-4 rounded-2xl transition-all", isEditing ? "bg-white border-2 border-[#2ea268]/20" : "bg-gray-50/50")}>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Email Address</label>
                  {isEditing ? (
                    <input
                      {...registerDetails("email", { required: true })}
                      className="w-full font-bold text-gray-900 outline-none bg-transparent"
                    />
                  ) : (
                    <p className="font-bold text-gray-900">admin@golfclub.com</p>
                  )}
                </div>

                {/* Golf Club */}
                <div className={cn("p-4 rounded-2xl transition-all", isEditing ? "bg-white border-2 border-[#2ea268]/20" : "bg-gray-50/50")}>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Golf Club</label>
                  {isEditing ? (
                    <input
                      {...registerDetails("golfClub", { required: true })}
                      className="w-full font-bold text-gray-900 outline-none bg-transparent"
                    />
                  ) : (
                    <p className="font-bold text-gray-900">Greenway Golf Club</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-[#2ea268] hover:bg-[#288c5a] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#2ea268]/20 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 rounded-xl font-bold text-gray-400 hover:text-gray-900 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <Lock className="w-5 h-5 text-gray-400" />
              <span>Change Password</span>
            </div>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="flex items-center gap-1.5 text-sm font-bold text-[#2ea268] hover:text-[#288c5a] transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Change
              </button>
            )}
          </div>

          <div className="p-8">
            {isChangingPassword ? (
              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-6 max-w-lg">
                <div className="space-y-4">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        {...registerPassword("currentPassword", { required: true })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ea268]/20 focus:border-[#2ea268] transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">New Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        {...registerPassword("newPassword", { required: true })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ea268]/20 focus:border-[#2ea268] transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        {...registerPassword("confirmPassword", { required: true })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2ea268]/20 focus:border-[#2ea268] transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#142d22] hover:bg-[#1a3a2e] text-white py-3 rounded-xl font-bold shadow-lg shadow-[#142d22]/20 transition-all"
                  >
                    Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="flex-1 border border-gray-100 hover:bg-gray-50 text-gray-500 py-3 rounded-xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Password last changed: <span className="font-medium text-gray-600">Never</span></p>
                <p className="text-sm text-gray-400">Click "Change" to update your password.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;