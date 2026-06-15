import React from "react";
import {
  AltRoute as AltRouteIcon,
  Source as SourceIcon,
  TableRows as TableRowsIcon,
  Translate as TranslateIcon,
  Rule as RuleIcon,
  Terminal as TerminalIcon,
  MenuBook as MenuBookIcon,
  Speed as SpeedIcon,
  DocumentScanner as DocumentScannerIcon,
  HistoryToggleOff as HistoryIcon,
  Inventory as OrdersIcon,
  ReceiptLong as CreditsIcon,
  Description as OthersIcon,
  DataObject as JsonIcon,
  GridOn as CsvIcon,
  MailOutline as MailIcon,
  Receipt as InvoiceIcon,
} from "@mui/icons-material";

export const features = [
  { icon: <DocumentScannerIcon />, title: "Layout-Aware Parsing", shortTitle: "Layout Mode", desc: "Columnar text alignment preserving horizontal and vertical indices using custom column coordinates." },
  { icon: <TranslateIcon />, title: "Multilingual Alignment", shortTitle: "Multilingual", desc: "Automatic key mapping for document formats written in German, French, Lithuanian, Dutch, Polish, etc." },
  { icon: <RuleIcon />, title: "Schema Enforcement", shortTitle: "Enforcement", desc: "Strict data validation loops executing dry-run matches against JSON Schemas to ensure zero-error normalization." },
  { icon: <TerminalIcon />, title: "Testing Automation", shortTitle: "Diagnostics", desc: "Double-folder local testing environments creating text extracts and diagnostic trace logs dynamically." },
  { icon: <AltRouteIcon />, title: "Multi-Format Parser", shortTitle: "Multi-Format", desc: "Unified ingestion for PDF documents, structured XLSX spreadsheets, and multipart EML mail bodies." },
  { icon: <MenuBookIcon />, title: "Knowledge Specs", shortTitle: "Documentation", desc: "Six comprehensive strategic handbooks detailing coordinate alignments, fallback anchors, and string sanitations." },
];

export const systemNodes = {
  ingestion: {
    title: "Document Intake (PDF, XLSX, EML)",
    shortTitle: "Intake",
    icon: <SourceIcon />,
    description: "Ingests raw logistic files uploaded by users or parsed from automated webhook email feeds, routing them to format-specific ingestion modules.",
    role: "Intakes the file format, extracts raw bytes, and routes to format helper methods.",
  },
  validator: {
    title: "Dynamic Validator (Layout Auto-Discovery)",
    shortTitle: "Dynamic Validator",
    icon: <AltRouteIcon />,
    description: "Iterates dynamically through registered document validator classes, detecting file metadata and layout footprints to classify document types.",
    role: "Scans and maps document types dynamically to corresponding blueprints.",
  },
  orders_blueprint: {
    title: "Orders Blueprint",
    shortTitle: "Orders Blueprint",
    icon: <OrdersIcon />,
    description: "Blueprint validation rule that structures coordinates and fields specifically for Transport Orders, loading/unloading stops, and carrier metadata.",
    role: "Validates order loading/unloading stops, cargo details, and carrier metadata.",
  },
  credit_note_blueprint: {
    title: "Credit Note Blueprint",
    shortTitle: "Credit Blueprint",
    icon: <CreditsIcon />,
    description: "Blueprint validation rule enforcing adjusted data parameters, tax details, and refund sums for Credit Notes.",
    role: "Validates credit note headers, original invoice ties, and tax percentages.",
  },
  service_invoice_blueprint: {
    title: "Service Invoice Blueprint",
    shortTitle: "Service Blueprint",
    icon: <OthersIcon />,
    description: "Blueprint validation rule specifically checking repair details, parts line-items, and license plates for service invoices.",
    role: "Enforces integrity for maintenance records and vehicle scopes.",
  },
  invoice_blueprint: {
    title: "Invoice Blueprint",
    shortTitle: "Invoice Blueprint",
    icon: <InvoiceIcon />,
    description: "Blueprint validation rule for standard billing invoices, validating sub-total aggregates and supplier vat records.",
    role: "Ensures correct totals, supplier IDs, and VAT breakdowns.",
  },
  mail_body_blueprint: {
    title: "Mail Body Blueprint",
    shortTitle: "Mail Blueprint",
    icon: <MailIcon />,
    description: "Blueprint validation rule checking EML content sections and splitting repeating text dividers to parse email body structures.",
    role: "Handles parsed parameters from automated webhook email streams.",
  },
  parser: {
    title: "Client Assistant Parser",
    shortTitle: "Client Parser",
    icon: <DocumentScannerIcon />,
    description: "Translates unstructured text lists into structured model instances, applying anchor logic, fallback rules, and regex pattern recognitions.",
    role: "Implements validateFormat() and processLines() routines custom to each partner format.",
  },
  json_schemas: {
    title: "JSON Schemas (Validation Guard)",
    shortTitle: "JSON Schemas",
    icon: <RuleIcon />,
    description: "Performs strict validations against JSON specs, rejecting parsed arrays with structural anomalies before serialization.",
    role: "Checks schema structures (e.g. order_schema, invoice_headers) and logs diagnostic trace exceptions.",
  },
  formatted_json: {
    title: "Formatted JSON Output",
    shortTitle: "JSON Output",
    icon: <JsonIcon />,
    description: "Output target delivering finalized, structured JSON data mapped directly to target database attributes.",
    role: "Serializes the parsed output to JSON records.",
  },
  csv_output: {
    title: "CSV Output File",
    shortTitle: "CSV Output",
    icon: <CsvIcon />,
    description: "Compatible accounting format spreadsheet with UTF-8 BOM encoding for partner imports.",
    role: "Generates custom CSV sheets for external billing engines.",
  },
};

export const workflows = {
  formatScan: {
    title: "Format Scanning & Auto-Discovery",
    shortTitle: "Scanning",
    icon: <AltRouteIcon />,
    description: "Dynamically routes incoming formats to matching client modules.",
    steps: [
      { label: "File Upload", text: "A user uploads a file, or a webhook email triggers the pipeline with an EML/PDF stream." },
      { label: "Class Scanning", text: "AutoPdfAssistant queries autoloaded classes extending the PdfClient parent within the App/Assistants namespace." },
      { label: "Format Validation", text: "The scanner executes each client's validateFormat() method, checking key text anchors (e.g. searching for German keyword Gutschrift)." },
      { label: "Matched Load", text: "When a match returns true, the scanner terminates search loops and instantiates the target client parser assistant." }
    ],
    payload: {
      inputSource: "invoice_adampolis_1.pdf",
      fileBytes: "152 KB",
      detectedMime: "application/pdf"
    },
    responsePayload: {
      matchedClass: "App\\Assistants\\AdampolisServiceInvoicePdfAssistant",
      status: "DISCOVERED"
    }
  },
  extraction: {
    title: "Layout-Aware Tabular Ingestion",
    shortTitle: "Ingestion",
    icon: <TableRowsIcon />,
    description: "Extracts tabular item details from columnar documents.",
    steps: [
      { label: "Layout Mode Check", text: "The client parser configures static::$use_layout = true to preserve horizontal spacing and columns." },
      { label: "Index Boundaries", text: "Regex searches locate start coordinates (e.g., matching 'NETTO') and end boundaries (such as double lines)." },
      { label: "Modular Row Iteration", text: "Loops process character lines within bounds, mapping values to columns by character coordinates." },
      { label: "Standardized Normalization", text: "Invokes uncomma() to clean decimal values and GeonamesCountry mapping for ISO conversions." }
    ],
    payload: {
      useLayout: true,
      coordinateThreshold: 4,
      boundaryAnchors: ["NETTO", "___"]
    },
    responsePayload: {
      lineItemsExtracted: 3,
      dataFieldsNormalized: ["item_code", "quantity", "unit_price"]
    }
  },
  testing: {
    title: "Testing Automation & Trace Logs",
    shortTitle: "Testing",
    icon: <TerminalIcon />,
    description: "Automated verification checks and diagnostic traces during development.",
    steps: [
      { label: "Raw Extraction", text: "Saves raw document text elements to storage/text_lines/ to examine layout and column offsets." },
      { label: "Dry-Run Validation", text: "Passes extracted arrays through the JsonSchema validator, verifying structures against order_schema specs." },
      { label: "Trace Log Compilation", text: "Creates a detailed diagnostic log file inside storage/debug_output/ listing intermediate variables and matched cargo items." },
      { label: "Error Mapping", text: "If schema checks fail, formats the trace details listing path, keyword, error message, and dumps output." }
    ],
    payload: {
      testMode: "dryRun",
      schemaPath: "storage/service_invoice_schema.json"
    },
    responsePayload: {
      schemaValid: true,
      debugTraceSaved: "storage/service_invoices/debug_output/adampolis_debug.txt"
    }
  }
};

export const conceptualSchemas = {
  Order: {
    description: "High-level visual blueprint of parsed logistics order metadata.",
    sections: [
      { name: "Sender / Customer", fields: ["company", "street_address", "city", "country (ISO-3166)"] },
      { name: "Order Reference", fields: ["unique_order_ref (FT26...)", "freight_price", "currency (3-letter)"] },
      { name: "Locations (Loading & Destination)", fields: ["company", "address", "city", "postal_code", "datetime_from (ISO)", "datetime_to"] },
      { name: "Cargos", fields: ["number", "weight", "pkg_height", "package_count", "package_type", "subcargo_indices"] }
    ]
  },
  "Service Invoice": {
    description: "High-level visual blueprint of parsed service and maintenance invoices.",
    sections: [
      { name: "Invoice Details", fields: ["invoice_date (YYYY-MM-DD)", "invoice_no"] },
      { name: "Supplier Metadata", fields: ["supplier_name", "supplier_business_id", "supplier_vat_code"] },
      { name: "Line Items (Repairs / Parts)", fields: ["item_type (REPAIR/PART enum)", "item_code", "item_description", "quantity", "unit_price", "total_price"] },
      { name: "Vehicle Scopes", fields: ["transport_number (license plate)", "transport_vin (chassis)"] }
    ]
  },
  "Credit Note": {
    description: "High-level visual blueprint of negative adjustments and credits.",
    sections: [
      { name: "Credit Header", fields: ["credit_note_no", "date"] },
      { name: "Supplier & Client", fields: ["supplier_vat", "client_vat", "company_names"] },
      { name: "Adjustments", fields: ["original_reference_no", "total_credit_amount", "currency", "reason_comment"] }
    ]
  }
};

export const strategyDocs = [
  { file: "ORDER_PARSER_STRATEGY.md", desc: "Guides coordinate-aware extraction for transport orders, mapping multiple loading/unloading junctions and binding cargo weights to respective subcargo indices." },
  { file: "SERVICE_INVOICE_PARSER_STRATEGY.md", desc: "Outlines parsing line-item arrays, classifying tabular structures into REPAIR or PART categories, and aligning transport chassis numbers (VINs)." },
  { file: "MAIL_BODY_PARSER_STRATEGY.md", desc: "Handles EML email streams, splitting repeating text dividers, parsing key-value pairs, and cleaning invisible Unicode formats." },
  { file: "INVOICE_PARSER_STRATEGY.md", desc: "Governs header mapping, tax breakdowns, supplier identity validation, and UTF-8 BOM compatible Excel CSV formatting." },
  { file: "ORDER_PARSER_XLSX_STRATEGY.md", desc: "Guides excel sheets data cell parsing, checking offsets, and converting irregular cell positions dynamically." },
  { file: "CREDIT_NOTE_PARSER_STRATEGY.md", desc: "Manages credit adjustments, mapping refund balances, VAT rates, and original invoice reference ties." }
];
