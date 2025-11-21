import { TextEditor } from '../TextEditor';

export default function TextEditorExample() {
  return (
    <div className="w-full h-96 p-6">
      <TextEditor onTextChange={() => {}} onSuggestionAccept={() => {}} />
    </div>
  );
}
