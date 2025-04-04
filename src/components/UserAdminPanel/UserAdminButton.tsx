
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useUserAdminModal } from "@/hooks/useUserAdminModal";

const UserAdminButton = () => {
  const { openModal } = useUserAdminModal();

  return (
    <Button
      onClick={openModal}
      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
    >
      <Users size={16} />
      <span>Blog Admin</span>
    </Button>
  );
};

export default UserAdminButton;
