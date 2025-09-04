import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/Container";
import { Input, Textarea } from "../components/Input";
import Button from "../components/Button";
import { Events } from "../lib/api";
import { toInputLocal } from "../lib/date";
import { useLocation, useNavigate } from "react-router-dom";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const errorVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

export default function EventForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editing = Boolean(state?.event);
  const [form, setForm] = useState({
    title: "",
    dateTime: toInputLocal(),
    location: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editing) {
      const e = state.event;
      setForm({
        title: e.title,
        dateTime: toInputLocal(e.dateTime),
        location: e.location,
        description: e.description || "",
      });
    }
  }, [editing, state]);

  const submit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (editing) {
        await Events.update(state.event._id, {
          ...form,
          dateTime: new Date(form.dateTime).toISOString(),
        });
      } else {
        await Events.create({
          ...form,
          dateTime: new Date(form.dateTime).toISOString(),
        });
      }
      navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to save");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto mt-8"
      >
        <motion.div
          className="card p-8 shadow-xl rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            variants={fieldVariants}
          >
            {editing ? "Edit Event" : "Create Event"}
          </motion.h1>

          <AnimatePresence>
            {error && (
              <motion.div
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={submit} className="space-y-6">
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Title
              </label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="text-lg py-3"
                placeholder="Enter event title"
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Date & Time
              </label>
              <Input
                type="datetime-local"
                value={form.dateTime}
                onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                required
                min={new Date().toISOString().slice(0, 16)} 
                className="py-3"
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Location
              </label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                className="py-3"
                placeholder="Where is the event?"
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Description (optional)
              </label>
              <Textarea
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="py-3"
                placeholder="Tell us more about your event..."
              />
            </motion.div>

            <motion.div className="flex gap-4 pt-4" variants={fieldVariants}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editing ? "Saving..." : "Creating..."}
                    </>
                  ) : editing ? (
                    "Save Changes"
                  ) : (
                    "Create Event"
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-3"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </Container>
  );
}
