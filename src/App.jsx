import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSave } from "react-icons/fi";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!title.trim() || !content.trim()) return;
    if (editIndex !== null) {
      // ✅ Update note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = { title, content };
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // ✅ Add new note
      setNotes([...notes, { title, content }]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (index) => {
    setTitle(notes[index].title);
    setContent(notes[index].content);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
    if (editIndex === index) {
      setTitle("");
      setContent("");
      setEditIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg tracking-wide">
        ✨ Personal Notes
      </h1>

      {/* Note Input Box */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 w-full max-w-lg mb-10">
        <input
          className="w-full p-3 border-2 border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="📝 Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-3 border-2 border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows="3"
          placeholder="💡 Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          onClick={handleAddOrUpdate}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-lg font-semibold transition-all ${
            editIndex !== null
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {editIndex !== null ? (
            <>
              <FiSave /> Save Changes
            </>
          ) : (
            <>
              <FiPlus /> Add Note
            </>
          )}
        </button>
      </div>

      {/* Notes List */}
      <div className="grid gap-6 w-full max-w-4xl">
        {notes.length === 0 && (
          <p className="text-white text-lg text-center opacity-90">
            No notes yet... ✍️ Start writing!
          </p>
        )}
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white/95 shadow-lg rounded-2xl p-5 flex justify-between items-start border-l-8 border-purple-500 hover:scale-[1.02] transition-transform"
          >
            <div className="max-w-lg">
              <h2 className="font-bold text-xl text-gray-800 mb-2">
                {note.title}
              </h2>
              <p className="text-gray-600">{note.content}</p>
            </div>
            <div className="flex gap-4 ml-4">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FiEdit2 size={22} />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <FiTrash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
