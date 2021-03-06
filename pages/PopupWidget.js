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
import axios from "axios";

const PopupWidget = (props) => {
  const [active, setActive] = useState(false);
  const [file, setFile] = useState();
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const hasError = rejectedFiles.length > 0;
  const [createWidget, setCreateWidget] = useState(false);
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

  const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/svg"];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file?.name}
        source={
          validImageTypes.indexOf(file?.type) > 0
            ? window.URL.createObjectURL(file)
            : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
        }
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

  const postData = useCallback(
    () => {
      const url= "/api/shop"
      let popupData= {
        image:file,
        popHeading,
        popContent,
        textButton,
      }
      console.log(popupData);
      axios
      .post(url, {shop:props.shop,popupData})
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
    },
    [popHeading,popContent,textButton,file],
  )

  const enableCreateWidget = useCallback(
    () => {
      (createWidget)=>setCreateWidget(!createWidget)
    },
    [createWidget],
  )

  return (
    // {(!createWidget)?(<Button></Button>):null}
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
        <Button primary onClick={postData}>
          Add to Store
        </Button>
      </ButtonGroup>
      <div>
        <Modal open={active} onClose={handleModel}>
          <Modal.Section>
            <TextContainer>
              <div style={{ maxWidth: "700px", maxHeight: "500px" }}>
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
                    src={
                      validImageTypes.indexOf(file?.type) > 0
                        ? window.URL.createObjectURL(file)
                        : "https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304"
                    }
                    alt={file?.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      maxHeight:"200px"
                    }}
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
              </div>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    </Stack>
  );
};

export default PopupWidget;
