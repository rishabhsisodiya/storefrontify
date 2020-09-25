import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Button,
  Card,
  Layout,
  Page,
  ResourceList,
  Stack,
  Spinner,
  Select,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

const CREATE_SCRIPT_TAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPTTAG = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

function ScriptPage() {
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const [deleteScripts] = useMutation(DELETE_SCRIPTTAG);
  const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);

  // displayScope
  const [displayScope, setDisplayScope] = useState("ALL");
  const handleSelectChange = useCallback((value) => setDisplayScope(value), []);

  if (loading) return <Spinner accessibilityLabel="Query loading" />;
  if (error) return <div>{error.message}</div>;

  return (
    <Page>
      <Layout>
        <Layout.Section secondary>
          <Card title="Script Tag" sectioned>
            <div style={{paddingBottom:"25px",paddingTop:"10px"}}>
              <Select
                label="Display Scope"
                options={["ALL", "ONLINE_STORE", "ORDER_STATUS"]}
                value={displayScope}
                onChange={handleSelectChange}
              />
            </div>
            <Button
              primary
              size="slim"
              type="submit"
              onClick={() => {
                createScripts({
                  variables: {
                    input: {
                      src: "https://storefrontify.herokuapp.com/test-script.js",
                      displayScope: displayScope,
                    },
                  },
                  refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
                });
              }}
            >
              Create Script Tag
            </Button>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Help (Display Scope)" sectioned>
            <ul style={{marginBottom:"-5px", marginTop:"-10px"}}>
              ALL: Run script and share script generated data in All pages
            </ul>
            <ul style={{marginBottom:"-5px"}}>
              ONLINE_STORE: Run script in store Home page and doesn't share data
              with other pages
            </ul>
            <ul>
              ORDER_STATUS: Run script in order page and doesn't share data with
              other pages
            </ul>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Script", plural: "Scripts" }}
              items={data.scriptTags.edges}
              renderItem={(item) => {
                return (
                  <ResourceList.Item id={item.id}>
                    <Stack distribution="fill">
                      <Stack.Item>
                        <p>{item.node.id}</p>
                      </Stack.Item>
                      <Stack.Item>
                        <p>{item.node.displayScope}</p>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                          type="submit"
                          onClick={() => {
                            deleteScripts({
                              variables: {
                                id: item.node.id,
                              },
                              refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
                            });
                          }}
                          destructive
                        >
                          Delete Script Tag
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default ScriptPage;
