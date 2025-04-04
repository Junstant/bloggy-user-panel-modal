
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserAdminModal } from "@/hooks/useUserAdminModal";
import UserList from "./UserList";
import UserForm from "./UserForm";

const UserAdminModal = () => {
  const { isOpen, closeModal } = useUserAdminModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          <div className="bg-primary/5 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">User Administration</h2>
            <p className="text-sm text-muted-foreground">
              Manage your blog users and their permissions
            </p>
          </div>

          <Tabs defaultValue="users" className="flex-1 flex flex-col">
            <div className="border-b px-6">
              <TabsList className="mb-0">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="new">New User</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="users" className="mt-0 h-full">
                <UserList />
              </TabsContent>
              <TabsContent value="new" className="mt-0 p-6">
                <UserForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserAdminModal;
