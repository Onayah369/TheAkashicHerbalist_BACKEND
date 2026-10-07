const Herb = require("../models/Herb");
const JournalEntry = require("../models/JournalEntry");

const getJournalEntries = async (req, res) => {
    try {
        const entries = await JournalEntry.find({
            user: req.user.userId,
        })
            .populate("herb")
            .sort({ createdAt: -1 });

            res.json({ entries });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching journal entries",
            error: error.message,
        });
    }
};

const getJournalEntry = async (req, res) => {
    try {
        const entry = await JournalEntry.findOne({
            _id: req.params.entryId,
            user: req.user.userId,
        }).populate("herb");

        if (!entry) {
            return res.status(404).json({
                message: "Journal entry not found",
            });
        }

        res.json({ entry });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching journal entry",
            error: error.message,
        });
    }
};

const createJournalEntry = async (req, res) => {
    try {
        const { title, content, herb, isPublic } = req.body;

        const herbExists = await Herb.findById(herb);

        if (!herbExists) {
            return res.status(404).json({
                message: "Herb not found",
            });
        }

        const entry = await JournalEntry.create({
            title,
            content,
            herb,
            user: req.user.userId,
            isPublic,
        });

        await entry.populate("herb");

        res.status(201).json({
            message: "Journal entry created successfully",
            entry,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating journal entry",
            error: error.message,
        });
    }
};

const updateJournalEntry = async (req, res) => {
    try {
        const { title, content, herb, isPublic } = req.body;

        const entry = await JournalEntry.findOne({
            _id: req.params.entryId,
            user: req.user.userId,
        });

        if (!entry) {
            return res.status(404).json({
                message: "Journal entry not found",
            });
        }

        if (herb) {
            const herbExists = await Herb.findById(herb);

            if (!herbExists) {
                return res.status(404).json({
                    message: "Herb not found",
                });
            }

            entry.herb = herb;
        }

        if (title !== undefined) {
            entry.title = title;
        }

        if (content !== undefined) {
            entry.content = content;
        }

        if (isPublic !== undefined) {
            entry.isPublic = isPublic;
        }

        await entry.save();
        await entry.populate("herb");

        res.json({
            message: "Journal entry updated successfully",
            entry,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating journal entry",
            error: error.message,
        });
    }
};

const deleteJournalEntry = async (req, res) => {
    try {

        const entry = await JournalEntry.findOneAndDelete({
            _id: req.params.entryId,
            user: req.user.userId,
        });

        if (!entry) {
            return res.status(404).json({
                message: "Journal entry not found",
            });
        }

        res.json({
            message: "Journal entry deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting journal entry",
            error: error.message,
        });
    }
};

module.exports = {
    getJournalEntries,
    getJournalEntry,
    createJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
};