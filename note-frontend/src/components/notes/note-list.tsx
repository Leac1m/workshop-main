import NoteCard from "./note-card";
import type { Note } from "@/lib/types";

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => Promise<void>;
}

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
        <h3 className="text-xl font-medium">No notes yet</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Click "Create Note" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
