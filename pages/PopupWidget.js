import React, { useCallback, useState } from "react";
import {
  Stack,
  Banner,
  Caption,
  DropZone,
  List,
  Thumbnail,
  Layout,
  TextField,
  Card,
  ButtonGroup,
  Button,
  Modal,
  TextContainer,
} from "@shopify/polaris";

const PopupWidget = () => {
  const [active, setActive] = useState(true);
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [popHeading, setPopHeading] = useState("Get on our list!");
  const [popContent, setPopContent] = useState(
    "Receive the latest trends and the best out of the best"
  );
  const [textButton, setTextButton] = useState("Subscribe");

  const handleHeadingChange = useCallback(
    (newValue) => setPopHeading(newValue),
    []
  );
  const handleContentChange = useCallback(
    (newValue) => setPopContent(newValue),
    []
  );
  const handleTextChange = useCallback(
    (newValue) => setTextButton(newValue),
    []
  );

  const handleModel = useCallback(() => setActive(!active), [active]);
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
      <ButtonGroup>
        <Button onClick={handleModel}>Preview</Button>
        <Button primary onClick={ ()=> alert('widget Added')}>Add to Store</Button>
      </ButtonGroup>
      <div style={{ height: "500px" }}>
        <Modal open={active} onClose={handleModel}>
          <Modal.Section>
            <TextContainer>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "50%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                }}
              >
                <img
                  src="https://bucket.mlcdn.com/a/2384/2384591/images/6774149206a58f05547bc10c499248404c907d7b.jpeg/e11c41a0eb4fb1bb73c36636ec16d818a8289d3e.jpeg"
                  alt="store img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25%",
                  textAlign: "center",
                  padding: "2%",
                }}
              >
                <h1>{popHeading}</h1>
                <p>{popContent}</p>
              </div>
              <div
                className="popoverForm"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20%",
                }}
              >
                <input
                  id="cEmail"
                  type="email"
                  style={{
                    width: "50%",
                    marginRight: "1%",
                    marginLeft: "1%",
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                  }}
                  placeholder="Email"
                />
                <button
                  id="sendemailbutton"
                  style={{
                    width: "max-content",
                    maxWidth: "170px",
                    color: "#212529",
                    borderRadius: "10px",
                    marginRight: "1%",
                    marginLeft: "1%",
                  }}
                >
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    {textButton}
                  </p>
                </button>
              </div>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    </Stack>
  );
};

export default PopupWidget;
