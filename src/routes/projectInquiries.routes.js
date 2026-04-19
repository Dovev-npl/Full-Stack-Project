import express from "express";
import { validationResult } from "express-validator";
import pool from "../db/pool.js";
import { logEvent } from "../services/log.service.js";
import { projectInquiryValidators } from "../validators/projectInquiry.validators.js";

const router = express.Router();

router.post("/", projectInquiryValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        msg: error.msg,
      })),
    });
  }

  const {
    fullName,
    email,
    companyName,
    projectType,
    preferredDate,
    message,
  } = req.body;

  try {
    const sql = `
      INSERT INTO project_inquiries
        (full_name, email, company_name, project_type, preferred_date, message)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, full_name, email, company_name, project_type, preferred_date, message, created_at
    `;

    const params = [
      fullName.trim(),
      email.trim().toLowerCase(),
      companyName?.trim() || null,
      projectType,
      preferredDate,
      message.trim(),
    ];

    const { rows } = await pool.query(sql, params);
    const inquiry = rows[0];

    await logEvent({
      actorUserId: null,
      action: "project_inquiry",
      message: `Project inquiry created (ID ${inquiry.id})`,
      entityType: "project_inquiry",
      entityId: inquiry.id,
    });

    return res.status(201).json({
      ok: true,
      data: inquiry,
      message: "Request saved successfully.",
    });
  } catch (error) {
    console.error("PROJECT INQUIRY CREATE failed:", error);
    return res.status(500).json({
      ok: false,
      error: "Database error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        full_name,
        email,
        company_name,
        project_type,
        preferred_date,
        message,
        created_at
      FROM project_inquiries
      ORDER BY created_at DESC
    `);

    return res.status(200).json({
      ok: true,
      data: rows,
    });
  } catch (error) {
    console.error("PROJECT INQUIRY READ failed:", error);
    return res.status(500).json({
      ok: false,
      error: "Database error",
    });
  }
});

export default router;
