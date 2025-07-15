import { deleteUser } from "@/api/lib/delete-user";
import HomeButton from "@/components/button";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface DeleteProfileProps {
  userId: string;
  onClose: () => void; // to close modal after delete
  onSuccess?: () => void; // optional callback
}

const DeleteProfile = ({ userId, onClose, onSuccess }: DeleteProfileProps) => {
  const mutation = useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      if (onSuccess) onSuccess();
      onClose(); // close modal after successful deletion
    },
    onError: (error: any) => {
      console.error("Delete failed:", error);
    },
  });

  return (
    <div className="mt-7">
      <p className="text-[14px] text-[#050505]/70 text-center">
        You’re about to delete this user account. Are you sure you want to deactivate this account?
      </p>
      <div className="gap-4 flex items-center justify-center mt-4">
        <HomeButton
          title={mutation.isPending ? "Deleting..." : "Delete"}
          type="button"
          bg="#EF0808"
          width="129px"
          height="40px"
          borderRadius="20px"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          //  aria-busy={mutation.isPending}
        />
        <HomeButton
          title="Cancel"
          type="button"
          bg="#FAFAFA"
          width="129px"
          height="40px"
          border="1px solid grey"
          borderRadius="20px"
          color="#707070"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default DeleteProfile;
