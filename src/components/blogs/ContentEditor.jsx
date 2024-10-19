import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

export default function ContentEditor() {
  // State for form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");

  // Handle editor content change
  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      slug,
      metaTitle,
      metaDescription,
      content,
    };

    try {
      await axios.post("/api/content", payload); // Adjust this API endpoint as needed
      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Slug Input */}
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />

        {/* Meta Title Input */}
        <input
          type="text"
          placeholder="Meta Title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
        />

        {/* Meta Description Input */}
        <input
          type="text"
          placeholder="Meta Description"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
        />

        {/* TinyMCE Editor with Heading support */}
        <Editor
          apiKey="ke1njqwecp9wfuo74ss1ze37g0bxoziewzv4md1aszgo2ljr" // Use your API key
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            plugins: [
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              "preview",
              "fullscreen",
              "code",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview | removeformat",
            menubar: "file edit view insert format tools table help",
            height: 500,
            branding: false,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            block_formats:
              "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6",
          }}
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
