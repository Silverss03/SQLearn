import { useCallback, useState } from 'react';
import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function SimpleEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
    ],
    content: '<p>✍️ Hãy bắt đầu viết nội dung ở đây...</p>',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  if (imageUrl) {
    editor.chain().focus().setImage({ src: imageUrl }).run();
  }

  const [content, setContent] = useState(
    '<p>✍️ Hãy bắt đầu viết nội dung ở đây...</p>'
  );

  const addLink = useCallback(() => {
    const url = window.prompt('Nhập URL liên kết:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <Stack>
      <Stack direction="row" alignItems="center" mb={2}>
        <Button
          variant="text"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Button>
        <Button
          variant="text"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </Button>
        <Button
          variant="text"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </Button>
        <Button
          variant="text"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </Button>
        <Button variant="text" onClick={addLink}>
          🔗
        </Button>
        <Button
          variant="text"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          ❌ Gỡ link
        </Button>

        <div style={{ textAlign: 'center' }}>
          <input
            type="file"
            accept="image/*"
            id="upload"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label
            htmlFor="upload"
            style={{
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            📤 Tải ảnh lên
          </label>
        </div>
      </Stack>

      <Box>
        <EditorContent
          content={content}
          editor={editor}
          className="height: 200px "
        />
      </Box>

      <Button
        variant="contained"
        onClick={() => {
          setContent(editor.getHTML());
          console.log('JSON:', content);
        }}
      >
        Lưu
      </Button>
    </Stack>
  );
}
