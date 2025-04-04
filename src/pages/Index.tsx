
import UserAdminButton from "@/components/UserAdminPanel/UserAdminButton";
import UserAdminModal from "@/components/UserAdminPanel/UserAdminModal";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Blog Administration</h1>
          <p className="text-gray-600 mb-8">
            Welcome to your blog management dashboard. Access the user administration panel 
            to manage your blog users, roles and permissions.
          </p>
          <UserAdminButton />
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-medium mb-4">Quick Tips</h2>
          <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
            <li>Click on "Admin Panel" to open the user management modal</li>
            <li>Use the search to quickly find users</li>
            <li>Add new users using the "New User" tab</li>
            <li>Edit or delete users using the menu on each row</li>
          </ul>
        </div>
      </div>
      
      {/* The modal component that will be triggered by the button */}
      <UserAdminModal />
    </div>
  );
};

export default Index;
