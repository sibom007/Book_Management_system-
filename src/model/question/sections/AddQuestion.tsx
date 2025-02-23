import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/drawer";
import QuestionForm from "./QuestionForm";

const AddQuestion = ({ BookId }: { BookId: string }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Add Question</Button>
          </DialogTrigger>
          <DialogContent className="bg-black">
            <DialogHeader>
              <DialogTitle>
                <Header name="Add some Question" variant="secondary" />
              </DialogTitle>
              <QuestionForm BookId={BookId} />
              <DialogDescription></DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={"secondary"}>Add Question</Button>
          </DrawerTrigger>
          <DrawerContent className="bg-black">
            <DrawerHeader>
              <DrawerTitle>
                <Header name="Add some Question" variant="secondary" />
              </DrawerTitle>
              <div>
                <QuestionForm BookId={BookId} />
              </div>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default AddQuestion;
