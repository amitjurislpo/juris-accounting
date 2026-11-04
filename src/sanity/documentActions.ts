import { useDocumentOperation, type DocumentActionComponent, type DocumentActionsResolver } from "sanity";

/**
 * Removing a post from the site needs a checker, like putting it there. So for
 * posts: no Unpublish, and Delete only while there is no published version.
 *
 * Enforced in this Studio only. A project admin can still delete through sanity.io
 * or the API; the site then drops the post within its cache window.
 */
export function deleteOnlyIfUnpublished(original: DocumentActionComponent): DocumentActionComponent {
  const Guarded: DocumentActionComponent = (props) => {
    // Always called, so hooks inside run in the same order on every render.
    const description = original(props);
    return props.published ? null : description;
  };
  Guarded.action = original.action;
  Guarded.displayName = "DeleteOnlyIfUnpublished";
  return Guarded;
}

/**
 * Publishing clears old review feedback first, so it cannot look current once the
 * author has resubmitted. A read-only field cannot be cleared by hand, and it never
 * blocks publishing because nothing validates it.
 */
export function clearFeedbackOnPublish(original: DocumentActionComponent): DocumentActionComponent {
  const Wrapped: DocumentActionComponent = (props) => {
    const description = original(props);
    const { patch } = useDocumentOperation(props.id, props.type);
    if (!description) return description;
    return {
      ...description,
      onHandle: () => {
        if (props.draft?.reviewFeedback) patch.execute([{ unset: ["reviewFeedback"] }]);
        description.onHandle?.();
      },
    };
  };
  Wrapped.action = original.action;
  Wrapped.displayName = "ClearFeedbackOnPublish";
  return Wrapped;
}

export const resolveDocumentActions: DocumentActionsResolver = (prev, context) => {
  if (context.schemaType !== "post") return prev;
  return prev
    .filter((action) => action.action !== "unpublish")
    .map((action) => {
      if (action.action === "delete") return deleteOnlyIfUnpublished(action);
      if (action.action === "publish") return clearFeedbackOnPublish(action);
      return action;
    });
};
