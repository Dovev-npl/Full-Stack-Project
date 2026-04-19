import { body } from "express-validator";

export const projectInquiryValidators = [
  body("fullName")
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage("Full name must be between 2 and 120 characters."),
  body("email").trim().isEmail().withMessage("A valid email is required."),
  body("companyName")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 150 })
    .withMessage("Company name must be at most 150 characters."),
  body("projectType")
    .trim()
    .isIn([
      "Frontend audit",
      "Full-stack booking flow",
      "Database integration",
      "Security review",
    ])
    .withMessage("Please choose a valid project type."),
  body("preferredDate")
    .trim()
    .isISO8601()
    .withMessage("Preferred date must be a valid date."),
  body("message")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters."),
];
