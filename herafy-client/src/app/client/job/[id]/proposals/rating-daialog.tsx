"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RatingDialog({
  handleAddRating,
}: {
  handleAddRating: (rating: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleAddRating(rating);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>تقيم الحرفي</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">تقيم الحرفي</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <Label htmlFor="rating">اترك تقيم للحرفي من 1 الي 5</Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
          <Button variant={"outline"} type="submit">
            تقيم
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RatingDialog;
