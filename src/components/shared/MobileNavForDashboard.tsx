import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import DashboardNavItems from "./DashboardNavItems";

const MobileNavForDashboard = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col gap-6 bg-white md:hidden"
        >
          <Separator className="border border-gray-50" />
          <DashboardNavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNavForDashboard;
