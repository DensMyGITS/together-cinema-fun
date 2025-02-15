import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
const PasswordSection = () => {
  const { toast } = useToast();
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Ошибка",
        description: "Новые пароли не совпадают",
        variant: "destructive",
      });
      return;
    }
    // Here you would typically make an API call to update the password
    toast({
      title: "Пароль обновлен",
      description: "Ваш пароль был успешно изменен",
    });
    setPasswords({ current: "", new: "", confirm: "" });
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Изменить пароль</h2>
        <p className="mt-1 text-sm text-gray-600">
          Убедитесь, что ваш новый пароль надежный и уникальный
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Текущий пароль</Label>
          <Input
            id="currentPassword"
            type="password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="max-w-md"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">Новый пароль</Label>
          <Input
            id="newPassword"
            type="password"
            value={passwords.new}
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            className="max-w-md"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="max-w-md"
          />
        </div>
        <Button type="submit">Обновить пароль</Button>
      </form>
    </div>
  );
};
export default PasswordSection;