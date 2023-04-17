import React, { useState } from 'react';

import { InputField, Button } from 'shared/components';

interface AddMovieFormProps {
  onSubmit: (data: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => void,
  onCancel: () => void;
}

export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  // TODO: Implement form for adding a movie

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ imageUrl, title, subtitle, description });
  };


  return (
    <form className="p-4" onSubmit={handleSubmit}>
    <InputField name="Url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
    <InputField name="Title" value={title} onChange={e => setTitle(e.target.value)} />
    <InputField name="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} />
    <InputField name="Description" value={description} onChange={e => setDescription(e.target.value)} />
    <div className="text-center">
      <Button>Submit</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  </form>
  );
}
