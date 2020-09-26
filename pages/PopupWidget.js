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
  const [active, setActive] = useState(false);
  const [file, setFile] = useState();
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;

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

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, rejectedFiles) => {
      setFile((file) => acceptedFiles[0]);
      setRejectedFiles(rejectedFiles);
    },
    []
  );

  const imageUrl = () => (window.URL.createObjectURL(file));
console.log(imageUrl);
  // const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  
  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file?.name}
        source={imageUrl}
      />
      <div>
        {file?.name} <Caption>{file?.size} bytes</Caption>
      </div>
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
            {`"${file?.name}" is not supported. File type must be .gif, .jpg, .png or .svg.`}
          </List.Item>
        ))}
      </List>
    </Banner>
  );

  return (
    <Stack vertical>
      {errorMessage}
      <DropZone
        accept="image/*"
        type="image"
        allowMultiple={false}
        onDrop={handleDropZoneDrop}
      >
        {uploadedFile}
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
        <Button primary onClick={() => alert("widget Added")}>
          Add to Store
        </Button>
      </ButtonGroup>
      <div>
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
                  src={imageUrl}
                  alt={file?.name}
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
                <h1 style={{ fontWeight: "bold" }}>{popHeading}</h1>
                <h3 style={{ fontSize: "1rem" }}>{popContent}</h3>
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
