import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query {
    viewMessages {
      id
      name
      content
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($name: String!, $content: String!) {
    sendMessage(name: $name, content: $content) {
      name
      content
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($id: ID!, $content: String!) {
    updateMessage(id: $id, content: $content) {
      id
      name
      content
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: ID!) {
    deleteMessage(id: $id)
  }
`;

export const RECEIVE_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    receiveMessage {
      id
      name
      content
    }
  }
`;
