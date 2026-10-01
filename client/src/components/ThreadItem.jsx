import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateThread, deleteThread } from "../services/threads.service";

export default function ThreadItem({ thread }) {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => updateThread(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.invalidateQueries({ queryKey: ["thread", variables.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteThread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  return (
    <div className="thread-item">
      <h3>{thread.title}</h3>
      <button
        onClick={() =>
          editMutation.mutate({ id: thread.id, data: { title: "Updated Title" } })
        }
        disabled={editMutation.isPending}
      >
        {editMutation.isPending ? "Saving…" : "Save"}
      </button>
      <button
        onClick={() => deleteMutation.mutate(thread.id)}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? "Deleting…" : "Delete"}
      </button>
      {editMutation.isError && <p className="err">Edit failed</p>}
      {deleteMutation.isError && <p className="err">Delete failed</p>}
    </div>
  );
}
