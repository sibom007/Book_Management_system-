import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BookAddForm from "./BookAddForm";
import Header from "@/components/Header";

const AddBook = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Add Book</Button>
          </DialogTrigger>
          <DialogContent className="bg-black">
            <DialogHeader>
              <DialogTitle>
                <Header name="Add some Book" variant="secondary" />
              </DialogTitle>
              <BookAddForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={"secondary"}>Add Book</Button>
          </DrawerTrigger>
          <DrawerContent className="bg-black">
            <DrawerHeader>
              <DrawerTitle>
                {" "}
                <Header name="Add some Book" variant="secondary" />
              </DrawerTitle>
              <div>
                <BookAddForm />
              </div>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
export default AddBook;
