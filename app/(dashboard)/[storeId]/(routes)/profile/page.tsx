import { ProfileCard } from "./components/profileCard";

const ProfilePage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
