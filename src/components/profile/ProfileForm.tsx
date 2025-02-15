import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
const ProfileForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "user123",
    email: "user@example.com",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the user data
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные были успешно сохранены",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Имя пользователя</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="max-w-md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="max-w-md"
        />
      </div>
      <Button type="submit">Сохранить изменения</Button>
    </form>
  );
};
export default ProfileForm;