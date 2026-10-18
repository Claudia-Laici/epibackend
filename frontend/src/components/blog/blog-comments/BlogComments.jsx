import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../../../utils/apiFetch";

const BlogComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [commentMessage, setCommentMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const data = await apiFetch("/auth/me");
      setCurrentUser(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);

    try {
      const data = await apiFetch(`/blogPosts/${postId}/comments`);

      setComments(data.comments ?? []);
    } catch (error) {
      console.error(error);
      setCommentMessage("Impossibile caricare i commenti.");
    } finally {
      setCommentsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
  }, [fetchComments, fetchCurrentUser]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setCommentMessage("");

    if (!commentText.trim()) {
      setCommentMessage("Inserisci il testo del commento.");
      return;
    }

    setSubmitting(true);

    try {
      await apiFetch(`/blogPosts/${postId}`, {
        method: "POST",
        body: JSON.stringify({
          text: commentText.trim(),
          rate: Number(rating),
        }),
      });

      await fetchComments();

      setCommentText("");
      setRating(5);
      setCommentMessage("Commento pubblicato con successo!");
    } catch (error) {
      console.error(error);
      setCommentMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (comment) => {
    try {
      const data = await apiFetch(
        `/blogPosts/${postId}/comments/${comment._id}`,
      );

      const selectedComment = data.comment;

      setEditingCommentId(selectedComment._id);
      setEditText(selectedComment.text);
      setEditRating(selectedComment.rate);
    } catch (error) {
      console.error("Errore nel recupero del commento:", error);
      setCommentMessage("Impossibile recuperare il commento.");
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setCommentMessage("");

    if (!editText.trim()) {
      setCommentMessage("Il commento non può essere vuoto.");
      return;
    }

    setSavingEdit(true);

    try {
      await apiFetch(`/blogPosts/${postId}/comment/${editingCommentId}`, {
        method: "PUT",
        body: JSON.stringify({
          text: editText.trim(),
          rate: Number(editRating),
        }),
      });

      await fetchComments();

      setEditingCommentId(null);
      setCommentMessage("Commento modificato con successo!");
    } catch (error) {
      console.error(error);
      setCommentMessage(error.message);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questo commento?",
    );

    if (!confirmed) return;

    setCommentMessage("");

    try {
      await apiFetch(`/blogPosts/${postId}/comment/${commentId}`, {
        method: "DELETE",
      });

      await fetchComments();

      setCommentMessage("Commento eliminato con successo!");
    } catch (error) {
      console.error(error);
      setCommentMessage(error.message);
    }
  };

  return (
    <section className="blog-comments">
      <h2>Commenti</h2>

      {commentsLoading ? (
        <p>Caricamento commenti...</p>
      ) : comments.length === 0 ? (
        <p>Non ci sono ancora commenti.</p>
      ) : (
        comments.map((comment) => (
          <article key={comment._id} className="blog-comment">
            <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
              <h5 className="mb-0">
                {comment.author?.nome} {comment.author?.cognome}
              </h5>

              {currentUser?._id === comment.author?._id && (
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark me-2"
                    onClick={() => handleEdit(comment)}
                  >
                    Modifica
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Elimina
                  </button>
                </div>
              )}
            </div>

            {editingCommentId === comment._id ? (
              <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor={`editText-${comment._id}`}
                    className="form-label"
                  >
                    Modifica commento
                  </label>

                  <textarea
                    id={`editText-${comment._id}`}
                    className="form-control"
                    rows="3"
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor={`editRating-${comment._id}`}
                    className="form-label"
                  >
                    Valutazione
                  </label>

                  <select
                    id={`editRating-${comment._id}`}
                    className="form-select"
                    value={editRating}
                    onChange={(event) => setEditRating(event.target.value)}
                  >
                    <option value={5}>5 - Ottimo</option>
                    <option value={4}>4 - Molto buono</option>
                    <option value={3}>3 - Buono</option>
                    <option value={2}>2 - Sufficiente</option>
                    <option value={1}>1 - Scarso</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-sm btn-primary me-2"
                  disabled={savingEdit}
                >
                  {savingEdit ? "Salvataggio..." : "Salva"}
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setEditingCommentId(null)}
                  disabled={savingEdit}
                >
                  Annulla
                </button>
              </form>
            ) : (
              <>
                <p>{comment.text}</p>
                <p>Valutazione: {comment.rate}/5</p>
              </>
            )}
          </article>
        ))
      )}

      <div className="blog-comment-form">
        <h3>Lascia un commento</h3>

        <form onSubmit={handleCommentSubmit}>
          <div className="mb-3">
            <label htmlFor={`commentText-${postId}`} className="form-label">
              Il tuo commento
            </label>

            <textarea
              id={`commentText-${postId}`}
              className="form-control"
              rows="4"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Scrivi qui il tuo commento..."
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor={`rating-${postId}`} className="form-label">
              Valutazione
            </label>

            <select
              id={`rating-${postId}`}
              className="form-select"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            >
              <option value={5}>5 - Ottimo</option>
              <option value={4}>4 - Molto buono</option>
              <option value={3}>3 - Buono</option>
              <option value={2}>2 - Sufficiente</option>
              <option value={1}>1 - Scarso</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Pubblicazione..." : "Pubblica commento"}
          </button>
        </form>
      </div>

      {commentMessage && (
        <p className="mt-3" role="status">
          {commentMessage}
        </p>
      )}
    </section>
  );
};

export default BlogComments;
