import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { Plus } from "lucide-react";
import letStart from "../assets/let-start-illustration.svg";
import logo from "../assets/logo-in-orbit.svg";

export function EmptyGoals() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
            <img src={logo} alt="in.orbit" />
            <img src={letStart} alt="Let Start Illustration" />
            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
                Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
            </p>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Cadastrar meta
                </Button>
            </DialogTrigger>
        </div>
    );
}