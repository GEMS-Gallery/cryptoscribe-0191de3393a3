import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface NewPostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string, author: string) => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    const htmlContent = draftToHtml(convertToRaw(data.body.getCurrentContent()));
    onSubmit(data.title, htmlContent, data.author);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="body"
            control={control}
            defaultValue={EditorState.createEmpty()}
            rules={{ required: 'Body is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Editor
                  editorState={value}
                  onEditorStateChange={onChange}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
                {error && <Typography color="error">{error.message}</Typography>}
              </>
            )}
          />
          <Controller
            name="author"
            control={control}
            defaultValue=""
            rules={{ required: 'Author is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Author"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default NewPostModal;
