import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../user/userSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";

export const Account = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // Access user data from Redux store
  const [isEditing, setIsEditing] = useState(false); // State to control edit mode

  // React Hook Form setup with default values from user data
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "",
    },
  });

  // Update form fields when user data changes
  useEffect(() => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
  }, [user, reset]);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle form submission and update user data in Redux state
  const onSubmit = (data) => {
    const userData = {
      ...data,
      token: user.token, // Preserve existing token
    };
    dispatch(setUser({ user: userData }));
    setIsEditing(false);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center h-screen w-full p-6 m-0"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1642355008521-236f1d29d0a8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <Card className="border border-gray-200 border-opacity-30 w-full max-w-lg p-6 rounded-lg shadow-lg bg-black text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Account Information
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input
              type="text"
              {...register("firstName")}
              className={`w-full mt-1 p-3 bg-gray-800 text-white rounded-lg ${
                isEditing ? "focus:ring-2 focus:ring-blue-600" : ""
              }`}
              disabled={!isEditing}
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input
              type="text"
              {...register("lastName")}
              className={`w-full mt-1 p-3 bg-gray-800 text-white rounded-lg ${
                isEditing ? "focus:ring-2 focus:ring-blue-600" : ""
              }`}
              disabled={!isEditing}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              {...register("email")}
              className={`w-full mt-1 p-3 bg-gray-800 text-white rounded-lg ${
                isEditing ? "focus:ring-2 focus:ring-blue-600" : ""
              }`}
              disabled={!isEditing}
            />
          </div>

          {/* Password Field (Visible only when editing) */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                {...register("password")}
                className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          {/* Edit and Save Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              onClick={handleEditToggle}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                Save
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};
