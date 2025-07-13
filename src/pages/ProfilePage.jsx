import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import SubNav from "../components/SubNav";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { updateProfileRequest, deleteAccountRequest } from "../api/auth";
import ProfileForm from "@/components/ProfileForm";
import DeleteAccountSection from "@/components/DeleteAccountSection";

function ProfilePage() {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "info", text: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: user?.userName || "",
      email: user?.email || "",
    },
  });

  const handleProfileUpdate = useCallback(
    async (data) => {
      try {
        const hasChanges =
          data.username !== user.userName || data.email !== user.email;

        if (!hasChanges) {
          setMessage({
            type: "error",
            text: "No se detectaron cambios en el perfil.",
          });
          setIsEditing(false);
          return;
        }

        setIsLoading(true);
        const response = await updateProfileRequest(data);

        if (response?.data) {
          setUser(response.data);
          reset({
            username: response.data.userName,
            email: response.data.email,
          });
          setMessage({
            type: "success",
            text: "¡Perfil actualizado exitosamente!",
          });
        } else {
          throw new Error("No se pudo actualizar el perfil");
        }
      } catch (error) {
        setMessage({
          type: "error",
          text:
            error.response?.data?.message || "Error al actualizar el perfil",
        });
      } finally {
        setIsLoading(false);
        setIsEditing(false);
      }
    },
    [user, reset, setUser]
  );

  const handleDeleteAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteAccountRequest();
      await logout();
      window.location.href = "/";
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error al eliminar la cuenta",
      });
      setIsLoading(false);
    }
  }, [logout]);

  const toggleEdit = useCallback(() => {
    if (isEditing) {
      reset();
    }
    setIsEditing(!isEditing);
    setMessage({ type: "info", text: "" });
  }, [isEditing, reset]);

  return (
    <div>
      <SubNav page="settings" />
      <div className="container mx-auto p-5 space-y-8">
        <section className="bg-[#101010] dark:bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white dark:text-[#101010]">
              Información del Perfil
            </h2>
            {!isEditing && (
              <Button
                variant="default"
                onClick={toggleEdit}
                disabled={isLoading}
              >
                Editar Perfil
              </Button>
            )}
          </div>

          <ProfileForm
            isEditing={isEditing}
            isLoading={isLoading}
            errors={errors}
            register={register}
            onSubmit={handleSubmit(handleProfileUpdate)}
            onCancelEdit={toggleEdit}
            message={message}
          />
        </section>

        <DeleteAccountSection
          isLoading={isLoading}
          onDelete={handleDeleteAccount}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
