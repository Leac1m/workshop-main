import './App.css'
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import NoteList from "@/components/notes/note-list";
import NoteEditor from "@/components/notes/note-editor";
import type { Note } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const initialNotes: Note[] = [
  {
    id: "1",
    title: "My First Note",
    content: "This is the content of my first note, stored securely on the blockchain... hypothetically.",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "2",
    title: "Q2 Roadmap Ideas",
    content: "- Launch v2 of the protocol.\n- Integrate with other DeFi legos.\n- Airdrop for early users?",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "3",
    title: "Meeting with Vitalik",
    content: "Discuss the future of Ethereum and the role of decentralized applications. He liked the idea of EtherNotes!",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
];

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    // This ensures the component only renders on the client, avoiding hydration mismatches.
    setIsClient(true);
    // Load notes from local storage or use initial notes
    const savedNotes = localStorage.getItem("suinotes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
      }));
      setNotes(parsedNotes);
    } else {
      setNotes(initialNotes);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("ethernotes", JSON.stringify(notes));
    }
  }, [notes, isClient]);


  const handleSaveNote = (noteData: { title: string; content: string }) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (noteToEdit) {
          // Edit existing note
          setNotes(
            notes.map((n) =>
              n.id === noteToEdit.id ? { ...n, ...noteData } : n
            )
          );
          toast({
            title: "Transaction Success",
            description: "Your note has been updated.",
          });
        } else {
          // Create new note
          const newNote: Note = {
            id: crypto.randomUUID(),
            ...noteData,
            createdAt: new Date(),
          };
          setNotes([newNote, ...notes]);
          toast({
            title: "Transaction Success",
            description: "Your new note has been created.",
          });
        }
        setIsEditorOpen(false);
        setNoteToEdit(undefined);
        resolve();
      }, 1500);
    });
  };

  const handleEditNote = (note: Note) => {
    setNoteToEdit(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = (noteId: string) => {
    return new Promise<void>((resolve) => {
       setTimeout(() => {
        setNotes(notes.filter((n) => n.id !== noteId));
         toast({
            title: "Transaction Success",
            description: "Your note has been deleted.",
            variant: "destructive",
          });
        resolve();
      }, 1500);
    });
  };

  const handleOpenNewNoteEditor = () => {
    setNoteToEdit(undefined);
    setIsEditorOpen(true);
  };
  
  if (!isClient) {
    return null; 
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-headline text-primary tracking-wider">
            My Notes
          </h1>
          <Button onClick={handleOpenNewNoteEditor} className="shadow-glow-primary transition-all hover:shadow-lg hover:shadow-glow-primary">
            <Plus className="mr-2 h-4 w-4" />
            Create Note
          </Button>
        </div>
        <NoteList notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
      </main>
      <NoteEditor
        isOpen={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        onSave={handleSaveNote}
        note={noteToEdit}
      />
    </div>
  );
}

