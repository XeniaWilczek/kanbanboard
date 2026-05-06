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
    <div className="profile-container flex flex-col justify-center-items-center gap-4 w-[30vw] h-auto mx-auto p-6">
      <h1 className="text-2xl font-bold">Profil</h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">Nutzername ändern</CardTitle>
          <CardDescription className="text-xs">
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
            />
          </Field>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button className="self-start text-sm text-black text-center font-semibold p-2 rounded-sm bg-cyan-400 hover:bg-cyan-300">
              Speichern
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
