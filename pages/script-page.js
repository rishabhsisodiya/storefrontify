import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';


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
    const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
    return (
        <div>
            <p>Hello From Script Page</p>
        </div>
    )
}

export default ScriptPage;
