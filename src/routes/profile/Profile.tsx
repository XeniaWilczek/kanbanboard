import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUsernameContext } from "@/context/usernameContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const context = useUsernameContext();
  const [username, setUsername] = useState(context.username);
  const navigate = useNavigate();

  function handleProfileSubmit() {
    //Speichern im Context und im LocalStorage
    context.setUsername(username);
    localStorage.setItem("username", username);
    navigate("/");
  }

  return (
    <div className="profile-container w-[30vw] h-auto mx-auto pt-6">
      <h1 className="text-2xl font-bold text-left mb-4 ">Profil</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nutzername ändern</CardTitle>
          <CardDescription>
            Ändere deinen Nutzernamen für das Kanban-Board.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <FieldLabel
              htmlFor="username-input"
              className="text-sm font-semibold"
            >
              Nutzername:
            </FieldLabel>
            <Input
              id="username-input"
              type="text"
              placeholder="Nutzernamen eingeben"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button variant="cyan" onClick={handleProfileSubmit}>
              Speichern
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
