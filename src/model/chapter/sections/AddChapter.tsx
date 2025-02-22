import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";
import Header from "@/components/Header";
import AddChapterForm from "./AddChapterForm";
import { Button } from "@/components/ui/button";

const AddChapter = ({ BookId }: { BookId: string }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Add Chapter</Button>
          </DialogTrigger>
          <DialogContent className="bg-black">
            <DialogHeader>
              <DialogTitle>
                <Header name="Add Chapter" variant="secondary" />
              </DialogTitle>
              <AddChapterForm BookId={BookId} />
              <DialogDescription></DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={"secondary"}>Add Chapter</Button>
          </DrawerTrigger>
          <DrawerContent className="bg-black">
            <DrawerHeader>
              <DrawerTitle>
                {" "}
                <Header name="Add Chapter" variant="secondary" />
              </DrawerTitle>
              <AddChapterForm BookId={BookId} />
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
export default AddChapter;
