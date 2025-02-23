"use client";
import Header from "@/components/Header";
import AddChapter from "@/model/chapter/sections/AddChapter";
import AddQuestion from "@/model/question/sections/AddQuestion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBookWithAllInfo } from "../../hook/useBookWithAllInfo";

const SingleBook = ({ BookId }: { BookId: string }) => {
  const { data } = useBookWithAllInfo(BookId);

  return (
    <div className="px-10">
      <Header name={data?.title || ""} variant="primary" />
      <div className="flex justify-end gap-4">
        <AddQuestion BookId={BookId} />
        <AddChapter BookId={BookId} />
      </div>
      <div className="mt-4">
        <Tabs className="w-[100%] ">
          {/* Wrapping TabsList inside ScrollArea */}
          <ScrollArea className="whitespace-nowrap overflow-x-auto ">
            <TabsList className="flex w-max cursor-pointer mb-5 bg-Sprimary py-5">
              {data?.chapters.map((chapter) => (
                <TabsTrigger key={chapter.title} value={chapter.title}>
                  {chapter.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {data?.chapters.map((chapter) => (
            <TabsContent key={chapter.title} value={chapter.title}>
              <Card className="bg-Sprimary">
                <CardHeader>
                  <CardTitle>{chapter.title} - Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {chapter.Question.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded-md flex flex-col">
                      <p>
                        <span className="text-lg font-semibold">Question</span>{" "}
                        : <span>{item.question}</span>
                      </p>
                      <p>
                        <span className="text-lg font-semibold">Answer</span> :{" "}
                        <span>{item.answer}</span>
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SingleBook;
