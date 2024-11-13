// AccountPage.jsx

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../../user/userSlice";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useForm } from "react-hook-form";

export const Account = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // Local state to handle form data
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "",
    },
  });

  // Populate the form when user data changes
  useEffect(() => {
    reset({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
  }, [user, reset]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = (data) => {
    dispatch(setUser({ user: data })); // Here you would typically also send this to an API
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-6 m-0">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg bg-black text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Account Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm">First Name</label>
            <Input
              type="text"
              {...register("firstName")}
              className="w-full mt-1 p-2 bg-black borders focus:ring-2 focus:ring-blue-600"
              disabled={!isEditing}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm">Last Name</label>
            <Input
              type="text"
              {...register("lastName")}
              className="w-full mt-1 p-2 bg-black borders focus:ring-2 focus:ring-blue-600"
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm">Email</label>
            <Input
              type="email"
              {...register("email")}
              className="w-full mt-1 p-2 bg-black borders text-white focus:ring-2 focus:ring-blue-600"
              disabled={!isEditing}
            />
          </div>

          {/* Password */}
          {isEditing && (
            <div>
              <label className="block text-sm">Password</label>
              <Input
                type="password"
                {...register("password")}
                className="w-full mt-1 p-2 bg-black borders focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          {/* Edit and Save Buttons */}
          <div className="flex justify-between mt-4">
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


