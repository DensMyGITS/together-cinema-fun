import { Card } from "@/components/ui/card";
import ProfileForm from "../components/profile/ProfileForm";
import PasswordSection from "../components/profile/PasswordSection";
import MainLayout from "../components/layout/MainLayout";

const Profile = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Профиль</h1>
            <p className="mt-2 text-sm text-gray-600">
              Управляйте вашими персональными данными.
            </p>
          </div>
          <Card className="p-6">
            <ProfileForm />
          </Card>
          <Card className="p-6">
            <PasswordSection />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
