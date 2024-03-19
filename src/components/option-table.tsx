import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust import if necessary
import { Message } from "@/lib/types";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  DELETE_MESSAGE,
  GET_MESSAGES,
  RECEIVE_MESSAGE_SUBSCRIPTION,
} from "../graphql/query";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

const OptionTable = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES);
  const [deleteMessageMutation] = useMutation(DELETE_MESSAGE);
  const [messages, setMessages] = useState<Message[]>([]);
  useSubscription(RECEIVE_MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: (subscriptionData) => {
      console.log(
        "=>  OptionTable  subscriptionData:",
        subscriptionData?.subscriptionData?.data
      );
    },
  });
  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteMessageMutation({ variables: { id } });
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  useEffect(() => {
    if (data?.viewMessages?.length > 0) {
      setMessages(data?.viewMessages);
    }
  }, [data]);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <>
      <Table className="w-full border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Content</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages &&
            messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="text-center">{message.name}</TableCell>
                <TableCell className="text-center">{message.content}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OptionTable;
