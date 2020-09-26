import React, { useCallback, useState } from "react";
import {
  Stack,
  Banner,
  Caption,
  DropZone,
  List,
  Thumbnail,
  Layout,
} from "@shopify/polaris";

const PopupWidget = () => {
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [popHeading, setPopHeading] = useState("Get on our list!");
  const [popContent, setPopContent] = useState(
    "Receive the latest trends and the best out of the best"
  );
  const [textButton, setTextButton] = useState("Subscribe");

  const handleHeadingChange = useCallback((newValue) => setPopHeading(newValue), []);
  const handleContentChange = useCallback((newValue) => setPopContent(newValue), []);
  const handleTextChange = useCallback((newValue) => setTextButton(newValue), []);
  
  const hasError = rejectedFiles.length > 0;

  const handleDrop = useCallback(
    (_droppedFiles, acceptedFiles, rejectedFiles) => {
      setFiles((files) => [...files, ...acceptedFiles]);
      setRejectedFiles(rejectedFiles);
    },
    []
  );

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <Stack vertical>
      {files.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name} <Caption>{file.size} bytes</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );

  const errorMessage = hasError && (
    <Banner
      title="The following images couldn’t be uploaded:"
      status="critical"
    >
      <List type="bullet">
        {rejectedFiles.map((file, index) => (
          <List.Item key={index}>
            {`"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone accept="image/*" type="image" onDrop={handleDrop}>
        {uploadedFiles}
        {fileUpload}
      </DropZone>
      <TextField
        label="Popup Heading"
        value={popHeading}
        onChange={handleHeadingChange}
      />
      <TextField
        label="Popup Content"
        value={popContent}
        onChange={handleContentChange}
      />
      <TextField
        label="Text on Button"
        value={textButton}
        onChange={handleTextChange}
      />
    </Stack>
  );
};

export default PopupWidget;
