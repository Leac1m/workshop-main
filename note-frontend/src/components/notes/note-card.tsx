"use client";
import { useState } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Note } from "@/lib/types";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => Promise<void>;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(note.id);
    // isDeleting will be false when the component unmounts after deletion.
  };

  return (
    <Card className="flex flex-col bg-card/50 border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-glow-primary hover:border-primary/50">
      <CardHeader>
        <CardTitle className="font-headline text-primary">{note.title}</CardTitle>
        <CardDescription>{format(note.createdAt, "PPP")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="whitespace-pre-wrap text-sm text-muted-foreground">{note.content}</p>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => onEdit(note)}>
          <Pencil className="h-4 w-4 text-muted-foreground transition-colors hover:text-accent" />
          <span className="sr-only">Edit Note</span>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-muted-foreground transition-colors hover:text-destructive" />
              <span className="sr-only">Delete Note</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
