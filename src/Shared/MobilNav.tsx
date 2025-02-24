import Link from "next/link";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableOfContents } from "lucide-react";

const MobilNav = () => {
  return (
    <div>
      <div className="lg:hidden block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TableOfContents />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="left" className="me-2">
            {[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
              { name: "Book", path: "/dashboard/book" },
              { name: "Rank", path: "/rank" },
              { name: "About", path: "/about" },
            ].map((item, index) => (
              <DropdownMenuItem key={index}>
                <Link href={item.path} className="flex-1">
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MobilNav;
