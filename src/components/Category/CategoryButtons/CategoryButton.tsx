import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CategoryButton({
    title,
    icon,
    destructive = false,
    DialogDescriptionComponent,
}: {
    title: string;
    icon: React.ReactNode;
    destructive?: boolean;
    DialogDescriptionComponent: React.ReactNode;
}) {
    return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={destructive ? "destructive" : "ghost"}
                        size="icon"
                        className="border drop-shadow-md border-gray-300">
                        {icon}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xs">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription asChild>
                            {DialogDescriptionComponent}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    );
}