const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const SECTIONS_EN = [
  "1. Data protection at a glance",
  "2. Hosting",
  "3. General information and mandatory disclosures",
  "4. Data collection on this website",
  "5. Newsletter",
  "6. Plugins and Tools",
  "7. External Online Platforms Introduction",
];

const SECTIONS_DE = [
  "1. Datenschutz auf einen Blick",
  "2. Hosting",
  "3. Allgemeine Hinweise und Pflichtinformationen",
  "4. Datenerfassung auf dieser Website",
  "5. Newsletter",
  "6. Plugins und Tools",
  "7. Externe Onlineplattformen",
];

const LIST_BROWSER_EN = [
  "Browser type and browser version",
  "Operating system used",
  "Referrer URL",
  "Hostname of the accessing computer",
  "Time of server request",
  "IP address",
];

const LIST_BROWSER_DE = [
  "Browsertyp und Browserversion",
  "Verwendetes Betriebssystem",
  "Referrer-URL",
  "Hostname des zugreifenden Rechners",
  "Uhrzeit der Serveranfrage",
  "IP-Adresse",
];

const LIST_RESTRICT_EN = [
  "If you dispute the accuracy of your personal data stored with us, we generally need time to verify this. For the duration of the verification process, you have the right to request the restriction of the processing of your personal data.",
  "If the processing of your personal data was/is unlawful, you can request the restriction of data processing instead of deletion.",
  "If we no longer need your personal data, but you require it for the establishment, exercise or defense of legal claims, you have the right to request restriction of processing of your personal data instead of erasure.",
  "If you have objected to processing pursuant to Article 21(1) GDPR, a balancing of interests between your interests and ours must be carried out. Until it is determined whose interests prevail, you have the right to request the restriction of the processing of your personal data.",
  "If you have restricted the processing of your personal data, this data – apart from being stored – may only be processed with your consent or for the establishment, exercise or defense of legal claims or for the protection of the rights of another natural or legal person or for reasons of important public interest of the European Union or of a Member State.",
];

const LIST_RESTRICT_DE = [
  "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
  "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah oder geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
  "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung zu verlangen.",
  "Wenn Sie Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
  "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.",
];

function linkify(text) {
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

function isHeading(line, sections) {
  if (sections.includes(line)) return false;
  if (line.length > 120 || line.endsWith(".") || /^https?:\/\//.test(line)) return false;
  if (/^(👥|🤝|📓|📅|⚖️)|^Source/.test(line)) return false;
  if (LIST_BROWSER_EN.includes(line) || LIST_BROWSER_DE.includes(line)) return false;
  if (line.startsWith("If you") || line.startsWith("Wenn Sie")) return false;
  return !line.includes("?") && line.split(" ").length <= 12;
}

function parse(text, sections, listBrowser, listRestrict) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const result = [];
  let cur = null;
  let i = 0;

  if (lines[0] === "Privacy Policy" || lines[0] === "Datenschutzerklärung") i = 1;

  while (i < lines.length) {
    const line = lines[i];
    const sectionTitle = sections.find((s) => s === line);
    if (sectionTitle) {
      cur = { title: sectionTitle, blocks: [] };
      result.push(cur);
      i++;
      continue;
    }
    if (!cur) {
      i++;
      continue;
    }

    if (listBrowser.includes(line)) {
      cur.blocks.push({ type: "list", items: [...listBrowser] });
      i += listBrowser.length;
      continue;
    }

    if (line === listRestrict[0]) {
      cur.blocks.push({ type: "list", items: [...listRestrict] });
      i += listRestrict.length;
      continue;
    }

    if (line === "PS-WebAgentur") {
      cur.blocks.push({
        type: "address",
        lines: ["PS-WebAgentur", "Philipp Sobotta", "Grillparzerplatz 7", "01157 Dresden", "Germany"],
      });
      i += 5;
      continue;
    }

    if (line === "Kevin Weniger" && lines[i + 1] && lines[i + 1].includes("KevinDigital")) {
      const phone = lines.find((l, idx) => idx >= i && /^Telephone:|^Telefon:/.test(l)) || "";
      const email = lines.find((l, idx) => idx >= i && /^Email:|^E-Mail:/.test(l)) || "";
      cur.blocks.push({
        type: "address",
        lines: [line, lines[i + 1], phone, email].filter(Boolean),
      });
      i += 4;
      continue;
    }

    if (isHeading(line, sections)) {
      cur.blocks.push({ type: "heading", text: line });
      i++;
      continue;
    }

    cur.blocks.push({ type: "paragraph", text: line });
    i++;
  }

  return result;
}

function renderBlocks(blocks) {
  return blocks
    .map((block) => {
      if (block.type === "heading") return `            <h3>${block.text}</h3>`;
      if (block.type === "paragraph") return `            <p>${linkify(block.text)}</p>`;
      if (block.type === "list") {
        return `            <ul>\n${block.items
          .map((item) => `              <li>${linkify(item)}</li>`)
          .join("\n")}\n            </ul>`;
      }
      if (block.type === "address") {
        return `            <address>${block.lines.map((l) => linkify(l)).join("<br />")}</address>`;
      }
      return "";
    })
    .join("\n");
}

function renderSections(sections) {
  return sections
    .map(
      (section) => `        <section class="legal-block">
          <h2 class="text-section-title legal-block__title">${section.title}</h2>
          <div class="legal-block__content text-body">
${renderBlocks(section.blocks)}
          </div>
        </section>`
    )
    .join("\n\n");
}

const enTxt = fs.readFileSync(path.join(root, "privacypolicy.txt"), "utf8");
const dePath = path.join(root, "datenschutz.txt");
const deTxt = fs.existsSync(dePath)
  ? fs.readFileSync(dePath, "utf8")
  : fs.readFileSync(path.join(root, "privacypolicy.txt"), "utf8");

const enSections = parse(enTxt, SECTIONS_EN, LIST_BROWSER_EN, LIST_RESTRICT_EN);
const deSections = fs.existsSync(dePath)
  ? parse(deTxt, SECTIONS_DE, LIST_BROWSER_DE, LIST_RESTRICT_DE)
  : enSections.map((s, idx) => ({ ...s, title: SECTIONS_DE[idx] || s.title }));

const footer = fs
  .readFileSync(path.join(root, "imprint.html"), "utf8")
  .match(/<footer[\s\S]*<\/footer>/)[0]
  .replace(/imprint\.html" class="cursor-hover is-active"/g, 'imprint.html" class="cursor-hover"')
  .replace(/privacy-policy\.html" class="cursor-hover"/g, 'privacy-policy.html" class="cursor-hover is-active"');

const partialsDir = path.join(root, "partials");
const siteHeader = fs.readFileSync(path.join(partialsDir, "site-header.html"), "utf8");
const contactModal = fs.readFileSync(path.join(partialsDir, "contact-modal.html"), "utf8");
const legalScripts = fs.readFileSync(path.join(partialsDir, "legal-scripts.html"), "utf8");

const page = `<!DOCTYPE html>
<html lang="de" translate="no" class="notranslate">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="google" content="notranslate" />
  <title>Privacy Policy — Kevin Digital</title>
  <meta name="description" content="Privacy policy for Kevin Digital." />
  <meta http-equiv="content-language" content="de" />
  <meta property="og:title" content="Privacy Policy — Kevin Digital" />
  <meta property="og:description" content="Privacy policy for Kevin Digital." />
  <meta property="og:locale" content="de_DE" />
  <meta property="og:type" content="website" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Instrument+Sans:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Wix+Madefor+Display:wght@600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
  <link rel="stylesheet" href="css/responsive.css" />
  <link rel="stylesheet" href="css/contact-form.css" />
  <link rel="stylesheet" href="css/legal.css" />
</head>
<body class="legal-page-body" data-legal-page="privacy">
${siteHeader}

  <main class="site-shell">
    <div id="custom-cursor-glow" class="custom-cursor-glow is-active" aria-hidden="true">
      <div class="custom-cursor-glow__mesh" aria-hidden="true"></div>
    </div>
    <div class="site-header-spacer" id="site-header-spacer" aria-hidden="true"></div>

    <section class="gradient-bg legal-page-section">
      <div class="page-container section-pad legal-page">
        <a href="index.html" class="legal-page__back cursor-hover">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span data-i18n="legal.backHome">Zurück zur Startseite</span>
        </a>

        <div data-lang-content="en" hidden>
          <h1 class="text-h1 legal-page__title">Privacy Policy</h1>
          <div class="legal-page__body">
${renderSections(enSections)}
          </div>
        </div>

        <div data-lang-content="de">
          <h1 class="text-h1 legal-page__title">Datenschutzerklärung</h1>
          <div class="legal-page__body">
${renderSections(deSections)}
          </div>
        </div>
      </div>
    </section>

    ${footer}
  </main>
${contactModal}
${legalScripts}
</body>
</html>
`;

fs.writeFileSync(path.join(root, "privacy-policy.html"), page);
console.log("Built privacy-policy.html with", enSections.length, "EN sections and", deSections.length, "DE sections");
