import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Spinner } from "@shopify/polaris";

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

const ScriptPage = () => {
  // const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);
  if (loading) return <Spinner accessibilityLabel="Query Spinner" />;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <p>These are available script tags</p>
      {data.scriptTags.edges.map((item) => (
          <div key={item.node.id}>
              <p>{item.node.id}</p>
          </div>
      ) )}
    </div>
  );
};

export default ScriptPage;
