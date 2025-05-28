"use client";

import { useState } from "react";
import { Memoir } from "./Memoir"; // Assuming Memoir type is defined
import './CreateMemoir.css'

const CreateMemoir = ({ onAdd }: { onAdd: (memoir: Memoir) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [day, setDay] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !year) {
      alert("Title, description, and year are required!");
      return;
    }

    const newMemoir: Memoir = {
      id: crypto.randomUUID(),
      title,
      description,
      date: year ? `${year}-${month || "01"}-${day || "01"}` : null,
      year: Number(year),
      month: month ? Number(month) : undefined,
      day: day ? Number(day) : undefined,
    };

    onAdd(newMemoir);

    // Reset form
    setTitle("");
    setDescription("");
    setYear("");
    setMonth("");
    setDay("");
  };

  return (
    <div className="createMemoir-container">
      <h2>Create a New Memoir</h2>
      <form 
      className="createMemoir-form"
      onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year (required)"
          value={year}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
          required
        />
        <input
          type="number"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value ? Number(e.target.value) : "")}
          min={1}
          max={12}
        />
        <input
          type="number"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value ? Number(e.target.value) : "")}
          min={1}
          max={31}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Memoir</button>
      </form>
    </div>
  );
};

export default CreateMemoir;