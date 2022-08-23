import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false
});

import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
  
    ['clean']                                         // remove formatting button
  ],
  clipboard: {
    matchVisual: false,
  },
}
const formats = [
  'header',
  'background',
  'font',
  'size',
  'bold',
  'italic',
  'code',
  'link',
  'script',
  'code-block',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'direction',
  'align'
]

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const TextEditor = ({ value, setValue } : Props) => {

  return (
    <QuillNoSSRWrapper 
      theme='snow' 
      value={value} 
      modules={modules} 
      formats={formats}
      onChange={setValue}
      className="text_editor_container"
      
    />
  );
}