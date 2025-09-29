import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, FileText, ImageIcon, VideoIcon, Download, Trash2 } from "lucide-react";

interface DriveItem {
  id: number;
  name: string;
  type: "folder" | "image" | "video" | "document";
  size?: string;
  parentId?: number;
}

const mockItems: DriveItem[] = [
  { id: 1, name: "Photos", type: "folder" },
  { id: 2, name: "image1.png", type: "image", size: "1.2 Mo", parentId: 1 },
  { id: 3, name: "document.pdf", type: "document", size: "800 Ko" },
  { id: 4, name: "Videos", type: "folder" },
  { id: 5, name: "video.mp4", type: "video", size: "2.4 Mo", parentId: 4 },
];

export default function DrivePage() {
  const [currentFolder, setCurrentFolder] = useState<number | null>(null);

  const handleOpenFolder = (id: number) => setCurrentFolder(id);
  const handleBack = () => setCurrentFolder(null);

  const filteredItems = mockItems.filter(
    (item) => (currentFolder ? item.parentId === currentFolder : !item.parentId)
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "folder": return <Folder className="text-yellow-400" />;
      case "image": return <ImageIcon className="text-blue-300" />;
      case "video": return <VideoIcon className="text-pink-400" />;
      default: return <FileText className="text-white" />;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mon Drive</h1>

      {currentFolder && (
        <Button variant="ghost" onClick={handleBack} className="mb-2 text-sm text-zinc-400 hover:text-white">
          ⬅️ Retour
        </Button>
      )}

      {filteredItems.length === 0 ? (
        <p className="text-zinc-500">Aucun élément dans ce dossier.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                {getIcon(item.type)}
                <div>
                  <p className="font-medium">
                    {item.type === "folder" ? (
                      <button onClick={() => handleOpenFolder(item.id)} className="hover:underline text-yellow-400">
                        {item.name}
                      </button>
                    ) : (
                      item.name
                    )}
                  </p>
                  {item.size && <p className="text-xs text-zinc-400">{item.size}</p>}
                </div>
              </div>

              {item.type !== "folder" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => console.log("Télécharger", item.id)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => console.log("Supprimer", item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}