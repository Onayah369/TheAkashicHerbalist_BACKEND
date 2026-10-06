const express = require("express");

const {
    getJournalEntries,
    getJournalEntry,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
} = require("../controllers/journalController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getJournalEntries);

router.get("/:entryId", protect, getJournalEntry);

router.post("/", protect, createJournalEntry);

router.put("/:entryId", protect, updateJournalEntry);

router.delete("/:entryId", protect, deleteJournalEntry);

module.exports = router;