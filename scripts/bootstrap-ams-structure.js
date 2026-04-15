/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFileIfMissing(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (fs.existsSync(filePath)) return;
  fs.writeFileSync(filePath, content, "utf8");
}

function jsMigrationBoilerplate(tableName) {
  return `'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('${tableName}', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('${tableName}');
  },
};
`;
}

function jsSeederBoilerplate(seedName) {
  return `'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    // TODO: replace with real seed data
    await queryInterface.bulkInsert('${seedName}', [], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('${seedName}', null, {});
  },
};
`;
}

function expressAppBoilerplate() {
  return `'use strict';

const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api', routes);

module.exports = app;
`;
}

function expressServerBoilerplate() {
  return `'use strict';

require('dotenv').config();
const app = require('./app');

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(\`Backend listening on http://localhost:\${PORT}\`);
});
`;
}

function backendPackageJson() {
  return JSON.stringify(
    {
      name: "admission-management-system-backend",
      private: true,
      version: "0.0.0",
      main: "server.js",
      type: "commonjs",
      scripts: {
        dev: "node server.js",
      },
      dependencies: {
        cors: "^2.8.5",
        dotenv: "^16.4.5",
        express: "^4.19.2",
      },
    },
    null,
    2
  ) + "\n";
}

function backendConfigDatabase() {
  return `'use strict';

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'ams',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  dialect: process.env.DB_DIALECT || 'postgres',
};
`;
}

function backendConfigMailer() {
  return `'use strict';

module.exports = {
  host: process.env.MAIL_HOST || 'smtp.example.com',
  port: Number(process.env.MAIL_PORT || 587),
  user: process.env.MAIL_USER || '',
  pass: process.env.MAIL_PASS || '',
  from: process.env.MAIL_FROM || 'no-reply@example.com',
};
`;
}

function backendConfigCloudinary() {
  return `'use strict';

module.exports = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.CLOUDINARY_API_KEY || '',
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
};
`;
}

function backendRouteIndex() {
  return `'use strict';

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/candidate', require('./candidate.routes'));
router.use('/officer', require('./officer.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;
`;
}

function backendBasicRouter(name) {
  return `'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/${name}.controller');

router.get('/', controller.index);

module.exports = router;
`;
}

function backendBasicController() {
  return `'use strict';

module.exports = {
  async index(_req, res) {
    return res.json({ ok: true });
  },
};
`;
}

function backendMiddleware(name) {
  return `'use strict';

module.exports = function ${name}(_req, _res, next) {
  return next();
};
`;
}

function backendUtilHash() {
  return `'use strict';

const crypto = require('crypto');

module.exports = {
  sha256(input) {
    return crypto.createHash('sha256').update(String(input)).digest('hex');
  },
};
`;
}

function backendUtilResponse() {
  return `'use strict';

module.exports = {
  ok(res, data = null) {
    return res.json({ ok: true, data });
  },
  fail(res, message = 'Error', status = 400) {
    return res.status(status).json({ ok: false, message });
  },
};
`;
}

function backendService(name) {
  return `'use strict';

module.exports = {
  async ${name}() {
    return null;
  },
};
`;
}

function backendModelIndex() {
  return `'use strict';

// Placeholder Sequelize init. Replace with real Sequelize config when ready.
module.exports = {};
`;
}

function backendModel(name) {
  return `'use strict';

// Placeholder model file for ${name}. Define Sequelize model here.
module.exports = function ${name}Model(_sequelize, _DataTypes) {
  return {};
};
`;
}

function reactApp() {
  return `export default function App() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold">Admissions Management System</h1>
    </div>
  );
}
`;
}

function reactMain() {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
}

function reactViteConfig() {
  return `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
`;
}

function reactTailwindConfig() {
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
}

function reactPackageJson() {
  return JSON.stringify(
    {
      name: "admission-management-system-ui",
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.3.1",
        autoprefixer: "^10.4.20",
        postcss: "^8.4.41",
        tailwindcss: "^3.4.10",
        vite: "^5.4.2",
      },
    },
    null,
    2
  ) + "\n";
}

function reactIndexCss() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
}

function reactComponent(name) {
  return `export default function ${name}() {
  return <div>${name}</div>;
}
`;
}

function reactRouteIndex() {
  return `import { createBrowserRouter } from "react-router-dom";
import InternalLogin from "../pages/Auth/InternalLogin.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <InternalLogin /> },
]);
`;
}

function reactPrivateRoute() {
  return `export default function PrivateRoute({ children }) {
  return children;
}
`;
}

function reactApiClient() {
  return `export async function apiFetch(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
  const res = await fetch(\`\${baseUrl}\${path}\`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}
`;
}

function reactApi(name) {
  return `import { apiFetch } from "./apiClient.js";

export const ${name}Api = {
  ping() {
    return apiFetch("/health");
  },
};
`;
}

function reactHook(name) {
  return `import { useEffect, useState } from "react";

export default function ${name}() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(null);
  }, []);

  return { value, setValue };
}
`;
}

function reactStore() {
  return `import { useState } from "react";

export function useAuthStore() {
  const [user, setUser] = useState(null);
  return { user, setUser };
}
`;
}

function reactUtilDate() {
  return `export function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString();
}
`;
}

function reactUtilFile() {
  return `export function bytesToHuman(bytes = 0) {
  const units = ["B", "KB", "MB", "GB"];
  let v = Math.max(0, Number(bytes));
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return \`\${v.toFixed(i === 0 ? 0 : 1)} \${units[i]}\`;
}
`;
}

function ensureFavicon(filePath) {
  // Minimal placeholder so the file exists; replace with real icon later.
  writeFileIfMissing(filePath, "favicon placeholder\n");
}

function main() {
  const root = process.cwd();

  // 1) DATABASE
  const dbRoot = path.join(root, "src", "main", "resources", "db");
  const migrationsDir = path.join(dbRoot, "migrations");
  const seedersDir = path.join(dbRoot, "seeders");
  ensureDir(migrationsDir);
  ensureDir(seedersDir);

  const migrations = [
    ["20260410000001-create-khoa.js", "Khoa"],
    ["20260410000002-create-dottuyensinh.js", "DotTuyenSinh"],
    ["20260410000003-create-tohopmon.js", "ToHopMon"],
    ["20260410000004-create-monhoc.js", "MonHoc"],
    ["20260410000005-create-loaigiayto.js", "LoaiGiayTo"],
    ["20260410000006-create-nhomquyen.js", "NhomQuyen"],
    ["20260410000007-create-thisinh.js", "ThiSinh"],
    ["20260410000008-create-nganh.js", "Nganh"],
    ["20260410000009-create-nhanvien.js", "NhanVien"],
    ["20260410000010-create-cautructohop.js", "CauTrucToHop"],
    ["20260410000011-create-chitietdiem.js", "ChiTietDiem"],
    ["20260410000012-create-cauhinhxettuyen.js", "CauHinhXetTuyen"],
    ["20260410000013-create-chitieutuyensinh.js", "ChiTieuTuyenSinh"],
    ["20260410000014-create-hosonhaphoc.js", "HoSoNhapHoc"],
    ["20260410000015-create-nguyenvong.js", "NguyenVong"],
    ["20260410000016-create-sinhvien.js", "SinhVien"],
    ["20260410000017-create-giaytodinhkem.js", "GiayToDinhKem"],
    ["20260410000018-create-yeucaupheduyet.js", "YeuCauPheDuyet"],
  ];

  for (const [file, table] of migrations) {
    writeFileIfMissing(path.join(migrationsDir, file), jsMigrationBoilerplate(table));
  }

  const seeders = [
    ["20260410-seed-admin.js", "Admins"],
    ["20260410-seed-nhomquyen.js", "NhomQuyen"],
    ["20260410-seed-loaigiayto.js", "LoaiGiayTo"],
  ];
  for (const [file, seedName] of seeders) {
    writeFileIfMissing(path.join(seedersDir, file), jsSeederBoilerplate(seedName));
  }

  // 2) BACKEND
  const beRoot = path.join(root, "src", "main", "admission_management_system");
  const beDirs = [
    "config",
    "controllers",
    "middlewares",
    "models",
    "routes",
    "services",
    "utils",
  ];
  for (const d of beDirs) ensureDir(path.join(beRoot, d));

  writeFileIfMissing(path.join(beRoot, "app.js"), expressAppBoilerplate());
  writeFileIfMissing(path.join(beRoot, "server.js"), expressServerBoilerplate());
  writeFileIfMissing(path.join(beRoot, ".env"), "PORT=4000\n");
  writeFileIfMissing(path.join(beRoot, "package.json"), backendPackageJson());

  writeFileIfMissing(path.join(beRoot, "config", "database.js"), backendConfigDatabase());
  writeFileIfMissing(path.join(beRoot, "config", "mailer.js"), backendConfigMailer());
  writeFileIfMissing(path.join(beRoot, "config", "cloudinary.js"), backendConfigCloudinary());

  const controllers = ["auth", "candidate", "officer", "admin"];
  for (const c of controllers) {
    writeFileIfMissing(path.join(beRoot, "controllers", `${c}.controller.js`), backendBasicController());
  }

  writeFileIfMissing(
    path.join(beRoot, "middlewares", "auth.middleware.js"),
    backendMiddleware("authMiddleware")
  );
  writeFileIfMissing(
    path.join(beRoot, "middlewares", "upload.middleware.js"),
    backendMiddleware("uploadMiddleware")
  );
  writeFileIfMissing(
    path.join(beRoot, "middlewares", "validator.middleware.js"),
    backendMiddleware("validatorMiddleware")
  );

  writeFileIfMissing(path.join(beRoot, "routes", "index.js"), backendRouteIndex());
  writeFileIfMissing(path.join(beRoot, "routes", "auth.routes.js"), backendBasicRouter("auth"));
  writeFileIfMissing(path.join(beRoot, "routes", "candidate.routes.js"), backendBasicRouter("candidate"));
  writeFileIfMissing(path.join(beRoot, "routes", "officer.routes.js"), backendBasicRouter("officer"));
  writeFileIfMissing(path.join(beRoot, "routes", "admin.routes.js"), backendBasicRouter("admin"));

  const services = ["email", "upload", "excel", "admission"];
  for (const s of services) {
    writeFileIfMissing(path.join(beRoot, "services", `${s}.service.js`), backendService(`${s}Service`));
  }

  writeFileIfMissing(path.join(beRoot, "utils", "hash.util.js"), backendUtilHash());
  writeFileIfMissing(path.join(beRoot, "utils", "response.util.js"), backendUtilResponse());

  writeFileIfMissing(path.join(beRoot, "models", "index.js"), backendModelIndex());
  const models = [
    "ThiSinh",
    "Nganh",
    "Khoa",
    "DotTuyenSinh",
    "ChiTieuTuyenSinh",
    "NguyenVong",
    "HoSoNhapHoc",
    "GiayToDinhKem",
    "LoaiGiayTo",
    "NhanVien",
    "NhomQuyen",
    "YeuCauPheDuyet",
    "MonHoc",
    "ChiTietDiem",
    "ToHopMon",
    "CauTrucToHop",
  ];
  for (const m of models) {
    writeFileIfMissing(path.join(beRoot, "models", `${m}.js`), backendModel(m));
  }

  // 3) FRONTEND
  const uiRoot = path.join(root, "ui");
  ensureDir(path.join(uiRoot, "public"));
  ensureDir(path.join(uiRoot, "src", "assets", "images"));
  ensureDir(path.join(uiRoot, "src", "assets", "styles"));
  ensureDir(path.join(uiRoot, "src", "components", "common"));
  ensureDir(path.join(uiRoot, "src", "components", "layout"));
  ensureDir(path.join(uiRoot, "src", "hooks"));
  ensureDir(path.join(uiRoot, "src", "pages", "Auth"));
  ensureDir(path.join(uiRoot, "src", "pages", "Candidate"));
  ensureDir(path.join(uiRoot, "src", "pages", "Officer"));
  ensureDir(path.join(uiRoot, "src", "pages", "Admin"));
  ensureDir(path.join(uiRoot, "src", "routes"));
  ensureDir(path.join(uiRoot, "src", "services"));
  ensureDir(path.join(uiRoot, "src", "store"));
  ensureDir(path.join(uiRoot, "src", "utils"));

  ensureFavicon(path.join(uiRoot, "public", "favicon.ico"));

  writeFileIfMissing(path.join(uiRoot, "App.jsx"), reactApp());
  writeFileIfMissing(path.join(uiRoot, "main.jsx"), reactMain());
  writeFileIfMissing(path.join(uiRoot, ".env"), "VITE_API_URL=http://localhost:4000/api\n");
  writeFileIfMissing(path.join(uiRoot, "vite.config.js"), reactViteConfig());
  writeFileIfMissing(path.join(uiRoot, "tailwind.config.js"), reactTailwindConfig());
  writeFileIfMissing(path.join(uiRoot, "package.json"), reactPackageJson());
  writeFileIfMissing(path.join(uiRoot, "src", "index.css"), reactIndexCss());

  const commonComponents = ["Button", "InputField", "DataTable", "ModalConfirm", "FileDropzone"];
  for (const c of commonComponents) {
    writeFileIfMissing(
      path.join(uiRoot, "src", "components", "common", `${c}.jsx`),
      reactComponent(c)
    );
  }

  const layoutComponents = ["CandidateLayout", "AdminSidebar", "DashboardLayout"];
  for (const c of layoutComponents) {
    writeFileIfMissing(
      path.join(uiRoot, "src", "components", "layout", `${c}.jsx`),
      reactComponent(c)
    );
  }

  const hooks = ["useAuth", "useFetch", "useCountdown"];
  for (const h of hooks) {
    writeFileIfMissing(path.join(uiRoot, "src", "hooks", `${h}.js`), reactHook(h));
  }

  writeFileIfMissing(
    path.join(uiRoot, "src", "pages", "Auth", "InternalLogin.jsx"),
    reactComponent("InternalLogin")
  );

  const candidatePages = ["SearchPortal", "OTPVerify", "AdmissionResult", "OnlineUpload"];
  for (const p of candidatePages) {
    writeFileIfMissing(
      path.join(uiRoot, "src", "pages", "Candidate", `${p}.jsx`),
      reactComponent(p)
    );
  }

  const officerPages = [
    "OfficerDashboard",
    "AdmissionProcess",
    "PhysicalDocs",
    "OnlineDocsReview",
    "StudentReception",
  ];
  for (const p of officerPages) {
    writeFileIfMissing(
      path.join(uiRoot, "src", "pages", "Officer", `${p}.jsx`),
      reactComponent(p)
    );
  }

  const adminPages = [
    "AdminDashboard",
    "DataImport",
    "MasterData",
    "ApprovalRequests",
    "UserManagement",
    "ReportExport",
  ];
  for (const p of adminPages) {
    writeFileIfMissing(path.join(uiRoot, "src", "pages", "Admin", `${p}.jsx`), reactComponent(p));
  }

  writeFileIfMissing(path.join(uiRoot, "src", "routes", "PrivateRoute.jsx"), reactPrivateRoute());
  writeFileIfMissing(path.join(uiRoot, "src", "routes", "index.jsx"), reactRouteIndex());

  writeFileIfMissing(path.join(uiRoot, "src", "services", "apiClient.js"), reactApiClient());
  writeFileIfMissing(path.join(uiRoot, "src", "services", "auth.api.js"), reactApi("auth"));
  writeFileIfMissing(path.join(uiRoot, "src", "services", "candidate.api.js"), reactApi("candidate"));
  writeFileIfMissing(path.join(uiRoot, "src", "services", "officer.api.js"), reactApi("officer"));
  writeFileIfMissing(path.join(uiRoot, "src", "services", "admin.api.js"), reactApi("admin"));

  writeFileIfMissing(path.join(uiRoot, "src", "store", "useAuthStore.js"), reactStore());
  writeFileIfMissing(path.join(uiRoot, "src", "utils", "date.util.js"), reactUtilDate());
  writeFileIfMissing(path.join(uiRoot, "src", "utils", "file.util.js"), reactUtilFile());

  console.log("Bootstrap completed. Created missing structure/files only.");
}

main();

