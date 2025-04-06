"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/generateInitials";
import Link from "next/link";
import { TOKEN_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";

export default function AuthenticatedAvatar({
  name,
  level,
}: {
  name: string;
  level: string;
}) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY!);
    localStorage.removeItem("bun_service_name");
    localStorage.removeItem("bun_service_level");
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar className="border">
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <p>{name}</p>
          <p className=" text-xs text-muted-foreground">{level}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <Link href="/backoffice/profile">
          <DropdownMenuItem className="cursor-pointer">
            โปรไฟล์
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer"
          variant="destructive"
        >
          <div>ออกจากระบบ</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
