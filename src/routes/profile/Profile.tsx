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

export default function Profile() {
  const [userName, setUserName] = useState("Mustername");
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
              className="text-xs font-semibold"
            >
              Nutzername:
            </FieldLabel>
            <Input
              id="username-input"
              type="text"
              placeholder="Nutzernamen eingeben"
              value={userName}
              className="text-base font-normal"
            />
          </Field>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button variant="cyan">Speichern</Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
